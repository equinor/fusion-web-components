---
name: fusion-framework-testing
description: 'Guides writing and running Vitest tests for Fusion Framework React apps with @equinor/fusion-framework-vitest-plugin-react-app — choosing a testing layer, configuring vitest.config.ts and Browser Mode, rendering with test/render/renderAppHook/renderAppComponent/testApp fixtures, and troubleshooting or migrating a suite. USE FOR: writing a new app/component/hook test, setting up vitest.config.ts for a Fusion app, choosing between app/framework/module/HTTP test layers, composing or overriding test fixtures, diagnosing a failing Fusion app test. DO NOT USE FOR: seeding module-specific mock state (auth, context, bookmarks, feature flags, HTTP) — use fusion-framework-mocking; dev-server-time API mocking/proxying (use fusion-developer-app); non-Fusion test suites; backend/service-repo tests.'
license: MIT
compatibility: Requires a Fusion Framework React app. Rendering helpers need vitest, playwright, @vitest/browser-playwright, vitest-browser-react, and @equinor/fusion-framework-vitest-plugin-react-app as dev dependencies, plus `playwright install chromium`. React, React DOM, RxJS, and Vite are peer dependencies a Fusion app normally already provides.
metadata:
  version: "0.1.0"
  status: experimental
  owner: "@equinor/fusion-core"
  skills:
    - fusion-framework-mocking
  tags:
    - fusion-framework
    - testing
    - vitest
    - react
    - browser-mode
  mcp:
    suggested:
      - fusion
---

# Fusion Framework Testing

## When to use

Use when writing or running a Vitest test for a Fusion Framework React app — a hook, component,
route, or complete app — or when setting up/troubleshooting the test project itself.

Typical triggers:
- "Write a test for this component / hook / route"
- "Set up `vitest.config.ts` for this app"
- "Why does this test hang / hit the network / fail to resolve the app?"
- "Should this be a hook test or a component test?"
- "Share seeded fixtures across a test file"
- "Migrate this suite off Testing Library / jsdom"

Implicit triggers:
- A test file imports `@equinor/fusion-framework-vitest-plugin-react-app` (or its `/test`,
  `/config` sub-paths)
- `vitest.config.ts` needs Browser Mode, Playwright, or app-file resolution configured
- A test renders a component/hook that reads `useAppModule`, `useFramework`, or similar

## When not to use

- **Seeding module-specific state** (a signed-in user, current context, feature flags, HTTP
  responses) — use `fusion-framework-mocking`; this skill only covers rendering/running the test
- **`dev-server.config.ts` API mocking/proxying** for local `ffc app dev` — dev-time only, see
  `fusion-developer-app`
- Non-Fusion test suites, or backend/service-repo tests

## Required inputs

### Mandatory
- What is under test: pure function, hook, component, route, or complete app
- Whether the project already has `vitest.config.ts` configured for this package

### Conditional
- Whether the test needs a specific signed-in user, seeded context, or faked HTTP response (then
  hand off to `fusion-framework-mocking` for the seeding details)
- Whether several test files need the same fixture defaults

## Instructions

### Step 1 — Choose the smallest layer for the behavior under test

Fusion test utilities substitute external boundaries only; Vitest still owns the runner,
assertions, lifecycle hooks, spies, timers, and coverage.

| Testing intent | Start with | Import |
| --- | --- | --- |
| Pure function or framework-independent hook | Standard Vitest | `vitest` |
| React hook that consumes app modules | `renderAppHook` | `@equinor/fusion-framework-vitest-plugin-react-app` |
| React component, route, or complete app | `test`/`render` fixture | `@equinor/fusion-framework-vitest-plugin-react-app/test` |
| Reusable app fixture without automatic app-file resolution | `testApp` | `@equinor/fusion-framework-vitest-plugin-react-app` |
| App module configuration without React | `mockAppModules` | see `fusion-framework-mocking` |
| Parent framework or portal-level modules | `mockFramework` | see `fusion-framework-mocking` |
| One method call, timer, global, or JS module | Vitest's `vi` APIs | `vitest` |

A component test should not recreate a portal; an app-lifecycle test should not replace every
Fusion hook with a JavaScript module mock. See `references/getting-started-and-configuration.md`
for the full layer-choosing table including module/HTTP layers.

### Step 2 — Install and configure

```sh
pnpm add -D vitest playwright @vitest/browser-playwright vitest-browser-react \
  @equinor/fusion-framework-vitest-plugin-react-app
pnpm exec playwright install chromium
```

```ts
// vitest.config.ts
import { defineProject } from '@equinor/fusion-framework-vitest-plugin-react-app/config';

export default defineProject();
```

`defineProject` registers `appTestVitePlugin`, headless Chromium via Playwright, test-file
inclusion (`src/**/*.{test,spec}.{ts,tsx}`), and lazy-import warmup. See
`references/getting-started-and-configuration.md` to merge overrides, replace defaults, or
resolve non-standard app files.

### Step 3 — Write the first test

```tsx
import { expect } from 'vitest';
import { test } from '@equinor/fusion-framework-vitest-plugin-react-app/test';
import { App } from './App';

test('renders the app', async ({ render }) => {
  const screen = await render(<App />);
  await expect.element(screen.getByRole('heading')).toBeVisible();
});
```

Always `await` every Fusion render/hook helper (`render`, `renderHook`, `renderAppComponent`,
`renderAppHook`) — module initialization completes before the first render.

### Step 4 — Compose fixtures for reuse (when several tests share seeded state)

Extend `test` (from `/test`) to seed shared state, or use `test.override(...)` for one file/suite
without creating a new export. See `references/fixtures-and-advanced-usage.md` for
`configureApp`/`configureFusion`/`mergeEnvConfig`, extend-vs-override, and route/app-lifecycle
tests.

### Step 5 — Diagnose failures

Consult `references/troubleshooting.md`'s symptom table before guessing — most failures trace to
an un-awaited render helper, a missing `appTestVitePlugin` registration, or an HTTP request with
no answering middleware.

### Step 6 — Choose Browser Mode or an alternative renderer (only if warranted)

Browser Mode (headless Chromium via Playwright) is the default for fidelity, not speed. Only move
to `happy-dom`/jsdom for a component/hook provably independent of real browser behavior — see
`references/browser-mode-and-migration.md` for the tradeoff and the `happy-dom` wiring.

### Step 7 — Migrate an existing suite (when applicable)

See `references/browser-mode-and-migration.md` for moving an existing
`@testing-library/react`/jsdom suite onto this package.

## Expected output

- A test file using the smallest layer that exercises the behavior under test
- `vitest.config.ts` correctly registering `appTestVitePlugin` (directly or via `defineProject`)
- Every Fusion render/hook helper awaited
- Fixture composition (`extend`/`override`) used only when reuse across cases/files justifies it
- Module-specific mock seeding delegated to `fusion-framework-mocking`

## Safety & constraints

Never:
- Claim a rendered result is correct without awaiting the render/hook helper first
- Replace a DOM-emulation gap with an untested polyfill or component swap and call the test passing
- Assume an unmatched HTTP request stays offline — an unmatched request reaches the real network
- Invent Vitest/Playwright configuration options not documented in this skill's references

Always:
- Prefer `@equinor/fusion-framework-vitest-plugin-react-app/test`'s `test`/`render` for the normal
  application path; drop to `renderAppHook`/`renderAppComponent`/`testApp` only when the test must
  supply `env`/`configure`/`fusion` explicitly
- Keep `server.warmup.clientFiles` aligned with `test.include` when test files move
- Cite the real export/API used rather than inventing a Fusion-specific test helper
