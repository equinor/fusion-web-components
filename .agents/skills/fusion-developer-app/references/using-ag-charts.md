# Using AG Charts

How to render standalone charts in a Fusion Framework app using `@equinor/fusion-framework-react-ag-charts`.

## Quick start

### Install

```sh
# use the project's package manager (bun / pnpm / npm)
bun add @equinor/fusion-framework-react-ag-charts
```

### Register modules

Register chart modules **once** at application startup, before rendering any chart:

```ts
import {
  AllCommunityModule,
  ModuleRegistry,
} from '@equinor/fusion-framework-react-ag-charts/community';

ModuleRegistry.registerModules([AllCommunityModule]);
```

Place this in the application entry point or a top-level initializer. Charts fail silently without module registration.

### Render a chart

```tsx
import { useState } from 'react';
import { AgCharts } from '@equinor/fusion-framework-react-ag-charts';
import type { AgChartOptions } from '@equinor/fusion-framework-react-ag-charts/community';

const SalesChart = () => {
  const [chartOptions] = useState<AgChartOptions>({
    data: [
      { month: 'Jan', avgTemp: 2.3, iceCreamSales: 162000 },
      { month: 'Mar', avgTemp: 6.3, iceCreamSales: 302000 },
      { month: 'May', avgTemp: 16.2, iceCreamSales: 800000 },
      { month: 'Jul', avgTemp: 22.8, iceCreamSales: 1254000 },
      { month: 'Sep', avgTemp: 14.5, iceCreamSales: 950000 },
      { month: 'Nov', avgTemp: 8.9, iceCreamSales: 200000 },
    ],
    series: [{ type: 'bar', xKey: 'month', yKey: 'iceCreamSales' }],
  });

  return <AgCharts options={chartOptions} />;
};
```

## Packages and entry points

| Sub-path | What it provides | Upstream package |
|---|---|---|
| `@equinor/fusion-framework-react-ag-charts` | `AgCharts` React component and React-level utilities | `ag-charts-react` |
| `@equinor/fusion-framework-react-ag-charts/community` | `AllCommunityModule`, `ModuleRegistry`, `AgChartOptions`, `AgChartTheme` | `ag-charts-community` |
| `@equinor/fusion-framework-react-ag-charts/enterprise` | `AgChartsEnterpriseModule` and enterprise-only chart types | `ag-charts-enterprise` |

Always import from the Fusion wrapper, not directly from `ag-charts-*` packages. The wrapper ensures all Fusion apps share a single centrally managed version.

## Multi-series chart

```tsx
const chartOptions: AgChartOptions = {
  data: [
    { quarter: 'Q1', revenue: 45000, expenses: 30000 },
    { quarter: 'Q2', revenue: 52000, expenses: 35000 },
    { quarter: 'Q3', revenue: 61000, expenses: 38000 },
    { quarter: 'Q4', revenue: 58000, expenses: 36000 },
  ],
  series: [
    { type: 'bar', xKey: 'quarter', yKey: 'revenue', yName: 'Revenue' },
    { type: 'bar', xKey: 'quarter', yKey: 'expenses', yName: 'Expenses' },
  ],
};
```

## Common chart types

### Line chart

```tsx
series: [
  { type: 'line', xKey: 'month', yKey: 'temperature', yName: 'Avg Temperature' },
]
```

### Area chart

```tsx
series: [
  { type: 'area', xKey: 'month', yKey: 'revenue', yName: 'Revenue' },
]
```

### Pie chart

```tsx
series: [
  { type: 'pie', angleKey: 'share', legendItemKey: 'segment' },
]
```

## Enterprise chart types

Enterprise features require a valid AG Charts license. Import from the `/enterprise` sub-path:

```ts
import { AgChartsEnterpriseModule } from '@equinor/fusion-framework-react-ag-charts/enterprise';
```

Enterprise-only types include: waterfall, heatmap, sunburst, treemap, stock charts, and maps.

## Reactive chart updates

Use `useState` for chart options that change in response to user interaction or data updates:

```tsx
const [chartOptions, setChartOptions] = useState<AgChartOptions>({
  data: initialData,
  series: [{ type: 'bar', xKey: 'category', yKey: 'value' }],
});

// Update data reactively
const handleDataUpdate = (newData: ChartDataItem[]) => {
  setChartOptions((prev) => ({ ...prev, data: newData }));
};
```

## Data fetching pattern

Separate data fetching from chart rendering:

```tsx
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useQuery } from '@tanstack/react-query';

interface MetricItem {
  period: string;
  value: number;
}

const useMetrics = () => {
  const httpClient = useHttpClient('my-api');
  return useQuery({
    queryKey: ['metrics'],
    queryFn: () => httpClient.json<MetricItem[]>('/api/metrics'),
  });
};

const MetricsChart = () => {
  const { data, isLoading } = useMetrics();
  const [chartOptions] = useState<AgChartOptions>({
    data: data ?? [],
    series: [{ type: 'bar', xKey: 'period', yKey: 'value' }],
  });

  if (isLoading) return <Progress.Linear />;
  return <AgCharts options={chartOptions} />;
};
```

## Responsive sizing

AG Charts sizes to its container. Wrap in a sized element:

```tsx
<div style={{ width: '100%', height: 400 }}>
  <AgCharts options={chartOptions} />
</div>
```

Or with styled-components:

```tsx
const Styled = {
  ChartContainer: styled.div`
    width: 100%;
    height: 400px;
  `,
};

<Styled.ChartContainer>
  <AgCharts options={chartOptions} />
</Styled.ChartContainer>
```

## Key concepts

- **Module registration** — AG Charts uses a modular architecture. Register modules via `ModuleRegistry.registerModules()` before any chart renders. `AllCommunityModule` is the easiest starting point.
- **Chart options** — Charts are configured declaratively through an `AgChartOptions` object describing data, series types, axes, legends, and themes.
- **Thin wrapper** — `@equinor/fusion-framework-react-ag-charts` re-exports upstream AG Charts packages so Fusion apps share a single centrally managed version.

## Sources

- [@equinor/fusion-framework-react-ag-charts README](https://github.com/equinor/fusion-framework/blob/main/packages/react/ag-charts/README.md)
- [Charts Cookbook](https://github.com/equinor/fusion-framework/blob/main/cookbooks/app-react-charts/README.md)
- [AG Charts upstream docs](https://www.ag-grid.com/charts/)
