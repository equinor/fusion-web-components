# Post-Generation Review Checklist

Run through this checklist after generating or modifying code. Skip items that don't apply to the change.

## TypeScript

- [ ] No `any` types — use specific types, generics, or `unknown` with narrowing
- [ ] No type assertions (`as`) where proper typing is possible
- [ ] No non-null assertions (`!`) without clear justification
- [ ] Explicit return types on all exported functions
- [ ] Discriminated unions used for narrowing instead of type casting
- [ ] Generic constraints are specific, not `T extends any`

## TSDoc

- [ ] Every exported function, component, hook, class, and type has TSDoc
- [ ] Summary explains *intent and why*, not restating the name
- [ ] `@param` for every parameter (without restating the type)
- [ ] `@returns` for every non-void function
- [ ] `@template` for every generic type parameter
- [ ] `@throws` for meaningful error paths
- [ ] `@example` for user-facing and non-trivial public APIs

## Naming

- [ ] Components: PascalCase file and export name
- [ ] Hooks: `use` prefix, camelCase file name
- [ ] Types/interfaces: PascalCase, no `I` prefix
- [ ] Constants: SCREAMING_SNAKE_CASE
- [ ] Variables and functions: camelCase
- [ ] Names are descriptive and self-documenting

## Code Quality

- [ ] Each function/component has a single responsibility
- [ ] Immutable patterns used (`map`, `filter`, `reduce`) over mutable accumulators
- [ ] No dead code: unused imports, unreachable branches, commented-out blocks
- [ ] Inline *why* comments on iterators, decision gates, complex logic
- [ ] No comments that restate syntax or obvious control flow
- [ ] Non-trivial inline callbacks extracted into named helpers with TSDoc
- [ ] Error handling uses specific error types with context, not bare `Error`

## EDS & Styling

- [ ] EDS components used before building custom UI elements
- [ ] `styled-components` used for custom styling (not CSS Modules, Tailwind, global CSS)
- [ ] `Styled` object pattern used for co-located styled components
- [ ] EDS design tokens used for colors, spacing, typography (no hardcoded hex/px values)
- [ ] Icons from `@equinor/eds-icons` with `<Icon data={...} />`
- [ ] Inline `style` props only for one-off tweaks, not reusable patterns

## Accessibility

- [ ] Interactive elements have accessible labels (`aria-label`, `aria-labelledby`, or visible text)
- [ ] `aria-disabled` used instead of `disabled` on buttons that need tooltip support
- [ ] `title` provided on `<Icon>` for screen readers
- [ ] Color is not the sole way to convey information

## Fusion Framework

- [ ] HTTP clients accessed via `useHttpClient(name)`, not raw `fetch()`
- [ ] No duplicate client registrations (same client in both `app.config.ts` and `config.ts`)
- [ ] Context read from `useCurrentContext()`, not duplicated into local state
- [ ] No hardcoded URLs — endpoints come from `app.config.ts` or environment variables
- [ ] No manual token management — MSAL module handles auth
- [ ] Per-user preferences use app settings, not ad hoc runtime config or local storage by default
- [ ] Bookmark payloads are serializable and limited to shareable view state
- [ ] Analytics events use `useTrackFeature()` or the project's approved wrapper
- [ ] Module hooks (`useHttpClient`, `useCurrentContext`, etc.) called inside React components/hooks only

## Data Fetching

- [ ] React Query used for server state, React state for client UI state
- [ ] Query keys derived from API path + parameters
- [ ] Queries disabled (`enabled: false`) when required parameters are missing
- [ ] Mutations invalidate related queries on success
- [ ] Loading and error states handled in the UI

## Charts & Visualization

- [ ] AG Charts imports come from `@equinor/fusion-framework-react-ag-charts`, not directly from `ag-charts-*`
- [ ] `ModuleRegistry.registerModules([AllCommunityModule])` called once at startup before any chart renders
- [ ] Chart data has a typed interface, not inline untyped objects
- [ ] Chart options use `AgChartOptions` type (AG Charts) or library option types (Chart.js)
- [ ] Data fetching, transformation, and chart rendering are in separate layers
- [ ] Charts are in a responsive container with explicit sizing
- [ ] Enterprise imports only when enterprise features are needed and license is available
- [ ] AG Grid integrated charts use `IntegratedChartsModule.with(AgChartsEnterpriseModule)` in `enableAgGrid`

## Dependencies

- [ ] No new dependencies added without explicit justification
- [ ] No secrets or credentials in source files
- [ ] No direct DOM manipulation — React patterns used

## Validation

- [ ] Typecheck passes with zero errors (e.g. `bun run typecheck` / `pnpm typecheck`)
- [ ] Lint passes with zero violations (e.g. `bun run lint` / `biome check src/`)
- [ ] Conventional commit message prepared (`feat:`, `fix:`, `refactor:`, etc.)
