# Using Feature Flags

Using Fusion Framework feature toggling in React apps.

## When feature flags are the right fit

Use feature flags for:
- incremental rollout of features that need to be enabled or disabled at runtime
- temporary toggles that will be removed after rollout is complete
- developer or debug toggles that should persist locally (`createLocalStoragePlugin`)
- test or override toggles controlled via URL query parameters (`createUrlPlugin`)

Do not use feature flags for:
- permanent configuration (use `app.config.ts` or App Settings)
- per-user preferences that should survive long-term (use App Settings)
- authorization or access control (use Fusion context and role checks)

## App-level setup

For most Fusion apps, start with the app-level helper.

```ts
// src/config.ts
import { enableFeatureFlag } from '@equinor/fusion-framework-react-app/feature-flag';
import type { AppModuleInitiator } from '@equinor/fusion-framework-react-app';

export enum Feature {
  NewDashboard = 'new-dashboard',
}

export const configure: AppModuleInitiator = (appConfigurator) => {
  enableFeatureFlag(appConfigurator, [
    {
      key: Feature.NewDashboard,
      title: 'New dashboard',
      description: 'Enable the redesigned dashboard layout.',
    },
  ]);
};
```

- Prefer shared enum or string-constant object over raw strings
  - Add `title` and `description` when surfaced to users or code reviews
  - Use `value` only when behavior requires more than on/off

## Framework-level setup with plugins

When participating in framework-wide providers or needing local persistence and URL override, use the module-level API.

```ts
// framework-level configuration (for example in src/framework-config.ts)
import { enableFeatureFlagging } from '@equinor/fusion-framework-module-feature-flag';
import {
  createLocalStoragePlugin,
  createUrlPlugin,
} from '@equinor/fusion-framework-module-feature-flag/plugins';

export const configureFeatureFlags = (configurator) => {
  enableFeatureFlagging(configurator, (builder) => {
    builder.addPlugin(
      createLocalStoragePlugin([{ key: 'fusionDebug', title: 'Fusion debug log' }]),
    );
    builder.addPlugin(createUrlPlugin(['fusionDebug']));
  });
};
```

- `createLocalStoragePlugin` — persists toggle state in `localStorage`; suitable for developer or debug flags.
- `createUrlPlugin` — reads flag state from the URL query string; useful for QA override and test automation.

## Consuming flags in components

Use `useFeature` in React components:

```tsx
// src/components/Dashboard.tsx
import { useFeature } from '@equinor/fusion-framework-react-app/feature-flag';
import { Feature } from '../config';

const Dashboard = () => {
  const { feature, toggleFeature } = useFeature(Feature.NewDashboard);

  if (!feature?.enabled) {
    return <LegacyDashboard />;
  }

  return <NewDashboard />;
};
```

- Access `feature.enabled` for boolean gating
  - Access `feature.value` for typed configuration value
  - Call `toggleFeature()` for user-controlled toggling
  - Guard against `feature` being `undefined`; use optional chaining or null check

### Provider-based hook variant

Provider-based variant for explicit provider control:

```ts
import { useFeature } from '@equinor/fusion-framework-react/feature-flag';

const value = useFeature(provider, 'my-flag-key');
```

Use only at framework level outside the app package scope.

## Known API ambiguity

Public sources show inconsistent spelling for the read-only flag property:
- Some sources use `readonly`
- Older docs mention `readOnly`

Verify against local types or Fusion MCP before finalizing code that reads this property.

## Rollout and cleanup

Feature flags are temporary — every flag needs an owner and a removal plan.

- **Define an owner** in a comment or in the flag `description`
- **State removal milestone** at which the flag will be removed
- **Test both paths** — app must work with flag on and off
- **Remove completely** — delete flag definition, all consumers, and dead code branches in one PR
- **Avoid long-lived flags** — flags that outlive rollout become maintenance debt

### Rollout checklist

- [ ] Flag key defined in a shared enum or constant.
- [ ] `title` and `description` filled in.
- [ ] Entry point chosen: `enableFeatureFlag` (app) or `enableFeatureFlagging` (framework/plugin).
- [ ] Plugin added if local persistence or URL override is required.
- [ ] Component reads `feature?.enabled` with null-safe access.
- [ ] Both enabled and disabled rendering paths tested.
- [ ] Owner and removal milestone documented.
- [ ] `readonly` vs `readOnly` verified against local types.

## MCP-grounded research

For live API references and up-to-date examples, query Fusion MCP:

```
mcp_fusion_search_framework: "feature flag enableFeatureFlag useFeature"
mcp_fusion_search_framework: "feature toggling plugin createLocalStoragePlugin createUrlPlugin"
```

If Fusion MCP is unavailable, use the public Fusion Framework sources below.

## Public source map

- Module README: https://github.com/equinor/fusion-framework/blob/main/packages/modules/feature-flag/README.md
- App guide: https://github.com/equinor/fusion-framework/blob/main/vue-press/src/guide/app/feature-flag.md
- Cookbook example config: https://github.com/equinor/fusion-framework/blob/main/cookbooks/app-react-feature-flag/src/config.ts
- Cookbook component example: https://github.com/equinor/fusion-framework/blob/main/cookbooks/app-react-feature-flag/src/FeatureFlags.tsx
- App hook: https://github.com/equinor/fusion-framework/blob/main/packages/react/app/src/feature-flag/useFeature.ts
- Framework hook: https://github.com/equinor/fusion-framework/blob/main/packages/react/framework/src/feature-flag/useFeature.ts
