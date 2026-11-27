# Spacing

Always use EDS spacing variables. Never hardcode spacing values.

---

## When spacing is required

Spacing variables are not required on every element. Apply them when the element needs explicit padding or gap — and when you do, always use the correct EDS variable for the context.

---

## Page / view spacing

Applied to the main application view — the outermost layout container.

| Property | Variable |
|---|---|
| Vertical padding | `--eds-spacing-inset-xl-vertical-squared` |
| Horizontal padding | `--eds-spacing-inset-xl-horizontal` |
| Vertical gap | `--eds-spacing-vertical-xl` |
| Horizontal gap | `--eds-spacing-horizontal-xl` |

---

## Container spacing

Applied to non-interactive grouping elements — sections, cards, panels.

| Property | Variable |
|---|---|
| Vertical padding | `--eds-spacing-inset-md-vertical-squared` |
| Horizontal padding | `--eds-spacing-inset-md-horizontal` |
| Vertical gap | `--eds-spacing-vertical-md` |
| Horizontal gap | `--eds-spacing-horizontal-md` |

---

## Selectable / interactive spacing

Applied to interactive elements — buttons, toggles, clickable icons.

| Property | Variable |
|---|---|
| Vertical padding | `--eds-spacing-inset-xs-vertical-squared` |
| Horizontal padding | `--eds-spacing-inset-xs-horizontal` |
| Vertical gap | `--eds-spacing-vertical-xs` |
| Horizontal gap | `--eds-spacing-horizontal-xs` |
| Icon gap | `--eds-spacing-horizontal-xs` |

---

## Generic spacing

For cases not covered above — use `--eds-spacing-[vertical|horizontal]-[size]` per side.

**Sizes (use exactly as written):** `4xs` `3xs` `2xs` `xs` `sm` `md` `lg` `xl` `2xl` `3xl`

Do **not** expand size abbreviations — `md` is correct, `medium` is not; `xl` is correct, `x-large` is not.

---

## Rules

- Never write `padding: 16px`, `gap: 24px`, or similar hardcoded values — use the variables above
- Match the variable tier to the element context: page → `xl`, container → `md`, interactive → `xs`
- Use `--eds-spacing-inset-*` for padding on layout containers; use `--eds-spacing-vertical/horizontal-*` for gaps between elements
- For border-radius use `--eds-spacing-border-radius-rounded` (standard rounded), `--eds-spacing-border-radius-none` (sharp/square corners) or `--eds-spacing-border-radius-pill` (full pill) from `@equinor/eds-tokens` v2 — do **not** invent names like `--eds-shape-corners-border-radius` or `--eds-shape-border-radius-*`, which are not defined. Confirm a token exists in the installed `@equinor/eds-tokens/build/css/variables.css` before using it
