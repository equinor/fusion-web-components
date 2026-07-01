---
name: fusion-design
description: 'Looks up Fusion Design Guidelines and applies them to any frontend code in the Fusion ecosystem. USE FOR: layout, spacing, component usage, interaction patterns, any UI implementation decision. DO NOT USE FOR: backend changes, CI/CD, skill authoring, data layer logic.'
license: MIT
metadata:
  version: "0.1.1"
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

## Instructions

This skill is a lookup. Read **all** reference files before writing any code — they define mandatory requirements, not optional styling.

### 1. Read the references

| Topic | File |
|---|---|
| EDS Typography | `references/eds-typography.md` |
| Navigation — Sidemenu | `references/navigation-sidemenu.md` |

### 2. Check for a local `DESIGN.md`

If the app has a `DESIGN.md` at its root, read it first. It is the authoritative source for that app's design decisions and overrides or supplements the reference rules.

### 3. Apply

Implement the UI to match the rules. If no `DESIGN.md` exists and the task requires a layout decision, document it there.
