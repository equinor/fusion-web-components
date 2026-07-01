# New App Checklist

Step-by-step checklist for creating a new Fusion Framework React app from scratch. Use as a progress tracker — tick items off as you go.

## 1. Scaffold

- [ ] Create the app with `fusion-framework-cli app create <name>` or manually scaffold the directory
- [ ] Verify `package.json` has the correct `name`, `scripts`, and `@equinor/fusion-framework-cli` devDependency
- [ ] Confirm `tsconfig.json` uses strict mode and `"moduleResolution": "bundler"`
- [ ] Confirm the entry point pattern in `src/index.ts` (`renderApp(App, configure)`)

## 2. Configuration files

- [ ] `app.manifest.ts` — set `appKey` and `displayName`
- [ ] `app.config.ts` — define `environment` and `endpoints` for API backends
- [ ] `src/config.ts` — export `configure: AppModuleInitiator` (can start empty)
- [ ] `src/App.tsx` — root component rendering the layout shell

## 3. Module setup (in `config.ts`, as needed)

- [ ] **HTTP clients** — registered via `app.config.ts` endpoints (auto) or `configureHttpClient` (custom)
- [ ] **Context** — `enableContext(configurator, (builder) => { builder.setContextType([...]) })`
- [ ] **Navigation** — `enableNavigation(configurator, env.basename)` if using routing
- [ ] **Feature flags** — `configurator.enableFeatureFlag({ key, title })` if toggling features
- [ ] **AG Grid** — `enableAgGrid(configurator)` if using data grids

## 4. Routing (if multi-page)

- [ ] Install `@equinor/fusion-framework-react-router`
- [ ] Create `src/routes.ts` using the DSL (`layout`, `index`, `route`, `prefix`)
- [ ] Create `src/Router.tsx` with `<Router routes={routes} />`
- [ ] Add the Vite plugin `reactRouterPlugin()` if using the route DSL
- [ ] Wire router into `App.tsx`
- [ ] Update `app.manifest.ts` with `routes: await toRouteSchema(routes)` for portal discovery

## 5. Dev server

- [ ] Create `dev-server.config.ts` if mocking APIs or proxying to a local backend
- [ ] Verify the dev server starts without errors (e.g. `bun run dev` / `pnpm dev`)
- [ ] Confirm the app loads in the browser at the dev server URL

## 6. First feature

- [ ] Define types in `src/types/`
- [ ] Create API layer in `src/api/` (hooks wrapping `useHttpClient` or React Query)
- [ ] Create components in `src/components/`
- [ ] Create hooks in `src/hooks/` for state and side-effect logic
- [ ] Wire everything together in a page or the root `App.tsx`

## 7. Styling

- [ ] EDS components (`@equinor/eds-core-react`) used as the base for UI elements
- [ ] `styled-components` used for custom styling with the `Styled` object pattern
- [ ] EDS design tokens used for colors, spacing, and typography (no hardcoded values)
- [ ] Icons imported from `@equinor/eds-icons` as data objects

## 8. Code quality

- [ ] TSDoc on every exported function, component, hook, and type
- [ ] Inline *why* comments on iterators, decision gates, and complex logic
- [ ] No `any` types — TypeScript strict mode enforced
- [ ] Explicit return types on exported functions
- [ ] Conventional commits used for all changes

## 9. Validation

- [ ] Typecheck — zero errors (e.g. `bun run typecheck` / `pnpm typecheck`)
- [ ] Lint — zero violations (e.g. `bun run lint` / `biome check src/`)
- [ ] Production build succeeds (e.g. `bun run build` / `pnpm build`)
- [ ] No new dependencies added without justification
- [ ] No secrets or credentials in source files

## 10. Documentation

- [ ] `README.md` updated with app description, setup instructions, and available scripts
- [ ] ADR created in `docs/adr/` for significant architectural decisions
- [ ] `contribute/` directory reviewed for project-specific code standards
