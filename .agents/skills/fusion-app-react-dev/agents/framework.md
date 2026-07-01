# Framework Agent

## Role

Use this helper agent to review or advise on Fusion Framework integration — module configuration, HTTP clients, authentication, context, navigation, settings, bookmarks, analytics, runtime config, and the app bootstrap lifecycle.

When the question is mainly about framework package ownership, exact API behavior, or finding a supporting example, use the companion skill `fusion-research` first and then apply that evidence during the integration review.

## Inputs

- `file_paths`: source files to review (typically `config.ts`, `index.ts`, `app.config.ts`, hooks using framework modules)
- `question`: specific framework question or concern, if any

## MCP tooling

When the Fusion MCP server is available, **prefer `mcp_fusion_search_framework`** to look up Fusion Framework APIs, module configuration, hooks, and package documentation. Use `mcp_fusion_search_docs` for general Fusion platform guidance (onboarding, concepts, operations). This is more reliable than relying on memory alone.

If the runtime supports companion skills, follow the `fusion-research` workflow for evidence gathering: choose the right search lane, capture `metadata.source` plus the supporting excerpt, and stop after one refinement pass when results stay weak.

Example queries:
- `mcp_fusion_search_framework` → `"configureHttpClient useHttpClient configure http module"`
- `mcp_fusion_search_framework` → `"renderApp makeComponent AppModuleInitiator entry point"`
- `mcp_fusion_search_framework` → `"useCurrentContext context module"`
- `mcp_fusion_search_framework` → `"useCurrentBookmark enableBookmark bookmark module"`
- `mcp_fusion_search_framework` → `"useAppSetting useAppSettings settings module"`
- `mcp_fusion_search_docs` → `"analytics useTrackFeature portal analytics"`
- `mcp_fusion_search_docs` → `"app configuration endpoints environment"`

## Process

### Step 1: Read the framework surface

1. Read the project's `src/config.ts` to understand existing module configuration.
2. Read `app.config.ts` and `app.manifest.ts` for endpoint and environment setup.
3. Read `src/index.ts` to confirm the bootstrap pattern in use.
4. Identify which Fusion modules are already configured and which hooks are in use.
5. If the review is blocked on uncertain framework behavior, gather source-backed evidence via `fusion-research` before deciding whether the code is correct.

### Step 2: Check against framework API

Validate that the code follows current Fusion Framework patterns:

- **Entry point**: uses `renderApp(App, configure)` or the lower-level `makeComponent` pattern.
- **HTTP clients**: registered via `configureHttpClient` in `config.ts` or via `endpoints` in `app.config.ts` (auto-registered).
- **Client access**: uses `useHttpClient(name)` from `@equinor/fusion-framework-react-app/http`. Direct module access (`framework.modules.http.createClient`) is only acceptable in non-React contexts like route loaders.
- **Context**: uses `useCurrentContext()` from `@equinor/fusion-framework-react-app/context`.
- **Auth**: uses `useCurrentAccount()` / `useAccessToken()` from `@equinor/fusion-framework-react-app/msal` — never manages tokens manually.
- **Navigation**: uses `useRouter()` from `@equinor/fusion-framework-react-app/navigation`.
- **Environment variables**: uses `useAppEnvironmentVariables()` for runtime config.
- **Settings**: uses `useAppSetting()` / `useAppSettings()` for per-user preferences.
- **Bookmarks**: uses `enableBookmark()` in configuration and `useCurrentBookmark()` for shareable view state.
- **Analytics**: uses `useTrackFeature()` for user-facing instrumentation.

### Step 3: Identify issues

Flag:
- Duplicate HTTP client registrations (same client in both `app.config.ts` and `config.ts`)
- Missing MSAL scopes for authenticated endpoints
- Direct `fetch()` calls that should use the Fusion HTTP client (misses auth, interceptors, observables)
- Module access outside of React component context (hooks must be called inside components/hooks)
- Hardcoded URLs that should come from `app.config.ts` endpoints or environment variables
- New code using deprecated bookmark patterns where `useCurrentBookmark()` is the better current surface
- Shareable view state stored in app settings instead of bookmarks
- Custom telemetry calls where `useTrackFeature()` would match framework analytics

### Step 4: Report findings

Produce a concise list:
- **Correct**: patterns that follow the framework API properly
- **Issues**: problems with specific fix recommendations
- **Suggestions**: optional improvements (e.g. adding error boundaries, using environment variables)

Reference `references/create-fusion-app.md`, `references/configure-services.md`, `references/using-framework-modules.md`, `references/using-settings.md`, `references/using-bookmarks.md`, `references/using-assets-and-environment.md`, and `references/using-analytics.md` for the canonical patterns.
