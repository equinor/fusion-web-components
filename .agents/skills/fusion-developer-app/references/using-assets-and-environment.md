# Using Assets and Runtime Configuration

Separating bundled assets from runtime configuration in Fusion Framework apps.

## Put runtime values in app config

Use `app.config.ts` for:
- environment-specific flags and numeric or string settings
- API endpoints and scopes
- values that may differ between `ci`, `test`, `prod`, or PR environments

```typescript
import { defineAppConfig } from '@equinor/fusion-framework-cli/app';

export default defineAppConfig((env, _args) => ({
  environment: {
    logLevel: env.environment === 'ci' ? 0 : 4,
    environmentName: env.environment,
  },
  endpoints: {
    myApi: {
      url: 'https://api.example.com',
      scopes: ['api://my-api/.default'],
    },
  },
}));
```

Environment-specific files such as `app.config.prod.ts` override `app.config.ts` when present.

## Use runtime config in `config.ts`

```typescript
import type { AppModuleInitiator } from '@equinor/fusion-framework-react-app';

interface AppEnvironment {
  logLevel: number;
}

export const configure: AppModuleInitiator = (configurator, env) => {
  configurator.configureHttpClient('myApi', {
    baseUri: env.config?.getEndpoint('myApi')?.url,
    defaultScopes: env.config?.getEndpoint('myApi')?.scopes,
  });

  const logLevel = (env.config?.environment as AppEnvironment)?.logLevel ?? 4;
  configurator.logger.level = logLevel;
};
```

## Use runtime config in React components

```typescript
import { useAppEnvironmentVariables } from '@equinor/fusion-framework-react-app';

export const EnvironmentDisplay = () => {
  const { value, complete, error } = useAppEnvironmentVariables();

  if (!complete) {
    return <p>Loading runtime config...</p>;
  }

  if (error) {
    return <p>Unable to load runtime config</p>;
  }

  return <pre>{JSON.stringify(value, null, 2)}</pre>;
};
```

## Endpoints and service discovery

Use `endpoints` in `app.config.ts` for explicit URLs or scopes.

Defining an endpoint key overrides service discovery for the same key (useful for PR environments, but be deliberate).

## Static assets

Fusion serves application assets through the app lifecycle and App Proxy path after the app is deployed. Treat images, icons, and other static resources as bundled application assets, not runtime configuration.

Use the project's existing asset import pattern for:
- local images and illustrations
- icons or logos shipped with the app
- static JSON or other bundled resources

Don't put deployment-specific values in bundled assets. Use `app.config.ts` for per-environment selection instead of hardcoding environment logic in components.

## Choosing the right storage

| Concern | Use |
|---|---|
| API base URL, scopes, log level, environment name | `app.config.ts` |
| Per-user preference | App settings |
| Shareable view state | Bookmarks |
| Images, logos, bundled static files | Application assets in source |

## Pitfalls

- Hardcoded URLs that should come from `app.config.ts`
- Storing secrets in source-controlled config or asset files
- Using app settings for deployment config
- Using bookmarks for non-shareable runtime values

## Relevant sources

- Fusion docs app config guide
- Fusion docs app lifecycle guide
- environment variables cookbook