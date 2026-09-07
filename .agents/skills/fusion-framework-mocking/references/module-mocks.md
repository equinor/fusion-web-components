# Per-module mocks

Every mock lives at its owning module's own `/mock` entry point and has no test-runner
dependency. When used through `@equinor/fusion-framework/mock`'s `FrameworkMockConfigurator`,
the built-ins (`msal`, `serviceDiscovery`, `context`, `telemetry`) are reachable directly as
`configurator.<name>` — everything else is registered through its own `enable*Mock` helper.

| App dependency | Import path | Primary API |
| --- | --- | --- |
| Browser authentication (MSAL) | `@equinor/fusion-framework-module-msal/mock` | `enableMsalMock`, `MsalMockClient`, `createMockToken` |
| Node authentication (Azure Identity) | `@equinor/fusion-framework-module-azure-identity/mock` | `enableAuthMock`, `MockAuthProvider` |
| Node authentication (MSAL Node) | `@equinor/fusion-framework-module-msal-node/mock` | `enableAuthMock`, `MockAuthProvider` |
| Service discovery | `@equinor/fusion-framework-module-service-discovery/mock` | `enableServiceDiscoveryMock`, `mockServiceDiscovery`, `ServiceDiscoveryMockConfigurator` |
| Context | `@equinor/fusion-framework-module-context/mock` | `enableContextMock`, `ContextMockConfigurator` |
| Context fixtures | `@equinor/fusion-framework-module-context/mock/fixtures` | `createContextItemFactory`, `createContextItems` (uses `@faker-js/faker`) |
| Bookmarks | `@equinor/fusion-framework-module-bookmark/mock` | `enableBookmarkMock`, `BookmarkMockConfigurator` |
| Feature flags | `@equinor/fusion-framework-module-feature-flag/mock` | `enableFeatureFlagMock`, `FeatureFlagMockConfigurator` |
| Analytics | `@equinor/fusion-framework-module-analytics/mock` | `MockAnalyticsAdapter` |
| Telemetry | `@equinor/fusion-framework-module-telemetry/mock` | `enableTelemetryMock`, `MockTelemetryAdapter` |
| App manifest/config | `@equinor/fusion-framework-app/mock` | `mockAppModules`, `enableAppManifestMock`, `MockAppClient` |
| HTTP routes and OpenAPI | `@equinor/fusion-framework-module-http/mock` | see `http-and-openapi-mocks.md` |

The `event` module has **no** mock entry point — `waitForEvent`/`watchEvents` from
`@equinor/fusion-framework-module-event/utils` observe the real event provider directly; they are
plain observer functions, not test doubles, and work against any real `IEventModuleProvider`.

## Authentication (MSAL, browser)

```typescript
import { enableMsalMock } from '@equinor/fusion-framework-module-msal/mock';

enableMsalMock(configurator, (builder) => {
  builder.setAccount({ name: 'Ada Lovelace', username: 'ada@equinor.com' });
});
```

Only `IMsalClient` is substituted — `MsalConfigurator`, `MsalProvider`, and schema validation all
run for real, so scope resolution and silent-first token acquisition behave as they do in
production.

**Defaults:** a user named `Test User` is signed in; tokens are real JWTs minted in-process with a
fixed issue time (deterministic, snapshot-safe). When no client configuration is declared, a
stand-in one is used so the app boots without real credentials.

| Option | Default | Purpose |
| --- | --- | --- |
| `name` | `Test User` | Display name |
| `username` | `test.user@equinor.com` | UPN / email |
| `userId` | `fusion-mock-user` | Object ID |
| `tenantId` | the client's configured tenant | Tenant |
| `scopes` | `fusion-mock-scope` | Granted when a request specifies none |
| `signedOut` | `false` | Start without a signed-in user |

The user is signed in **before** `MsalProvider.initialize()` runs — so `setRequiresAuth(true)`
combined with a `signedOut` account exercises the real automatic-login path, not a state assigned
after the fact:

```typescript
enableMsalMock(configurator, (builder) => builder.setAccount(null)); // nobody signed in
enableMsalMock(configurator, (builder) => builder.setAccount({ signedOut: true })); // identity kept, not signed in
```

`null` forgets the identity (a subsequent login produces the default user); `signedOut: true`
keeps it (a subsequent login produces the named user) — reach for the latter when the assertion
is about *who* signs in.

Return an exact token when a backend mock validates claims itself:

```typescript
enableMsalMock(configurator, (builder) => builder.setToken(token)); // also signs in the token's claims
enableMsalMock(configurator, (builder) => builder.setAccount({ name: 'Ada Lovelace' }).setToken(token, true)); // keep the account
```

Mint a token directly, without a client, for code that only needs one (e.g. an HTTP interceptor
test):

```typescript
import { createMockToken } from '@equinor/fusion-framework-module-msal/mock';

const token = createMockToken({ oid: 'fusion-mock-user' });
```

When a suite shares one framework instance but needs a different user per test:

```typescript
beforeEach(() => {
  fusion.modules.auth.client.setActiveAccount(account);
});
```

Spy on the client directly for individual-call assertions:

```typescript
vi.spyOn(fusion.modules.auth.client, 'acquireToken').mockResolvedValue(result);
afterEach(() => vi.restoreAllMocks());
```

## Authentication (Node — Azure Identity / MSAL Node)

Both `@equinor/fusion-framework-module-azure-identity/mock` and
`@equinor/fusion-framework-module-msal-node/mock` export the same shape:
`enableAuthMock(configurator, configure?)` and `MockAuthProvider`. Use these instead of
`token_only` mode when a test must exercise login/logout or token-refresh/expiry logic, not just a
single fixed token:

```typescript
import { enableAuthMock } from '@equinor/fusion-framework-module-azure-identity/mock';

const auth = enableAuthMock(configurator, (auth) => {
  auth.setAccount({ username: 'ada@equinor.com', signedOut: true });
});

await auth.login({ request: { scopes: ['User.Read'] } });
const token = await auth.acquireAccessToken({ request: { scopes: ['User.Read'] } });

// simulate an expired token, to exercise a consuming application's refresh path
auth.setExpiresOn(new Date(Date.now() - 1000));
```

`MockAuthProvider` registers exactly like any other `IAuthProvider` implementation — no
special-cased wiring — and makes no real network calls.

## Service discovery

```typescript
import { enableServiceDiscoveryMock } from '@equinor/fusion-framework-module-service-discovery/mock';

enableServiceDiscoveryMock(configurator, (builder) => {
  builder.setBaseUri('http://localhost:6669');
  builder.addService({ key: 'my-api' });
  builder.removeService('bookmarks');
});
```

Only `IServiceDiscoveryClient` is substituted — the real configurator, provider, and validation
run.

**Defaults** — baseline services resolve without declaring anything:

| Key | Resolves to |
| --- | --- |
| `apps` | `https://apps.fusion.test` |
| `people` | `https://people.fusion.test` |
| `context` | `https://context.fusion.test` |
| `bookmarks` | `https://bookmarks.fusion.test` |
| `notification` | `https://notification.fusion.test` |

An **undeclared** key resolves to a synthesized entry rather than throwing. Call
`setResolveUnknownServices(false)` to assert the opposite.

> [!WARNING]
> Built-in modules resolve services **while the framework starts** (the context module resolves
> `context`, for example). Combining `setResolveUnknownServices(false)` with a `setServices`
> registry that omits them fails initialization, not the assertion being written. Either keep
> synthesis on, or declare every service the framework itself needs.

| Method | Purpose |
| --- | --- |
| `setBaseUri(uri)` | Resolve every service without an explicit `uri` against this host |
| `addService(service)` / `addServices(services)` | Register services, replacing by `key` |
| `removeService(key)` | Drop a service, including a baseline one |
| `setServices(services)` | **Replace** the registry outright (baseline is dropped) |
| `setResolveUnknownServices(boolean)` | Throw instead of synthesizing unknown services |

Point `setBaseUri` at a locally running mock server (Mockoon, Prism, `ffc mock-server`) to make
**real HTTP calls to a real local server** — nothing intercepts the transport.

`mockServiceDiscovery(configurator, options?, configure?)` is a one-call shorthand:
`mockServiceDiscovery(configurator, { baseUri: 'http://localhost:6669' })`.

## Context

```typescript
import { enableContextMock } from '@equinor/fusion-framework-module-context/mock';

enableContextMock(configurator, (mock) => {
  mock.setCurrentContext({ id: 'my-ctx', type: { id: 'ProjectMaster' }, value: {} });
});
```

Only the data source is substituted — real `ContextProvider` behavior (`validateContext`,
`resolveContext`, parent-context propagation) still runs against the seeded pool.

- **Friendly layer** — `setCurrentContext`, `setContexts`, `addContext`, `setRelatedContexts` —
  seed a known item, get it back.
- **Escape hatch** — `setResolver` — a custom `resolveContext` strategy the friendly layer doesn't cover.

Defaults: the pool starts empty, no current context is selected, and looking up an unseeded id
throws an error naming the id and the seeding methods.

This is one of two ways to fake context data. The other is mocking the context API's HTTP
responses directly (`.http`, optionally with `createOpenApiMockMiddleware`), which exercises the
real `ContextModuleConfigurator`/services/HTTP pipeline — reach for that when the test needs to
cover that pipeline itself.

Generate deterministic fixtures with `@faker-js/faker` from the optional `/mock/fixtures` entry
point (install Faker only when importing this):

```typescript
import { createContextItems } from '@equinor/fusion-framework-module-context/mock/fixtures';

const [project, contract] = createContextItems([
  { type: 'ProjectMaster' },
  { type: 'Contract', parentTypeIds: ['ProjectMaster'] },
]);
```

## Bookmarks

```typescript
import { enableBookmarkMock } from '@equinor/fusion-framework-module-bookmark/mock';

enableBookmarkMock(configurator, (builder) => {
  builder.setBookmarks([{ id: 'bookmark-1', name: 'My Bookmark', appKey: 'my-app', payload: {}, created: new Date(), createdBy: { id: 'mock-user', name: 'Mock User' } }]);
  builder.setCurrentBookmark('bookmark-1');
  builder.setFavorite('bookmark-1', true);
});
```

Only `IBookmarkClient` is substituted with an in-memory implementation. Create/update/delete/
favorite operations mutate that client through the real provider flows — nothing is stubbed out.
Without a real `app`/`context` module registered alongside, `resolve.application`/`resolve.context`
fall back to trivial resolvers automatically (registering a real one still wins).

## Feature flags

```typescript
import { enableFeatureFlagMock } from '@equinor/fusion-framework-module-feature-flag/mock';

enableFeatureFlagMock(configurator, (mock) => {
  mock.addFeature({ key: 'new-search', enabled: true });
});
```

No flags are assumed by default — an empty `features` object, matching the real module's
zero-plugin behavior. `setFeatures` seeds several flags; `addFeature` adds or replaces one by key.
Toggling still runs through the real `FeatureFlagProvider`; only the initial flag source is
substituted.

## Analytics

```typescript
import { enableAnalytics } from '@equinor/fusion-framework-module-analytics';
import { MockAnalyticsAdapter } from '@equinor/fusion-framework-module-analytics/mock';

const recorder = new MockAnalyticsAdapter();

enableAnalytics(configurator, (builder) => {
  builder.setAdapter('mock', async () => recorder);
});

const event = await recorder.waitForAnalytic('button-click');
expect(event.attributes?.section).toBe('header');

recorder.getAnalytics('page-view'); // synchronous, filtered by name/array/predicate
```

`MockAnalyticsAdapter` is a genuine `IAnalyticsAdapter` — registering it works through the real
`enableAnalytics` pipeline like any other adapter. `waitForAnalytic(matcher, options?)` accepts
`timeout`/`signal` and rejects if the adapter is disposed (`[Symbol.dispose]()`) before a match.

## Telemetry

```typescript
import { enableTelemetryMock } from '@equinor/fusion-framework-module-telemetry/mock';

let recorder;
enableTelemetryMock(configurator, (builder) => {
  recorder = builder.adapter;
});

const item = await recorder.waitForItem('button-click');
expect(item.properties?.section).toBe('header');
```

`TelemetryMockConfigurator` registers one fresh, empty `MockTelemetryAdapter` under the `mock`
adapter id per configurator instance — recorded items are not shared across test instances.
`getItems(matcher?)` reads synchronously; `waitForItem` waits for an existing or future match with
an optional `timeout`/`signal`.

## Events (observation only, no mock)

```typescript
import { waitForEvent, watchEvents } from '@equinor/fusion-framework-module-event/utils';

const event = await waitForEvent(modules.event, 'myFeature.saved', { timeout: 1000 });

const handle = watchEvents(modules.event, ['myFeature.saved', 'myFeature.deleted']);
// ... exercise the code under test ...
expect(handle.events).toHaveLength(2);
handle.dispose();
```

`matcher` accepts a type string, an array of types, or a predicate over the payload. Both work
against the real event provider — a mocked host framework, an app test fixture, or a hand-rolled
`ModulesConfigurator` — with no mock, no test-runner dependency. They **observe** dispatched
events only; to intercept or cancel one before dispatch, configure the module's `onDispatch` hook
instead.

## Related

- `references/framework-and-app-mocks.md` — `mockFramework`, `mockAppModules`, design rules
- `references/http-and-openapi-mocks.md` — HTTP middleware and OpenAPI-backed responses
- `references/custom-module-mocks.md` — mocking a module that isn't a built-in
