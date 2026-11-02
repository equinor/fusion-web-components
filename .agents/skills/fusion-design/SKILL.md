---
name: fusion-design
description: 'Looks up Fusion Design Guidelines and applies them to any frontend code in the Fusion ecosystem. USE FOR: layout, spacing, component usage, interaction patterns, any UI implementation decision. DO NOT USE FOR: backend changes, CI/CD, skill authoring, data layer logic.'
license: MIT
metadata:
  version: "0.1.3"
  status: experimental
  owner: "@equinor/fusion-core"
  tags:
    - design
    - fusion-framework
    - layout
---

# Fusion Design

## When to use

Writing/reviewing Fusion frontend code: look, behavior and structure. Not backend, CI/CD,
skill authoring or data-layer logic.

## Required inputs

Frontend scope and affected surfaces (text, layout, navigation, actions, states or help);
app-root `DESIGN.md` when present.

## Non-negotiable invariants

Apply before emitting any code, including temporary titles/stubs:

- **All text uses EDS `<Typography>`.** Never bare `<h1>`–`<h6>`, `<p>` or `<span>` for text.
  Page title: `<Typography variant="h1">`; body: `<Typography variant="body_short">`.
  Never hardcode font sizes/weights/line heights. Grouped variants require matching `group`;
  unsure: use `body_short`. Type-check/build success does not prove runtime-safe rendering.
- **All spacing uses EDS spacing variables.** Never hardcode `px` in `padding`/`margin`/`gap`.
- Empty state is not error: never show both or use error styling for working-but-empty UI.
  No boxed/dashed/dropzone empty composition or dim unreadable text. No EDS `Message` export;
  compose EDS primitives. Never render `BannerIcon` outside `Banner` (runtime crash).
- Preserve input on failure. Actionable errors stay visible near failed region, never transient
  toast/snackbar; modal only for critical blocking errors. Never nest block `Typography`
  inside `BannerMessage` (invalid HTML/hydration failure).
- Critical must-read safety information stays in persistent copy, never only a tooltip.

## Safety & constraints

- Read app-root `DESIGN.md` first when present: authoritative app decisions override/supplement
  reference rules. Do not reconcile conflicting guidance from another skill as part of lookup.
- **Two confirmation layers:** generated product UI must confirm destructive actions
  (delete/remove/restore-to-default) before executing, never directly from trigger. Full-page/
  list actions use EDS `Dialog`; side-panel footer uses inline warning replacing footer row.
  This UI confirmation is **not agent authorization** to call remote APIs. Authorizing a patch
  does not waive destructive confirmation in generated UI. Obtain separate explicit user
  authorization for agent destructive/remote actions; never infer it from UI requirements.
- Never request/expose secrets or treat design lookup as permission to publish.
- Read every applicable topic before affected code; conditional loading is not optional styling.

## Instructions

1. Identify affected surfaces and read local `DESIGN.md` before choosing rules.
2. Read matching references only. Navigation choice needs both navigation files; a complete
   page may need several or all topics. No unrelated eager reads.

| When | Read | Purpose |
| --- | --- | --- |
| Write/change text or typography | `references/eds-typography.md` | Heading variants, imports and grouped-variant runtime guard |
| Choose navigation or implement sidemenu/breadcrumbs | `references/navigation-sidemenu.md` | Section/depth rules and breadcrumb behavior |
| Choose navigation or implement tabs/grid tab | `references/navigation-tabs.md` | Related views, hierarchy and grid height/scroll rules |
| Make/change layout decision | `references/layout.md` | Select one centered/full-width/viewport-fill pattern and height chain |
| Use centered content | `references/layout-centered-content.md` | Width caps, header alignment and centered spacing/navigation |
| Add/change explicit padding/margin/gap or radius | `references/spacing.md` | Page/container/interactive tiers and exact variable names |
| Implement save/discard/delete/restore, dialog or footer actions | `references/actions.md` | Provisional action bar, destructive confirmation, composition and button placement |
| Implement empty/load/search/access state | `references/empty-states.md` | Left-aligned Message composition, copy, icon tokens and recovery emphasis |
| Implement error/validation/recovery state | `references/error-messages.md` | Persistent vertical panel, contained recovery, escalation and accessible copy |
| Add/change contextual help or its accessibility | `references/contextual-help.md` | Info hover/focus versus Help click, sparse placement, published article and no duplicate tooltip |

3. Apply relevant requirements. If no `DESIGN.md` exists and layout decision is required,
   document decision there.

## Expected output

UI implementation/review matching relevant rules and local design decisions; root `DESIGN.md`
for layout decisions when absent. Retain unresolved guidance conflicts rather than choosing
another skill's rules by brevity.
