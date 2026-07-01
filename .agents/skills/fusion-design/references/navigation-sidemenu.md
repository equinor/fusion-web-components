# Navigation — Sidemenu

## Rules

- **Use a sidemenu when the app has 3 or more distinct sections** — for fewer than 3 sections, use tabs instead.
- **Never combine sidemenu and tabs at the same hierarchy level** — the sidemenu handles all top-level navigation on its own.
- **Maximum navigation depth is 4 levels** — if the app requires more, reconsider the information architecture.
- **Expand the sidemenu by default on first arrival** — never hide or collapse it on load.
- **Never put state-driven actions in the sidemenu** (Save, Delete, Confirm) — place actions in the content area.
- **Never create single-child groups** — if a parent has only one child, flatten it to a top-level item.

## Structure levels

| Level | Description |
|---|---|
| A | App root / landing page — first breadcrumb segment |
| B | Top-level sections — primary sidemenu items |
| C | Child items — indented under their parent B when expanded |
| D | Deepest recommended level — do not go beyond this |

## Breadcrumbs

- Show breadcrumbs when the app has 2 or more levels of navigation depth.
- **Never** show breadcrumbs on the top-level entry point — there is nowhere to navigate back to.
- The current page is the last breadcrumb segment and is **not** a clickable link.
- Each breadcrumb item links to the index/overview of that level.
- Use the actual entity name for dynamic segments — not a generic label.
- **Never** style breadcrumbs as tabs — they are different patterns with different meanings.
- **Never** truncate breadcrumb items unless screen space is critically limited.

## Example structure

```
App (A)
├── Overview (B)
├── Applications (B)
│   ├── App list (C)
│   └── App details (C)
├── Settings (B)
│   ├── Users (C)
│   ├── Roles (C)
│   └── Integrations (C)
└── Help (B)
```

Breadcrumb when on Settings › Roles: **App** › **Settings** › Roles
