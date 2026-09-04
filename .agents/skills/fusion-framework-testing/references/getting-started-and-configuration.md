# Getting started and configuration

## Choose the subject

| Subject | Start with | What the test proves |
| --- | --- | --- |
| Pure function or framework-independent hook | Standard Vitest | Local behavior without a Fusion runtime |
| Hook that consumes Fusion app modules | `renderAppHook` | Hook behavior inside an initialized app scope |
| Component that consumes Fusion app modules | `/test` `render` fixture or `renderAppComponent` | Rendered behavior with real providers |
| Route or complete application | `/test` `test` and `render` | App configuration, navigation, loaders, and module lifecycle together |
| Framework or module integration without React | Package `/mock` entry points | Production provider behavior with external boundaries substituted (see `fusion-framework-mocking`) |

Prefer the smallest layer containing the behavior under assertion. A component test should not
recreate a portal, while an app-lifecycle test should not replace every Fusion hook with a
JavaScript module mock.

## Choose the testing layer in full

| Testing intent | Start with | Import |
| --- | --- | --- |
| Pure function or framework-independent hook | Standard Vitest | `vitest` |
| React hook that consumes app modules | `renderAppHook` | `@equinor/fusion-framework-vitest-plugin-react-app` |
| React component, route, or complete Fusion app | Extended `test` and `render` fixture | `@equinor/fusion-framework-vitest-plugin-react-app/test` |
| Reusable app fixture without automatic app-file resolution | `testApp` | `@equinor/fusion-framework-vitest-plugin-react-app` |
| Application module configuration without React | `mockAppModules` | `@equinor/fusion-framework-app/mock` |
| Parent framework or portal-level modules | `mockFramework` | `@equinor/fusion-framework/mock` |
| One module in a bespoke module graph | That module's `enable*Mock` helper | `@equinor/fusion-framework-module-*/mock` |
| Named HTTP clients and a few deterministic responses | `configurator.http.addMiddleware` | Real HTTP configurator |
| Many HTTP operations described by OpenAPI | `createOpenApiMockMiddleware` | `@equinor/fusion-framework-module-http/mock` |
| One method call, timer, global, or JavaScript module | Vitest's `vi` APIs | `vitest` |

The last six rows are module/mock-seeding concerns — see `fusion-framework-mocking` for their
defaults, builder methods, and recipes.

## Install

```sh
pnpm add -D vitest playwright @vitest/browser-playwright vitest-browser-react \
  @equinor/fusion-framework-vitest-plugin-react-app
pnpm exec playwright install chromium
```

React, React DOM, RxJS, and Vite are peer dependencies a Fusion React app normally already
provides.

## Entry points

- **`@equinor/fusion-framework-vitest-plugin-react-app`** — `appTestVitePlugin`,
  `renderAppComponent`, `renderAppHook`, `testApp`. No app-specific resolution; pass
  `env`/`configure` yourself.
- **`@equinor/fusion-framework-vitest-plugin-react-app/test`** — `test`, `render`. Require
  `appTestVitePlugin` registered in `vitest.config.ts`; `appEnv`/`configureApp` resolve
  automatically from the application's own manifest, config, and module configurator.
- **`@equinor/fusion-framework-vitest-plugin-react-app/config`** — `defineProject`. Registers
  `appTestVitePlugin`, headless Playwright/Chromium, test-file inclusion, and lazy-import warmup
  while accepting ordinary Vitest configuration overrides.

## Write the first app test

```tsx
import { expect } from 'vitest';
import { test } from '@equinor/fusion-framework-vitest-plugin-react-app/test';
import { App } from './App';

test('renders the app', async ({ render }) => {
  const screen = await render(<App />);
  await expect.element(screen.getByRole('heading')).toBeVisible();
});
```

Or the equivalent in a plain `describe`/`it` file:

```tsx
import { describe, expect, it } from 'vitest';
import { render } from '@equinor/fusion-framework-vitest-plugin-react-app/test';
import { App } from './App';

describe('App', () => {
  it('renders the app', async () => {
    const { getByRole } = await render(<App />);
    await expect.element(getByRole('heading')).toBeVisible();
  });
});
```

Always await `render`, `renderHook`, `renderAppComponent`, and `renderAppHook` — Fusion module
initialization completes before the first render.

## Run

```sh
pnpm exec vitest       # watches for changes
pnpm exec vitest run   # one run, for CI
```

A successful run needs no portal, credentials, or backend service.

## `defineProject` defaults

```ts
import { defineProject } from '@equinor/fusion-framework-vitest-plugin-react-app/config';

export default defineProject();
```

Registers `appTestVitePlugin()` and configures:

- test files under `src/**/*.{test,spec}.{ts,tsx}`
- Vitest Browser Mode enabled, Playwright provider, one Chromium instance, headless
- a `1024x768` default viewport (a typical low-resolution Citrix session, not Vitest's own
  mobile-sized default)
- Vite warmup for `src/**/*.{ts,tsx}` to discover lazy imports before tests run

### Merge ordinary Vitest options

Pass an object to deep-merge it with the defaults through Vite's `mergeConfig`:

```ts
import { defineProject } from '@equinor/fusion-framework-vitest-plugin-react-app/config';
import { name, version } from './package.json' with { type: 'json' };

export default defineProject({
  test: {
    name: `${name}@${version}`,
    browser: { viewport: { width: 1920, height: 1080 } }, // opt into a wider viewport
  },
});
```

### Replace defaults deliberately

Pass a function only when a deep merge cannot express the change — its return value replaces the
defaults outright, so preserve every default the project still needs:

```ts
export default defineProject((defaults) => ({
  ...defaults,
  test: { ...defaults.test, include: ['tests/browser/**/*.test.tsx'] },
}));
```

When test files move outside `src`, update both `test.include` and
`server.warmup.clientFiles` if those tests load lazy application modules.

### Resolve non-standard app files

Use `appTestVitePlugin` directly when the app manifest, config, or module configurator does not
use Fusion's normal file conventions:

```ts
import { playwright } from '@vitest/browser-playwright';
import { appTestVitePlugin } from '@equinor/fusion-framework-vitest-plugin-react-app';
import { defineProject } from 'vitest/config';

export default defineProject({
  plugins: [
    appTestVitePlugin({
      manifest: './config/app.manifest.ts',
      config: './config/app.config.ts',
      configure: './config/modules.ts',
    }),
  ],
  test: {
    browser: { enabled: true, provider: playwright(), headless: true, instances: [{ browser: 'chromium' }] },
  },
  server: { warmup: { clientFiles: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'] } },
});
```

`entrypoint`, `manifest`, and `config` use the same resolution pipeline as `ffc app build`/
`ffc app dev`. `configure` must name a real source file — it is re-exported as live application
code into the test bundle, unlike `manifest`/`config` which are JSON-serialized data. An explicit
path that doesn't exist throws `FileNotFoundError`; convention-based lookups (default
`src/config.ts(x|js)`) fail silently and fall back to defaults instead.

## Related

- `references/fixtures-and-advanced-usage.md` — composing/overriding fixtures, route/app tests
- `references/troubleshooting.md` — common setup, browser, and network failures
- `references/browser-mode-and-migration.md` — Browser Mode tradeoffs and migrating a suite
- `fusion-framework-mocking` skill — seeding auth, context, bookmarks, feature flags, HTTP
