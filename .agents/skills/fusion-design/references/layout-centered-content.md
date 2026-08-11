# Layout — Centered Content

Use centered content for reading-heavy or form-heavy pages where line length matters. The content block is capped at a max-width and aligned to the center of the available space.

## Rules

- **Cap at `1024px` for detail and entity views** — forms, settings, and wizards use `768px`.
- **Never use `1280px` when a sidemenu is present** — it overflows the content area at the primary viewport (1920×1080 at 125% scaling ≈ 1536px effective CSS width; minus the sidemenu ≈ 1260px available).
- **The header must align to the same max-width as the content** — they must never be different widths.
- **Equal margins on both sides** — center using `margin-inline: auto`, not fixed left/right offsets.
- **On wide screens, outer margins grow — the content block does not expand** beyond the max-width cap.

## When to use

| Page type | Max-width |
|---|---|
| Detail view / entity view | `1024px` |
| Form / settings / configuration | `768px` |
| Wizard / step-by-step flow | `768px` |
| Long-form text / documentation | `768px` |

## Spacing

Apply EDS spacing variables to the content block — never hardcode pixel values.

| Context | Property | Variable |
|---|---|---|
| Page / view | Vertical padding | `--eds-spacing-inset-xl-vertical-squared` |
| Page / view | Horizontal padding | `--eds-spacing-inset-xl-horizontal` |
| Container (card, section) | Vertical padding | `--eds-spacing-inset-md-vertical-squared` |
| Container (card, section) | Horizontal padding | `--eds-spacing-inset-md-horizontal` |

## Navigation

A centered single-page view has no sidemenu, tab bar, or breadcrumbs. These are only added when the app has multiple sections or navigation depth.
