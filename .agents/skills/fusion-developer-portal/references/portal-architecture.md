# Portal Architecture Reference

Detailed patterns for Fusion portal development: entry point structure, module configuration, custom app loading, and the app initialization lifecycle.

## Portal entry point

A portal creates a framework provider and renders its shell. From the `portal-analytics` cookbook:

```tsx
import { createElement, type FC, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createFrameworkProvider, type Fusion } from '@equinor/fusion-framework-react';
import { type ComponentRenderArgs, frameworkConfig, type PortalModuleInitiator } from './frameworkConfig';
import { Router } from './Router';

const createPortal = <TRef extends Fusion = Fusion>(
  el: HTMLElement,
  args: ComponentRenderArgs<TRef>,
) => {
  const FrameworkProvider = createFrameworkProvider(
    frameworkConfig as PortalModuleInitiator<TRef>,
    args,
  );

  const root = createRoot(el);
  root.render(
    <FrameworkProvider>
      <Router />
    </FrameworkProvider>,
  );

  return () => root.unmount();
};

export default createPortal;
```

## Module configuration

Portal modules use `FrameworkConfigurator`, not `AppModuleInitiator`. The portal's config is hoisted to all child apps.

```typescript
import type { FrameworkConfigurator, Fusion } from '@equinor/fusion-framework';
import { enableAppModule } from '@equinor/fusion-framework-module-app';
import { enableAnalytics, type AnalyticsEvent } from '@equinor/fusion-framework-module-analytics';
import { ConsoleAnalyticsAdapter, FusionAnalyticsAdapter } from '@equinor/fusion-framework-module-analytics/adapters';
import { AppLoadedCollector, AppSelectedCollector, ContextSelectedCollector } from '@equinor/fusion-framework-module-analytics/collectors';
import { enableTelemetry } from '@equinor/fusion-framework-module-telemetry';

export type PortalModuleInitiator<TRef extends Fusion = Fusion> = (
  configurator: FrameworkConfigurator,
  ref?: TRef,
) => void | Promise<void>;

export type ComponentRenderArgs<TRef extends Fusion = Fusion> = {
  fusion: TRef;
  env: { basename: string };
};

export const frameworkConfig: PortalModuleInitiator = (configurator) => {
  // App module — required for loading child apps
  enableAppModule(configurator);

  // Analytics with adapters and collectors
  enableAnalytics(configurator, (builder) => {
    builder.addAdapter(new ConsoleAnalyticsAdapter());
    builder.addAdapter(new FusionAnalyticsAdapter());
    builder.addCollector(new AppLoadedCollector());
    builder.addCollector(new AppSelectedCollector());
    builder.addCollector(new ContextSelectedCollector());
  });

  // Telemetry (OpenTelemetry)
  enableTelemetry(configurator, {
    attachConfiguratorEvents: true,
  });
};
```

### Key difference from app configuration

| Concern | Portal (`FrameworkConfigurator`) | App (`AppModuleInitiator`) |
|---------|------|-----|
| Auth / MSAL | Configured here, hoisted to apps | Inherited — do NOT configure in apps |
| App module | `enableAppModule(configurator)` | Not needed (portal handles it) |
| Navigation | `enableNavigation(configurator, '/')` | `enableNavigation(configurator, basename)` |
| Service discovery | Configured at portal level | Inherited from portal |
| HTTP clients | Portal-wide clients | App-specific clients via `configurator.http` |

## Portal routing

Portals use `react-router-dom` via the framework navigation module. The standard pattern routes `/apps/:appKey/*` to the app loader:

```tsx
import { Outlet, RouterProvider, type RouterProviderProps, useParams } from 'react-router-dom';
import { AppLoader } from './AppLoader';
import { Header } from './components/Header';
import { useFramework } from '@equinor/fusion-framework-react';

const Root = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const AppRoute = () => {
  const { appKey } = useParams<{ appKey: string }>();
  return appKey ? <AppLoader appKey={appKey} /> : null;
};

export const Router = () => {
  const framework = useFramework();
  // Router is created from the navigation module
  return <RouterProvider router={framework.modules.navigation.router} />;
};
```

## Custom app loader

For fine-grained control over app loading, error handling, and mounting. Based on `portal-analytics` cookbook:

```tsx
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Subscription } from 'rxjs';
import { last } from 'rxjs/operators';
import { useFramework } from '@equinor/fusion-framework-react';
import { useObservableState } from '@equinor/fusion-observable/react';
import type { AppModule } from '@equinor/fusion-framework-module-app';

export const AppLoader = (props: { readonly appKey: string }) => {
  const { appKey } = props;
  const fusion = useFramework<[AppModule]>();
  const ref = useRef<HTMLElement>(null);
  const applicationContentId = useId();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();

  const { value: currentApp } = useObservableState(
    useMemo(() => fusion.modules.app.current$, [fusion.modules.app]),
  );

  useEffect(() => {
    fusion.modules.app.setCurrentApp(appKey);
  }, [appKey, fusion]);

  useEffect(() => {
    if (!currentApp) return;

    setLoading(true);
    setError(undefined);
    const subscription = new Subscription();

    subscription.add(
      currentApp
        .initialize()
        .pipe(last())
        .subscribe({
          next: ({ manifest, script, config }) => {
            const basename = `/apps/${appKey}`;
            const el = document.createElement('div');
            if (!ref.current) throw Error('Missing application mounting point');
            ref.current.appendChild(el);

            const render = script.renderApp ?? script.default;
            subscription.add(render(el, { fusion, env: { basename, config, manifest } }));
            subscription.add(() => el.remove());
          },
          complete: () => setLoading(false),
          error: (err) => {
            setLoading(false);
            setError(err);
          },
        }),
    );

    return () => subscription.unsubscribe();
  }, [fusion, currentApp]);

  if (error) {
    return <div><h2>Failed to load application</h2><pre>{error.message}</pre></div>;
  }

  return (
    <section id={applicationContentId} ref={ref} style={{ display: 'contents' }}>
      {loading && <div>Loading Application…</div>}
    </section>
  );
};
```

### Key points

- `useFramework<[AppModule]>()` accesses the framework with the app module typed
- `fusion.modules.app.setCurrentApp(appKey)` triggers the loading pipeline
- `fusion.modules.app.current$` emits the current `App` instance
- `app.initialize()` returns an observable emitting `{ manifest, script, config }` when ready
- `script.renderApp ?? script.default` extracts the render function
- **Subscription cleanup is critical** — always unsubscribe to prevent memory leaks

## Apploader component (simple embed)

From `@equinor/fusion-framework-react-app/apploader`. Quick way to embed a child app:

```tsx
import { Apploader } from '@equinor/fusion-framework-react-app/apploader';
<Apploader appKey="my-app" />
```

For custom loading/error UI, use the `useApploader` hook:

```typescript
useApploader({ appKey }: { appKey: string }): {
  loading: boolean;
  error: Error | undefined;
  appRef: React.RefObject<HTMLDivElement | null>;
}
```

> **Warning**: `Apploader` is experimental. Embedded apps may have routing, context, and framework issues. Best for simple apps (PowerBI, PowerApps).

## App initialization lifecycle

How the portal loads any Fusion app:

1. **Manifest fetch** — `AppModuleProvider.getAppManifest(appKey)` retrieves metadata via service discovery
2. **Asset import** — App Proxy fetches the JS bundle (handles auth since `import()` can't carry tokens)
3. **Module configuration** — app's `configure` callback enables and configures framework modules
4. **Module initialization** — configurator generates config and creates module instances
5. **Render** — app's `renderApp()` receives DOM element, framework instance, basename, config, manifest

### App class observables

| Observable | Emits |
|------------|-------|
| `manifest$` | `AppManifest` when resolved |
| `config$` | `AppConfig` when resolved |
| `modules$` | Imported `AppScriptModule` |
| `instance$` | Initialized `AppModulesInstance` |
| `status$` | Set of in-progress action types |

## Portal manifest

```typescript
import { definePortalManifest } from '@equinor/fusion-framework-cli/portal';

export default definePortalManifest((env, { base }) => ({
  name: 'my-portal',
  version: '1.0.0',
  entry: './src/index.tsx',
}));
```

## CLI commands

| Command | Description |
|---------|-------------|
| `ffc portal dev` | Start dev server with hot reload |
| `ffc portal build` | Build portal template with Vite |
| `ffc portal manifest` | Generate or validate portal manifest |
| `ffc portal schema` | Generate or validate config schema |
| `ffc portal upload` | Upload portal build to Fusion service |
| `ffc portal tag` | Tag a portal version (e.g., `latest`) |

## Dev portal architecture

The built-in `@equinor/fusion-framework-dev-portal` provides:

- **`render`** — entry point with React root, theme, framework, people-resolver providers
- **`configure`** — all framework modules (telemetry, navigation, bookmarks, feature flags, analytics, AG Grid, services)
- **`Router`** — routes `/apps/:appKey/*` to the app loader
- **`AppLoader`** — resolves, initializes, and mounts apps by key with loading/error states
- **`Header`** — top bar with Fusion logo, context selector, bookmark toggle, person settings
- **`ContextSelector`** — wired to current app's context module
- **`useAppContextNavigation`** — syncs URL pathname with context changes

This is for local development only. Production portals are deployed separately.

### Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `FUSION_MSAL_CLIENT_ID` | Yes | Azure AD app client ID |
| `FUSION_SPA_SERVICE_DISCOVERY_URL` | Yes | Service discovery endpoint |
| `FUSION_SPA_PORTAL_ID` | No | Portal ID for service resolution |
| `FUSION_AG_GRID_KEY` | No | AG Grid enterprise license key |

## MCP query examples

```
mcp_fusion_search_framework → "definePortalManifest portal manifest ffc portal CLI"
mcp_fusion_search_framework → "createFrameworkProvider PortalModuleInitiator portal configure modules"
mcp_fusion_search_framework → "AppLoader AppModule setCurrentApp current$ app initialize"
mcp_fusion_search_framework → "enableAnalytics AppLoadedCollector portal analytics telemetry"
mcp_fusion_search_docs → "portal development custom portal architecture deployment"
```

## Source references

- [Dev portal README](https://github.com/equinor/fusion-framework/blob/main/packages/dev-portal/README.md)
- [Portal CLI docs](https://github.com/equinor/fusion-framework/blob/main/packages/cli/docs/portal.md)
- [Portal analytics cookbook](https://github.com/equinor/fusion-framework/tree/main/cookbooks/portal-analytics)
- [Portal cookbook](https://github.com/equinor/fusion-framework/tree/main/cookbooks/portal)
- [Dev server docs](https://github.com/equinor/fusion-framework/blob/main/packages/cli/docs/dev-server.md)
- [Apploader README](https://github.com/equinor/fusion-framework/blob/main/packages/react/app/src/apploader/README.md)
- [App module README](https://github.com/equinor/fusion-framework/blob/main/packages/modules/app/README.md)
