# Changelog

## 0.1.0 - 2026-08-31

### minor

- [#221](https://github.com/equinor/fusion-skills/pull/221) [`df40bbc`](https://github.com/equinor/fusion-skills/commit/df40bbc28a8d9134ad433fe43d7110996e3e6143) - Add fusion-framework-mocking skill for test-time module and HTTP mocking in Fusion Framework apps


  Covers `mockFramework`/`FrameworkMockConfigurator`, `mockAppModules`/`enableAppManifestMock`, each module's own `/mock` entry point (MSAL, Node auth, service discovery, context, bookmarks, feature flags, analytics, telemetry), HTTP middleware mocking with `createRouterMiddleware`/`createOpenApiMockMiddleware`, `@equinor/fusion-openapi-mock`, and registering mocks for custom modules.

