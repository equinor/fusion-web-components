# Follow-Up Questions — React App Developer

Clarifying questions to ask before reviewing or applying conventions to a Fusion React application. Pick the relevant section based on the code under review. Skip questions already answered.

## Component Structure & Naming

- Does each component live in its own file named in `PascalCase` (e.g., `DataGrid.tsx`), or are multiple components defined in one file?
- Are there nested component definitions inside a parent component (which cause full unmounts on re-render)?
- Does the component's props interface have TSDoc explaining the component's purpose and each non-obvious prop?
- Are event handler props named with `on` prefix (e.g., `onSelect`, `onClose`) and internal handlers with `handle` prefix (e.g., `handleClick`)?
- Is the component in the correct layer directory (`src/components/`, `src/pages/`, or a feature folder), consistent with how the rest of the app is organised?
- Are presentational components kept free of data-fetching logic, or is a hook extraction needed?

## Hooks & State Management

- Does each custom hook live in its own file named in `camelCase` (e.g., `useItems.ts`) with the `use` prefix?
- Are all hooks called unconditionally at the top level — no hooks inside `if`, loops, or early returns?
- Are dependency arrays complete? Are there object or array literals in deps that would cause infinite re-renders?
- Is `useEffect` being used for data transformation that should be `useMemo` or a derived value instead?
- Does the hook depend on Fusion context (`useCurrentContext`) and need to refetch when context changes?
- Does the hook's TSDoc explain what triggers it, what it returns, and what callers should expect on error?

## Styling & EDS Usage

- Are styles implemented with `styled-components` using the `Styled` object pattern, or has an alternative approach been introduced?
- Are EDS design tokens used for colors, spacing, and typography instead of hard-coded values?
- Where EDS components are customised, is `styled()` wrapping used rather than overriding internal class names?
- Are there magic pixel values or colour hex codes that should reference an EDS token instead?
- Does the component need density support (`EdsProvider` compact/comfortable), and is it handled correctly for both modes?

## Data Fetching & API Layer

- Is the API endpoint registered in `app.config.ts` or `config.ts`, and is the HTTP client accessed via `useHttpClient` from `@equinor/fusion-framework-react-app/http`?
- Are there direct `fetch()` or `axios` calls that bypass the framework HTTP client (and its auth/interceptor chain)?
- If using React Query, does the query key follow the project convention (API path + parameters)?
- Are loading, error, and empty-data states handled in the component, or are they silently swallowed?
- Does the response type have a corresponding interface, and is it documented with TSDoc?

## TSDoc & Inline Comments

- Do all exported components, hooks, types, and utility functions have TSDoc explaining *why they exist* and *what problem they solve*?
- Are non-obvious conditional branches annotated with intent comments explaining the business rule?
- Are `.filter()`, `.map()`, `.reduce()` chains annotated with the business invariant they enforce (e.g., "exclude draft items because the API returns all statuses")?
- Are `// biome-ignore`, `@ts-ignore`, or `as` casts justified with a comment explaining why the safe approach is insufficient?
- Are hard-coded strings, numbers, or timeouts extracted to named constants with origin comments?

## Routing, Manifest & App Integration

- Does this feature add new routes? Do route segments follow kebab-case naming?
- Are route params and search params typed and documented in the component or loader TSDoc?
- Should this view be registered in the App Manifest (`app.manifest.ts`) for deep linking?
- Are navigation calls using `useNavigate` from `react-router-dom` rather than direct `window.location` manipulation?

## ADR & Project Conventions

- Does the app have an `adr/` or `docs/adr/` directory? Does this change comply with recorded decisions, or introduce a pattern without a corresponding ADR?
- Does the app's `CONTRIBUTING.md`, `contribute/`, or `.github/copilot-instructions.md` specify project-specific conventions that override the defaults?
- Has `biome.json` or `.editorconfig` been checked for project-specific overrides that should not be flagged?
- Does this change introduce a new library or architectural choice significant enough to warrant a new ADR?
