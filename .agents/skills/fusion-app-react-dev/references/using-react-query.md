# Using React Query

How to manage server state with `@tanstack/react-query` in a Fusion Framework app.

## Setup

Wrap the app (or a subtree) in `QueryClientProvider`:

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* app content */}
  </QueryClientProvider>
);
```

## Custom query hooks

Create thin wrappers in `src/hooks/`. Combine React Query with the Fusion HTTP client:

```typescript
import { useQuery } from '@tanstack/react-query';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

interface Item {
  id: string;
  name: string;
}

/**
 * Fetches all items from the API.
 *
 * @returns A React Query result containing the item list.
 */
export const useItems = () => {
  const client = useHttpClient('my-api');
  return useQuery<Item[]>({
    queryKey: ['items'],
    queryFn: () => client.json('/items'),
  });
};
```

## Query key conventions

- Derive keys from the API path and parameters: `['items']`, `['items', itemId]`
- Nest keys for filtered queries: `['items', { status: 'active' }]`
- Use consistent prefixes to enable bulk invalidation: `['items', ...]`

## Parameterized queries

```typescript
/**
 * Fetches a single item by ID.
 *
 * @param itemId - The unique item identifier.
 * @returns A React Query result containing the item.
 */
export const useItem = (itemId: string) => {
  const client = useHttpClient('my-api');
  return useQuery<Item>({
    queryKey: ['items', itemId],
    queryFn: () => client.json(`/items/${itemId}`),
    enabled: !!itemId,
  });
};
```

## Mutations

Use `useMutation` for write operations. Invalidate related queries on success:

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Submits an item update to the API.
 *
 * @returns A React Query mutation result.
 */
export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  const client = useHttpClient('my-api');

  return useMutation({
    mutationFn: (item: Item) =>
      client.fetchAsync(`/items/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify(item),
        headers: { 'Content-Type': 'application/json' },
      }),
    onSuccess: (_data, variables) => {
      // Refresh the list and the individual item cache
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};
```

## State separation

- **React Query** = server state (API data, loading, error, caching, background refetch)
- **React state/context** = client UI state (selected tab, filter input text, modal open/close)

Never store UI state in React Query. Never manage server state in `useState`.

## DevTools

Add React Query DevTools for debugging (removed automatically in production):

```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* app content */}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
```

## Error handling

Handle errors at the component level:

```typescript
const { data, error, isLoading } = useItems();

if (isLoading) return <Progress.Dots />;
if (error) return <Banner variant="warning">Failed to load items</Banner>;
```

Or set a global error handler on the `QueryClient`:

```typescript
import { QueryClient, QueryCache } from '@tanstack/react-query';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.error('Query failed:', error);
    },
  }),
});
```
