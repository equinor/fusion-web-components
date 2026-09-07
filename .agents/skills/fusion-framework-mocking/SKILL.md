---
name: fusion-framework-mocking
description: 'Guides seeding deterministic Fusion Framework module state in tests — mockFramework, mockAppModules, and module-owned enableXMock helpers (msal, service-discovery, context, bookmark, feature-flag, analytics, telemetry, http, app) — while keeping each module''s real configurator, provider, validation, and lifecycle. USE FOR: signing in a mock user, seeding context/bookmarks/feature-flags, faking HTTP/OpenAPI responses, choosing a mock boundary, adding a mock for a custom module. DO NOT USE FOR: configuring vitest.config.ts, rendering React components/hooks, or Vitest Browser Mode setup (use fusion-framework-testing); dev-server-time API mocking/proxying in dev-server.config.ts (use fusion-developer-app); backend/service-repo mocking.'
license: MIT
compatibility: Requires a Fusion Framework app or module graph consuming @equinor/fusion-framework packages. Each module's mock lives at its own `/mock` subpath (e.g. @equinor/fusion-framework-module-msal/mock) and has no test-runner dependency; assertions and call-spying are the test runner's job (Vitest's `vi`, `bun:test`'s `spyOn`, or Node's `t.mock.method`).
metadata:
  version: "0.1.0"
  status: experimental
  owner: "@equinor/fusion-core"
  skills:
    - fusion-framework-testing
  tags:
    - fusion-framework
    - mocking
    - testing
    - vitest
    - msal
    - http
    - openapi
  mcp:
    suggested:
      - fusion
---

# Fusion Framework Mocking

## When to use

Use when a test needs deterministic Fusion Framework module state — a signed-in user, a
current context, seeded feature flags/bookmarks, or faked HTTP responses — without a real
Entra ID tenant, service registry, or backend.

Typical triggers:
- "How do I mock `useAccessToken` / sign in a test user?"
- "Seed a current context for this test"
- "Fake this HTTP endpoint's response"
- "Mock service discovery so the app doesn't hit the network"
- "Add a mock for my own module"
- "Test signed-out / login / logout behavior"
- "Assert a middleware was called"

Implicit triggers:
- A test imports `mockFramework`, `mockAppModules`, or any `@equinor/fusion-framework-module-*/mock` entry point
- A test needs the app to boot without real credentials or a running backend
- Writing or reviewing a `*.mock.ts`/mock-configurator file for a Fusion module

## When not to use

- **Rendering a component/hook or configuring Vitest/Browser Mode** — use `fusion-framework-testing`
- **`dev-server.config.ts` API mocking/proxying for local `ffc app dev`** — that is dev-time only, unrelated to test-time module mocks; see `fusion-developer-app`
- **Asserting on one specific call** (arguments, call count, reset) — that is the test runner's job (`vi.spyOn`, `vi.fn`); this skill only covers seeding module state
- Backend/service-repo test doubles (different repo, different stack)

## Required inputs

### Mandatory
- Which boundary needs faking: auth, service discovery, context, bookmarks, feature flags, HTTP, analytics, telemetry, app manifest, or a custom module
- Test scope: parent framework (`mockFramework`), an app's own modules (`mockAppModules`), or a bespoke module graph (a module's own `enable*Mock`)

### Conditional
- Signed-in user details (name, username, specific token claims) when auth matters
- Whether the test must stay fully offline (every expected request needs an answering middleware)
- Whether an OpenAPI document already describes the API under test

## Instructions

### Step 1 — Understand the mocking design

Read `references/framework-and-app-mocks.md` for the design rules before writing a mock:

- Only the **client** (the object doing network I/O) is substituted. Providers, configurators,
  schema validation, and module `initialize` all run for real — a test still catches wiring
  mistakes.
- Mocks live beside the module they replace, at that module's own `/mock` entry point.
  `@equinor/fusion-framework/mock` only **composes** the built-in set; it contains no mock logic
  of its own.
- There is **no Fusion mocking API** for individual calls. Mock clients are plain classes with
  ordinary methods — use `vi.spyOn`, `bun:test`'s `spyOn`, or Node's `t.mock.method` directly.

### Step 2 — Pick the right layer

| Test scope | Use | Import |
| --- | --- | --- |
| Parent framework / portal-level modules together | `mockFramework` | `@equinor/fusion-framework/mock` |
| An app's own modules (no React) | `mockAppModules` | `@equinor/fusion-framework-app/mock` |
| One module in a bespoke module graph | that module's `enable*Mock` | `@equinor/fusion-framework-module-*/mock` |
| React hooks/components consuming app modules | render helpers (out of scope here) | see `fusion-framework-testing` |

```typescript
import { mockFramework } from '@equinor/fusion-framework/mock';

const fusion = await mockFramework((configurator) => {
  configurator.msal.setAccount({ name: 'Ada Lovelace' });
  configurator.context.setCurrentContext({ id: 'project-a', type: { id: 'ProjectMaster' }, value: {} });
  configurator.serviceDiscovery.addService({ key: 'catalog' });
});
```

`mockFramework` initializes every module `FrameworkConfigurator` declares (`event`, `auth`,
`http`, `serviceDiscovery`, `context`, `telemetry`) with zero configuration — a default signed-in
`Test User` and offline service resolution out of the box.

### Step 3 — Seed the module the test needs

Use `references/module-mocks.md` for the full per-module table (auth, service discovery, context,
bookmark, feature flag, analytics, telemetry, app manifest) with defaults, builder methods, and
signed-out/token-exact recipes.

### Step 4 — Fake HTTP responses

Use `references/http-and-openapi-mocks.md` to choose between a hand-written
`configurator.http.addMiddleware(...)`, `createRouterMiddleware` for several routes, or
`createOpenApiMockMiddleware` (backed by `@equinor/fusion-openapi-mock`) for a whole OpenAPI
document. An unmatched request always falls through to `next(uri, init)` and eventually the real
network — a fully offline test must answer every request it expects.

### Step 5 — Add a mock for a custom module (when needed)

Use `references/custom-module-mocks.md` when the module under test is not one of the built-ins —
covers the client seam (`setClient`), builder-owned configuration, and exposing a
`configurator.<yourModule>` accessor via `FrameworkMockConfigurator`'s `_pin`/`_getConfig`.

### Step 6 — Verify

- [ ] The mocked boundary is the **client only** — configurator/provider/validation are real
- [ ] Determinism: tokens and resolved services are identical across runs (no `Date.now()`-derived assertions without seeding)
- [ ] Every expected HTTP request has an answering middleware, or the test intentionally allows fallthrough
- [ ] Call-level assertions use the test runner's own spy tooling, not an invented Fusion API

## Expected output

- Test code that seeds Fusion module state through the correct `/mock` entry point
- A stated choice of layer (`mockFramework` / `mockAppModules` / module `enable*Mock`) and why
- HTTP faking strategy chosen (hand-written middleware, router, or OpenAPI) and its offline guarantees
- Any custom-module mock wiring, if applicable

## Safety & constraints

Never:
- Invent a Fusion-specific mocking API for individual call assertions — that is the test runner's job
- Treat an unsigned mock JWT (`createMockToken`/MSAL mock output) as valid outside a test
- Replace a module's provider or configurator wholesale when only its client needs faking
- Assume `setResolveUnknownServices(false)` is safe without declaring every service the framework itself resolves at start-up (e.g. `context`)

Always:
- Prefer the smallest mock boundary that still exercises the behavior under test
- Cite the real package/export used (e.g. `enableContextMock` from `@equinor/fusion-framework-module-context/mock`) rather than inventing one
- Note when a test intentionally allows network fallthrough vs. when it must stay fully offline
