---
name: fusion-developer-app
description: 'Guides feature development in Fusion Framework React apps, including app-scoped framework research needed to choose the right hooks, modules, packages, and integration patterns before implementation. USE FOR: building new features, adding components or pages, creating hooks and services, wiring up API endpoints, extending Fusion module configuration, and answering app implementation questions about which Fusion Framework surface to use. DO NOT USE FOR: issue authoring, skill authoring, CI/CD configuration, backend service changes, or general Fusion documentation that is not tied to app implementation.'
license: MIT
compatibility: Requires a Fusion Framework React app bootstrapped with @equinor/fusion-framework-cli. Works best when styled-components, @equinor/eds-core-react, and @equinor/fusion-react-* packages are installed.
metadata:
  version: "0.3.0"
  status: active
  owner: "@equinor/fusion-core"
  skills:
    - fusion-research
    - fusion-code-conventions
  tags:
    - fusion-framework
    - react
    - eds
    - fusion-react-components
    - styled-components
    - app-development
    - charts
    - ag-charts
    - feature-flag
  mcp:
    suggested:
      - fusion
---

# Fusion App Development

## When to use

Use this skill when developing features, components, hooks, services, or types for a Fusion Framework React application.

Typical triggers:
- "Add a component / hook / service / page for ..."
- "Wire up the API"
- "Configure a Fusion module"
- "Which Fusion Framework hook / package should this app use?"
- "Persist this preference as an app setting"
- "Add bookmark / analytics / feature flag support"
- "Add a chart / people picker / person column to AG Grid"
- "How do I write a custom Fusion Framework module?"
- "Should this be a Fusion module or a React context?"

Implicit triggers:
- Building in `src/`
- References Fusion Framework modules, EDS, `@equinor/fusion-react-*`, or styled-components
- References app settings, bookmarks, analytics, `app.config.ts`
- Adding route, page, or data-fetching layer
- References charting: `@equinor/fusion-framework-react-ag-charts`, `chart.js`, `react-chartjs-2`

## When not to use

Do not use this skill for:
- Issue authoring/triage → `fusion-issue-authoring`
- Skill authoring → `fusion-skill-authoring`
- Backend/service changes (separate repo)
- CI/CD or deployment config
- Architecture docs (use ADR template)

For Fusion Framework package ownership, hook behavior, or example discovery → use `fusion-research` first.

## Required inputs

### Mandatory

- What to build: feature, component, hook, or service description
- Where it fits: layer (component, hook, service, type) and parent/sibling context

For ambiguous requests, consult `assets/follow-up-questions.md` before implementing.

### Conditional

- API endpoint details when the feature involves data fetching
- Design/layout specifics when building visual components
- Fusion module name when extending module configuration
- Whether state should persist per-user, be shareable via bookmark, or stay runtime-only

## Instructions

### Step 1 — Discover project conventions

Inspect target repo before writing code:

1. Read `package.json` — package manager (bun/pnpm/npm), scripts, dependencies.
2. Read `tsconfig.json` — TypeScript settings, path aliases.
3. Scan `src/` — directory layout, layer structure.
4. Check `docs/adr/` or `contribute/` for project-specific code standards.
5. Check formatter/linter config (`biome.json`, `.eslintrc`, `prettier`).
6. Read `app.config.ts` and `app.manifest.ts` — endpoints, environment setup.
7. Delegate uncertain Fusion Framework behavior, package ownership, or cookbook examples to `fusion-research` before writing code.

Adapt to discovered conventions. `references/` patterns are defaults — defer to project-specific rules when they differ.

### Step 2 — Plan the implementation

New app from scratch → use `assets/new-app-checklist.md`.

1. Break into discrete files/changes.
2. Map to correct directory. Typical Fusion app:
   - `src/components/` — React components (presentation layer)
   - `src/hooks/` — Custom React hooks (state and side-effect logic)
   - `src/api/` — API clients, data transforms, business logic
   - `src/types/` — TypeScript interfaces, type aliases, enums
   - `src/routes.ts` — Route definitions (when using Fusion Router)
   - `src/config.ts` — Fusion module configuration
   - `src/App.tsx` — Root component, layout shell
3. Identify shared types early — define before referencing.
4. Project uses routing → follow `references/using-router.md` for DSL + page patterns.
5. Different structure → follow it.

### Step 3 — Implement following code conventions

Follow project code standards from Step 1. For naming, TSDoc, inline comments, type patterns, code style, error handling → defer to `fusion-code-conventions`.

For convention questions during implementation, invoke `fusion-code-conventions` directly.

### Step 4 — Style with styled-components, EDS, and Fusion React components

Follow `references/styled-components.md`, `references/styling-with-eds.md`, `references/using-fusion-react-components.md`:

- Use `styled-components` for custom styling (Fusion convention).
- No CSS Modules, global CSS, Tailwind, or alternative CSS-in-JS unless project uses them.
- Use `Styled` object pattern for co-located styled components.
- Prefer EDS (`@equinor/eds-core-react`) for standard UI.
- Use EDS design tokens (`@equinor/eds-tokens`) for colors, spacing, typography.
- Extend EDS with `styled()` for customization.
- Use `@equinor/fusion-react-*` for domain needs not in EDS (person display/selection, side sheets, progress).
- Inline `style` props: one-off tweaks only.
- For page/view structure (shell composition, layout zones, empty/loading states), invoke `agents/design.md`. For component-level EDS styling, invoke `agents/styling.md`.

### Step 5 — Wire up data fetching (when applicable)

Follow `references/configure-services.md`, `references/using-react-query.md`, `references/configure-mocking.md`:

- Register HTTP clients via `configureHttpClient` in `config.ts` or `app.config.ts`.
- Access clients with `useHttpClient(name)` from `@equinor/fusion-framework-react-app/http`.
- **Prefer `@equinor/fusion-framework-react-app/*` hooks** over direct module access. Reserve `framework.modules.*` for non-React contexts.
- React Query: wrap `useQuery` in thin custom hooks.
- Query keys: derived from API path + parameters.
- Keep client UI state in React state/context, not server-state libs.

### Step 6 — Configure Fusion modules (when applicable)

Identify which module the user needs, then read only the matching reference:

| Need | Reference |
|---|---|
| HTTP clients / API integration | `references/configure-services.md` |
| Context module | `references/using-context.md` |
| Router and pages | `references/using-router.md` |
| AG Grid | `references/using-ag-grid.md` |
| AG Charts (standalone) | `references/using-ag-charts.md` |
| AG Grid integrated charts | `references/using-ag-grid-charts.md` |
| EDS + Fusion React components | `references/using-fusion-react-components.md` |
| People service (search, display, pick) | `references/using-people-service.md` |
| Settings | `references/using-settings.md` |
| Bookmarks | `references/using-bookmarks.md` |
| Analytics | `references/using-analytics.md` |
| Runtime config / environment | `references/using-assets-and-environment.md` |
| Feature flags | `references/using-feature-flags.md` |
| General framework modules | `references/using-framework-modules.md` |
| Custom module authoring | `references/using-custom-modules.md` |

- Module setup in `config.ts` via `AppModuleInitiator` callback.
- Access modules via hooks: `useAppModule`, `useHttpClient`, `useCurrentContext`.
- Register HTTP endpoints in `app.config.ts` for new API integrations.
- Enable navigation with `enableNavigation` in `config.ts` when app uses routing.
- Define routes via Fusion Router DSL (`layout`, `index`, `route`, `prefix`) for auto code splitting.
- Unclear framework API → use `fusion-research` before choosing implementation pattern.

### Step 7 — Validate

Use `assets/review-checklist.md` as post-generation checklist.

1. Run typecheck (`bun run typecheck` or `pnpm typecheck`) — zero errors.
2. Run lint/format check — zero violations.
3. Every new exported symbol has TSDoc.
4. Styling follows project conventions.
5. No new dependencies unless justified/approved.

## Expected output

- New/modified `src/` files following project layer structure.
- All files pass typecheck + lint.
- Every exported function, component, hook, and type has TSDoc.
- Styling follows project conventions.
- Brief summary of what changed and why.

## Helper agents

Optional helpers in `agents/`. Use for focused review or mid-implementation guidance. Runtimes without skill-local agents apply criteria inline.

Companion skill: `fusion-research` for source-backed Fusion ecosystem research when implementation is blocked by uncertainty.

- **`agents/framework.md`** — Fusion Framework integration: modules, HTTP clients, bootstrap, runtime config, settings, bookmarks, analytics. **Prefers `mcp_fusion_search_framework`**; falls back to `mcp_fusion_search_docs`. Consult when wiring `config.ts`, `app.config.ts`, or framework module access.
- **`agents/styling.md`** — EDS component selection, styled-components, design tokens, accessibility. **Prefers `mcp_fusion_search_eds`**. Consult when building/modifying visual components.
- **`agents/design.md`** — page/view structure: Fusion Portal shell composition, layout zones, side panel usage, empty/loading state patterns. References `equinor-design-system` for layout ground truth. Delegates component-level checks to `agents/styling.md`. Consult when scaffolding new pages or layout wrappers.
- **`agents/data-display.md`** — AG Grid vs AG Charts, module setup, column defs, chart options, integrated charting. **Prefers `mcp_fusion_search_framework`**. Consult for grids, charts, dashboards. Use `assets/charts-decision-matrix.md` for library selection.
- **`agents/person-components.md`** — `@equinor/fusion-react-person`: `PersonAvatar`, `PersonCard`, `PersonListItem`, `PersonPicker`, `PeoplePicker`, `PeopleViewer`, `PersonCell` (AG Grid). DOM event pattern, valueGetter setup, pitfalls. Consult for any person display, search, or selection UI.
- **`agents/code-quality.md`** — delegates convention checks (naming, TSDoc, TS strictness, intent comments) to `fusion-code-conventions`, aggregates findings. Run on every new/modified file before finalizing.

## Safety & constraints

- No new dependencies without explicit approval.
- No direct DOM manipulation — use React patterns.
- No `any` types — TypeScript strict mode standard.
- No secrets or credentials in source files.
- Conventional commits (`feat:`, `fix:`, `refactor:`, etc.).
- No infrastructure files (docker-compose, CI config) unless explicitly asked.
