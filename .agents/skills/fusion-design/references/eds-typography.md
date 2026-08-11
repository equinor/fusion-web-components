# EDS Typography

Source: https://eds.equinor.com/

## Rules

- **Always** use `<Typography>` from `@equinor/eds-core-react` for all text — headings, body, captions.
- **Never** use bare HTML elements (`<h1>`–`<h6>`, `<p>`, `<span>`) — always use `<Typography>` regardless of styling.
- **Never** hardcode font sizes, weights, or line heights in CSS or `style` props.

## Import

```tsx
import { Typography } from '@equinor/eds-core-react';
```

## Heading variants

| Semantic level | Prop |
|---|---|
| Page title | `variant="h1"` |
| Section title | `variant="h2"` |
| Sub-section | `variant="h3"` |
| Card/panel title | `variant="h4"` |

## Grouped variants require a `group` prop (runtime-crash trap)

`Typography` resolves most variants **only within a group**. The "quick" variants — `h1`–`h6`, `body_short`, `body_long`, `caption`, `overline`, `ingress` — work with **no** `group`. Every other variant (e.g. the `table` group's `cell_header`, `cell_text`, `cell_text_bold`) lives under a group and **must** be passed with its `group`, or the component throws at render time and blanks the page.

This is a **type-check trap**: the variant name is in the TypeScript union, so `tsc` and the build pass — but `<Typography variant="cell_header">` crashes in the browser with `Cannot read properties of undefined (reading 'cell_header')`.

```tsx
// ❌ Wrong — grouped variant with no group: passes tsc/build, CRASHES at runtime (blank page)
<Typography variant="cell_header">Tag</Typography>

// ✅ Correct — grouped variant with its group
<Typography group="table" variant="cell_header">Tag</Typography>
<Typography group="table" variant="cell_text">{value}</Typography>
```

**Rule of thumb:** prefer the group-free quick variants (`h1`–`h6`, `body_short`, `body_long`). Reach for a grouped variant only when you also pass the matching `group`. If unsure whether a variant needs a group, use `body_short` — it always works.

## Example

```tsx
// ✅ Correct
<Typography variant="h1">My Page</Typography>

// ❌ Wrong — plain HTML
<h1>My Page</h1>

// ❌ Wrong — hardcoded styles
<h1 style={{ fontSize: '32px' }}>My Page</h1>
```
