# Create a Fusion App

Bootstrapping and configuring Fusion Framework apps at entry-point level.

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

Modern pattern:

```typescript
import { renderApp } from '@equinor/fusion-framework-react-app';
import { App } from './App';
import { configure } from './config';

export const render = renderApp(App, configure);
export default render;
```

Older codebases use `makeComponent` + `createRoot`. Check project's `index.ts` and follow its convention.

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

Metadata for Fusion Portal:

```typescript
import { defineAppManifest } from '@equinor/fusion-framework-cli/app';

export default defineAppManifest(async (_env, { base }) => ({
  ...base,
  appKey: 'my-app',
  displayName: 'My Application',
}));
```

## Runtime config (`app.config.ts`)

Environment variables and endpoints, resolved at dev-server startup or build time:

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
