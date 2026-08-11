# Public Fusion Framework Feature-Flag Reference

Use this reference when Fusion MCP is unavailable or too weak to answer the user's question.

This file intentionally stays grounded in public `equinor/fusion-framework` sources that were easy to inspect during authoring. It is a fallback reference, not a promise that every API name is unchanged in the user's local version.

## Confirmed public surfaces

### App-level configuration

The public feature-flag cookbook shows app-level configuration through:

```ts
import { enableFeatureFlag } from '@equinor/fusion-framework-react-app/feature-flag';

export const configure: AppModuleInitiator = (appConfigurator) => {
  enableFeatureFlag(appConfigurator, [
    {
      key: Feature.Basic,
      title: 'Basic',
    },
  ]);
};
```

Observed in the public repository:
- `cookbooks/app-react-feature-flag/src/config.ts`

### Framework-level configuration

The public module documentation shows framework-level setup through:

```ts
import { enableFeatureFlagging } from '@equinor/fusion-framework-module-feature-flag';
import {
  createLocalStoragePlugin,
  createUrlPlugin,
} from '@equinor/fusion-framework-module-feature-flag/plugins';

enableFeatureFlagging(config, (builder) => {
  builder.addPlugin(createLocalStoragePlugin([{ key: 'fusionDebug', title: 'Fusion debug log' }]));
  builder.addPlugin(createUrlPlugin(['fusionDebug']));
});
```

Observed in the public repository:
- `packages/modules/feature-flag/README.md`
- `packages/dev-portal/src/config.ts`

### Hook usage

The public cookbook shows app-level usage through:

```tsx
import { useFeature } from '@equinor/fusion-framework-react-app/feature-flag';

const basicFeature = useFeature(Feature.Basic);

<Switch
  checked={basicFeature.feature?.enabled}
  onChange={() => basicFeature.toggleFeature()}
/>
```

Observed in the public repository:
- `cookbooks/app-react-feature-flag/src/FeatureFlags.tsx`

The public framework package also exposes a provider-based hook shape:

```ts
useFeature(provider, key)
```

Observed in the public repository:
- `packages/react/framework/src/feature-flag/useFeature.ts`

### Useful feature properties

Public sources show feature-flag objects using fields such as:
- `key`
- `title`
- `description`
- `enabled`
- `value`
- `source`

Public examples also show a read-only flag property, but the spelling is inconsistent across sources. See caveats below.

## Practical guidance anchored in the public sources

Use the public evidence to help with these choices:

1. App-local toggle with a small static list:
   - Start from `enableFeatureFlag(appConfigurator, [...])`.

2. Framework or shared-module toggle behavior with plugins:
   - Start from `enableFeatureFlagging(config, builder => ...)`.
   - Consider `createLocalStoragePlugin` when local persistence is desired.
   - Consider `createUrlPlugin` when query-string toggling is desirable.

3. Component consumption:
   - Use `useFeature(key)` when working at the app package level.
   - Read `feature?.enabled`, `feature?.description`, and optional typed `feature?.value`.
   - Toggle through `toggleFeature()` or `toggleFeature(true | false)`.

## Known caveats to surface explicitly

### `readonly` vs `readOnly`

Public sources are not perfectly aligned:
- `cookbooks/app-react-feature-flag/src/config.ts` uses `readonly: true`
- `cookbooks/app-react-feature-flag/src/FeatureFlags.tsx` reads `feature.readonly`
- older public docs mention `readOnly`

Do not guess which form is correct for the user's version. Tell them to confirm against local types or live Fusion MCP results before finalizing code.

### Future API-service note

Public docs mention a future direction where feature flags may be provided as an API service. Treat that as forward-looking context, not as the current default implementation path unless current local code or live MCP confirms it.

## Public source map

- Module docs:
  - https://github.com/equinor/fusion-framework/blob/main/packages/modules/feature-flag/README.md
- App guide:
  - https://github.com/equinor/fusion-framework/blob/main/vue-press/src/guide/app/feature-flag.md
- Cookbook:
  - https://github.com/equinor/fusion-framework/tree/main/cookbooks/app-react-feature-flag
- Example config:
  - https://github.com/equinor/fusion-framework/blob/main/cookbooks/app-react-feature-flag/src/config.ts
- Example component:
  - https://github.com/equinor/fusion-framework/blob/main/cookbooks/app-react-feature-flag/src/FeatureFlags.tsx
- App hook variant:
  - https://github.com/equinor/fusion-framework/blob/main/packages/react/app/src/feature-flag/useFeature.ts
- Framework hook variant:
  - https://github.com/equinor/fusion-framework/blob/main/packages/react/framework/src/feature-flag/useFeature.ts