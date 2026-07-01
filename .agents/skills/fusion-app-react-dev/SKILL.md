---
name: fusion-app-react-dev
description: 'DEPRECATED — use fusion-developer-app instead. Guides feature development in Fusion Framework React apps.'
license: MIT
compatibility: Requires a Fusion Framework React app bootstrapped with @equinor/fusion-framework-cli. Works best when styled-components, @equinor/eds-core-react, and @equinor/fusion-react-* packages are installed.
metadata:
  version: "0.2.1"
  status: deprecated
  successor: fusion-developer-app
  deprecated_at: "2026-03-23"
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
    - feature-flag
    - deprecated
  mcp:
    suggested:
      - fusion
---

> **Deprecated** — This skill has been renamed to **`fusion-developer-app`**.
> Install the replacement: `npx -y skills add equinor/fusion-skills --skill fusion-developer-app`
> This skill will be removed in a future release.

# Fusion App Development

## When to use

Use this skill when developing features, components, hooks, services, or types for a Fusion Framework React application.

Typical triggers:
- "Add a component for ..."
- "Create a hook that ..."
- "Wire up the API"
- "Build a page for ..."
- "Add a service to fetch ..."
- "Configure a Fusion module"
- "Which Fusion Framework hook should this app use?"
- "What is the right package or module for this app integration?"
- "Find the correct Fusion Framework example before implementing this app change"
- "Persist this preference as an app setting"
- "Add bookmark support for this view"
- "Read runtime config or environment variables"
- "Instrument this page with analytics"
- "Add a feature flag to this app"
- "How do I use the useFeature hook in a Fusion app?"
- "Implement a feature for ..."

Implicit triggers:
- The user asks to build something in `src/`
- The user references Fusion Framework modules, EDS components, Fusion React components (`@equinor/fusion-react-*`), or styled-components patterns
- The user references app settings, bookmarks, analytics, or `app.config.ts`
- The user wants to add a new route, page, or data-fetching layer

## When not to use

Do not use this skill for:
- Issue authoring or triage (use `fusion-issue-authoring`)
- Skill authoring (use `fusion-skill-authoring`)
- Backend/service changes (separate repository)
- CI/CD pipeline or deployment configuration
- Architecture documentation (use ADR template)

When the request is primarily about Fusion Framework package ownership, hook behavior, or example discovery rather than app implementation, use the companion skill `fusion-research` first and then return here for code changes.

## Required inputs

### Mandatory

- What to build: a clear description of the feature, component, hook, or service
- Where it fits: which layer (component, hook, service, type) and any parent/sibling context

If the user's request is ambiguous or missing critical details, consult `assets/follow-up-questions.md` for domain-specific clarifying questions before implementing.

### Conditional

- API endpoint details when the feature involves data fetching
- Design/layout specifics when building visual components
- Fusion module name when extending module configuration
- Whether state should persist per-user, be shareable via bookmark, or stay runtime-only

## Instructions

### Step 1 — Discover project conventions

Before writing any code, inspect the target repository to learn its specific setup:

1. Read `package.json` to identify the package manager (bun/pnpm/npm), available scripts, and installed dependencies.
2. Read `tsconfig.json` to confirm TypeScript settings and path aliases.
3. Scan `src/` to understand the current directory layout and layer structure.
4. Check for ADRs (`docs/adr/`) or a `contribute/` directory for project-specific code standards.
5. Check for formatter/linter config (biome.json, .eslintrc, prettier config).
6. Read `app.config.ts` and `app.manifest.ts` to understand existing endpoint and environment setup.
7. If the implementation depends on uncertain Fusion Framework behavior, exact package ownership, or cookbook examples, delegate that research to `fusion-research` before writing code.

Adapt all subsequent steps to the conventions discovered here. The patterns in `references/` are defaults — defer to project-specific rules when they differ.

### Step 2 — Plan the implementation

If scaffolding a new app from scratch, use `assets/new-app-checklist.md` as a progress tracker.

1. Break the work into discrete files/changes.
2. Map each piece to the correct directory. A typical Fusion app uses:
   - `src/components/` — React components (presentation layer)
   - `src/hooks/` — Custom React hooks (state and side-effect logic)
   - `src/api/` — API clients, data transforms, business logic
   - `src/types/` — TypeScript interfaces, type aliases, enums
   - `src/routes.ts` — Route definitions (when using Fusion Router)
   - `src/config.ts` — Fusion module configuration
   - `src/App.tsx` — Root component, layout shell
3. Identify shared types early — define them before referencing.
4. If the project uses routing, follow `references/using-router.md` for the DSL and page patterns.
5. If the project uses a different structure, follow it.

### Step 3 — Implement following code conventions

Follow the project's code standards (discovered in Step 1). For all convention rules — naming, TSDoc, inline comments, type patterns, code style, and error handling — defer to the `fusion-code-conventions` skill.

When convention questions arise during implementation, invoke `fusion-code-conventions` directly. It routes to the correct language agent and returns the authoritative rule with an example.

### Step 4 — Style with styled-components, EDS, and Fusion React components

Follow `references/styled-components.md`, `references/styling-with-eds.md`, and `references/using-fusion-react-components.md`:

- Use `styled-components` for custom styling — this is the Fusion ecosystem convention.
- Do not introduce CSS Modules, global CSS files, Tailwind, or alternative CSS-in-JS unless the project explicitly uses them.
- Use the `Styled` object pattern for co-located styled components.
- Prefer EDS components from `@equinor/eds-core-react` as the base for standard UI elements.
- Use EDS design tokens (CSS custom properties or `@equinor/eds-tokens`) for colors, spacing, and typography.
- Extend EDS components with `styled()` when customization is needed.
- Use Fusion React components (`@equinor/fusion-react-*`) for domain-specific needs not covered by EDS — person display/selection, Fusion side sheets, and progress indicators.
- Inline `style` props are acceptable for one-off tweaks only.

### Step 5 — Wire up data fetching (when applicable)

Follow `references/configure-services.md`, `references/using-react-query.md`, and `references/configure-mocking.md` for data-fetching and local dev mocking patterns:

- Register HTTP clients via `configureHttpClient` in `config.ts` or via `app.config.ts` endpoints.
- Access clients in components with `useHttpClient(name)` from `@equinor/fusion-framework-react-app/http`.
- **Always prefer `@equinor/fusion-framework-react-app/*` hooks** (`useHttpClient`, `useCurrentContext`, etc.) over direct module access. Reserve `framework.modules.*` for non-React contexts like route loaders.
- When the project uses React Query (`@tanstack/react-query`), create thin custom hook wrappers around `useQuery`.
- Use query keys derived from API path + parameters.
- Keep client UI state in React state/context, not in server-state libraries.

### Step 6 — Configure Fusion modules (when applicable)

Identify which module the user needs, then read only the matching reference:

| Need | Reference |
|---|---|
| HTTP clients / API integration | `references/configure-services.md` |
| Context module | `references/using-context.md` |
| Router and pages | `references/using-router.md` |
| AG Grid | `references/using-ag-grid.md` |
| EDS + Fusion React components | `references/using-fusion-react-components.md` |
| Settings | `references/using-settings.md` |
| Bookmarks | `references/using-bookmarks.md` |
| Analytics | `references/using-analytics.md` |
| Runtime config / environment | `references/using-assets-and-environment.md` |
| Feature flags | `references/using-feature-flags.md` |
| General framework modules | `references/using-framework-modules.md` |

- Add module setup in `config.ts` using the `AppModuleInitiator` callback.
- Access modules in components via hooks: `useAppModule`, `useHttpClient`, `useCurrentContext`.
- Register HTTP client endpoints in `app.config.ts` when adding new API integrations.
- Enable navigation with `enableNavigation` in `config.ts` when the app uses routing.
- Define routes using the Fusion Router DSL (`layout`, `index`, `route`, `prefix`) for automatic code splitting.
- When the right framework API is unclear, use `fusion-research` to gather a source-backed answer before choosing an implementation pattern.

### Step 7 — Validate

Use `assets/review-checklist.md` as a comprehensive post-generation checklist.

1. Run the project's typecheck command (e.g. `bun run typecheck` or `pnpm typecheck`) — zero errors required.
2. Run the project's lint/format check — zero violations.
3. Verify every new exported symbol has TSDoc.
4. Confirm styling follows the project's conventions.
5. Confirm no new dependencies unless justified or explicitly approved.

## Expected output

- New or modified source files in `src/` following the project's layer structure.
- All files pass typecheck and lint.
- Every exported function, component, hook, and type has TSDoc.
- Styling follows project conventions (typically styled-components + EDS + Fusion React components where applicable).
- A brief summary of what was created or changed and why.

## Helper agents

This skill includes three optional helper agents in `agents/`. Use them for focused review after implementing changes, or consult them during implementation for specific guidance. If the runtime does not support skill-local agents, apply the same review criteria inline.

This skill also has a companion skill, `fusion-research`, for source-backed Fusion ecosystem research. Use it when implementation work is blocked by uncertainty about framework behavior, EDS component APIs, or skill catalog questions.

- **`agents/framework.md`** — reviews Fusion Framework integration: module configuration, HTTP clients, bootstrap lifecycle, runtime config, settings, bookmarks, analytics, and hook usage. **Prefers `mcp_fusion_search_framework`** for API lookups; falls back to `mcp_fusion_search_docs` for general platform guidance. Consult when wiring up `config.ts`, `app.config.ts`, or any component that accesses framework modules.
- **`agents/styling.md`** — reviews EDS component selection, styled-components patterns, design token usage, and accessibility. **Prefers `mcp_fusion_search_eds`** for component docs, props, and examples. Consult when building or modifying visual components.
- **`agents/code-quality.md`** — delegates convention checks (naming, TSDoc, TypeScript strictness, intent comments) to `fusion-code-conventions`, then aggregates findings in Fusion app context. Run on every new or modified file before finalizing.

## Safety & constraints

- **No new dependencies** without explicit user approval.
- **No direct DOM manipulation** — use React patterns.
- **No `any` types** — TypeScript strict mode is standard for Fusion apps.
- **No secrets or credentials** in source files.
- **Conventional commits** for all changes (`feat:`, `fix:`, `refactor:`, etc.).
- Do not modify infrastructure files (docker-compose, CI config) unless explicitly asked.
