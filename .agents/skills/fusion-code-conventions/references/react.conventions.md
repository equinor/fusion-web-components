# React Code Conventions

Naming, component structure, and hooks rules for React in Fusion Framework apps.

> **Applicability:** These are org-wide baseline defaults. Repository-level policy (`CONTRIBUTING.md`, ADRs, contributor guides) and tooling configuration (`biome.json`, `tsconfig.json`) take precedence when they explicitly override a rule below. See the skill's **Precedence and applicability** section for the full resolution order.

## Naming conventions

| Kind           | Convention   | Example          |
|----------------|--------------|------------------|
| Component file | PascalCase   | `DataGrid.tsx`   |
| Component name | PascalCase   | `DataGrid`       |
| Hook file      | camelCase    | `useItems.ts`    |
| Hook name      | `use` prefix | `useItems`       |

Additional rules:
- Event handlers: `handle` prefix + event noun (`handleClick`, `handleSubmit`).
- Boolean props that mirror HTML attributes: use shorthand (`disabled` not `disabled={true}`).

## Component structure

- One component per file; file name matches component name.
- Props interface co-located with its component.
- Never define a component inside another component — causes full unmounts on every parent re-render.
- Split large components that mix data fetching, transformation, and rendering into separate layers.

## Hooks rules

- Never call hooks conditionally — violates the Rules of Hooks.
- Dependency arrays in `useEffect`, `useCallback`, `useMemo` must be complete to avoid stale closures.
- Do not put object/array literals or inline function definitions in dependency arrays — causes infinite render loops.
- Do not use `useEffect` for data transformations; use `useMemo` or derived values in render instead.
- Never mutate state directly; always use the setter or dispatch.

## Keys in lists

Always provide a stable `key` on list items. Do not use array index as `key` when list order can change.

## Accessibility

- All interactive elements (buttons, inputs, links) require a visible label or `aria-label`/`aria-labelledby`.
- Use semantic HTML for interactive elements — `<button>` not `<div onClick>`. When a non-semantic element must handle interaction, add keyboard support (`onKeyDown`, `role`, `tabIndex`).

## TSDoc

Follow `references/typescript.conventions.md` for TSDoc rules. Exported components benefit from documenting the props interface as well.
