# Empty States

An empty state communicates that no content is available yet — on first use, after deletion, when a filter matches nothing, or when access is restricted. Done well it orients the user and offers a path forward. Grounded in `docs/patterns/empty-states.md`.

---

## Rules

- **An empty state is not an error.** If something is *wrong*, that's an error message (see `error-messages.md`). An empty state means the app is working, there's just no content. Never show both at once, and never borrow error styling/language (no error icon, no red/danger colour, no failure wording).
- **Use positive, action-oriented titles.** `Start by adding data` — never `No data found` / `No results`. Negative phrasing discourages.
- **Explain the next step in the body.** State what to do (and briefly why the space is empty if it isn't obvious). Highlight the benefit of acting.
- **At most one primary action; two actions total is the hard limit.** Empty states are calm — don't overcrowd.
- **Never use an empty state as decorative filler.** Every element must serve the user's next action.
- **Never wrap the empty state in a bordered, outlined, or dashed container.** The Message pattern is a plain, left-aligned content column on the page/section background — not a card, not a boxed panel, and never a dashed "dropzone" outline. A dashed box reads as a file-upload target and is not a Fusion pattern.
- **Keep text at full, readable contrast.** Render title and body with default EDS `Typography` colours. Never apply reduced `opacity`, a `disabled`/greyed colour, or a faint "muted" style to make the state look subtle — low-contrast empty-state text fails WCAG AA. Convey hierarchy with `Typography` `variant` (e.g. `h5`/`h6` title, `body_short` body), not by dimming.
- Use EDS components and `Typography` — no bare HTML text.

## Anatomy

Layout mirrors the official Fusion spec: an **info icon sits inline to the left of the title on the same row**, with the remaining elements stacked **left-aligned** beneath. It is **not** a large decorative icon centred above centre-aligned text.

| Element | Guidance |
|---|---|
| Icon | EDS **`Icon data={info_circle}`** inside a circular layout wrapper, placed **inline to the left of the title** on the same row. Style the wrapper with `tokens.colors.infographic.primary__moss_green_13.rgba` and `tokens.shape.circle`; style the icon with `tokens.colors.infographic.primary__moss_green_100.rgba`. These are the exact tokens used by the EDS Banner info icon. **Never render `BannerIcon` outside `Banner`**: it depends on theme context supplied by its parent and crashes standalone |
| Title | On the same row as the icon. Positive phrasing — `Start by creating a report` |
| Subheading (optional) | Secondary context supporting the title, on its own line below |
| Body | The next step, and the benefit of taking it |
| Actions row | A row below the body. When a secondary action exists it is a **link/ghost on the left**, with the **primary `Button` on the right** — secondary first, primary last |

> **Alignment:** title, subheading, and body are **left-aligned** in a content column. Do not centre-align the text and do not stack a big icon on top.

```tsx
import { Icon } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

<div
	style={{
		alignItems: 'center',
		backgroundColor: tokens.colors.infographic.primary__moss_green_13.rgba,
		borderRadius: tokens.shape.circle.borderRadius,
		display: 'inline-flex',
		flexShrink: 0,
		height: tokens.shape.circle.minHeight,
		justifyContent: 'center',
		width: tokens.shape.circle.minWidth,
	}}
>
	<Icon
		data={info_circle}
		color={tokens.colors.infographic.primary__moss_green_100.rgba}
	/>
</div>
```

## Component choice

| Component | Use when |
|---|---|
| **Message** | Persistent UI — lists, tables, dashboards where content is expected but absent. The default for a page/section empty state. |
| **Banner** | Contextual, non-disruptive notice — e.g. missing permissions or a setup step. |
| **Dialog** | The empty state requires immediate action/awareness — first-time setup, critical missing config, onboarding. |

> **"Message" is a pattern, not an importable component.** `@equinor/eds-core-react` has **no `Message` export** — build it as a composition of EDS primitives: a **layout-only, left-aligned** content column (`flex`, `column`, some vertical spacing — **no border, outline, background fill, or card**). Top row is the token-styled circular `Icon data={info_circle}` composition above next to a `Typography` title; below it the optional subheading, then the `body_short` body, then an actions row. In the actions row, order is **secondary link/ghost first (left), primary `Button` last (right)** — at most one primary action (two total). The column sits directly on the page/section background. For the other two rows, use the real EDS components: `Banner` (with `BannerIcon`/`BannerMessage`/`BannerActions`) and `Dialog`.

## Common contexts

| Context | Copy angle |
|---|---|
| First use (nothing created yet) | Invite creation — `Start by creating your first …` |
| Filter/search returns nothing | `No results match …` + a way to clear the filter (distinct from first-use) |
| Access restricted / temporary issue | Explain gently without framing it as the user's failure |

> **Recovery actions are low-emphasis.** In a filter/search "no results" state, the reset (`Clear filter`, `Clear search`) is a **recovery** action — render it as a ghost `Button` or link, not a contained primary. A contained primary is reserved for the forward path (e.g. `Create report`). Don't invent a filter UI just to reach this state.
