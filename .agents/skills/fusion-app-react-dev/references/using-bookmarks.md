# Using Bookmarks

How to save and restore shareable view state with Fusion Framework bookmarks.

## When bookmarks are the right fit

Use bookmarks for:
- filters, pagination, selected entities, and dashboard layout that users want to revisit
- links that should reproduce a complex screen state for another user
- support and debugging flows where you need to load the same view state as the reporter

Do not use bookmarks for:
- secrets, tokens, or personal-only preferences
- large cached datasets
- deployment config or API endpoint selection

## Enable the bookmark module

```typescript
import { enableBookmark } from '@equinor/fusion-framework-react-app/bookmark';
import type { AppModuleInitiator } from '@equinor/fusion-framework-react-app';

export const configure: AppModuleInitiator = (configurator) => {
  enableBookmark(configurator);
};
```

## Read the current bookmark and restore state

```typescript
import { useCurrentBookmark } from '@equinor/fusion-framework-react-app/bookmark';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

interface FiltersBookmark {
  query: string;
  includeClosed: boolean;
}

export const FiltersPanel = () => {
  const [filters, setFilters] = useState<FiltersBookmark>({
    query: '',
    includeClosed: false,
  });
  const latestFilters = useRef(filters);

  const { currentBookmark } = useCurrentBookmark<FiltersBookmark>(
    useCallback(() => latestFilters.current, []),
  );

  useLayoutEffect(() => {
    setFilters({
      query: currentBookmark?.payload?.query ?? '',
      includeClosed: currentBookmark?.payload?.includeClosed ?? false,
    });
  }, [currentBookmark]);

  useLayoutEffect(() => {
    latestFilters.current = filters;
  }, [filters]);

  return (
    <form>
      <input
        value={filters.query}
        onChange={(event) =>
          setFilters((current) => ({ ...current, query: event.target.value }))
        }
        placeholder="Search"
      />
      <label>
        <input
          type="checkbox"
          checked={filters.includeClosed}
          onChange={(event) =>
            setFilters((current) => ({
              ...current,
              includeClosed: event.target.checked,
            }))
          }
        />
        Include closed
      </label>
    </form>
  );
};
```

The payload generator should return the serializable state you want the bookmark system to save and restore.

## Choosing bookmark payload

Good bookmark payloads usually contain:
- filters and sort order
- selected IDs or tabs
- current page or panel state
- other serializable view-model data that another user can reproduce

Keep route identity in the router. Use bookmarks for page state layered on top of the route, not as a replacement for route definitions.

## Multi-page flows

For multi-page bookmark behavior:
- keep navigation source of truth in route params and route structure
- keep bookmark payload focused on the page or workflow state that needs restoring
- if several pages participate in one workflow, define a stable payload shape that each page can read defensively
- validate against the advanced bookmark cookbook before introducing cross-page assumptions

## Current API note

Fusion docs highlight `useCurrentBookmark` as the current hook. Older `useBookmark` usage exists in some codebases, but the bookmark rework notes mark it as deprecated. Prefer the `useCurrentBookmark`-based flow when adding new behavior.

## Relevant sources

- Fusion docs bookmark guide
- `cookbooks/app-react-bookmark`
- `cookbooks/app-react-bookmark-advanced`
- bookmark rework release notes