---
name: fusion-design
description: 'Looks up Fusion Design Guidelines and applies them to any frontend code in the Fusion ecosystem. USE FOR: layout, spacing, component usage, interaction patterns, any UI implementation decision. DO NOT USE FOR: backend changes, CI/CD, skill authoring, data layer logic.'
license: MIT
metadata:
  version: "0.1.2"
  status: experimental
  owner: "@equinor/fusion-core"
  tags:
    - design
    - fusion-framework
    - layout
---

# Fusion Design

## When to use

Any time you are writing or reviewing frontend code in the Fusion ecosystem and need to know how it should look, behave, or be structured.

## Non-negotiable invariants

These apply to **every** file you write, regardless of the task — do not wait until you have read the references to honour them, and never emit a "placeholder" that violates them:

- **All text uses EDS `<Typography>`.** Never write a bare `<h1>`–`<h6>`, `<p>`, or `<span>` for text — not even a temporary title or stub. A page title is `<Typography variant="h1">`, body text is `<Typography variant="body_short">`. See `references/eds-typography.md`.
- **All spacing uses EDS spacing variables.** Never hardcode `px` in `padding`/`margin`/`gap`. See `references/spacing.md`.

## Instructions

This skill is a lookup. Read **all** reference files before writing any code — they define mandatory requirements, not optional styling.

### 1. Read the references

| Topic | File |
|---|---|
| EDS Typography | `references/eds-typography.md` |
| Navigation — Sidemenu | `references/navigation-sidemenu.md` |
| Navigation — Tabs | `references/navigation-tabs.md` |
| Layout — Content area patterns | `references/layout.md` |
| Layout — Centered content | `references/layout-centered-content.md` |
| Spacing | `references/spacing.md` |
| Actions — Action bar, destructive actions, button placement | `references/actions.md` |
| Empty states | `references/empty-states.md` |
| Error messages | `references/error-messages.md` |
| Contextual help (ℹ / ? icons, density) | `references/contextual-help.md` |

### 2. Check for a local `DESIGN.md`

If the app has a `DESIGN.md` at its root, read it first. It is the authoritative source for that app's design decisions and overrides or supplements the reference rules.

### 3. Apply

Implement the UI to match the rules. If no `DESIGN.md` exists and the task requires a layout decision, document it there.
