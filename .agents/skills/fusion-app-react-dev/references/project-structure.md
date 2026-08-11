# Project Structure

Directory layout, layer responsibilities, file placement, tooling, and commit conventions for Fusion Framework apps.

## Directory structure

Typical Fusion app layout:

```
src/
├── App.tsx           # Root component — layout shell, routing
├── config.ts         # Fusion module configuration
├── index.ts          # Entry point (do not modify)
├── components/       # React components (presentation layer)
├── hooks/            # Custom React hooks
├── api/              # API clients, data transforms, business logic
└── types/            # TypeScript interfaces, type aliases, enums
```

Projects may use additional directories (e.g. `pages/`, `utils/`, `context/`). Always check the existing structure first.

## Layer responsibilities

| Layer        | Purpose                                    | Example files                |
|--------------|--------------------------------------------|------------------------------|
| `components` | Presentation: render UI, handle user events| `DataGrid.tsx`, `Header.tsx` |
| `hooks`      | State & side effects: encapsulate logic    | `useItems.ts`, `useFilter.ts`|
| `api`        | API clients, data transforms, business logic | `itemApi.ts`                 |
| `types`      | Type definitions: shared interfaces/enums  | `item.ts`, `api.ts`          |

## File placement rules

- One primary export per file (component, hook, service, or type module).
- Co-locate related files: a page component and its dedicated hook can share a directory.
- Barrel exports (`index.ts`) are optional — use when a directory has 3+ exports.

## Tooling

Check the project's `package.json` scripts and installed devDependencies for exact commands. Common Fusion app tooling:

| Tool          | Typical command            | Purpose                      |
|---------------|----------------------------|------------------------------|
| TypeScript    | `typecheck` / `tsc --noEmit` | Type checking (strict mode)|
| Biome         | `biome check src/`         | Lint + format validation     |
| ESLint        | `eslint src/`              | Lint (if project uses it)    |
| Dev server    | `dev`                      | Start Fusion CLI dev server  |
| Build         | `build`                    | Production build             |

Run commands via the project's package manager (`bun run`, `pnpm`, `npm run`).

## Commit conventions

Use conventional commits for all changes:

| Prefix      | When to use                                  |
|-------------|----------------------------------------------|
| `feat:`     | New feature or capability                    |
| `fix:`      | Bug fix                                      |
| `refactor:` | Code restructuring without behavior change   |
| `docs:`     | Documentation only                           |
| `style:`    | Formatting, whitespace, missing semicolons   |
| `test:`     | Adding or fixing tests                       |
| `chore:`    | Build, tooling, dependency updates           |

## Architecture Decision Records

Many Fusion apps document decisions in `docs/adr/`. Check if the project has ADRs and follow them. When making architectural decisions not covered by existing ADRs, propose a new ADR if the project uses them.
