# Follow-Up Questions

Clarifying questions to ask before implementing, organized by domain. Pick the relevant section based on what the user is building. Skip questions the user already answered.

## Components (UI / Presentation)

- What data does this component display? Is the shape already defined in `src/types/`?
- Which EDS components are closest to the desired look? (e.g. `Card`, `Table`, `Dialog`, `Tabs`)
- Does this component need to handle loading/error states, or does a parent handle that?
- Should it support both compact and comfortable density, or only one?
- Is this a standalone component or a child of an existing page/layout?
- Are there interactive elements (buttons, inputs, toggles)? What actions do they trigger?

## Hooks (State & Side Effects)

- What triggers this hook? (mount, context change, user action, interval)
- Does the hook wrap an API call, or purely manage local state?
- Should the result be cached/shared across components (React Query), or local to one component?
- Does the hook depend on the current Fusion context (`useCurrentContext`)?
- What should happen on error — retry, fallback value, or propagate to the caller?

## Data Fetching / API Integration

- Is the API endpoint already registered in `app.config.ts` or `config.ts`?
- What is the base path and HTTP method? (e.g. `GET /api/items/:id`)
- Does the endpoint require authentication scopes? Which ones?
- What does the response shape look like? Is there a type/interface already?
- Should results be cached? What's a reasonable stale time?
- Does the data depend on the current Fusion context (project/facility)?
- Is this a read (query) or write (mutation) operation?

## Routing

- How many pages/views does this feature need?
- What URL structure makes sense? (e.g. `/items`, `/items/:id`, `/items/:id/edit`)
- Does each page need its own data loader (`clientLoader`)?
- Is there a shared layout (nav bar, sidebar) across these pages?
- Should routes be documented in the app manifest (`app.manifest.ts`)?
- Are there any route parameters or search params to handle?

## Context (Fusion Context Module)

- Which context type does the app operate on? (`ProjectMaster`, `Facility`, custom?)
- Does the app need to sync with the portal's context picker, or manage its own?
- Should data refetch automatically when the user switches context?
- Does the app need related contexts (e.g. tasks under a project)?
- Is there a custom context backend, or does it use the standard Fusion context API?

## Styling

- Is there a design spec, mockup, or reference to follow?
- Which EDS components should be used as the base?
- Does the component need responsive behavior? At which breakpoints?
- Are there any custom colors or spacing beyond EDS tokens?
- Should the component adapt to density switching (`EdsProvider`)?

## AG Grid

- What data populates the grid? Is the type defined?
- Which columns are needed? Any custom formatters or cell renderers?
- Does the grid need sorting, filtering, or column reordering?
- Is row selection needed? Single or multi-select?
- Should the grid export data (Excel, clipboard)?
- Are Enterprise features required, or is Community sufficient?

## Module Configuration

- Which Fusion modules does this feature need? (HTTP, context, navigation, feature flags, settings)
- Are there existing modules configured in `config.ts` that this feature should reuse?
- Does this feature introduce a new API backend that needs an HTTP client?
- Are there environment-specific differences (dev vs. prod endpoints, scopes)?

## Dev Server / Mocking

- Is a real backend available, or do we need mock routes in `dev-server.config.ts`?
- If proxying, what is the upstream URL? Does it need authentication?
- Should the mock return static data or generated/dynamic data?
- Does the mock need to simulate error responses for testing?
