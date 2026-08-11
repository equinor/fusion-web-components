# Contextual Help

Two icons provide contextual help; both supplement good labelling — neither replaces it. Grounded in `docs/patterns/contextual-help-icons.md`.

| Icon | Level | Behaviour | Use for |
|---|---|---|---|
| **Info (ℹ)** | Content-level titles — section headings, form labels, card/table headers | Hover/focus → short inline tooltip (**not** clickable) | Explaining a specific field or term the user may not understand |
| **Help (?)** | Page `h1` only | Click → opens the Fusion Help Center side sheet | Linking the page to a help article |

The ℹ icon is **hover/focus only** — a plain EDS `Tooltip`, no click-to-toggle. Only the `?` icon responds to a click (it opens the Help Center).

---

## Density — the most important rule

Help icons are the **exception, not the default**. If everything needs explaining, the labels or layout need rethinking, not more icons.

**Signs of over-use (avoid):**
- Three or more ℹ visible at once in the same section or table
- An ℹ on every column header
- A `?` on a page whose `h1` is already self-explanatory

**How to keep it sparse:**
- Audit labels first — if rewording the label removes the need, do that instead of adding an icon.
- Add ℹ only to the genuinely ambiguous fields; leave well-understood fields clean.
- In data-heavy tables with many unfamiliar columns, prefer a **single column legend/glossary** over one ℹ per column.

## Implementation (avoid the double-tooltip trap)

Wrap the info icon in an EDS `Tooltip` — the tooltip supplies the description. Do **not** also set a `title` prop on the `Icon`: EDS `Icon`'s `title` renders an SVG `<title>`, which the browser shows as its **own** native tooltip. With both, two tooltips appear on hover (the EDS one *and* `About …`).

```tsx
// ✅ Correct — Tooltip provides the text; icon has no title
<Tooltip title={helpText} placement="top">
  <Icon data={info_circle} size={16} />
</Tooltip>

// ❌ Wrong — icon `title` + Tooltip = two overlapping tooltips
<Tooltip title={helpText}>
  <Icon data={info_circle} title={`About ${label}`} />
</Tooltip>
```

## Placement & copy

- Place the icon immediately to the right of the title text, vertically centred. **One icon per title.**
- **Never** place an icon mid-sentence or inside body text — titles only.
- **Never** put both ℹ and `?` on the same title — pick the right level.
- Keep info-tooltip copy short (≈ ≤ 160 characters). If it needs more than two sentences, it's too long for a tooltip.
- **Never** use a tooltip for critical must-read information — if the user must read it to proceed safely, it belongs in persistent visible copy.

## Don'ts

- Don't use an icon to compensate for a weak label — fix the label first.
- Don't wire a `?` icon without a published help article — an empty side sheet is worse than no icon.
- Don't truncate tooltip text.
- Don't put a `title` on an icon that's already inside a `Tooltip` — it produces a duplicate native tooltip.

## Accessibility

- The icon must be keyboard-focusable so the tooltip can be triggered without a mouse, and the tooltip text must be reachable by screen readers.
