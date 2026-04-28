# Charts Library Decision Matrix

Use this matrix when a developer asks about charting in a Fusion Framework app and the library choice is not already decided.

## Decision table

| Factor | AG Charts | Chart.js |
|---|---|---|
| **Fusion alignment** | First-class via `@equinor/fusion-framework-react-ag-charts` | Third-party; no Fusion wrapper |
| **Version management** | Centrally managed across all Fusion apps | Managed per-app in `package.json` |
| **AG Grid integration** | Native via `IntegratedChartsModule` | Not supported |
| **Community chart types** | Bar, line, area, pie, donut, scatter, bubble | Bar, line, area, pie, doughnut, scatter, bubble, radar, polar |
| **Enterprise chart types** | Waterfall, heatmap, sunburst, treemap, stock, maps | Not available |
| **TypeScript support** | Full type definitions via Fusion wrapper | Full type definitions |
| **Bundle size** | Larger; offset by shared singleton in Fusion portal | Smaller; tree-shakeable per component |
| **Interactivity** | Built-in pan, zoom, crosshairs, tooltips | Basic tooltips; plugins needed for advanced interaction |
| **License** | Community: free; Enterprise: commercial license required | MIT |

## Default recommendation

**Recommend AG Charts** for new Fusion Framework apps. The Fusion wrapper ensures version consistency across the portal.

## When to recommend Chart.js instead

- Quick prototype where bundle size matters
- The user explicitly prefers Chart.js
- Radar or polar area charts are needed (AG Charts community does not include these)
- Simple one-off chart that does not justify the AG Charts dependency

## When to recommend AG Grid integrated charts

- The page already has an AG Grid showing the same dataset
- Users should be able to create ad-hoc charts from grid data
- The chart and grid need to stay in sync

## Sources

- [Charts Cookbook — "When to Use Each Library"](https://github.com/equinor/fusion-framework/blob/main/cookbooks/app-react-charts/README.md)
- [@equinor/fusion-framework-react-ag-charts — "Who Should Use This"](https://github.com/equinor/fusion-framework/blob/main/packages/react/ag-charts/README.md)
