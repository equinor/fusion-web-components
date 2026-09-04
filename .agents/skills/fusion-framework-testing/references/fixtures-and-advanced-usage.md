# Fixtures and advanced usage

The `/test` entry point extends Vitest's test context with `appEnv`, `configureApp`,
`configureFusion`, `fusion`, `app`, `render`, and `renderHook`. Fixture declarations are reusable,
while each test still receives fresh framework and app module instances. See Vitest's own
[Test Context](https://vitest.dev/guide/test-context) docs for fixture scope, cleanup, and the
general `test.extend`/`test.override` mechanics this builds on.

## Choose a rendering API

| API | Use it when |
| --- | --- |
| `test` from `/test` | The app's manifest, config, and module configurator should resolve automatically |
| `render` from `/test` | A standard `describe`/`it` block needs the automatically resolved app scope |
| `renderAppHook` | A hook needs an app scope with explicitly supplied options |
| `renderAppComponent` | A component needs explicit `env`, `configure`, or parent `fusion` options |
| `testApp` | A reusable fixture should not depend on Vite's automatic app-file resolution |

All Fusion rendering APIs initialize modules asynchronously and must be awaited. The lower-level
helpers return `fusion.framework` and `fusion.app`, letting a test drive the exact module
instances the rendered subject consumed.

## `renderAppHook`

```ts
function renderAppHook<Result, Props = undefined, TModules = unknown, TEnv extends AppEnv = AppEnv>(
  render: (initialProps?: Props) => Result,
  options?: {
    configure?: AppMockConfigureFn<TModules, TEnv>;
    env?: TEnv;
    fusion?: Fusion;
  } & Omit<RenderHookOptions<Props>, 'wrapper'>,
): Promise<RenderHookResult<Result, Props> & { fusion: { framework: Fusion; app: AppModulesInstance<TModules> } }>;
```

| Option | Description |
| --- | --- |
| `configure` | Forwarded to `mockAppModules` for seeding app-scope modules |
| `env` | The application environment (manifest); defaults to a generic standalone `test-app` |
| `fusion` | The parent Fusion instance; defaults to a fresh `mockFramework` instance serving this app's own manifest |

```tsx
import { renderAppHook } from '@equinor/fusion-framework-vitest-plugin-react-app';
import { useAccessToken } from '@equinor/fusion-framework-react-app/msal';

test('resolves an access token', async () => {
  const { result } = await renderAppHook(() => useAccessToken({ scopes: ['User.Read'] }));
  await vi.waitFor(() => expect(result.current.pending).toBe(false));
  expect(result.current.token).toBeDefined();
});
```

Pass `configure` to reach a module's mock builder before the hook renders:

```tsx
test('reads the configured account', async () => {
  const { result } = await renderAppHook(() => useCurrentAccount(), {
    configure: (configurator) => configurator.msal.setAccount({ name: 'Ada Lovelace' }),
  });
  expect(result.current).toMatchObject({ name: 'Ada Lovelace' });
});
```

Reuse a pre-built `fusion` across multiple render calls, or to pre-configure parent-level modules
(`http`, `context`, `serviceDiscovery`):

```tsx
import { mockFramework } from '@equinor/fusion-framework/mock';
import { enableAppManifestMock } from '@equinor/fusion-framework-app/mock';

const env = { manifest: { appKey: 'test-app', displayName: 'Test App', description: '', type: 'standalone' as const } };

test('shares one fusion instance across two renders', async () => {
  const fusion = await mockFramework<[AppModule]>((configurator) => enableAppManifestMock(configurator, env));

  const { result: a } = await renderAppHook(() => useAccessToken({ scopes: ['User.Read'] }), { fusion });
  const { result: b } = await renderAppHook(() => useCurrentAccount(), { fusion });
});
```

## `renderAppComponent`

Same options shape as `renderAppHook` (`configure`, `env`, `fusion`), plus any
`vitest-browser-react` `render` option. The result carries the usual return values (`getByText`,
`container`, `unmount`) plus a **nested** `fusion` (not spread) — `fusion.app` is the same
instance the rendered component reads through `useAppModule`/`useAppModules`; `fusion.framework`
is the parent instance. Drive a module directly through `fusion.app` to exercise a state change
after the initial render:

```tsx
import { enableContextMock } from '@equinor/fusion-framework-module-context/mock';
import { act } from 'react';
import { renderAppComponent } from '@equinor/fusion-framework-vitest-plugin-react-app';

test('reacts when the current context switches', async () => {
  const { getByText, fusion } = await renderAppComponent<[ContextModule]>(<App />, {
    configure: (configurator) => enableContextMock(configurator, (mock) => mock.setCurrentContext(projectA)),
  });

  await act(() => fusion.app.context.setCurrentContextByIdAsync(projectB.id));
  await expect.element(getByText(/project-b/)).toBeVisible();
});
```

Loading/error-state example:

```tsx
test('mounts the child app once its script loads', async () => {
  const manifest: AppManifest = { appKey: 'child-app', displayName: 'Child App', description: '', type: 'standalone', build: { version: '1.0.0', entryPoint: 'child-script.ts', assetPath: '' } };
  const fusion = await mockFramework<[AppModule]>((configurator) => enableAppManifestMock(configurator, { manifest }));

  const { container } = await renderAppComponent(<Apploader appKey="child-app" />, { fusion });

  // the loading state renders synchronously, before the script's dynamic import resolves
  expect(container.textContent).toContain('Loading child-app');
  await vi.waitFor(() => expect(container.textContent).toContain('mounted: child-app'));
});
```

## `testApp`

`vitest`'s `test`, extended with an application module scope fixture: `appEnv`/`configureApp`
become suite-level concerns overridden once per file (or per `describe`) with
`testApp.extend(...)`, instead of an options object repeated on every call. `fusion`/`app` resolve
lazily — a test that only destructures `app` never pays for rendering.

```tsx
import { testApp } from '@equinor/fusion-framework-vitest-plugin-react-app';

testApp('resolves current context', async ({ app, render }) => {
  const screen = await render(<App />);
  expect(app.context).toBeDefined();
});
```

Seed a module for every test in a suite:

```tsx
describe('with a seeded context module', () => {
  const test = testApp.extend(
    'configureApp',
    { injected: true },
    (): AppMockConfigureFn => (configurator) => enableContextMock(configurator, (mock) => mock.setCurrentContext(projectA)),
  );

  test('starts on the seeded context', async ({ render }) => {
    const screen = await render(<App />);
    await expect.element(screen.getByText(projectA.title)).toBeVisible();
  });
});
```

## Extend app configuration (`/test`'s `configureApp`)

Extend `test` from `/test` (not `testApp`) when several cases need the same deterministic
modules: `testApp`'s `configureApp` defaults to `undefined` (no Vite dependency, so no way to load
the real `src/config.ts` as live code), while `/test`'s `test` seeds it with the app's real
`configure` export via `appTestVitePlugin`'s virtual modules.

```tsx
import { enableContextMock } from '@equinor/fusion-framework-module-context/mock';
import { test as baseTest } from '@equinor/fusion-framework-vitest-plugin-react-app/test';

export const test = baseTest.extend('configureApp', ({ configureApp }) => (configurator, args) => {
  configureApp?.(configurator, args); // compose, don't replace, the app's real production config
  enableContextMock(configurator, (mock) => mock.setCurrentContext(project));
});
```

`.extend(...)` returns a new, separately exported `test` — reach for it when several test **files**
need the same fixture default. Within one file, prefer `test.override(...)`: it replaces a fixture
in place, so every test in that file keeps importing the same `test`.

## Fake an endpoint URL with `mergeEnvConfig`

`appEnv.config` is an `AppConfig` instance whose `environment`/`endpoints` live behind private
fields — `{ ...appEnv.config, endpoints: {...} }` silently drops everything. Use `mergeEnvConfig`
to fake one endpoint's URL while keeping every other endpoint and environment variable intact:

```tsx
import { mergeEnvConfig, test as baseTest } from '@equinor/fusion-framework-vitest-plugin-react-app/test';

export const test = baseTest.extend('appEnv', ({ appEnv }) =>
  mergeEnvConfig(appEnv, { endpoints: { 'cpr-api': { url: backendBaseUrl } } }),
);
```

## Override a fixture for one test or `describe` block

`test.override('name', ...)` replaces a fixture's resolved value without creating a new `test`
export. Called at the top of a `describe` block, it applies only inside that block and does not
leak to siblings; called at the top of a file, it applies to every test in that file.

`configureApp`'s default value (from `/test`) **is** the app's real `src/config.ts` `configure`
export — an override that doesn't call the real `configure(configurator, args)` itself skips the
app's production module setup entirely rather than composing with it:

```tsx
import { test } from '@equinor/fusion-framework-vitest-plugin-react-app/test';
import { enableContextMock } from '@equinor/fusion-framework-module-context/mock';
import { describe } from 'vitest';
import { configure } from '../config'; // the app's own, real module configurator

describe('with an initial project', () => {
  test.override('configureApp', { injected: true }, () => (configurator, args) => {
    configure(configurator, args); // compose the app's real configure, same as `.extend`
    enableContextMock(configurator, (mock) => mock.setCurrentContext(project));
  });

  test('displays the initial context the app resolves on startup', async ({ render }) => {
    const { getByText } = await render(<App />);
    await expect.element(getByText(/project-a/)).toBeInTheDocument();
  });
});
```

`fusion` itself can be overridden the same way, for a differently configured parent framework:

```tsx
test.override('fusion', async ({ appEnv }) =>
  mockFramework<[AppModule, ContextModule]>((configurator) => {
    enableAppManifestMock(configurator, appEnv);
    enableContextMock(configurator, (mock) => mock.setCurrentContext(project));
  }),
);
```

`{ injected: true }` matches the fixture's original declaration; keeping it consistent avoids
re-deriving whether the base fixture accepts a config-injected value.

## Extend the parent framework mock with `configureFusion`

`fusion` (built by `resolveFusion`) always carries a mocked `app` module and a `navigation` module
with in-memory history (so tests don't leak URL/history state), and mocks `featureFlag` with no
flags enabled — but only when `@equinor/fusion-framework-module-feature-flag` (an optional peer
dependency) is actually installed. `configureFusion` runs on the same configurator afterwards, so
a test can add framework-level modules or override that setup without reimplementing it:

```tsx
import { enableFeatureFlagMock } from '@equinor/fusion-framework-module-feature-flag/mock';

const test = baseTest.extend('configureFusion', { injected: true }, () => (configurator) => {
  enableFeatureFlagMock(configurator, (mock) => mock.addFeature({ key: 'new-search', enabled: true }));
  configurator.serviceDiscovery.addServices([{ key: 'people', uri: baseUrl('people') }]);
});
```

This is a **framework-scope** module set, distinct from the app-scope one `configureApp` seeds —
overriding history through `configureFusion` affects framework-scope consumers
(`useFramework<[NavigationModule]>().modules.navigation`, `useBookmarkNavigate`), not a rendered
app's own router (which registers its own `navigation` module inside its own `config.ts`).

> [!IMPORTANT]
> `.override('fusion', ...)` bypasses `configureFusion` entirely — it replaces the resolver that
> calls it, so a `configureFusion` override on the same test/suite is silently never called. Reach
> for `configureFusion` to extend the base mock; reach for `fusion` only to replace it outright.

## Test routes and app lifecycle

Render the complete `App` when assertions depend on route loaders, navigation, app configuration,
or several modules working together. Set the initial browser URL before rendering, interact
through visible controls or `app.navigation`, and assert the rendered result.

## Supply a custom parent framework

Override or explicitly pass `fusion` when the scenario depends on portal-level context, service
discovery, authentication, or app manifests. Build the parent with `mockFramework`
(`fusion-framework-mocking`), then initialize the app beneath it — this exercises
parent-to-app propagation without a running portal. Use `enableAppManifestMock` when the custom
parent must serve the app's manifest and config.

## Runner-level advanced behavior

Fusion does not wrap these Vitest capabilities — use Vitest's own docs directly:

- [Browser interactions and assertions](https://vitest.dev/guide/browser/)
- [Asynchronous tests](https://vitest.dev/guide/learn/async)
- [Test projects](https://vitest.dev/guide/projects)
- [Coverage](https://vitest.dev/guide/coverage)
- [Debugging](https://vitest.dev/guide/debugging)

## Related

- `references/getting-started-and-configuration.md` — install, `defineProject`, layer choice
- `references/troubleshooting.md` — common failures, including fixture/override pitfalls
- `fusion-framework-mocking` skill — `mockFramework`, `enable*Mock`, HTTP/OpenAPI seeding details
