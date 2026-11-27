---
name: fusion-design
description: 'Looks up Fusion Design Guidelines and applies them to any frontend code in the Fusion ecosystem. USE FOR: layout, spacing, component usage, interaction patterns, any UI implementation decision. DO NOT USE FOR: backend changes, CI/CD, skill authoring, data layer logic.'
license: MIT
metadata:
  version: "0.2.0"
  status: experimental
  owner: "@equinor/fusion-core"
  tags:
    - design
    - fusion-framework
    - layout
  mcp:
    suggested:
      - fusion
---

# Fusion Design

## When to use

Writing/reviewing Fusion frontend UI (look, behavior, structure). Not backend, CI/CD, skill
authoring or data-layer logic.

## Required inputs

Frontend scope, affected surfaces (text, layout, navigation, actions, states, help), and
app-root `DESIGN.md` when present.

## Non-negotiable invariants

Apply before emitting code, including temporary titles/stubs:

- **All text uses EDS `<Typography>`.** Never bare `<h1>`–`<h6>`, `<p>` or `<span>` for text.
  Title: `<Typography variant="h1">`; body: `<Typography variant="body_short">`. No hardcoded
  font sizes/weights/line heights. Grouped variants need matching `group`; unsure → `body_short`.
  Type-check/build success does not prove runtime-safe rendering.
- **All spacing uses EDS spacing variables.** Never hardcode `px` in `padding`/`margin`/`gap`.
- Empty state ≠ error: never show both or use error styling for working-but-empty UI. No
  boxed/dashed/dropzone empty composition or dim unreadable text. No EDS `Message` export;
  compose EDS primitives. Never render `BannerIcon` outside `Banner` (runtime crash).
- Preserve input on failure. Actionable errors stay visible near failed region, never transient
  toast/snackbar; modal only for critical blocking errors. Never nest block `Typography` inside
  `BannerMessage` (invalid HTML/hydration failure).
- Critical must-read safety info stays in persistent copy, never only a tooltip.

## Safety & constraints

- Read app-root `DESIGN.md` first when present: overrides/supplements recommended defaults,
  never mandatory rules. Never reconcile conflicting guidance from another skill during lookup.
- **Two confirmation layers:** product UI must confirm destructive actions
  (delete/remove/restore-to-default) before executing, never directly from trigger (full-page/
  list → EDS `Dialog`; side-panel footer → inline warning replacing footer row). UI confirmation
  is **not agent authorization** for remote APIs; patch approval does not waive UI confirmation.
  Get separate explicit user authorization for agent destructive/remote actions.
- Never request/expose secrets or treat design lookup as permission to publish.
- Read every applicable topic before affected code; conditional loading is not optional styling.

## Existing apps & rule strength

- **Mandatory (new/changed code, incl. existing UI):** invariants and safety constraints above;
  settled destructive-action, button-placement, dialog-copy rules (`references/actions.md`);
  runtime, invalid-HTML, accessibility guards. Report pre-existing violations elsewhere as
  suggestions unless runtime-breaking.
- **Recommended defaults (new apps/pages/components):** layout widths, navigation choice, state
  anatomy, non-destructive copy. Action bar is ratified (`ready`) but optional until a shared
  component ships.
- **Existing UI keeps its design:** follow `DESIGN.md`, shared layout components, layout,
  navigation, spacing tokens, components. Never migrate unasked; suggest differences instead.
- **Threshold stop gate (existing UI):** if a request crosses `Revisit when` in `DESIGN.md`, a
  navigation threshold (6th tab, sub-navigation, unrelated section, 5th sidemenu level), or any
  layout-pattern change (centered→list/grid, full-width↔viewport-fill), **stop before editing** —
  even when requested. Read `references/decision-tree.md`, explain why, offer options +
  recommendation, and wait. Never implement first.

## Instructions

1. Identify affected surfaces; read local `DESIGN.md` first.
2. Read matching references only (navigation choice needs both nav files). No unrelated eager reads.

| When | Read | Purpose |
| --- | --- | --- |
| New app/page/view; add views/sections; change page main content | `references/decision-tree.md` | New-UI decision order; existing-UI threshold check and scope |
| Write/change text or typography | `references/eds-typography.md` | Heading variants, imports, grouped-variant runtime guard |
| Choose navigation or sidemenu/breadcrumbs | `references/navigation-sidemenu.md` | Section/depth rules and breadcrumb behavior |
| Choose navigation or tabs/grid tab | `references/navigation-tabs.md` | Related views, hierarchy, grid height/scroll |
| Make/change layout decision | `references/layout.md` | Centered/full-width/viewport-fill pattern and height chain |
| Use centered content | `references/layout-centered-content.md` | Width caps, header alignment, centered spacing/nav |
| Add/change padding/margin/gap or radius | `references/spacing.md` | Page/container/interactive tiers and exact tokens |
| Save/discard/delete/restore, dialog or footer actions | `references/actions.md` | Optional action bar, destructive confirmation, button placement |
| Empty/load/search/access state | `references/empty-states.md` | Left-aligned Message composition, copy, icon tokens, recovery |
| Error/validation/recovery state | `references/error-messages.md` | Persistent vertical panel, contained recovery, escalation |
| Contextual help or its accessibility | `references/contextual-help.md` | Info hover/focus vs Help click, sparse placement, no dup tooltip |

3. Apply relevant rules. No `DESIGN.md` + layout/nav decision → create from
   `assets/DESIGN.md.hbs`. Existing `DESIGN.md` → append in its own structure; never reformat.
4. Before handoff, run the read-only invariant checker (Node 22.18+ or Bun, no network/writes):
   ```bash
   node <skill-dir>/scripts/check-design-invariants.ts <changed-paths...>
   ```
   Fix `bare-text-tag`, `hardcoded-px-spacing`, `banner-icon-outside-banner`, and
   `block-typography-in-banner-message` in new/changed code; report untouched-line findings as
   suggestions unless runtime-breaking.

## Expected output

UI implementation/review matching applicable rules and local `DESIGN.md`; `DESIGN.md` from
`assets/DESIGN.md.hbs` when absent and a layout/nav decision is made. Retain unresolved guidance
conflicts rather than choosing another skill's rules by brevity.
