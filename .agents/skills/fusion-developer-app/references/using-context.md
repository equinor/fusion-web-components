# Using Context

How to enable, configure, and consume the Fusion context module in a Fusion Framework app.

Context represents the entity the user is currently working with — a project, facility, contract, or other domain object selected in the Fusion Portal.

## Enable context in `config.ts`

Context is not enabled by default. Register it with `enableContext`:

```typescript
import type { AppModuleInitiator } from '@equinor/fusion-framework-react-app';
import { enableContext } from '@equinor/fusion-framework-module-context';

export const configure: AppModuleInitiator = (configurator) => {
  enableContext(configurator, (builder) => {
    // Only accept ProjectMaster context items
    builder.setContextType(['ProjectMaster']);
  });
};
```

### Builder options

The `builder` callback exposes several configuration methods:

| Method | Purpose |
|---|---|
| `setContextType(types)` | Restrict which context types the app accepts |
| `setContextFilter(fn)` | Post-query filter on search results |
| `setContextParameterFn(fn)` | Custom parameter mapping for the search API |
| `setValidateContext(fn)` | Custom validation logic for context items |
| `setResolveContext(fn)` | Custom context resolution (e.g. resolve related items) |
| `connectParentContext(bool)` | Enable/disable sync with the portal's context (default: `true`) |
| `setContextClient(client)` | Replace the default context API with a custom `get`/`query` client |
| `setContextPathExtractor(fn)` | Extract context ID from URL path |
| `setContextPathGenerator(fn)` | Generate URL path from context item |
| `setResolveInitialContext(fn)` | Override initial context resolution on app load |

Minimal setup only needs `setContextType`. Add other methods as requirements grow.

## Read the current context

Use the `useCurrentContext` hook from the app sub-path import:

```typescript
import { useCurrentContext } from '@equinor/fusion-framework-react-app/context';

const MyComponent = () => {
  const context = useCurrentContext();

  if (!context) return <p>No context selected</p>;
  return <p>Working on: {context.title}</p>;
};
```

`context` is `undefined` when no context is selected. It updates automatically when the user picks a different project/facility in the portal.

## Use context in data fetching

A common pattern: pass the context ID to API queries so data refreshes on context change.

### With React Query

```typescript
import { useQuery } from '@tanstack/react-query';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useCurrentContext } from '@equinor/fusion-framework-react-app/context';

/**
 * Fetches items scoped to the current context.
 *
 * @returns A React Query result containing the item list, or disabled when no context is selected.
 */
export const useContextItems = () => {
  const context = useCurrentContext();
  const client = useHttpClient('my-api');

  return useQuery({
    queryKey: ['items', context?.id],
    queryFn: () => client.json(`/projects/${context?.id}/items`),
    enabled: !!context?.id,
  });
};
```

### With plain HTTP client

```typescript
import { useEffect, useState } from 'react';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useCurrentContext } from '@equinor/fusion-framework-react-app/context';

const MyComponent = () => {
  const context = useCurrentContext();
  const client = useHttpClient('my-api');
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!context?.id) return;
    client.json(`/projects/${context.id}/items`).then(setItems);
  }, [context?.id, client]);

  return <ul>{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul>;
};
```

## Query related contexts

Access entities related to the current context (e.g. tasks under a project):

```typescript
import { useMemo } from 'react';
import { EMPTY } from 'rxjs';
import {
  type ContextItem,
  type ContextModule,
  useModuleCurrentContext,
} from '@equinor/fusion-framework-react-module-context';
import { useAppModule } from '@equinor/fusion-framework-react-app';
import { useObservableState } from '@equinor/fusion-observable/react';

/**
 * Queries contexts related to the current context.
 *
 * @param type - Optional context type filter (e.g. `['EquinorTask']`).
 * @returns An observable state containing related context items.
 */
export const useRelatedContext = (type?: string[]) => {
  const { currentContext } = useModuleCurrentContext();
  const provider = useAppModule<ContextModule>('context');

  return useObservableState(
    useMemo(() => {
      if (!currentContext) return EMPTY;
      return provider.relatedContexts({
        item: currentContext,
        filter: { type },
      });
    }, [provider, currentContext, type]),
  );
};
```

## Context types

Common context types in the Fusion ecosystem:

| Type | Represents |
|---|---|
| `ProjectMaster` | A project entity |
| `Facility` | A physical facility |
| `Contract` | A contract |
| `EquinorTask` | A task or work order |

The exact types available depend on the Fusion environment and service discovery configuration.

## Common patterns

### Guard a page that requires context

```typescript
import type { ReactNode } from 'react';

const ContextGuard = ({ children }: { children: ReactNode }) => {
  const context = useCurrentContext();
  if (!context) {
    return <Banner variant="info">Select a project to continue</Banner>;
  }
  return <>{children}</>;
};
```

### Extract context ID for URL routing

The context module can extract a context ID from the URL path and sync it:

```typescript
enableContext(configurator, (builder) => {
  builder.setContextType(['ProjectMaster']);
  builder.setContextPathExtractor((path) => path.split('/')[2]);
  builder.setContextPathGenerator((ctx, path) =>
    path.replace(/\/context\/[^/]+/, `/context/${ctx.id}`),
  );
});
```

## Custom context client (bring your own context)

When the app's context doesn't come from the standard Fusion context API — for example it uses a custom backend, a different data model, or needs to query a domain-specific service — replace the default client with `setContextClient`:

```typescript
import type { AppModuleInitiator } from '@equinor/fusion-framework-react-app';
import { enableContext } from '@equinor/fusion-framework-module-context';

export const configure: AppModuleInitiator = (configurator) => {
  enableContext(configurator, (builder) => {
    // Disable parent context sync — this app manages its own context
    builder.connectParentContext(false);

    // Provide a fully custom client that replaces the default Fusion context API
    builder.setContextClient({
      get: async (args) => {
        const res = await fetch(`/api/my-context/${args.id}`);
        return res.json();
      },
      query: async (args) => {
        const res = await fetch(`/api/my-context?q=${args.search}`);
        return res.json();
      },
    });
  });
};
```

The custom client must satisfy the context client interface:

| Method | Signature | Purpose |
|---|---|---|
| `get` | `(args: { id: string }) => Promise<ContextItem>` | Fetch a single context item by ID |
| `query` | `(args: { search: string }) => Promise<ContextItem[]>` | Search for context items |

Once registered, `useCurrentContext()`, `setCurrentContextByIdAsync()`, and `queryContextAsync()` all use the custom client transparently — component code does not change.

### When to use a custom client

- The app uses a **domain-specific entity** (e.g. wells, assets, campaigns) as context instead of the standard Fusion types
- Context data lives in a **separate backend** not registered in Fusion service discovery
- The app needs **custom search logic** (full-text, OData filters, GraphQL) beyond what the Fusion context API supports
- The app must **not sync with the portal's context picker** (set `connectParentContext(false)`)

### Combining with standard context

If the app should still appear in the portal's context picker but needs extra data, keep `connectParentContext(true)` (default) and only override `get`/`query` to enrich the results:

```typescript
enableContext(configurator, (builder) => {
  builder.setContextType(['ProjectMaster']);

  // Enrich standard context with domain-specific data
  builder.setContextClient({
    get: async (args) => {
      const [ctx, extra] = await Promise.all([
        fetch(`/api/context/${args.id}`).then((r) => r.json()),
        fetch(`/api/my-domain/${args.id}/metadata`).then((r) => r.json()),
      ]);
      return { ...ctx, value: { ...ctx.value, ...extra } };
    },
    query: (args) =>
      fetch(`/api/context?q=${args.search}`).then((r) => r.json()),
  });
});
```

## What not to do

- **Don't bypass the HTTP client**: Using `fetch(service.uri + '/path')` with a discovered service URI skips token injection. Always use `useHttpClient(name)`.
- **Don't store context in local state**: The framework manages context state. Read it from `useCurrentContext()`, don't copy it into `useState`.
- **Don't hardcode context IDs**: Always derive them from `useCurrentContext()` or URL parameters.
