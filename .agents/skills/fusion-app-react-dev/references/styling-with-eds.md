# Styling with EDS

How to use the Equinor Design System (EDS) components and design tokens in a Fusion Framework app.

## Packages

| Package | Purpose |
|---|---|
| `@equinor/eds-core-react` | Core UI components (Button, Dialog, Typography, etc.) |
| `@equinor/eds-icons` | SVG icon data objects |
| `@equinor/eds-tokens` | Design tokens — colors, spacing, typography, elevation |
| `@equinor/eds-data-grid-react` | EDS-themed AG Grid wrapper (see `using-ag-grid.md`) |
| `@equinor/fusion-react-*` | Fusion-specific React components not in EDS (see `using-fusion-react-components.md`) |

## Component catalog

Frequently used components from `@equinor/eds-core-react`:

| Component     | Use for                             |
|---------------|-------------------------------------|
| `Typography`  | All text (headings, body, labels)   |
| `Button`      | Actions and CTAs                    |
| `Dialog`      | Modal dialogs                       |
| `Table`       | Simple non-interactive tables       |
| `Tabs`        | Tab navigation                      |
| `Chip`        | Tags, filters, status badges       |
| `Card`        | Content containers                  |
| `Search`      | Search input fields                 |
| `Autocomplete`| Filtered dropdown selection         |
| `Icon`        | Icons from `@equinor/eds-icons`     |
| `Progress`    | Loading indicators (`.Dots`, `.Circular`) |
| `Banner`      | Informational banners               |
| `Snackbar`    | Toast notifications                 |
| `Menu`        | Dropdown menus                      |
| `Tooltip`     | Hover information                   |
| `Checkbox`    | Toggle inputs                       |
| `Radio`       | Single selection from a group       |
| `TextField`   | Text input fields                   |
| `Switch`      | On/off toggle                       |
| `EdsProvider` | Density switching (compact/comfortable) |

Always check `@equinor/eds-core-react` before building custom UI elements.

## Design tokens

Use EDS tokens for all visual values — never hardcode colors, spacing, or typography.

### CSS custom properties (preferred)

Available when the EDS theme is active (Fusion Portal provides this):

```css
background: var(--eds-color-bg-neutral-surface);
color: var(--eds-color-text-neutral-strong);
border: 1px solid var(--eds-color-border-neutral-subtle);
padding: var(--eds-spacing-comfortable-medium);
```

Common token categories:
- `--eds-color-bg-*` — background colors (neutral, accent, success, info, warning, danger)
- `--eds-color-text-*` — text colors
- `--eds-color-border-*` — border colors
- `--eds-spacing-*` — spacing values

### JS token imports

When CSS custom properties are not available:

```typescript
import { tokens } from '@equinor/eds-tokens';

tokens.colors.ui.background__default.rgba   // background color
tokens.shape.corners.borderRadius           // border radius
tokens.spacings.comfortable.medium          // spacing
tokens.elevation.raised                     // box shadow
```

## Icons

Use `@equinor/eds-icons` for icon data and the `Icon` component to render:

```typescript
import { Icon } from '@equinor/eds-core-react';
import { edit, save, delete_to_trash, search, close } from '@equinor/eds-icons';

<Icon data={edit} title="Edit" />
<Icon data={save} title="Save" />
```

Import names use `snake_case`. Browse available icons at [eds.equinor.com](https://eds.equinor.com).

## Density

Switch between comfortable and compact density:

```typescript
import { EdsProvider } from '@equinor/eds-core-react';

<EdsProvider density="compact">
  {/* All child EDS components render in compact mode */}
</EdsProvider>
```

## Accessibility

- EDS components handle most accessibility automatically.
- Use `aria-disabled` instead of `disabled` on buttons that need tooltip support.
- Always provide `title` on `<Icon>` for screen readers, or `aria-label` on icon buttons.
- Color must not be the sole way to convey information.
