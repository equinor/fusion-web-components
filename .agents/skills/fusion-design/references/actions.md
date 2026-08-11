# Actions

Rules for save/discard actions and destructive actions. Grounded in `docs/patterns/action-bar/`, `docs/patterns/destructive-actions.md`, and `docs/guidelines/ux-writing.md`.

---

## Action bar

> **Status: experimental.** The action bar is not yet a ratified Fusion pattern and has no shared component in `fusion-react-components` — it is currently trialed in App Admin only. Treat this guidance as provisional: apply it when a page genuinely needs an explicit-save action bar, but do not proliferate the pattern as an established Fusion standard until it is ratified. The destructive-action and button-placement rules below are settled and apply regardless.

Use a sticky action bar for any page with a form or editable content that requires an explicit **Save** (not auto-save).

| Property | Value |
|---|---|
| Position | Sticky, directly below the page header |
| Height | `50px` |
| Horizontal padding | `--eds-spacing-inset-xl-horizontal` — the page/view tier, so the bar's status label and buttons align with the header title and page content edges. Never use the `md` container tier here |
| Visibility | Hidden when idle — appears only when the user makes a change (dirty) |
| Left zone | A plain colored bullet character (`●`) + status label — e.g. `● Unsaved changes`. Never use an EDS `Icon` component (`edit`, `pencil`, etc.) here — the source pattern uses a literal `●`/`✓`/`⚠` character, not an icon |
| Right zone | `Discard` (ghost variant) + `Save` (primary), in that order — `Discard` must use `variant="ghost"`, never a filled/contained secondary button |

- Never render an inline Save button elsewhere on the page — the action bar is the only way to persist changes
- The bar disappears after a successful save and returns to idle
- Do **not** use the action bar inside side panels — side panels use the Apply pattern with buttons below the panel content
- Do **not** use the action bar for auto-saving forms — use a status indicator instead

---

## Destructive actions

Never execute a destructive action (delete, remove, restore-to-default) directly from its trigger. Always confirm first.

| Context | Confirmation mechanism |
|---|---|
| Full-page or list action (e.g. delete an entity) | EDS `Dialog` |
| Inline action inside a side panel footer | Inline warning state replacing the footer row — not a `Dialog` |

**EDS `Dialog` structure (required):** the EDS `Dialog` is compositional — its sub-components must be nested correctly or the dialog renders cramped and unstyled:

```tsx
<Dialog open={open} isDismissable onClose={onCancel}>
  <Dialog.Header>
    <Dialog.Title>Delete Project Alpha</Dialog.Title>
  </Dialog.Header>
  <Dialog.CustomContent>
    <Typography variant="body_short">
      This will permanently delete Project Alpha. This action cannot be undone.
    </Typography>
  </Dialog.CustomContent>
  <Dialog.Actions>
    {/* actions must sit in a flex row, right-aligned — otherwise buttons stack vertically */}
    <div style={{ display: 'flex', gap: 'var(--eds-spacing-horizontal-xs)', justifyContent: 'flex-end' }}>
      <Button variant="ghost" onClick={onCancel}>Keep</Button>
      <Button color="danger" variant="outlined" onClick={onConfirm}>Delete</Button>
    </div>
  </Dialog.Actions>
</Dialog>
```

- Always wrap `Dialog.Title` in `Dialog.Header` — placing `Dialog.Title` directly under `Dialog` loses the header padding.
- Put body copy in `<Typography variant="body_short">` inside `Dialog.CustomContent` — never a raw `<p>`.
- Lay out the buttons in `Dialog.Actions` in a right-aligned flex row — bare buttons stack vertically and misalign.
- Do **not** set a fixed width on the action buttons or stretch them — let each button size to its own label. Combined with short labels (below) this keeps them on one line.

**Dialog anatomy:**

| Element | Guidance |
|---|---|
| Title | Names the subject, not a question — `Delete Project Alpha`, not `Are you sure?` |
| Body | One sentence, active voice, states the consequence — `This will permanently delete Project Alpha. This action cannot be undone.` |
| Safe action | Left button, ghost variant. When the title already names the subject, use the bare verb — `Keep` — not `Keep Project Alpha`. Never `Cancel`. |
| Destructive action | Right button, danger/outlined-danger variant. When the title already names the subject, use the bare verb — `Delete` — not `Delete Project Alpha`. |

- **Do not repeat the subject on the buttons when the dialog title already names it.** The title carries the subject (`Delete Project Alpha`); the buttons only need the verb (`Keep` / `Delete`). Repeating the full name on both buttons is redundant and causes multi-line wrapping. Outside a titled dialog (e.g. a standalone button with no naming context), name the subject — `Delete app`.
- Never use a generic label — `OK`, `Cancel`, `Confirm`, `Yes`, `No` are not acceptable anywhere in the system
- Never disable the destructive action behind typed confirmation unless the action is irreversible **and** high-impact (e.g. permanently deleting a shared resource) — a standard confirm/cancel dialog is sufficient otherwise

---

## Button placement

- The button that executes the primary or destructive action always sits **rightmost**
- Secondary/safe/cancel buttons sit to its **left**
- Never place more than one destructive-variant button in the same row
