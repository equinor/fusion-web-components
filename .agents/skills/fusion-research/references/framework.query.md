# Query Patterns

Use these repeatable search lanes when researching Fusion Framework implementation details through MCP.

## Start with the smallest lane that fits

| Need | Start with | Query shape | Good outcome |
| --- | --- | --- | --- |
| Exact hook, function, class, or symbol | `type: tsdoc` | `<symbol> <package or domain> hook function class` | result names the symbol and explains behavior directly |
| Package or module overview | `type: markdown` | `<package or module> README API overview` | result explains ownership, purpose, and main API surface |
| How-to or implementation example | `type: cookbook` | `<workflow> example <symbol or module>` | result shows a concrete pattern to adapt |
| Framework-owned UI usage | `type: storybook` | `<component> props usage framework` | result shows framework-owned UI behavior, not generic EDS docs |

## Proven examples

- API lookup: `useFramework useFrameworkModule hook React framework context`
- Package overview: `FrameworkConfigurator init Fusion modules API`
- Example lookup: `router loader fusion.modules.http createHttpClient example`

## One refinement pass only

If the first pass is weak or ambiguous:

1. Add the exact symbol, package, or module name.
2. Narrow the `type` when the lane is still broad.
3. Switch lanes when needed:
   - API lookup -> `markdown` for package context
   - package overview -> `tsdoc` for an exact symbol
   - example search -> `cookbook`
4. Stop after the second pass and report uncertainty if the evidence is still weak.

## Evidence checklist

Before using a result in the final answer, capture:

- `metadata.source`
- `metadata.type`
- the excerpt that supports the point
- any useful package or symbol metadata from `metadata.attributes`

**Important:** `cookbook` results are indexed raw and contain actual source code — compare directly with user code when relevant. `tsdoc` and `markdown` results contain extracted docs only; note what still needs local verification.