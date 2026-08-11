# Error Messages

An error message tells the user something went wrong, why, and what to do next. Grounded in `docs/patterns/error-messages.md` and the error/status voice in `docs/guidelines/ux-writing.md`.

---

## Anatomy & layout

A page/section/region error is a **vertically composed panel** — not a single horizontal strip. Grounded in the anatomy in `docs/patterns/error-messages.md`:

1. **Error icon** + **Title** on the top row. The title is a real heading (EDS `Typography` `variant="h5"`/`h6` or bold), e.g. `Shared reports failed to load` — never just body text.
2. **Subheading (optional)** — only when a detail needs emphasis (e.g. the cause).
3. **Body** — what happened, why, and the next step (EDS `Typography` body).
4. **Primary action** — a **contained** EDS `Button` (`variant="contained"`, primary) guiding resolution, e.g. `Try again` or `Contact support`. **Not** a ghost/text link.
5. **Error ID row** — the ID in a subtle container with a **Copy** button beside it.
6. **Show details** — a toggle revealing technical context (status code, correlation ID).

Lay these out **stacked vertically**, left-aligned. Do not cram title + body + actions into one horizontal line.

## Placement

- **Show the error where the problem is** — inline, next to or in place of the element/region that failed. Not as a global overlay.
- **Modal `Dialog` only for critical, blocking errors.** A non-blocking failure (e.g. a failed data load) uses an inline message, not a modal.
- **Never use a snackbar or toast for an actionable error** — it disappears before the user can act. Toasts are for transient confirmations only.
- **Don't show errors before the user has acted.** Validate after submit; for error-prone inputs, give real-time guidance instead of pre-emptive blocking errors.

## Content

- State, in order: **what happened → the cause (if useful) → the next step.** Put the key info first.
- Plain, concise language — no jargon the user can't act on. `Save failed. Please try again.` not `Request failed with status 500`.
- Give a specific fix when possible (`Use DD/MM/YYYY format`). If recovery is out of the user's hands, say when/how the system will recover.

## Voice (impersonal, non-blaming)

- Use impersonal, action-named phrasing. **Not** first person, **not** user-blaming:
  - ✅ `Save failed — permission may be required.`
  - ❌ `We couldn't save` (consumer voice)
  - ❌ `You don't have permission` (blames the user)
- For high-impact failures (downtime, data loss), acknowledge with empathy and confirm recovery is in progress.
- No humour.

## Efficiency & support

- **Preserve user input** after an error — never clear the form. Highlight the problematic field while keeping the entry.
- **Provide escalation affordances:** an **Error ID**, a **Copy** button, and a **Show details** control for technical context.
- **Confirm when resolved** — once fixed (by user or system), show a clear confirmation (`Connection restored. Changes synced.`).

## Components & buttons

- **Default: the composed anatomy panel above** — build it from EDS primitives (`Icon` + `Typography` title/body + a contained `Button` + the Error ID row). This is the layout in the guideline's anatomy image.
- **Buttons:** the **primary action is a contained `Button`** (filled, primary). Secondary affordances — **Copy**, **Show details** — are `ghost` buttons. Never make the primary resolution action a ghost/text link.
- **`Dialog`** — only for critical, blocking errors.
- **`Banner`** — a compact inline notice for brief, low-detail messages. Prefer the composed panel for anything with a title + body + Error ID + details. If you do use `Banner`: **`BannerMessage` is itself a `Typography` (`<p>`)** — do **not** nest block `Typography` inside it (a `<p>` in a `<p>` is invalid HTML and throws a hydration error that tsc/build/`check.sh` miss); pass plain text to `BannerMessage`.

```tsx
// ✅ Primary action is a contained Button; Copy / Show details are ghost
<Button variant="contained" onClick={onRetry}>Try again</Button>
<Button variant="ghost" onClick={onCopy}>Copy</Button>
<Button variant="ghost" onClick={toggleDetails}>Show details</Button>

// ❌ Wrong — primary resolution action as a ghost/link crammed into a Banner row
<BannerActions><Button variant="ghost">Try again</Button></BannerActions>
```

## Accessibility

- Screen-reader friendly; sufficient contrast; never rely on colour alone to signal an error.
- Use EDS components and `Typography` — no bare HTML text.
