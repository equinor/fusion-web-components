# Framework and app mocks

## Why this exists

Fusion Framework cannot start without authenticating a user and resolving services from a
registry. Both reach outside the process, so a test either supplies real credentials or hand
builds a replacement for every built-in module. `@equinor/fusion-framework/mock` runs the
**real** configure → initialize pipeline with the **real** built-in modules, and substitutes
only the boundaries that leave the process. Module wiring, configuration validation, and
lifecycle hooks behave exactly as they do in production, so a test still catches wiring mistakes.

> [!IMPORTANT]
> This entry point contains **no mock logic of its own**. Every module owns and exports its own
> test double from its own `./mock` entry point:
>
> ```text
> @equinor/fusion-framework-module-msal/mock               -> enableMsalMock
> @equinor/fusion-framework-module-service-discovery/mock  -> mockServiceDiscovery
> @equinor/fusion-framework/mock                           -> composes the above
> ```
>
> A mock cannot drift from the interface it stands in for (they live in the same package, same
> build), versions with its own module (msal `v10` gets msal `v10`'s mock), and an application's
> own module works the same way — exposing its own `/mock` entry point without this package
> knowing it exists.

Only the **client** — the object performing network I/O — is replaced. Providers, configurators,
schema validation, and module `initialize` are all real:

```typescript
const fusion = await mockFramework((configurator) => {
  configurator.msal.setClientConfig({ auth: { clientId: 'my-app', tenantId: 'my-tenant' } });
});

const token = await fusion.modules.auth.acquireAccessToken();
// scope is 'my-app/.default' — resolved by the real provider, not by the test double
```

Tokens and resolved services are deterministic across runs and machines. `createMockToken` uses a
fixed issue time, so a token can be compared or snapshotted directly.

The package has **no test-runner dependency** — it builds a real framework instance and returns
it; assertions are the caller's concern. `vitest` appears only in its own `devDependencies`. This
is why there is no Fusion mocking API for individual calls: mock clients are plain classes with
ordinary methods, so `vi.spyOn`, `bun:test`'s `spyOn`, and Node's `t.mock.method` all work on them
directly, with their own call assertions, argument matchers, and reset semantics.

## `mockFramework`

```typescript
import { mockFramework } from '@equinor/fusion-framework/mock';

const fusion = await mockFramework();

fusion.modules.auth.account?.name; // 'Test User'
await fusion.modules.serviceDiscovery.resolveService('apps'); // resolves offline
```

Every module declared by `FrameworkConfigurator` is initialized with zero configuration: `event`,
`auth`, `http`, `serviceDiscovery`, `context`, and `telemetry`.

### The configurator

Modules whose boundary is mocked expose their mock configurator directly on the callback's
`configurator` argument — the **real** module configurators, so the real builder API, validation,
and provider are used:

| Property | Type |
| --- | --- |
| `msal` | `MsalMockConfigurator` |
| `serviceDiscovery` | `ServiceDiscoveryMockConfigurator` |
| `http` | `IHttpClientConfigurator` (the real configurator — no separate mock client) |
| `context` | `ContextMockConfigurator` |
| `telemetry` | `TelemetryMockConfigurator` |

```typescript
const fusion = await mockFramework((configurator) => {
  configurator.msal.setAccount({ name: 'Ada Lovelace' });
  configurator.serviceDiscovery.setBaseUri('http://localhost:6669');
});
```

Mocks are registered **before** the callback runs, so anything the callback configures wins —
including replacing a mock with a different one. The configurator *is* a `FrameworkConfigurator`,
so every real `enableX`/`configureX` helper (and `onConfigured`) is available and behaves
normally.

### Registering your own modules

Pass module descriptors as a type argument — they are then typed on both the configurator and the
returned instance, so no cast is needed:

```typescript
const fusion = await mockFramework<[InvoiceModule]>((configurator) => {
  enableInvoicesMock(configurator, { total: 42 });
});

await fusion.modules.invoices.getInvoice('inv-1'); // fully typed
```

`configurator.addModule((c) => enableInvoicesMock(c, { total: 42 }))` is sugar for the same call.

> [!NOTE]
> Only modules that ship a mock configurator get a property such as `configurator.msal`.
> Everything else is registered exactly as it is in production — through its own `enableX` helper
> or `configurator.addConfig`.

### Bringing your own configurator

`FrameworkMockConfigurator` can be constructed directly and initialized with `init`, useful when a
test needs to hold on to the configurator:

```typescript
import { init } from '@equinor/fusion-framework';
import { FrameworkMockConfigurator } from '@equinor/fusion-framework/mock';

const configurator = new FrameworkMockConfigurator();
configurator.msal.setAccount({ name: 'Ada Lovelace' });

const fusion = await init(configurator);
```

## `mockAppModules` — app-level modules without React

`@equinor/fusion-framework-app/mock` runs an application's real module pipeline in tests — the
real `event`/`http`/`msal` modules, the real `AppConfigurator` configuration pipeline, and real
lifecycle — while only network access, credentials, and a running parent portal are substituted.
This entry point has no dependency on Vitest or any other test runner.

```typescript
import { mockAppModules } from '@equinor/fusion-framework-app/mock';

const manifest = { appKey: 'my-app', displayName: 'My App', description: 'My app', type: 'standalone' } as const;
const modules = await mockAppModules(undefined, { manifest });
```

`mockAppModules(cb, env, fusion?)` runs the same pipeline `configureModules` produces, against a
mocked parent:

- `cb` — configuration callback (an `AppMockConfigurator`, which *is* an `AppConfigurator`), or
  `undefined` to skip it.
- `env` — the application environment (`manifest`, `config`, `basename`).
- `fusion` — optional parent Fusion instance; defaults to a fresh `mockFramework` instance with
  `app` already enabled, serving this app's own manifest and config.

```typescript
const modules = await mockAppModules(
  (configurator) => {
    configurator.useFrameworkServiceClient('portal-api');
    configurator.http.addMiddleware(async (uri, init, next) =>
      uri === 'https://portal-api.fusion.test/items' ? Response.json([{ id: 1 }]) : next(uri, init),
    );
  },
  { manifest },
);

const items = await modules.http.createClient('portal-api').json('/items');
```

### `enableAppManifestMock(configurator, env)`

Registers the `app` module on a parent `mockFramework` configurator, serving `env.manifest` and
`env.config` for this app's own `appKey` while delegating every other request (other app keys,
builds, settings) to whatever service discovery, or a pre-configured HTTP client, would really
resolve. `mockAppModules` uses this internally to build its zero-config default parent — call it
directly when a test needs to customize `serviceDiscovery` while keeping this app's own manifest
servable:

```typescript
import { mockFramework } from '@equinor/fusion-framework/mock';
import type { AppModule } from '@equinor/fusion-framework-module-app';
import { enableAppManifestMock, mockAppModules } from '@equinor/fusion-framework-app/mock';

const env = { manifest: { appKey: 'my-app', displayName: 'My App', description: 'My app', type: 'standalone' } as const };

const fusion = await mockFramework<[AppModule]>((configurator) => {
  configurator.serviceDiscovery.setBaseUri('http://localhost:9999');
  enableAppManifestMock(configurator, env);
});

const modules = await mockAppModules(undefined, env, fusion);
```

`AppMockConfigurator` extends the real `AppConfigurator`, so any configuration code written
against a real app (named HTTP clients, service-discovery clients, bookmark setup) works
unchanged against it in a test.

## Related

- `references/module-mocks.md` — per-module defaults, builder methods, signed-out/token recipes
- `references/http-and-openapi-mocks.md` — faking HTTP responses and whole OpenAPI documents
- `references/custom-module-mocks.md` — adding a mock for a module that isn't a built-in
