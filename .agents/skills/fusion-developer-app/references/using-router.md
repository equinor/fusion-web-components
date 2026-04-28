# Using the Fusion Router

How to add client-side routing to a Fusion Framework app with `@equinor/fusion-framework-react-router`.

The Fusion Router wraps React Router v7 and adds framework integration: navigation module wiring, typed `fusion` context in loaders and components, a route DSL for code splitting, and manifest-ready route schemas.

## Prerequisites

1. Install the package:

```sh
# use the project's package manager (bun / pnpm / npm)
bun add @equinor/fusion-framework-react-router
```

2. Enable the navigation module in `config.ts`:

```typescript
import type { AppModuleInitiator } from '@equinor/fusion-framework-react-app';
import { enableNavigation } from '@equinor/fusion-framework-module-navigation';

export const configure: AppModuleInitiator = (configurator, { env }) => {
  enableNavigation(configurator, env.basename);
};
```

## Route DSL

Define routes using the helper functions from the `/routes` entry point. Each file reference is lazy-loaded automatically.

```typescript
// src/routes.ts
import { layout, index, route, prefix } from '@equinor/fusion-framework-react-router/routes';

export const routes = layout('./pages/Root.tsx', [
  index('./pages/HomePage.tsx'),

  prefix('items', [
    index('./pages/ItemsPage.tsx'),
    route(':id', './pages/ItemPage.tsx'),
  ]),

  prefix('settings', [
    route('general', './pages/GeneralSettings.tsx'),
    route('advanced', './pages/AdvancedSettings.tsx'),
  ]),
]);
```

### DSL helpers

| Helper | Purpose |
|---|---|
| `layout(file, children)` | Layout wrapping children — the component must render `<Outlet />` |
| `index(file, schema?)` | Index route rendered at the parent's path |
| `route(path, file, children?, schema?)` | Standard route with a URL path and optional children |
| `prefix(path, children)` | Path-only grouping — prepends a segment without rendering a component |

### Vite plugin

Enable the Vite plugin so DSL calls are statically transformed into React Router `RouteObject` code at build time:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { reactRouterPlugin } from '@equinor/fusion-framework-react-router/vite-plugin';

export default defineConfig({
  plugins: [react(), reactRouterPlugin()],
});
```

## Mount the Router

Create a Router component and render it in `App.tsx`:

```typescript
// src/Router.tsx
import { Router } from '@equinor/fusion-framework-react-router';
import { routes } from './routes';

export default function AppRouter() {
  return <Router routes={routes} />;
}
```

The `<Router>` component accepts:
- `routes` — route tree (DSL nodes or `RouteObject[]`)
- `loader` — optional JSX shown during navigation transitions
- `context` — optional custom data accessible in all loaders via `fusion.context`

## Page components

Each page file exports a default component. It receives `RouteComponentProps` with `loaderData` and `fusion`:

```typescript
// src/pages/ItemPage.tsx
import type { RouteComponentProps, RouterHandle } from '@equinor/fusion-framework-react-router';

export const handle = {
  route: {
    description: 'Displays a single item',
    params: { id: 'The item identifier' },
  },
} as const satisfies RouterHandle;

export default function ItemPage({ loaderData }: RouteComponentProps) {
  const { item } = loaderData;
  return <h1>{item.name}</h1>;
}
```

## Client loaders

Export a `clientLoader` to fetch data before the component renders. The loader receives `params`, `request`, and `fusion` (framework modules + custom context):

```typescript
import type { LoaderFunctionArgs } from '@equinor/fusion-framework-react-router';

export const clientLoader = async ({ params, fusion }: LoaderFunctionArgs) => {
  // Route loaders run outside React — use module access instead of hooks
  const client = fusion.modules.http.createClient('my-api');
  const item = await client.json(`/items/${params.id}`);

  if (!item) {
    throw new Response('Item not found', { status: 404 });
  }

  return { item };
};
```

The returned data is automatically passed to the component as `loaderData`.

## Error handling

Export an `ErrorElement` from any page file to catch errors in that route's loader or component:

```typescript
import type { ErrorElementProps } from '@equinor/fusion-framework-react-router';
import { useNavigate } from '@equinor/fusion-framework-react-router';
import { Button, Banner } from '@equinor/eds-core-react';

export function ErrorElement({ error }: ErrorElementProps) {
  const navigate = useNavigate();
  return (
    <Banner variant="warning">
      <Banner.Message>{error.message}</Banner.Message>
      <Banner.Actions>
        <Button variant="ghost" onClick={() => navigate(0)}>Retry</Button>
        <Button variant="ghost" onClick={() => navigate('/')}>Home</Button>
      </Banner.Actions>
    </Banner>
  );
}
```

If no `ErrorElement` is exported, the error bubbles up to the parent route's error boundary.

## Navigation

Fusion Router re-exports React Router's navigation primitives:

```typescript
import { Link, useNavigate, useParams, useSearchParams, useLocation } from '@equinor/fusion-framework-react-router';
```

### Links

```typescript
<Link to="/">Home</Link>
<Link to="/items/123">Item 123</Link>
<Link to="/items?status=active">Active Items</Link>
```

### Programmatic navigation

```typescript
const navigate = useNavigate();
navigate('/items/123');      // absolute
navigate(-1);                // back
navigate(0);                 // reload current route
```

## Layout routes

A layout route wraps children with shared UI (nav bar, sidebar). The component must render `<Outlet />`:

```typescript
// src/pages/Root.tsx
import { Outlet, Link } from '@equinor/fusion-framework-react-router';

export default function Root() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/items">Items</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
```

## Route schemas for manifests

Generate a flat schema from the route tree for `app.manifest.ts`:

```typescript
// app.manifest.ts
import { defineAppManifest } from '@equinor/fusion-framework-cli/app';
import { toRouteSchema } from '@equinor/fusion-framework-react-router/schema';
import { routes } from './src/routes';

export default defineAppManifest(async () => ({
  routes: await toRouteSchema(routes),
}));
```

## Custom router context

Pass custom data (e.g. a QueryClient) to all loaders via module augmentation:

```typescript
// src/router-context.d.ts
declare module '@equinor/fusion-framework-react-router' {
  interface RouterContext {
    queryClient: import('@tanstack/react-query').QueryClient;
  }
}
```

```typescript
// src/Router.tsx
import { Router } from '@equinor/fusion-framework-react-router';
import { QueryClient } from '@tanstack/react-query';
import { routes } from './routes';

const queryClient = new QueryClient();

export default function AppRouter() {
  return <Router routes={routes} context={{ queryClient }} />;
}
```

Loaders then access `fusion.context.queryClient` with full type safety.

## Choosing a routing approach

| Approach | When to use |
|---|---|
| Fusion Router DSL | Multi-page apps — code splitting, loaders, schemas |
| Plain `RouteObject[]` with `<Router>` | When you prefer manual route objects over DSL |
| No router (single-page) | Simple apps with no URL-based navigation |
