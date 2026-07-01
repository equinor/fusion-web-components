# React Code Conventions

React naming, component structure, hooks for Fusion Framework apps.

> **Applicability:** Org-wide baseline. Repo policy (`CONTRIBUTING.md`, ADRs) and tooling (`biome.json`, `tsconfig.json`) take precedence on explicit override. See skill **Precedence and applicability** for resolution order.

## Naming conventions

| Kind           | Convention   | Example          |
|----------------|--------------|------------------|
| Component file | PascalCase   | `DataGrid.tsx`   |
| Component name | PascalCase   | `DataGrid`       |
| Hook file      | camelCase    | `useItems.ts`    |
| Hook name      | `use` prefix | `useItems`       |

- Event handlers: `handle` prefix + event noun (`handleClick`, `handleSubmit`)
- Boolean props mirroring HTML attributes: shorthand (`disabled` not `disabled={true}`)

## Component structure

- One component per file; name matches file
- Props interface co-located with component
- Never define component inside another — causes full unmounts on parent re-render
- Split data-fetching, transformation, rendering into separate layers

## Hooks rules

- Never call hooks conditionally — violates the Rules of Hooks
- Dependency arrays in `useEffect`/`useCallback`/`useMemo` must be complete (avoid stale closures)
- No object/array literals or inline functions in dependency arrays — causes infinite render loops
- Use `useMemo` or derived values in render for data transformations, not `useEffect`
- Never mutate state directly; use the setter or dispatch

## Keys in lists

Use a stable `key` on list items. No array index as `key` when list order can change.

## Accessibility

- All interactive elements (buttons, inputs, links) require a visible label or `aria-label`/`aria-labelledby`
- Use semantic HTML — `<button>` not `<div onClick>`. For non-semantic interactive elements, add `onKeyDown`/`role`/`tabIndex`

## TSDoc

Follow `references/typescript.conventions.md` for TSDoc. Document props interface on exported components.
