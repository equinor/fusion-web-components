# Follow-Up Questions — Framework Core Developer

Clarifying questions to ask before reviewing or applying conventions to Fusion Framework internals, shared packages, or framework APIs. Pick the relevant section based on the code under review. Skip questions already answered.

## Public API Surface

- Which exports are part of the public API versus internal implementation? Is there a barrel file (`index.ts`) that explicitly defines the public boundary?
- Are any existing public exports being renamed, removed, or having their signature changed? If so, has a `@deprecated` tag with a replacement been added to the old export?
- Do all public exports have TSDoc explaining the *problem solved* and *constraints*, not just the parameter types?
- Are generic type parameters on public APIs documented with `@typeParam` explaining the expected constraint (e.g., `TConfig extends BaseModuleConfig`)?
- Is this an additive API, a rename, or a behavioral change to an existing export that could affect downstream consumers?
- Are re-exported types from dependencies wrapped in the package's own type alias, or are consumers being exposed to transitive dependency types?

## Module & Package Structure

- Is this a new Fusion module, an extension to an existing module, or a standalone utility library?
- Does the module follow the provider/configurator/module pattern (`*Provider`, `*Configurator`, `*Module`)? Are these named consistently with existing modules?
- Are internal helpers kept in files not re-exported from the barrel, or are they leaking into the public surface?
- Does this module define both a configuration-time API (used in `configure()` callbacks) and a runtime API (used in components/hooks), and are these boundaries clear?
- If this package has peer dependencies on other framework packages, are the version ranges correct and documented?
- Is there a clear separation between the module's configuration-time API and its runtime API?

## Performance & Bundle Impact

- Is the code structured to allow unused parts to be tree-shaken (e.g., side-effect-free modules, no top-level mutations)?
- Does this feature introduce a large third-party dependency (e.g., `lodash`, `moment`) that could bloat the bundle? Is there a smaller alternative?
- Should any part of this feature be lazy-loaded only when needed, rather than included in the main bundle?

## TSDoc & Intent Comments

- Can every exported function, type, hook, and class pass the regenerability test — if the implementation were deleted, could a developer rewrite it from the TSDoc and intent comments alone?
- Do intent comments on non-obvious decisions explain *why* this approach was chosen over alternatives (e.g., "polling instead of WebSocket because the upstream API has no push support")?
- Are magic values (timeouts, retry counts, cache TTLs, buffer sizes) extracted to named constants with origin comments explaining the chosen value?
- Do `@example` blocks in TSDoc show the consumer's perspective (how an app developer would use this API), not just internal test usage?
- Are `@ts-ignore`, `as` casts, and `!` assertions each justified with a comment explaining why the safe path is insufficient?

## Type System & Generics

- Are generics constrained (`T extends SomeBase`) rather than left unbounded where the implementation assumes structure?
- Does the package avoid `any` entirely? Where `unknown` is used, is there a type guard or narrowing function nearby?
- Are discriminated unions preferred over type assertions for branching logic? Is the discriminant field documented?
- Do conditional types and mapped types have an accompanying intent comment explaining the transformation in plain language?

## Error Handling & Async Patterns

- Does the module define typed error subclasses (extending a framework base error) with structured context properties, or does it throw generic `Error`?
- Are async public methods that accept `AbortSignal` or cancellation tokens documented with `@throws` listing the cancellation error type?
- Where operations are sequential, is there a comment explaining why they cannot be parallelised (data dependency, ordering constraint)?
- Does the module clean up subscriptions, timers, and event listeners in its `dispose()` path? Are there resources that could leak if `dispose()` is not called?

## ADR & Decision Records

- Does this change introduce or modify a pattern significant enough to warrant a new ADR (e.g., new module lifecycle phase, new configuration mechanism, new error hierarchy)?
- Is there an existing ADR that governs this area (module structure, provider patterns, configuration API shape)? Does this code comply or deviate?
- If an existing ADR is being deviated from, has a superseding ADR been drafted, or is this silent drift?
- Does the `CONTRIBUTING.md` or `contribute/` directory specify framework-specific conventions (versioning policy, breaking change process) that apply to this change?
- Should backward compatibility be treated as mandatory for this surface, or is the package still experimental/internal?
