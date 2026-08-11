# Navigation — Tabs

## Rules

- **Use tabs when the app has 2–5 closely related views** — for more than 5 top-level sections, use a sidemenu instead.
- **Never nest tabs** — if a tab requires sub-navigation, the structure needs rethinking.
- **Never combine tabs with a sidemenu at the same hierarchy level** — tabs handle all top-level navigation on their own.
- **Never use tabs for unrelated content** — all tabs must belong to the same entity or context.
- **Always left-align tabs** — never center-align.
- **Never style breadcrumbs as tabs** — they are different patterns with different meanings.

## Structure levels

| Level | Description |
|---|---|
| A | App or page title — displayed in the header above the tab bar |
| B | The tab bar — all tabs are siblings at the same level, no hierarchy |

All B items are siblings. There are no child items. The active tab is highlighted.

## Breadcrumbs

- **Do not show breadcrumbs** when tabs are the primary navigation — the user is always at the top level.
- The page title alone is sufficient to orient the user in a tab-based layout.
- **Never** style breadcrumbs as tabs — they are different patterns with different meanings.

## AG Grid layout rule

When a tab contains an AG Grid:
- The grid must fill the full available height of the content area — no fixed height, no scrollable wrapper.
- The grid handles its own internal scrolling — the page must not scroll.
- Use `height: 100%` from root down to the grid — no ancestor may have a fixed or auto height that cuts it off.

## Example structure

```
App (A)
├── Overview (B)
├── Members (B)
└── Settings (B)
```

No breadcrumbs are shown. The user is always at the top level within the tab bar.
