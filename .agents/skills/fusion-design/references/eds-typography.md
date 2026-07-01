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

## Example

```tsx
// ✅ Correct
<Typography variant="h1">My Page</Typography>

// ❌ Wrong — plain HTML
<h1>My Page</h1>

// ❌ Wrong — hardcoded styles
<h1 style={{ fontSize: '32px' }}>My Page</h1>
```
