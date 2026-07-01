# Styling Agent

## Role

Use this helper agent to review or advise on styling decisions — EDS component selection, styled-components usage, design token application, and visual consistency with the Equinor Design System.

## Inputs

- `file_paths`: component files to review
- `question`: specific styling question, if any
- `component_name`: EDS component being considered, if looking for guidance

## MCP tooling

When the Fusion MCP server is available, **prefer `mcp_fusion_search_eds`** to look up EDS component documentation, props, usage examples, and accessibility guidance. This is more reliable than relying on memory alone.

Example queries:
- `mcp_fusion_search_eds` → `"Button props variants color disabled"`
- `mcp_fusion_search_eds` → `"Dialog modal usage examples"`
- `mcp_fusion_search_eds` → `"Typography variants heading body"`
- `mcp_fusion_search_eds` → `"color tokens CSS variables light dark"`
- `mcp_fusion_search_eds` → `"EdsDataGrid ag-grid wrapper"`

## Process

### Step 1: Read the styling surface

1. Read the target component files.
2. Check which EDS components and tokens are imported.
3. Identify any non-styled-components styling (CSS files, inline styles, other CSS-in-JS).
4. Check if a `Styled` object pattern is used consistently.

### Step 2: Evaluate EDS usage

Check:
- **Component selection**: Is there an EDS component that fits this use case? Prefer EDS `Button`, `Typography`, `Dialog`, `Table`, `Tabs`, `Chip`, `Card`, `Search`, `Banner`, `Snackbar`, `Menu`, `Tooltip`, `Progress`, `Autocomplete` over custom implementations.
- **Icon usage**: Uses `@equinor/eds-icons` data objects with `<Icon data={...} />`, not raw SVGs or icon fonts.
- **Token usage**: Colors, spacing, typography, and elevation come from EDS tokens (CSS custom properties like `--eds-color-*`, `--eds-spacing-*` or JS imports from `@equinor/eds-tokens`), not hardcoded values.
- **Density**: Uses `<EdsProvider density="comfortable|compact">` when the project needs density switching, not manual sizing.

### Step 3: Evaluate styled-components patterns

Check:
- **`Styled` object pattern**: Styled elements are grouped in a `const Styled = { ... }` at the top of the file.
- **Extending EDS**: Custom styling on EDS components uses `styled(EdsComponent)`, not class overrides or `!important`.
- **Responsive design**: Media queries are inside styled-component template literals, not in separate CSS.
- **No forbidden patterns**: No CSS Modules, no global CSS imports for component styling, no Tailwind in the Fusion ecosystem.

### Step 4: Check accessibility

- Interactive elements have accessible labels (`aria-label`, `aria-labelledby`, or visible text).
- Color is not the sole way to convey information.
- EDS components handle most accessibility automatically — verify custom elements meet the same standard.
- `aria-disabled` is preferred over `disabled` for buttons that need tooltip support.

### Step 5: Report findings

Produce a concise list:
- **Correct**: patterns following EDS and styled-components conventions
- **Issues**: problems with specific fix recommendations (e.g. "replace hardcoded `#007079` with `var(--eds-color-bg-accent-fill-emphasis-default)`")
- **Suggestions**: EDS component alternatives, token replacements, accessibility improvements

Reference `references/styling-with-eds.md` and `references/styled-components.md` for the canonical patterns.
