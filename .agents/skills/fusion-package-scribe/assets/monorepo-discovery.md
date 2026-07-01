# Package Discovery

How to find packages, barrel exports, and public API surfaces in TypeScript monorepos.

## Finding packages

### Workspace config detection

Check these files in order to discover the package list:

1. **pnpm**: `pnpm-workspace.yaml` → `packages:` array of globs
2. **npm/yarn**: root `package.json` → `workspaces` array of globs
3. **turborepo**: `turbo.json` (uses workspace config from package.json or pnpm)
4. **lerna**: `lerna.json` → `packages` array of globs
5. **nx**: `nx.json` + `workspace.json` or project-level `project.json`

### Fallback discovery

If no workspace config exists:
- Scan for directories containing `package.json` with a `name` field
- Exclude: `node_modules`, `.git`, `dist`, `build`, `coverage`, `.tmp`

### Package metadata

For each discovered package, collect:
- `name` from `package.json`
- `main`, `module`, `exports` entry points
- `private` flag (skip private packages unless explicitly included)
- Source file count (`.ts`, `.tsx` in `src/` or root)

## Finding barrel exports

The barrel export is the primary entry point that defines the public API surface.

### Detection order

1. `package.json` → `exports["."]` (modern ESM packages)
2. `package.json` → `module` field
3. `package.json` → `main` field
4. `src/index.ts` or `src/index.tsx`
5. `index.ts` or `index.tsx` at package root

### Tracing re-exports

From the barrel file, recursively follow:
- `export { ... } from './module'`
- `export * from './module'`
- `export type { ... } from './module'`
- `export default ...`

Build the complete export tree, noting which source file defines each export.

## Classifying exports

| Kind | Detection pattern |
|---|---|
| Function | `export function`, `export const name = (...) =>` |
| Hook | Function starting with `use` (React convention) |
| Class | `export class` |
| Interface | `export interface` |
| Type | `export type` (not re-export) |
| Enum | `export enum`, `export const enum` |
| Constant | `export const` (not a function) |
| Component | Exported function/const returning JSX (`.tsx` files) |

## Prioritization

Process exports in this order for maximum impact:
1. **Barrel re-exports** — highest visibility, most likely discovered by users
2. **Hooks** — typically the primary API for React packages
3. **Functions** — core utilities and business logic
4. **Types/Interfaces** — API contracts
5. **Classes** — less common in modern TS but still important
6. **Constants/Enums** — configuration values and discriminators
