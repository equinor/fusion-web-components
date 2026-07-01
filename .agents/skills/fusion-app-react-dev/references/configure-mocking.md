# Configure Dev Server (Mocking & Proxying)

How to mock API responses and proxy to local backends during development using `dev-server.config.ts`.

All dev-time API configuration lives in `dev-server.config.ts` at the project root — **not** in `app.config.ts`. The Fusion CLI dev server loads this file automatically and merges it with its defaults.

## Mock API routes

Define middleware routes that return mock data without a real backend:

```typescript
// dev-server.config.ts
import { defineDevServerConfig } from '@equinor/fusion-framework-cli/dev-server';

export default defineDevServerConfig(() => ({
  api: {
    routes: [
      {
        match: '/api/items',
        middleware: (_req, res) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify([
            { id: '1', name: 'Item A' },
            { id: '2', name: 'Item B' },
          ]));
        },
      },
      {
        match: '/api/items/:id',
        middleware: (req, res) => {
          const id = req.params?.id;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ id, name: `Item ${id}` }));
        },
      },
    ],
  },
}));
```

App code uses `fetch('/api/items')` or `useHttpClient(name)` — the dev server intercepts matching routes before anything hits the network.

## Proxy to a local backend (simple)

When running a local API (e.g. Docker Compose), add a proxy route that forwards requests to the upstream:

```typescript
// dev-server.config.ts
import { defineDevServerConfig } from '@equinor/fusion-framework-cli/dev-server';

const MY_API_TARGET = process.env.MY_API_URL ?? 'http://localhost:3000';

export default defineDevServerConfig(() => ({
  api: {
    routes: [
      {
        match: '/my-api/*path',
        proxy: {
          target: MY_API_TARGET,
          rewrite: (path) => path.replace(/^\/my-api/, ''),
          changeOrigin: true,
          secure: false,
        },
      },
    ],
  },
}));
```

**What happens:**
1. Request to `/my-api/v1/example` matches `/my-api/*path`
2. Proxy strips the `/my-api` prefix
3. Forwards to `http://localhost:3000/v1/example`

### Optional: named HTTP client

No app config is required — `fetch('/my-api/...')` works directly. If you want a named client:

```typescript
// src/config.ts
export const configure: AppModuleInitiator = async (configurator) => {
  configurator.useHttpClient('my-api', {
    baseUri: '/my-api',
  });
};
```

Then use `useHttpClient('my-api')` instead of raw `fetch()`.

## Proxy with service discovery (authenticated)

When the backend should appear in Fusion service discovery (so the HTTP module acquires tokens automatically), use `processServices`:

```typescript
// dev-server.config.ts
import { defineDevServerConfig, processServices } from '@equinor/fusion-framework-cli/dev-server';

const MY_API_KEY = 'my-api';
const MY_API_TARGET = process.env.MY_API_URL ?? 'https://api.example.com';
const MY_API_SCOPES = ['api://my-api/.default'];
const MY_API_MATCH = `/${MY_API_KEY}/*path`;

export default defineDevServerConfig(() => ({
  api: {
    processServices: (data, args) => {
      // Keep all existing service discovery proxies
      const existing = processServices(data, args);

      // Build a URI that points back to the local dev server
      const referer = args.request.headers.referer ?? 'http://localhost';
      const localUri = new URL(`${args.route}/${MY_API_KEY}`, referer).href;

      return {
        data: [
          ...existing.data.filter((svc) => svc.key !== MY_API_KEY),
          {
            key: MY_API_KEY,
            name: 'My API (local dev proxy)',
            uri: localUri,
            scopes: MY_API_SCOPES,
            defaultScopes: MY_API_SCOPES,
          },
        ],
        routes: [
          ...(existing.routes ?? []),
          {
            match: MY_API_MATCH,
            proxy: {
              target: MY_API_TARGET,
              rewrite: (path) => path.replace(`/${MY_API_KEY}`, ''),
              changeOrigin: true,
              secure: false,
            },
          },
        ],
      };
    },
  },
}));
```

### App setup

Register the discovered service once:

```typescript
// src/config.ts
export const configure: AppModuleInitiator = async (configurator) => {
  await configurator.useFrameworkServiceClient('my-api');
};
```

Then in components:

```typescript
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

const client = useHttpClient('my-api');
// The HTTP module acquires a bearer token for the configured scopes
// and the dev-server proxy forwards the authenticated request upstream
```

### Request flow

```
App startup
  → configurator.useFrameworkServiceClient('my-api')
  → service discovery resolves my-api (injected by dev-server)
Component code
  → useHttpClient('my-api')
  → HTTP module acquires token for api://my-api/.default
  → GET {local proxy uri}/v1/example with Authorization header
  → dev-server proxy matches /my-api/*path
  → proxy strips prefix, forwards to https://api.example.com/v1/example
  → upstream API receives the bearer token
```

## Choosing a strategy

| Strategy | Auth? | Service discovery? | Use when |
|---|---|---|---|
| Mock routes | No | No | No backend yet, need static/fake data |
| Simple proxy | Manual | No | Local backend (Docker), auth optional |
| Service discovery proxy | Automatic | Yes | Backend needs bearer tokens via MSAL |

## Configuration format

`dev-server.config.ts` supports two export styles:

```typescript
// Object export (simple)
export default {
  api: { routes: [...] },
};

// Function export (conditional logic, access to base config)
import { defineDevServerConfig } from '@equinor/fusion-framework-cli/dev-server';

export default defineDevServerConfig(({ base }) => ({
  ...base,
  api: { routes: [...] },
}));
```

Routes with identical `match` paths are replaced (yours wins). Other arrays are deduplicated automatically.
