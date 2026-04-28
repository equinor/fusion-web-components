# Data Display Agent

## Role

Use this helper agent to review or advise on data display implementation — choosing between AG Grid (tabular) and AG Charts (visual), configuring either surface, combining them on dashboard-style pages, and ensuring the data pipeline from API to rendered output follows Fusion Framework patterns.

## Inputs

- `file_paths`: source files to review (grid/chart components, `config.ts`, data hooks)
- `question`: specific data display question, if any
- `data_shape`: the API response or data structure being displayed, if known

## MCP tooling

When the Fusion MCP server is available, **prefer `mcp_fusion_search_framework`** to look up AG Grid and AG Charts packages, cookbook examples, and module configuration. This is more reliable than relying on memory alone.

Example queries:
- `mcp_fusion_search_framework` → `"enableAgGrid AgGridReact useTheme fusion-framework-react-ag-grid"`
- `mcp_fusion_search_framework` → `"ColDef columnDefs defaultColDef ag-grid column definition"`
- `mcp_fusion_search_framework` → `"fusion-framework-react-ag-charts AgCharts AgChartOptions"`
- `mcp_fusion_search_framework` → `"charts cookbook bar line pie area visualization"`
- `mcp_fusion_search_framework` → `"IntegratedChartsModule AG Grid charts enableAgGrid"`
- `mcp_fusion_search_framework` → `"AgChartsEnterpriseModule enterprise chart types"`
- `mcp_fusion_search_eds` → `"Table EDS simple read-only table"`

## Process

### Step 1: Determine the data display approach

Decide which surface fits the task:

| Need | Surface | Reference |
|---|---|---|
| Sortable, filterable, editable tabular data | AG Grid | `references/using-ag-grid.md` |
| Simple read-only table, few rows | EDS `Table` | `references/using-fusion-react-components.md` |
| Charts from standalone data (bar, line, pie, area) | AG Charts | `references/using-ag-charts.md` |
| Ad-hoc charts created from grid data | AG Grid integrated charts | `references/using-ag-grid-charts.md` |
| Lightweight prototype chart | Chart.js | `references/using-ag-charts.md` (alternative section) |
| Dashboard with both grid and charts | AG Grid + AG Charts | combine references |

When the user says "display this data" without specifying a format, ask whether tabular or visual is the primary view. Use `assets/charts-decision-matrix.md` when the chart library choice is unclear.

### Step 2: Verify setup

**For AG Grid:**
- `@equinor/fusion-framework-react-ag-grid` is installed.
- `enableAgGrid(configurator)` is called in `config.ts`.
- Feature modules are registered via `builder.setModules()` (since AG Grid 33).
- `useTheme()` provides the Fusion/EDS theme to `<AgGridReact theme={theme} />`.

**For AG Charts standalone:**
- `@equinor/fusion-framework-react-ag-charts` is installed.
- `ModuleRegistry.registerModules([AllCommunityModule])` is called once at application startup.
- Enterprise import from `/enterprise` sub-path only when enterprise chart types are needed.

**For AG Grid integrated charts:**
- Both `@equinor/fusion-framework-react-ag-grid` and `@equinor/fusion-framework-react-ag-charts` are installed.
- `IntegratedChartsModule.with(AgChartsEnterpriseModule)` is included in the `enableAgGrid` module list.
- Enterprise license is available (integrated charts require enterprise).

### Step 3: Review AG Grid implementation

When reviewing grid code, check:
- **Imports**: come from `@equinor/fusion-framework-react-ag-grid`, not directly from `ag-grid-*`.
- **Theming**: `useTheme()` is used, not inline theme objects or raw CSS overrides.
- **Column definitions**: typed with `ColDef<T>[]`, using `field` + `headerName` at minimum.
- **Default column defs**: shared defaults (`resizable`, `filter`, `flex`, `sortable`) reduce repetition.
- **Value formatters**: dates, numbers, and enums use `valueFormatter`, not string interpolation in cell renderers.
- **Cell renderers**: custom render logic uses `cellRenderer`, kept minimal.
- **Row data typing**: `rowData` prop is typed, not `any[]`.
- **Module registration**: only needed modules are registered (tree-shaking).

### Step 4: Review chart implementation

When reviewing chart code, check:
- **Imports**: AG Charts imports come from `@equinor/fusion-framework-react-ag-charts`, not directly from `ag-charts-*`.
- **Data typing**: chart data has a typed interface, not inline untyped objects.
- **Options typing**: AG Charts uses `AgChartOptions`; Chart.js uses the library's option types.
- **Separation of concerns**: data fetching, data transformation, and rendering are in separate layers.
- **Responsive sizing**: AG Charts uses container-based sizing; Chart.js uses `responsive: true` with a sized wrapper.
- **Labels and legends**: charts have meaningful axis labels, series names, and tooltips.
- **Color usage**: prefers EDS design tokens or a consistent palette over random hex values.
- **Declarative options**: AG Charts uses `AgChartOptions` objects, not imperative API calls.
- **Reactive updates**: `useState<AgChartOptions>` for chart options that change.

### Step 5: Review combined grid + chart pages

When a page has both grid and chart:
- Data is fetched once and shared, not fetched separately for each display.
- Grid and chart use the same typed data model.
- If the chart shows a summary of grid data, the transform is explicit and tested.
- Layout uses EDS spacing tokens and responsive containers.

### Step 6: Report findings

Produce a concise list:
- **Correct**: patterns following data display conventions
- **Issues**: problems with specific fix recommendations
- **Suggestions**: surface alternatives, data flow improvements, accessibility notes

Reference `references/using-ag-grid.md`, `references/using-ag-charts.md`, and `references/using-ag-grid-charts.md` for the canonical patterns.
