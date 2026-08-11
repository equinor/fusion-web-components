# Layout — Content Area Patterns

Three accepted patterns for the content area (everything below the header, right of sidemenu if present). Pick **one per page** and apply consistently.

---

## Pattern selection

| Page type | Pattern | Max-width |
|---|---|---|
| AG Grid / data grid | **C — Viewport-fill** | No cap |
| Map or spatially-driven component | **C — Viewport-fill** | No cap |
| List view / search results | **B — Full-width** | `1584px` |
| Dashboard / overview | **B — Full-width** | `1584px` |
| Detail view / entity view | **A — Centered** | `1024px` |
| Form / settings / configuration | **A — Centered** | `768px` |
| Wizard / step-by-step flow | **A — Centered** | `768px` |
| Long-form text / documentation | **A — Centered** | `768px` |

---

## A — Centered content

Content block is capped at a max-width and centered with equal margins on both sides.

- Forms, settings, detail views, reading-heavy pages
- `768px` for forms/settings/wizards; `1024px` for detail/entity views
- Do **not** use `1280px` when a sidemenu is present — it overflows the content area at the primary viewport (1920×1080 at 125% scaling ≈ 1536px effective width)
- Header must align to the same max-width as the content

---

## B — Full-width content

Content stretches edge to edge, capped at `1584px` on wide screens. Always maintains internal padding.

- Dashboards, card layouts, list views, multi-column tables
- Internal padding: use page/view spacing variables from the spacing reference — `--eds-spacing-inset-xl-vertical-squared` (vertical) and `--eds-spacing-inset-xl-horizontal` (horizontal). Never hardcode pixel values.
- **Data tables and lists must fill the full content width** — set `width: 100%` on the table/list. EDS `Table` (and a plain `<table>`) sizes to its content by default, so without this it collapses to a narrow column on the left and wastes the horizontal space that makes dense data scannable.
- If a **single** viewport-filling component (AG Grid, map) occupies the entire area, use **C — Viewport-fill** instead
- Never use zero padding — content must not touch the edges

---

## C — Viewport-fill

A single component fills all available width **and** height. No max-width cap. No outer padding. The component manages its own internal scrolling.

**Use for:** AG Grid pages, maps, any tool-mode component that is the entire page.

### Height rules (critical)

The page itself must **not** scroll — the component handles all internal scrolling.

- Root shell: `height: 100vh; display: flex; flex-direction: column; overflow: hidden`
- Tab bar / header: `flex-shrink: 0` (auto/fixed height)
- Tab content area: `flex: 1; overflow: hidden; min-height: 0`
- The viewport-fill component inside: `width: 100%; height: 100%`

If **any** ancestor has `auto` height without `min-height: 0`, the component will overflow and cause page-level scrolling — fix the entire chain from root down.

### AG Grid specifics

```tsx
// AG Grid tab panel — overflow: hidden, grid scrolls internally
<div style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
  <div style={{ width: '100%', height: '100%' }} className="ag-theme-quartz">
    <AgGridReact ... />
  </div>
</div>

// All other tab panels — overflow-y: auto, normal panel scroll
// Use EDS page spacing vars — never hardcode padding values
<div style={{ flex: 1, overflowY: 'auto', paddingBlock: 'var(--eds-spacing-inset-xl-vertical-squared)', paddingInline: 'var(--eds-spacing-inset-xl-horizontal)' }}>
  <OverviewPage />
</div>
```

When tabs are used, each tab panel controls its own overflow independently. Only the viewport-fill panel uses `overflow: hidden` — other panels use `overflow-y: auto` so their content can scroll normally if it exceeds the panel height. Never apply `overflow: hidden` to all tab panels uniformly.

### Don'ts

- Don't add a max-width cap — it forces horizontal scrolling inside the component
- Don't wrap the component in a scrollable container
- Don't add outer padding — the component owns its internal spacing
- Don't let any ancestor have unconstrained `auto` height

---

## Cross-pattern rules

- Pick one pattern per page — never mix on the same page
- The header always matches the content width (centered header + full-width content is not allowed)
- Don't set a fixed pixel height on the content area
