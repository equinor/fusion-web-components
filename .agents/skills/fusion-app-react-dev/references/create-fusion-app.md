# Create a Fusion App

How Fusion Framework apps are bootstrapped and configured at the entry-point level.

## File structure

Every Fusion app has these top-level configuration files:

```
src/index.ts      → renderApp() — mounts the app into the Fusion Portal
src/config.ts     → AppModuleInitiator — configures Fusion modules before render
src/App.tsx       → Root React component
app.config.ts     → Runtime config (endpoints, environment)
app.manifest.ts   → Portal metadata (appKey, displayName)
```

## Entry point (`src/index.ts`)

The modern pattern uses the `renderApp` helper:

```typescript
import { renderApp } from '@equinor/fusion-framework-react-app';
import { App } from './App';
import { configure } from './config';

export const render = renderApp(App, configure);
export default render;
```

Older codebases may use the lower-level `makeComponent` + `createRoot` pattern. Check the project's existing `index.ts` and follow its convention.

## Module configuration (`src/config.ts`)

```typescript
import type { AppModuleInitiator } from '@equinor/fusion-framework-react-app';

export const configure: AppModuleInitiator = (configurator, { env }) => {
  // Module configuration is added here as features are built
};

export default configure;
```

See `configure-services.md` for HTTP client setup and `using-framework-modules.md` for other modules.

## App manifest (`app.manifest.ts`)

Defines metadata used by the Fusion Portal to identify and display the application:

```typescript
import { defineAppManifest } from '@equinor/fusion-framework-cli/app';

export default defineAppManifest(async (_env, { base }) => ({
  ...base,
  appKey: 'my-app',
  displayName: 'My Application',
}));
```

## Runtime config (`app.config.ts`)

Supplies environment variables and API endpoint definitions resolved at dev-server startup or build time:

```typescript
import { defineAppConfig } from '@equinor/fusion-framework-cli/app';

export default defineAppConfig((_env, _args) => ({
  environment: {},
  endpoints: {},
}));
```

See `configure-services.md` for adding endpoints.

## CLI commands

The Fusion Framework CLI (`@equinor/fusion-framework-cli`) handles development and builds:

| Command | Purpose |
|---|---|
| `fusion-framework-cli app dev` | Start dev server with HMR |
| `fusion-framework-cli app build` | Production build |
| `fusion-framework-cli app pack` | Bundle into a zip archive |
| `fusion-framework-cli app publish` | Upload to Fusion app service |
| `fusion-framework-cli app create <name>` | Scaffold a new app from template |

Projects typically alias these in `package.json` scripts (e.g. `dev`, `build`). Check the project's `package.json` for the exact commands available.
