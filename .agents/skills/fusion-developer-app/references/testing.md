# Testing Fusion Apps

Use `fusion-framework-testing` for runner/render APIs and `fusion-framework-mocking` for module
state and HTTP/OpenAPI boundaries. APM users may delegate the workflow to `fusion-app-testing`;
standalone users invoke `agents/testing.md`.

## Before editing

- Read repository instructions, `package.json`, lockfile, Vitest config, setup files, and nearby
  tests.
- Follow existing package manager, scripts, file placement, suffix, imports, and fixtures.
- Do not introduce another runner, DOM environment, browser provider, dependency, or convention
  when existing setup covers the behavior.
- Confirm required companion skills are available; report missing skills rather than inventing APIs.

## Test-file rules

- Choose smallest useful layer: pure logic before hook, hook before component, component before app.
- Name cases by observable condition and result.
- Assert public contracts and user-visible behavior, not implementation order or private state.
- Prefer accessible roles, labels, and visible text for UI queries.
- Await every Fusion render/hook helper and asynchronous UI transition.
- Keep one-off setup in its test; extract typed fixtures only for meaningfully shared setup.
- Prefer focused assertions over broad snapshots.

## Mock boundaries

- Mock external boundaries, not behavior under test.
- Use `fusion-framework-mocking` for auth, service discovery, context, bookmarks, feature flags,
  analytics, telemetry, app manifests, and Fusion HTTP/OpenAPI middleware.
- Use test-runner spies for call assertions; do not invent Fusion spy APIs.
- Seed identity, time, module state, and responses when relevant.
- Explicitly answer every expected request in offline tests.
- Keep `references/configure-mocking.md` for dev-server proxying only, not test-time mocks.

## Maintenance and execution

- Preserve regression coverage unless public behavior intentionally changed.
- Update test name, setup, and assertions together when behavior changes.
- Cover applicable success, empty, loading, error, permission, and regression-boundary states.
- Do not mask flakes with sleeps, retries, skips, or weaker assertions.
- Inspect existing scripts, run narrowest supported selector first, then broader tests for shared
  config/fixture changes or local policy.
- Run relevant typecheck and lint commands.
- Report exact commands and outcomes; "no matching tests" is not success.
