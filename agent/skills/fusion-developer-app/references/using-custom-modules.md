# Authoring Custom Fusion Framework Modules

Reusable cross-cutting modules: lifecycle, configuration, usage.

**Fusion docs**: [Fusion Framework modules](https://docs.equinor.com/fusion-framework/)
**Cookbook**: Custom module cookbook in Fusion Framework source (`packages/modules/`)

## When to use a custom module

Use when:
- cross-cutting behavior needed by multiple components/routes
- depends on Fusion bootstrap lifecycle (needs framework instance at startup)
- decouple infrastructure (caching, subscriptions, service clients) from components

Not appropriate for:
- single-component state — use React state/context
- single-page data fetching — use React Query hook
- generic utilities — use plain TypeScript module

## Module contract

Implement `IModule` from `@equinor/fusion-framework-module`:

```typescript
import type { IModule } from '@equinor/fusion-framework-module';

export const MODULE_NAME = 'myModule' as const; // Unique module key — must not conflict with built-in modules

export interface IMyModuleConfig {
  // Configuration shape for your module
  apiBaseUrl: string;
}

export interface IMyModule {
  // Public API your module exposes to the app
  getClient(): MyApiClient;
}

export const module: IModule<IMyModule, IMyModuleConfig> = {
  name: MODULE_NAME,
  initialize: async ({ config, instance }): Promise<IMyModule> => {
    const cfg = await config;
    const client = new MyApiClient(cfg.apiBaseUrl);
    return { getClient: () => client };
  },
};
```

## Wiring a custom module into an app

Register in `src/config.ts`:

```typescript
import type { AppModuleInitiator } from '@equinor/fusion-framework-react-app';
import { module as myModule } from './modules/myModule';

export const configure: AppModuleInitiator = (configurator) => {
  // Built-in modules
  configurator.useFrameworkServiceClient('myService');

  // Custom module
  configurator.addModule(myModule, (moduleConfigurator) => {
    moduleConfigurator.setConfig({
      apiBaseUrl: 'https://api.example.com',
    });
  });
};
```

## Accessing a custom module in components

Use `useAppModule` with module name key:

```typescript
import { useAppModule } from '@equinor/fusion-framework-react-app';
import type { IMyModule } from '../modules/myModule';
import { MODULE_NAME } from '../modules/myModule';

const MyFeatureComponent = () => {
  // Type the module by its interface
  const myModule = useAppModule<IMyModule>(MODULE_NAME);
  const client = myModule.getClient();

  // Use the client in a React Query hook or useEffect
};
```

> `useAppModule` is a hook — only inside components/hooks.

## Module lifecycle

Modules initialized before React mounts:

1. `initialize` — called once at bootstrap with merged config and parent framework instance
2. Module stored in framework instance under `name` key
3. Components access via `useAppModule(name)` after mount

No `destroy` lifecycle on most modules. Clean up subscriptions in components via `useEffect`.

## File structure

Module lives alongside app source:

```
src/
  modules/
    myModule/
      index.ts       — module definition + exports
      MyApiClient.ts — implementation
  config.ts          — register module here
```

## Common pitfalls

- **Naming conflicts**: `name` must not collide with built-in Fusion modules (`http`, `auth`, `context`, `navigation`, `featureFlag`, `settings`, `bookmarks`, `analytics`).
- **Outside React**: `useAppModule` is a hook — can't call outside components. Loaders/non-React: use `framework.modules.<name>`.
- **Config not awaited**: `initialize` receives `Promise<IMyModuleConfig>` — always `await config`.
- **Over-engineering**: single-component need? Use hook/context instead.

## When to use `fusion-research` first

Uncertain about API signatures or built-in module config? Use `fusion-research` with `mcp_fusion_search_framework` first.

Example query: `mcp_fusion_search_framework` → `"IModule initialize configure AppModuleInitiator custom module"`
