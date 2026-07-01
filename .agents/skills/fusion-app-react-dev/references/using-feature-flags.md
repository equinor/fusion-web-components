# Using Feature Flags

How to use Fusion Framework feature toggling in a Fusion Framework React app.

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

For most Fusion apps the app-level helper is the right starting point.

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

- Prefer defining feature keys in a shared enum or string-constant object rather than inlining raw strings.
- Add `title` and `description` when the flag is surfaced to users or in code reviews.
- Use the optional `value` field only when behavior requires configuration beyond a simple on/off toggle.

## Framework-level setup with plugins

When a flag should participate in framework-wide providers, or when local persistence and URL override are needed, use the module-level API.

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

Use `useFeature` from the app package in React components.

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

- Access `feature.enabled` for boolean gating.
- Access `feature.value` when the flag carries a typed configuration value.
- Call `toggleFeature()` or `toggleFeature(true | false)` when user-controlled toggling is required.
- Guard against `feature` being `undefined`; use optional chaining or a null check.

### Provider-based hook variant

The framework package exposes a provider-based variant for cases where you need explicit provider control.

```ts
import { useFeature } from '@equinor/fusion-framework-react/feature-flag';

const value = useFeature(provider, 'my-flag-key');
```

Use this variant only when working at framework level outside the app package scope.

## Known API ambiguity

Public Fusion Framework sources show inconsistent spelling for the read-only flag property:
- Some sources use `readonly`
- Older docs mention `readOnly`

Always verify the expected spelling against your local types or a live Fusion MCP query before finalizing code that reads this property.

## Rollout and cleanup

Feature flags are temporary. Every flag needs an owner and a removal plan.

- **Define an owner** in a comment or in the flag `description`.
- **State the release milestone** at which the flag will be removed.
- **Test both paths** — the application must work correctly with the flag on and with the flag off.
- **Remove completely** — when the rollout is done, delete the flag definition, all consumers, and any dead code branches together in one PR.
- **Avoid long-lived flags** — flags that outlive their rollout become maintenance debt.

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
