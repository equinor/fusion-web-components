# Using AG Grid Integrated Charts

How to enable chart creation from AG Grid data in a Fusion Framework app, using the AG Grid `IntegratedChartsModule` with AG Charts enterprise.

## Prerequisites

- `@equinor/fusion-framework-react-ag-grid` installed
- `@equinor/fusion-framework-react-ag-charts` installed
- A valid AG Charts Enterprise license (integrated charts require enterprise)

## Enable integrated charts

Add `IntegratedChartsModule.with(AgChartsEnterpriseModule)` to the AG Grid module list in `config.ts`:

```ts
import type { AppModuleInitiator } from '@equinor/fusion-framework-react-app';
import { enableAgGrid } from '@equinor/fusion-framework-react-ag-grid';
import {
  AllCommunityModule,
  ClientSideRowModelModule,
} from '@equinor/fusion-framework-react-ag-grid/community';
import {
  IntegratedChartsModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  MenuModule,
} from '@equinor/fusion-framework-react-ag-grid/enterprise';
import { AgChartsEnterpriseModule } from '@equinor/fusion-framework-react-ag-charts/enterprise';

export const configure: AppModuleInitiator = (configurator) => {
  enableAgGrid(configurator, (builder) => {
    builder.setModules([
      AllCommunityModule,
      ClientSideRowModelModule,
      ColumnsToolPanelModule,
      FiltersToolPanelModule,
      MenuModule,
      IntegratedChartsModule.with(AgChartsEnterpriseModule),
    ]);
  });
};
```

## How users create charts from the grid

Once integrated charts are enabled, users can:

1. Select one or more columns in the grid.
2. Right-click on the selection.
3. Choose "Chart Range" from the context menu.
4. Select a chart type (bar, line, pie, area, etc.).
5. Customize using the chart toolbar.

No additional chart component code is needed — AG Grid renders the chart in a popup or docked panel.

## Enable chart menu item

Ensure `enableCharts: true` is set on the grid (this is the default when `IntegratedChartsModule` is registered):

```tsx
<AgGridReact
  theme={theme}
  rowData={rows}
  columnDefs={columns}
  enableCharts={true}
  enableRangeSelection={true}
/>
```

`enableRangeSelection` allows users to select cell ranges, which is the typical trigger for chart creation.

## Programmatic chart creation

Create charts from code using the grid API:

```tsx
const gridRef = useRef<AgGridReact>(null);

const createChart = () => {
  gridRef.current?.api.createRangeChart({
    chartType: 'groupedBar',
    cellRange: {
      columns: ['category', 'value'],
    },
  });
};
```

## When to use integrated charts vs standalone AG Charts

| Scenario | Approach |
|---|---|
| Users explore grid data visually on demand | Integrated charts |
| Fixed chart layout on a dashboard page | Standalone AG Charts |
| Chart data comes from a different source than the grid | Standalone AG Charts |
| Both grid and chart show the same dataset | Integrated charts |

## Sources

- [AG Grid Cookbook](https://github.com/equinor/fusion-framework/blob/main/cookbooks/app-react-ag-grid/README.md)
- [@equinor/fusion-framework-react-ag-charts README](https://github.com/equinor/fusion-framework/blob/main/packages/react/ag-charts/README.md)
- [AG Grid Charts Integration docs](https://www.ag-grid.com/react-data-grid/integrated-charts/)
