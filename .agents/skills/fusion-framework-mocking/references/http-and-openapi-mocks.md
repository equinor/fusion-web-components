# HTTP and OpenAPI mocks

There is no separate HTTP mock client or configurator — register a short-circuiting middleware
through `configurator.http.addMiddleware(...)` on the **real** `IHttpClientConfigurator` instead.
`configureClient`, `baseUri`, `defaultScopes`, `requestHandler`, `onCreate` all still apply; a
middleware only wraps the network call itself.

## Quick start

```typescript
configurator.configureHttpClient('catalog', { baseUri: 'https://api.example.com' });
configurator.http.addMiddleware(async (uri, init, next) =>
  uri === 'https://api.example.com/items' ? Response.json([{ id: 1 }]) : next(uri, init),
);

const items = await fusion.modules.http.createClient('catalog').json('/items');
```

## The middleware contract

```typescript
type HttpMiddleware = (
  uri: string,
  init: RequestInit,
  next: (uri: string, init: RequestInit) => Promise<Response>,
) => Response | Promise<Response> | Observable<Response>;
```

- **A middleware decides for itself whether to answer or fall through** — return a `Response` to
  handle the request, or call and return `next(uri, init)` to continue to whichever middleware (or
  the real network call) is registered next. There is no separate "declined" return value; unlike
  a router, this is an onion-style chain, so a middleware can also inspect what `next(...)`
  resolves to and decide based on that (a retry, for example).
- **Registration order is outermost-first.** The first middleware registered wraps every other
  one, including the real network call — it sees the request first and the response last.
- **A test middleware composes with real app config unchanged** — `addMiddleware` wraps
  `_performFetch` rather than replacing it, so the exact same client and configuration a real app
  registers is what a test exercises; only the boundary that would reach the network is
  short-circuited.

An unmatched request eventually reaches the real network. A test that must stay fully offline
should register middleware for every expected request and fail deliberately on unexpected ones.

## Several routes with `createRouterMiddleware`

`createRouterMiddleware(baseUri, build)` (`@equinor/fusion-framework-module-http/mock`) is a
lightweight, Express-like router for a base URI with several routes — path templates (`:id`) and
per-method registration, without hand-rolling `RegExp` matching in every middleware:

```typescript
import { createRouterMiddleware } from '@equinor/fusion-framework-module-http/mock';

configurator.http.addMiddleware(
  createRouterMiddleware('https://context.example.com', (router) => {
    router.get('/contexts/:id/relations', () => Response.json([{ id: 'ctx-3' }]));
    router.get('/contexts', () => Response.json([{ id: 'ctx-2' }]));
    router.get('/contexts/:id', ({ params }) => Response.json({ id: params.id }));
  }),
);
```

A handler receives `{ params, url, request }`. A request outside `baseUri`, or matching no
registered route, falls through to `next` — routes are tried in registration order and the first
match wins. Deliberately not MSW-compatible: it stays inside `addMiddleware`'s own request
pipeline rather than intercepting the network boundary, so it has none of MSW's response
transformers, `onUnhandledRequest` diagnostics, or wildcard patterns.

## Faking an entire OpenAPI document

`createOpenApiMockMiddleware(openApiMock)` (`@equinor/fusion-framework-module-http/mock`) adapts an
`@equinor/fusion-openapi-mock` instance into an `HttpMiddleware`, so a real
`openapi.json`/`openapi.yaml` fakes every response until a specific operation needs overriding:

```typescript
import { createOpenApiMock } from '@equinor/fusion-openapi-mock';
import { createOpenApiMockMiddleware } from '@equinor/fusion-framework-module-http/mock';

const openApiMock = createOpenApiMock(openApiDocument, { seed: 42 });

configurator.configureHttpClient('catalog', { baseUri: 'https://api.example.com' });
configurator.http.addMiddleware(createOpenApiMockMiddleware(openApiMock));
```

A request that matches no operation in the document falls through to `next`, so this composes
with other middleware, or the real network call, registered around it.

### `@equinor/fusion-openapi-mock` itself

Fakes OpenAPI 3 responses straight from a spec document — no hand-written fixtures needed until a
specific edge case (a `404`, a boundary value) needs one. Has no opinion on how the fake is wired
into a transport (this module's HTTP middleware, `openapi-backend`, Express, or a hand-rolled
server).

```typescript
import { createOpenApiMock, fetchOpenApiDocument } from '@equinor/fusion-openapi-mock';

// Fetch the spec from wherever it's published, so the test mocks against the real,
// currently-published contract instead of a copy that can drift.
const openapi = await fetchOpenApiDocument('https://api.example.com/openapi.json');
const mock = createOpenApiMock(openapi);

const response = await mock.resolve({ method: 'GET', path: '/pets/1' });
// response.status -> the operation's declared success status
// response.mock   -> a value shaped like the operation's response schema
// response.params -> { petId: '1' }, extracted from the /pets/{petId} template
```

A document already available locally works the same way:

```typescript
import openapi from './openapi.json' with { type: 'json' };
const mock = createOpenApiMock(openapi);
```

**Zero-friction baseline:** every operation with an `operationId` is indexed. The first time it's
requested, its declared "success" response (lowest `2xx`, falling back to `default`) is faked from
that response's JSON schema (`$ref`s resolved against the same document). Operations without an
`operationId` are not routable or overridable.

**Override an edge case** at construction, or later with `.register`:

```typescript
const mock = createOpenApiMock(openapi, {
  overrides: {
    getPetById: ({ params }) => ({ status: 404, mock: { message: `Pet ${params.petId} not found` } }),
  },
});

// or start from the generated baseline and tweak one field
mock.register('getPetById', async ({ params, mockResponseForOperation }) => {
  const baseline = await mockResponseForOperation();
  return { ...baseline, mock: { ...baseline.mock, id: params.petId } };
});
```

**Repeatable tests with `seed`:** `createOpenApiMock(openapi, { seed: 42 })` — the same document
and seed always fake the same values, so a test can assert a concrete expected value instead of
`expect.any(...)`.

**Realistic fields with `@faker-js/faker`:** annotate a schema property with
`"faker": "module.method"` (this package's own OpenAPI extension), or supply an out-of-band
`fields` map keyed `"<ModelName>.<field>"` when the schema itself isn't yours to edit:

```typescript
const mock = createOpenApiMock(openapi, {
  seed: 42,
  fields: {
    'User.email': 'internet.email',
    'User.id': ({ faker, path }) => `usr_${path.join('-')}_${faker.string.uuid()}`,
  },
});
```

A function field faker receives `{ modelName, path, faker }` — the same seeded `faker` instance
generating the rest of the response, so it stays deterministic under `options.seed`. Load a
`fields` map from a sidecar file with `loadFakerMap` (from the Node-only
`@equinor/fusion-openapi-mock/node` entry point) when the mapping should live next to the tests
instead of inline.

**Notes:**
- A path parameter (`{petId}`) always matches exactly one path segment.
- A schema that (indirectly) references itself would recurse forever; the second time a `$ref` is
  seen along one branch, `dereferenceSchema` substitutes an empty (permissive) schema instead.

## Asserting calls with `vi.fn`

A middleware is a plain function, so a `vi.fn` spy works as one directly:

```typescript
const middleware = vi.fn(async () => Response.json({ ok: true }));
configurator.http.addMiddleware(middleware);

await client.json('/items');

expect(middleware).toHaveBeenCalledOnce();
const [uri, init] = middleware.mock.calls[0];
expect(init.method ?? 'GET').toBe('GET');
```

## Choosing a strategy

| Need | Preferred boundary | Why |
| --- | --- | --- |
| One known context/domain item | a module's `enable*Mock` (see `module-mocks.md`) | Seeds domain data without transport setup |
| Service integration itself is under test | HTTP middleware | Exercises service discovery, HTTP, and client behavior together |
| One or two HTTP routes | hand-written `HttpMiddleware` | Keeps response behavior explicit |
| Several routes under one base URI | `createRouterMiddleware` | Path-template routing without hand-rolled `RegExp` |
| An API described by OpenAPI | `createOpenApiMockMiddleware` | Generates deterministic responses for the whole spec |
| An individual client call | `vi.spyOn`/`vi.fn` | Uses the test runner's own call assertions and reset semantics |

## Related

- `references/module-mocks.md` — per-module mocks, including context's own HTTP-vs-seed tradeoff
- `references/framework-and-app-mocks.md` — `mockFramework`/`mockAppModules` and design rules
