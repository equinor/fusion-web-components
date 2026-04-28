---
name: fusion-developer-portal
description: 'Guides development of Fusion portal shells — scaffolding, module configuration, app loading, routing, header/context integration, analytics, and deployment using the Fusion Framework CLI portal commands. USE FOR: create portal, scaffold portal, configure portal modules, portal app loading, portal routing, portal header, context selector, portal analytics, portal telemetry, portal manifest, ffc portal dev, portal deployment, embed apps in portal. DO NOT USE FOR: app-level feature development (use fusion-app-react-dev), backend service changes, Fusion Help Center integration, skill authoring.'
license: MIT
compatibility: Requires @equinor/fusion-framework-cli for portal scaffolding and dev server. Requires @equinor/fusion-framework and @equinor/fusion-framework-react for portal runtime.
metadata:
  version: "0.0.1"
  status: active
  owner: "@equinor/fusion-core"
  skills:
    - fusion-research
    - fusion-code-conventions
  tags:
    - fusion-portal
    - portal-development
    - app-loader
    - portal-shell
    - micro-frontend
    - fusion-framework-cli
    - portal-manifest
    - context-selector
    - portal-routing
  mcp:
    suggested:
      - fusion
---

# Fusion Developer Portal

Guide development of Fusion portal shells — the host applications that load, route, and render Fusion apps inside a shared chrome (header, context selector, navigation).

## When to use

- User wants to scaffold a new Fusion portal
- User asks about `portal.manifest.ts` or `ffc portal dev`
- User wants to configure portal-level framework modules (telemetry, analytics, navigation, services, app module)
- User wants to build a custom app loader or portal shell
- User wants to add portal-level routing (`/apps/:appKey/*`)
- User asks about the `Apploader` component or `useApploader` hook for embedding apps
- User wants to wire up a portal header, context selector, or bookmark side sheet
- User asks how portals load and initialize Fusion apps at runtime
- User wants to add portal-level analytics or telemetry
- User asks about portal deployment (`ffc portal build`, `ffc portal upload`)

## When not to use

- App-level feature development inside a Fusion app → use `fusion-app-react-dev`
- Backend service changes → separate repository
- Fusion Help Center integration → use `fusion-help-integration`
- Skill authoring → use `fusion-skill-authoring`
- Issue authoring → use `fusion-issue-authoring`

## Required inputs

### Mandatory

- What to build: scaffold a portal, add a portal feature, configure a module, or understand portal architecture
- Portal context: new portal from scratch, or modifying an existing one

### Conditional

- Portal name/ID when scaffolding
- MSAL client ID and service discovery URL when configuring auth
- Specific modules to enable (analytics, telemetry, bookmarks, feature flags, AG Grid)
- Whether the portal needs a custom app loader or the default `Apploader` suffices

## Instructions

### Step 1 — Classify the portal task

Determine what the user needs:

- **Scaffold a new portal** → go to step 2
- **Configure portal modules** → go to step 3
- **App loading and routing** → go to step 4
- **Portal chrome (header, context, bookmarks)** → go to step 5
- **Analytics and telemetry** → go to step 6
- **Build and deploy** → go to step 7

When Fusion MCP is available, prefer `mcp_fusion_search_framework` with queries like `"portal manifest definePortalManifest ffc portal"` or `"createFrameworkProvider PortalModuleInitiator portal configure"` to retrieve the latest API surface. Label any guidance not confirmed by MCP as fallback.

### Step 2 — Scaffold a new portal

Use the Fusion Framework CLI:

```sh
mkdir my-fusion-portal && cd my-fusion-portal
pnpm init
pnpm add -D @equinor/fusion-framework-cli
```

Create the required files:

- **`portal.manifest.ts`** — portal metadata and configuration:

```typescript
import { definePortalManifest } from '@equinor/fusion-framework-cli/portal';

export default definePortalManifest((env, { base }) => ({
  name: 'my-portal',
  version: '1.0.0',
  entry: './src/index.tsx',
}));
```

- **`portal.schema.ts`** (optional) — configuration validation schema
- **`src/index.tsx`** — portal entry point (see [references/portal-architecture.md](references/portal-architecture.md))

Start the dev server:

```sh
pnpm fusion-framework-cli portal dev
# or: ffc portal dev
```

### Step 3 — Configure portal modules

Portal-level configuration uses `FrameworkConfigurator` (not `AppModuleInitiator` like apps). Enable modules in your configure callback:

```typescript
import type { FrameworkConfigurator } from '@equinor/fusion-framework';
import { enableAppModule } from '@equinor/fusion-framework-module-app';
import { enableNavigation } from '@equinor/fusion-framework-module-navigation';
import { enableAnalytics } from '@equinor/fusion-framework-module-analytics';

const configure = (configurator: FrameworkConfigurator) => {
  enableAppModule(configurator);
  enableNavigation(configurator, '/');
  enableAnalytics(configurator, { /* ... */ });
};
```

Key difference from app configuration: the portal configures `FrameworkConfigurator` and its modules are hoisted to all child apps. MSAL/auth is configured at the portal level and inherited by apps.

See [references/portal-architecture.md](references/portal-architecture.md) for the full module configuration pattern and the `portal-analytics` cookbook reference.

### Step 4 — App loading and routing

The portal routes `/apps/:appKey/*` to an app loader. Two approaches:

**Simple embed** — use the built-in `Apploader` component:

```tsx
import { Apploader } from '@equinor/fusion-framework-react-app/apploader';

<Apploader appKey="my-app" />
```

> **Warning**: `Apploader` is an experimental POC. Embedded apps may have routing and context issues. Best for simple apps like PowerBI or PowerApps views.

**Custom app loader** — for full control over loading states, error handling, and mounting. Use `useFramework<[AppModule]>()`, observe `fusion.modules.app.current$`, and call `app.initialize()`. See [references/portal-architecture.md](references/portal-architecture.md) for the annotated custom AppLoader pattern.

Portal routing typically uses `react-router-dom` via the navigation module:

```tsx
const Router = () => {
  const framework = useFramework();
  const router = framework.modules.navigation.router;
  return <RouterProvider router={router} />;
};
```

### Step 5 — Portal chrome

Portal-level UI typically includes:

- **Header** — top bar with Fusion logo, context selector, bookmarks, person settings
- **Context selector** — wired to the current app's context module via `useCurrentContext` or `useContextSelector`
- **Bookmark side sheet** — toggle via the navigation module
- **App navigation** — sidebar or top-level nav for switching between hosted apps

These components are portal-specific. Apps do not build their own header — they receive it from the portal shell.

### Step 6 — Analytics and telemetry

Portal-level analytics capture app lifecycle events. Enable with adapters and collectors:

```typescript
import { enableAnalytics } from '@equinor/fusion-framework-module-analytics';
import { ConsoleAnalyticsAdapter } from '@equinor/fusion-framework-module-analytics/adapters';
import { AppLoadedCollector, AppSelectedCollector } from '@equinor/fusion-framework-module-analytics/collectors';

enableAnalytics(configurator, (builder) => {
  builder.addAdapter(new ConsoleAnalyticsAdapter());
  builder.addCollector(new AppLoadedCollector());
  builder.addCollector(new AppSelectedCollector());
});
```

For telemetry (OpenTelemetry / Application Insights), see [references/portal-architecture.md](references/portal-architecture.md).

### Step 7 — Build and deploy

```sh
# Build the portal template
ffc portal build

# Upload to the Fusion portal service (authenticate via `az login` or FUSION_TOKEN env var)
ffc portal upload --portal-id <id>

# Tag a specific version
ffc portal tag --portal-id <id> --tag latest --version <version>
```

> **Never paste tokens directly into commands.** Use `az login` for interactive auth or set the `FUSION_TOKEN` environment variable for CI pipelines.

### Step 8 — Validate

1. `ffc portal dev` starts without errors
2. Apps load correctly at `/apps/:appKey`
3. Context selector and header render properly
4. TypeScript compiles with no errors
5. Analytics events fire on app load/select (if enabled)

## Expected output

- Working portal shell with app loading, routing, and chrome
- Portal-level module configuration with correct `FrameworkConfigurator` usage
- Loading and error states handled for app initialization
- Brief summary of what was created or changed

## Helper agents

This skill uses the same companion infrastructure as `fusion-app-react-dev`:

- **`fusion-research`** — for source-backed Fusion ecosystem research when portal behavior is uncertain
- **`fusion-code-conventions`** — for naming, TSDoc, and code style checks

When Fusion MCP is available, prefer `mcp_fusion_search_framework` for portal-specific lookups.

## Safety & constraints

- **MSAL is portal-level** — never configure auth in individual apps; it is hoisted from the portal
- **Do not invent portal APIs** — only reference APIs confirmed by MCP or documented in references
- **`Apploader` is experimental** — always mention routing/context limitations when advising on app embedding
- **No secrets in source** — MSAL client IDs must come from environment variables, not hardcoded
- **Do not modify the production Fusion portal** — this skill covers custom portal development only
- **Conventional commits** for all changes
