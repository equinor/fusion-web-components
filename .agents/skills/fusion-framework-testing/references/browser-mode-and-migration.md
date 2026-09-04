# Browser Mode and migration

## Why Browser Mode is the default

`@equinor/fusion-framework-vitest-plugin-react-app` runs component and hook tests in headless
Chromium by default — real DOM behavior, at the cost of speed relative to `happy-dom`/`jsdom`
(which run in the same Node process as the test; Browser Mode starts Chromium through Playwright
and communicates with that browser process). Choose Browser Mode for fidelity, not speed. Keep
fast unit tests on Node or DOM emulation when they do not need browser behavior.

Why use a real browser at all:
- **Real framework execution:** tests control external boundaries and seed module state through
  module mocks (see `fusion-framework-mocking`), while the actual module configuration,
  lifecycle, providers, and rendering behavior still run.
- **Browser fidelity:** Chromium provides real layout, `ResizeObserver`, custom elements, and
  Shadow DOM — behavior `happy-dom`/`jsdom` only approximate.

> [!WARNING]
> A DOM-emulation gap is usually patched one of two ways: a polyfill standing in for the missing
> browser API, or a component replacement that avoids exercising it at all. Both are test-only
> code with no equivalent in production, and both defeat the point of the test — a polyfill can
> drift from real browser behavior unnoticed, and a mocked component only proves the *mock*
> renders correctly, never the real one. Treat every DOM-emulation workaround as debt to remove,
> not a pattern to reach for.

A real browser does not eliminate every workaround: AG Grid license messages and Lit dev-mode
warnings are console noise from real Chromium runs, not DOM-emulation gaps, and suppressing them
carries none of the risk above. Remove a DOM-emulation-only workaround only after confirming the
affected test still passes against the real component in Browser Mode.

## Choose a different runtime

### Another browser provider

Pass `test.browser.provider` to `defineProject` to replace Playwright while staying in Browser
Mode:

```ts
import { defineProject } from '@equinor/fusion-framework-vitest-plugin-react-app/config';
import { webdriverio } from '@vitest/browser-webdriverio';

export default defineProject({ test: { browser: { provider: webdriverio() } } });
```

### `happy-dom` or `jsdom`

> [!CAUTION]
> Rendering with `happy-dom`/`jsdom` reintroduces the DOM-emulation tradeoff above. Only take this
> path for a component/hook that provably does not need browser fidelity — otherwise stay in
> Browser Mode.

The Fusion module setup does not depend on Browser Mode — build the same provider tree and pass
it to another renderer:

```tsx
import { render } from '@testing-library/react';
import { mockFramework } from '@equinor/fusion-framework/mock';
import { enableAppManifestMock, mockAppModules } from '@equinor/fusion-framework-app/mock';
import { FrameworkProvider } from '@equinor/fusion-framework-react';
import { ModuleProvider } from '@equinor/fusion-framework-react-module';
import type { AppModule } from '@equinor/fusion-framework-module-app';
import type { ReactElement } from 'react';

const env = { manifest: { appKey: 'test-app', displayName: 'Test App', description: 'Test app', type: 'standalone' } } as const;

async function renderWithHappyDom(ui: ReactElement) {
  const framework = await mockFramework<[AppModule]>((configurator) => enableAppManifestMock(configurator, env));
  const app = await mockAppModules(undefined, env, framework);
  return render(ui, {
    wrapper: ({ children }) => (
      <FrameworkProvider value={framework}>
        <ModuleProvider value={app}>{children}</ModuleProvider>
      </FrameworkProvider>
    ),
  });
}
```

Run this in a Vitest project with `environment: 'happy-dom'` instead of `browser.enabled` — use a
separate project if the same app also has Browser Mode tests. Call the same `enable*Mock`
functions from the `mockAppModules` configuration callback; these mocks configure Fusion modules
and do not depend on the renderer. `renderHook` from `@testing-library/react` can use the same
wrapper for hook tests.

## Migrate an existing app to Fusion Vitest

Covers suites built with `@testing-library/react`, `jsdom`/`happy-dom`, hand-written Fusion hook
mocks, and mock HTTP servers (MirageJS, MSW, Nock). Migrate one test at a time — a mixed suite is
a valid final state.

**Choose which tests to migrate first:** start with tests reading from the application module
scope through `useAppModule`, `useAccessToken`, `useCurrentContext`, `useCurrentBookmark`,
`useFeature`, or a route using several Fusion modules — these can drop hand-written hook mocks for
the real module pipeline plus `enable*Mock` configuration. Keep pure functions, presentational
components, and Fusion-independent hooks on their current runner when that is simpler.

### What changes, concretely

| Existing pattern | Replace with |
| --- | --- |
| `@testing-library/react`'s `render`/`renderHook`/`waitFor`/`act` on `jsdom`/`happy-dom` | `vitest-browser-react`'s `render`/`renderHook` and `vitest`'s `waitFor`/`act`, on real Chromium |
| `vi.mock('@equinor/fusion-framework-react/hooks', ...)` and similar hand-rolled Fusion hook mocks | The owning module's `enable*Mock` from its own `/mock` entry point (`fusion-framework-mocking`) |
| A hand-written mock HTTP server (MirageJS, `msw/node`, `nock`) | `configurator.http.addMiddleware(...)`, or `createRouterMiddleware` for several routes under one base URI (`fusion-framework-mocking`) |
| A hand-rolled test wrapper composing a router, context providers, and error boundaries | `test.extend(...)` fixtures stacked on the base `render`/`configureApp` fixtures |
| Synchronous assertions (`expect(screen.getByText(...))`) | `await expect.element(screen.getByText(...)).toBeVisible()` |

### Step 1 — Install Browser Mode dependencies

```sh
pnpm add -D vitest playwright @vitest/browser-playwright vitest-browser-react \
  @equinor/fusion-framework-vitest-plugin-react-app
pnpm exec playwright install chromium
```

Remove `@testing-library/react`, `@testing-library/dom`, `@testing-library/user-event`, and the
`jsdom`/`happy-dom` package once every test that used them has migrated (keep them if part of the
suite intentionally stays on the old renderer). Replace `vitest.config.ts`:

```ts
import { defineProject } from '@equinor/fusion-framework-vitest-plugin-react-app/config';

export default defineProject();
```

### Step 2 — Replace hand-rolled Fusion hook mocks

```diff
-vi.mock('@equinor/fusion-framework-react/hooks', async (importOriginal) => ({
-  ...(await importOriginal()),
-  useCurrentUser: vi.fn(() => undefined),
-}));
-vi.mock('@equinor/fusion-framework-react-app/feature-flag', () => ({
-  useFeature: vi.fn(() => ({})),
-}));
+import { enableFeatureFlagMock } from '@equinor/fusion-framework-module-feature-flag/mock';
+import { test as baseTest } from '@equinor/fusion-framework-vitest-plugin-react-app/test';
+
+export const test = baseTest.extend('configureApp', ({ configureApp }) => (configurator, args) => {
+  configureApp?.(configurator, args);
+  configurator.msal.setAccount(null); // was: useCurrentUser returning undefined
+  enableFeatureFlagMock(configurator, (mock) => mock.addFeature({ key: 'new-search', enabled: true }));
+});
```

Each Fusion module owns its own mock entry point (`enableMsalMock`/`configurator.msal`,
`enableFeatureFlagMock`, `enableContextMock`, `enableBookmarkMock`, and more — see
`fusion-framework-mocking`). A hook or app-config piece with no Fusion dependency stays a plain
`vi.mock`. Replace a suite that overrides `useModuleCurrentContext` with `vi.spyOn` by seeding
`enableContextMock` instead; to change context after render, call the real module:
`await fusion.app.context.setCurrentContextByIdAsync(otherProject.id)`.

### Step 3 — Port the mock HTTP server

```diff
-import { createServer } from 'miragejs';
-
-export function createTestServer() {
-  return createServer({
-    routes() {
-      this.get('/activities/:id', (schema, request) => ({ id: request.params.id }));
-      this.post('/activities', (schema, request) => ({}));
-    },
-  });
-}
+import { createRouterMiddleware } from '@equinor/fusion-framework-module-http/mock';
+
+export const activityRoutes = createRouterMiddleware('https://cpr-api.example.com', (router) => {
+  router.get('/activities/:id', ({ params }) => Response.json({ id: params.id }));
+  router.post('/activities', async ({ request }) => Response.json({}));
+});
```

Register the result with `configurator.http.addMiddleware(activityRoutes)` inside a `configureApp`
fixture. Port one route file at a time — each is independently testable. An unported route can
fall through to the real network: keep the old interceptor for tests that have not migrated yet,
or add a final fail-closed middleware; do not rely on a missing route to fail by itself. Prefer
`createOpenApiMockMiddleware` over hand-written routes when the backend has an OpenAPI document.

If `useHttpClient` currently returns a plain `fetch` wrapper, remove that hook mock too — the real
client reaches middleware registered with `configurator.http.addMiddleware`.

### Compose a router and a domain fixture

Use a `render` extension for JSX wrappers (routers, app-owned providers); use a `configureApp`
extension for Fusion module state; stack both when a test needs both:

```tsx
import type { ReactElement } from 'react';
import { test as baseTest } from '@equinor/fusion-framework-vitest-plugin-react-app/test';
import { Router } from '@equinor/fusion-framework-react-router';
import type { RouteObject } from '@equinor/fusion-framework-react-router';
import { enableContextMock } from '@equinor/fusion-framework-module-context/mock';

// Every route matches, so the element under test stays mounted.
const testWithRouter = baseTest.extend('render', () => (ui: ReactElement) => {
  const routes: RouteObject[] = [{ path: '*', Component: () => ui }];
  return baseTest.render(<Router routes={routes} />);
});

export const test = testWithRouter.extend('configureApp', ({ configureApp }) => (configurator, args) => {
  configureApp?.(configurator, args);
  enableContextMock(configurator, (mock) => mock.setCurrentContext(projectA));
});
```

Keep app-owned React providers (authorization, schema, snackbar) in the `render` extension. Move
only Fusion module state to `configureApp` and `enable*Mock`.

### Step 4 — Update renders and assertions

Every render/hook helper is `async`, and most `vitest-browser-react` assertion helpers resolve
against the real browser rather than synchronously:

```diff
-const { findByTestId } = render(<WrappedProcessPage {...props} />);
-await findByTestId('customization-panel');
+const { getByTestId } = await render(<WrappedProcessPage {...props} />);
+await expect.element(getByTestId('customization-panel')).toBeVisible();
```

`fireEvent`-style interactions become element method calls (`await screen.getByRole('button', {
name: 'Activate' }).click()`); `act`/`waitFor` come from `vitest` rather than
`@testing-library/react`.

### Step 5 — Reassess DOM-emulation-only workarounds

Review polyfills and component replacements that may only exist for `jsdom`/`happy-dom`. Remove
one workaround at a time and run the affected tests against the real component. A common one: a
no-op `window.ResizeObserver` stub — real Chromium doesn't need it, and leaving it in place
silently breaks any component that measures itself through `ResizeObserver` before rendering (a
virtualized popover list, for example). Do not remove unrelated suppressions automatically — AG
Grid license messages, Lit dev-mode warnings, and app-specific test doubles may still apply.

### Migrate incrementally

Nothing requires migrating a whole app in one pass. A common order: pick one page/route-level test
that already hand-mocks several Fusion hooks, migrate it end to end (steps 1-4), confirm it's
green, then migrate the next. Leave Fusion-independent tests on their current renderer for as long
as that stays the cheaper option.

## Related

- `references/getting-started-and-configuration.md` — install, `defineProject`, layer choice
- `references/fixtures-and-advanced-usage.md` — composing/overriding fixtures
- `references/troubleshooting.md` — common setup, browser, and network failures
- `fusion-framework-mocking` skill — `enable*Mock` and HTTP/OpenAPI mocking details
- [Vitest Browser Mode](https://vitest.dev/guide/browser/) / [Mocking](https://vitest.dev/guide/mocking)
