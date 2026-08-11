# Using Analytics

Instrumenting Fusion apps with Fusion Framework analytics.

## What the framework provides

Common tracking API; platform handles collection. Portal already includes analytics support — most app work starts with the hook.

## Basic tracking

```typescript
import { useEffect } from 'react';
import { useTrackFeature } from '@equinor/fusion-framework-react-app/analytics';

export const DashboardPage = () => {
  const trackFeature = useTrackFeature();

  useEffect(() => {
    trackFeature('dashboard-page-loaded');
  }, [trackFeature]);

  return null;
};
```

## Track user actions and screen loads

```typescript
import { useEffect } from 'react';
import { useTrackFeature } from '@equinor/fusion-framework-react-app/analytics';

export const DashboardPage = () => {
  const trackFeature = useTrackFeature();

  useEffect(() => {
    trackFeature('dashboard-page-loaded');
  }, [trackFeature]);

  return (
    <button type="button" onClick={() => trackFeature('dashboard-filter-opened')}>
      Open filters
    </button>
  );
};
```

## Send small structured metadata

```typescript
trackFeature('dashboard-filter-applied', {
  filterCount: 3,
  section: 'overview',
});
```

Use small, intentional metadata. Never include secrets, tokens, or personal data.

Consistent event names: `kebab-case` (e.g. `dashboard-page-loaded`, `dashboard-filter-opened`, `dashboard-filter-applied`).

## When to instrument

Good analytics events usually capture:
- page or feature entry points
- meaningful user actions such as apply, create, approve, or export
- important workflow milestones or failures
- rollout observation for newly introduced features

Avoid tracking every render or low-value UI noise.

## Local testing

To inspect analytics locally:
1. Enable the `Log Fusion Analytics` feature in the portal profile.
2. Refresh the page.
3. Inspect console output prefixed with `Analytics::Adapter::Console`.

## Advanced configuration

Most apps rely on portal's existing analytics setup. Custom collectors/adapters: configure in app config and check analytics module docs.

## Review guidance

- Prefer `useTrackFeature()` over ad hoc analytics wrappers unless the project already standardizes one.
- Reuse stable event names when extending an existing workflow.
- Keep one event naming scheme across page-load and interaction events.
- Track business-significant interactions, not implementation details.

## Relevant sources

- Fusion docs analytics guide
- analytics module documentation