# Configure Services (HTTP Clients)

How to register and consume HTTP clients in a Fusion Framework app.

## Registration strategies

There are three ways to register a named HTTP client. Choose the simplest one that fits:

| Strategy | Where | When to use |
|---|---|---|
| `app.config.ts` endpoints | `app.config.ts` | Default — auto-registered, no code in `config.ts` |
| `configureHttpClient` | `config.ts` | Custom transport behavior (headers, guards, custom client class) |
| Service discovery | `config.ts` | Framework-managed Fusion platform services |

### Via `app.config.ts` (auto-registration)

Endpoints defined here are **automatically registered** as named HTTP clients — no extra code in `config.ts`:

```typescript
import { defineAppConfig } from '@equinor/fusion-framework-cli/app';

export default defineAppConfig((_env, _args) => ({
  environment: {},
  endpoints: {
    myApi: {
      url: 'https://api.example.com',
      scopes: ['api://my-api/.default'],
    },
  },
}));
```

After initialization, use the client directly:

```typescript
const client = useHttpClient('myApi');
const data = await client.json('/items');
```

### Via `configureHttpClient` in `config.ts`

Use when the endpoint needs custom transport behavior or is not in `app.config.ts`:

```typescript
import type { AppModuleInitiator } from '@equinor/fusion-framework-react-app';

export const configure: AppModuleInitiator = (configurator, env) => {
  configurator.configureHttpClient('my-api', {
    baseUri: 'https://api.example.com',
    defaultScopes: ['api://my-api/.default'],
    onCreate: (client) => {
      client.requestHandler.setHeader('X-App-Name', 'my-app');
    },
  });
};
```

### Multiple clients in one step

Access `configurator.http` directly when registering several backends in one block:

```typescript
configurator.http.configureClient('catalog', {
  baseUri: '/api/catalog',
});
configurator.http.configureClient('search', {
  baseUri: '/api/search',
});
```

### Custom client class

Extend `HttpClient` for domain-specific methods:

```typescript
import { HttpClient } from '@equinor/fusion-framework-module-http/client';

class ApiClient extends HttpClient {
  getHealth(): Promise<{ status: string }> {
    return this.json('/health');
  }
}

configurator.configureHttpClient('api', {
  baseUri: '/api',
  ctor: ApiClient,
});

// Usage:
const client = framework.modules.http.createCustomClient<ApiClient>('api');
const health = await client.getHealth();
```

### Via service discovery

For Fusion platform services:

```typescript
configurator.useFrameworkServiceClient('people');
```

## Consuming HTTP clients

In React components and hooks, **always prefer `@equinor/fusion-framework-react-app/*` hooks** over direct module access. Reserve `useAppModule` and `framework.modules.*` for non-React contexts (route loaders, standalone scripts).

### Preferred: `useHttpClient` hook

```typescript
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

const MyComponent = () => {
  const client = useHttpClient('my-api');
  // client.json('/endpoint')       — returns parsed JSON (Promise)
  // client.fetchAsync('/endpoint') — returns raw Response (Promise)
  // client.fetch$('/endpoint')     — returns an Observable
};
```

### Fallback: `useAppModule`

Use only when a dedicated react-app hook is not available:

```typescript
import { useAppModule } from '@equinor/fusion-framework-react-app';

const http = useAppModule('http');
const client = http.createClient('my-api');
```

### Ad-hoc clients

For one-off calls without a named configuration:

```typescript
// In config.ts, inside your Fusion configuration callback where `framework` is provided:
const inlineClient = framework.modules.http.createClient({
  baseUri: '/api/search',
});

// Or with an absolute URL:
const urlClient = framework.modules.http.createClient('https://api.example.com');
```
