# Adding a mock for a custom module

How to give a module a test double, whether it is one of Fusion's or your own.

## Mocking your own module

An application module needs no support from `@equinor/fusion-framework/mock`. Ship a test double
next to the module and apply it alongside the framework mocks — the same pattern every built-in
module mock follows.

Two seams matter, and the second is the one teams miss:

1. **A client seam** — `setClient`, the way `MsalConfigurator.setClient` and
   `setServiceDiscoveryClient` do — so the object performing I/O can be swapped.
2. **Configuration on the builder** — so a test can adjust behavior *without* constructing a
   client at all. `ServiceDiscoveryMockConfigurator.addService` is the reference: the configurator
   accumulates config, and the client is built from it when the module assembles its config.

```typescript
// @my-app/module-invoices/mock
export const enableInvoicesMock = (configurator, options = {}) => {
  configurator.addConfig(
    configureInvoices((builder) => {
      builder.setClient({
        getInvoice: async (id) => ({ id, total: options.total ?? 100 }),
      });
    }),
  );
};
```

```typescript
// @my-app/module-invoices — the module's own type, exported for tests
export type InvoiceModule = Module<'invoices', InvoiceClient, InvoiceConfigurator>;
```

Pass that descriptor to `mockFramework` as a type argument, and the module is typed on both the
configurator and the returned instance:

```typescript
const fusion = await mockFramework<[InvoiceModule]>((configurator) => {
  enableInvoicesMock(configurator, { total: 42 });
});

await fusion.modules.invoices.getInvoice('inv-1'); // typed, no cast
```

## Giving your module the same accessor as `.msal`/`.serviceDiscovery`

`enableInvoicesMock(configurator, options)` is enough on its own when a test only ever sets
options up front — the configurator it builds is discarded once configuration runs. Reach for an
accessor when a test needs the configurator itself, for example to assert against it after the
fact.

Subclass `FrameworkMockConfigurator` and use the protected `_pin`/`_getConfig` pair it exposes —
the same mechanism `.msal` and `.serviceDiscovery` are built from:

```typescript
class AppMockConfigurator extends FrameworkMockConfigurator<[InvoiceModule]> {
  constructor() {
    super();
    this._pin(invoiceMockModule);
  }

  get invoices(): InvoiceMockConfigurator {
    return this._getConfig('invoices');
  }
}
```

`_pin` replaces the module's own `configure` factory with one that always returns the same
instance — pinning it before initialization runs is what lets a test reach `.invoices`
synchronously and have it be the configurator the module is actually built from. `_getConfig`
looks that instance up by name, throwing if nothing was pinned for it.

## What is not covered yet (framework built-ins)

`.services` and `.telemetry` are reachable on `FrameworkMockConfigurator` — their `configure`
factories take no `ref`, so pinning them was safe the same way `.msal`/`.serviceDiscovery` are.
What is missing is a test double behind `.services`: no `src/mock/` folder exists for it yet, so
anything issuing a real request through it still reaches the network. Adding one means creating
that folder in *that* module, then pinning its mock configurator with `_pin` and exposing it with
`_getConfig`, replacing the real module descriptor pinned there today.

`event` is **not** pinned at all, deliberately — its `configure` factory reads `ref` to wire event
bubbling to a parent event provider when `FrameworkMockConfigurator` is hoisted inside a host
framework. Pinning would call `configure()` with `ref` always `undefined`, silently breaking that
bubbling, so it is left to build the normal way, from the module system's own configure phase,
where `ref` is actually known. Use `waitForEvent`/`watchEvents` from
`@equinor/fusion-framework-module-event/utils` to observe it instead (see `module-mocks.md`).

## Related

- `references/framework-and-app-mocks.md` — `mockFramework`/`FrameworkMockConfigurator` design
- `references/module-mocks.md` — the built-in per-module mocks this pattern mirrors
