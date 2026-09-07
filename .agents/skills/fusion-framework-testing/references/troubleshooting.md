# Troubleshooting

Use this guide when a Fusion app test fails before the assertion, loads real services, cannot
resolve the app, or behaves differently in Vitest Browser Mode.

## Common symptoms

| Symptom | Likely cause | Resolution |
| --- | --- | --- |
| Chromium executable is missing | Playwright installed without its browser binary | Run `pnpm exec playwright install chromium` |
| The `/test` import cannot resolve Fusion virtual modules | `appTestVitePlugin` is not registered in this Vitest project | Export `defineProject()` from `/config`, or register `appTestVitePlugin()` manually |
| `FileNotFoundError` names a manifest, config, or configurator | An explicit plugin path does not exist | Correct the path relative to the Vitest project root; explicit paths fail instead of falling back |
| The app's module configuration is not applied | No conventional `src/config.ts(x|js)` file was found | Pass `configure` to `appTestVitePlugin`, or override the `configure` fixture |
| A render result is a Promise, or assertions run before initialization | A Fusion render helper was not awaited | Await `render`, `renderHook`, `renderAppComponent`, or `renderAppHook` |
| A request reaches a live backend or fails with a network error | No HTTP middleware answered it | Add a matching `configurator.http.addMiddleware` (see `fusion-framework-mocking`); unmatched requests eventually reach the real network |
| A lazy route import reloads the browser during a test | Source warmup no longer covers the lazy module | Keep `server.warmup.clientFiles` aligned with application source/route locations |
| No tests are found | Tests are outside the default `src/**/*.{test,spec}.{ts,tsx}` pattern | Override `test.include` in `defineProject` |
| The app starts signed in unexpectedly | The MSAL mock defaults to `Test User` | Set `configurator.msal.setAccount(null)` before rendering |
| State configured in one test is missing in another | Framework and app fixtures are test-scoped | Seed the required state per test, or publish reusable fixture declarations with `test.extend` |
| `vi.spyOn` fails on an imported module in Browser Mode | Native ESM module namespace objects are sealed | Use `vi.mock('./module.js', { spy: true })` per Vitest Browser Mode docs |
| A `<Router>` route with a catch-all/parameterized `path` never renders; every query on it times out | The navigation module's current location does not match that path yet | Push the target location through the navigation module (`app.modules.navigation.push(path)`) before rendering, not after |
| A virtualized list/popover (e.g. an EDS `Autocomplete` built on `@tanstack/react-virtual`) never renders its rows | `window.ResizeObserver` was stubbed as a no-op in test setup | Remove the stub; real Chromium's `ResizeObserver` is required for virtualized layout to measure correctly |
| `test.each` runs but a fixture in its per-case callback is `undefined` | `test.each` does not forward `test.extend` fixture context to each case | Use Vitest's `test.for` instead, which does receive fixture context |

## Verify the project wiring

Start with the smallest configuration:

```ts
import { defineProject } from '@equinor/fusion-framework-vitest-plugin-react-app/config';

export default defineProject();
```

Then verify the fixture itself before testing application behavior:

```tsx
import { expect } from 'vitest';
import { test } from '@equinor/fusion-framework-vitest-plugin-react-app/test';

test('initializes a Fusion app scope', async ({ app, render }) => {
  expect(app.auth.account?.name).toBe('Test User');
  const screen = await render(<div>ready</div>);
  await expect.element(screen.getByText('ready')).toBeVisible();
});
```

If this test fails, fix project or app-file resolution before adding module-specific data.

## Keep tests offline

Fusion mocks replace known external boundaries, but an HTTP middleware is an ordered chain.
Returning `next(uri, init)` delegates to the next middleware and eventually `fetch`. A test that
must never use the network should register middleware for every expected request and fail
deliberately on unexpected requests.

Use `createOpenApiMockMiddleware` (`@equinor/fusion-framework-module-http/mock`) when an OpenAPI
document describes many routes — see `fusion-framework-mocking`. Use `vi.fn` around a middleware
when the test also needs call assertions.

## Related

- `references/getting-started-and-configuration.md` — install and configure from scratch
- `references/fixtures-and-advanced-usage.md` — fixture composition, common override mistakes
- [Vitest Browser Mode limitations](https://vitest.dev/guide/browser/#limitations)
- `fusion-framework-mocking` skill — HTTP middleware and module mock seeding details
