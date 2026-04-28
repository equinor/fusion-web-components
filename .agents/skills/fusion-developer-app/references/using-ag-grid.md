# Using AG Grid

How to display tabular data with AG Grid in a Fusion Framework app, using `@equinor/fusion-framework-react-ag-grid`.

## Quick start

### Install

Install with your project's package manager:

```sh
# use the project's package manager (bun / pnpm / npm)
bun add @equinor/fusion-framework-react-ag-grid
```

### Enable the module

Register AG Grid in `src/config.ts`:

```typescript
import type { AppModuleInitiator } from '@equinor/fusion-framework-react-app';
import { enableAgGrid } from '@equinor/fusion-framework-react-ag-grid';

export const configure: AppModuleInitiator = (configurator) => {
  enableAgGrid(configurator);
};
```

### Render a grid

```typescript
import { AgGridReact } from '@equinor/fusion-framework-react-ag-grid';
import { useTheme } from '@equinor/fusion-framework-react-ag-grid';
import type { ColDef } from '@equinor/fusion-framework-react-ag-grid/community';

interface Item {
  id: string;
  name: string;
  status: string;
}

const columnDefs: ColDef<Item>[] = [
  { field: 'name', headerName: 'Name', flex: 2 },
  { field: 'status', headerName: 'Status', width: 120 },
];

/**
 * Renders a data grid with Fusion/EDS theming.
 *
 * @param props.items - The list of items to display.
 * @returns A themed AG Grid component.
 */
const ItemGrid = ({ items }: { items: Item[] }) => {
  const theme = useTheme();
  return (
    <AgGridReact
      theme={theme}
      rowData={items}
      columnDefs={columnDefs}
    />
  );
};
```

## Registering feature modules

Since AG Grid 33, feature modules must be explicitly registered for tree-shaking.
Use `builder.setModules()` inside the `enableAgGrid` callback:

```typescript
import { enableAgGrid } from '@equinor/fusion-framework-react-ag-grid';
import {
  ClientSideRowModelModule,
  ValidationModule,
} from '@equinor/fusion-framework-react-ag-grid/community';

export const configure: AppModuleInitiator = (configurator) => {
  enableAgGrid(configurator, (builder) => {
    builder.setModules([
      ClientSideRowModelModule,
      ValidationModule,
    ]);
  });
};
```

With Enterprise license:

```typescript
import {
  ClipboardModule,
  ColumnsToolPanelModule,
  ExcelExportModule,
  FiltersToolPanelModule,
  MenuModule,
} from '@equinor/fusion-framework-react-ag-grid/enterprise';

builder.setModules([
  ClientSideRowModelModule,
  ClipboardModule,
  ColumnsToolPanelModule,
  ExcelExportModule,
  FiltersToolPanelModule,
  MenuModule,
]);
```

Only import what you need — unregistered modules are tree-shaken out.

## Theming

The module provides the `fusionTheme` by default — an Equinor-branded theme based on AG Grid Alpine with EDS accent colors.

### Using the default theme

```typescript
import { useTheme } from '@equinor/fusion-framework-react-ag-grid';

const MyGrid = ({ rows }) => {
  const theme = useTheme();
  return <AgGridReact theme={theme} rowData={rows} columnDefs={columns} />;
};
```

### Customizing the theme

```typescript
enableAgGrid(configurator, (builder) => {
  builder.setTheme((theme) => {
    return theme.withParams({
      backgroundColor: '#1f2836',
      browserColorScheme: 'dark',
      foregroundColor: '#FFF',
      headerFontSize: 14,
    });
  });
});
```

### Per-instance customization

```typescript
import { useTheme } from '@equinor/fusion-framework-react-ag-grid';

const MyGrid = () => {
  const baseTheme = useTheme();
  const theme = useMemo(
    () => baseTheme.withParams({ cellTextColor: '#FF0000' }),
    [baseTheme],
  );
  return <AgGridReact theme={theme} rowData={rows} columnDefs={columns} />;
};
```

## Default column definitions

Set shared column defaults to reduce repetition:

```typescript
const defaultColDef: ColDef = {
  resizable: true,
  filter: true,
  flex: 1,
  minWidth: 100,
  sortable: true,
};

<AgGridReact
  theme={theme}
  rowData={rows}
  columnDefs={columns}
  defaultColDef={defaultColDef}
/>
```

## Column definition patterns

```typescript
const columnDefs: ColDef<Item>[] = [
  // Flex sizing — fills available space proportionally
  { field: 'name', headerName: 'Name', flex: 2 },

  // Fixed width
  { field: 'status', headerName: 'Status', width: 120 },

  // Value formatter
  {
    field: 'createdAt',
    headerName: 'Created',
    valueFormatter: ({ value }) => new Date(value).toLocaleDateString(),
  },

  // Cell renderer for custom content
  {
    field: 'actions',
    headerName: '',
    cellRenderer: ({ data }) => <Button variant="ghost">Edit</Button>,
    width: 80,
    sortable: false,
    filter: false,
  },
];
```

## When to use AG Grid vs EDS Table

| Use case | Component |
|---|---|
| Sorting, filtering, resizable/reorderable columns | `AgGridReact` via fusion-react-ag-grid |
| Simple read-only table, few rows | `Table` from `@equinor/eds-core-react` |
| Key-value display | `Table` or definition list |

## Packages and entry points

| Import path | Purpose |
|---|---|
| `@equinor/fusion-framework-react-ag-grid` | Main: `AgGridReact`, `enableAgGrid`, `useTheme`, `fusionTheme` |
| `@equinor/fusion-framework-react-ag-grid/community` | Re-exports from `ag-grid-community` (ColDef, events, etc.) |
| `@equinor/fusion-framework-react-ag-grid/enterprise` | Re-exports from `ag-grid-enterprise` (requires license) |
| `@equinor/fusion-framework-react-ag-grid/themes` | `fusionTheme`, `createTheme`, `createThemeFromTheme` |

## TypeScript note

Set `"moduleResolution": "bundler"` in `tsconfig.json` to resolve AG Grid types correctly from this package.
