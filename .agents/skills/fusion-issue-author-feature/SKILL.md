---
name: fusion-issue-author-feature
description: "DEPRECATED: Use fusion-issue-authoring instead. Previously: Draft and update feature issues with clear problem framing and scoped requirements."
license: MIT
metadata:
  version: "0.1.3"
  status: deprecated
  deprecated_at: "2026-03-18"
  successor: fusion-issue-authoring
  owner: "@equinor/fusion-core"
  orchestrator: "fusion-issue-authoring"
  role: "subordinate"
  tags:
    - github
    - issue-authoring
    - feature
    - deprecated
  mcp:
    required:
      - github
---

> **DEPRECATED**: This skill has been consolidated into [`fusion-issue-authoring`](../../fusion-issue-authoring/SKILL.md). Install only `fusion-issue-authoring` for full bug/feature/user-story/task authoring capability. See [equinor/fusion-core-tasks#802](https://github.com/equinor/fusion-core-tasks/issues/802) for details.

# Author Feature Issue

## Dependency

Requires `fusion-issue-authoring` as the top-level orchestrator for classification, shared gates, and publish flow.

## When to use

Use this skill when the request is for a new capability or enhancement.

## When not to use

Do not use this skill for bugs, user stories centered on role narratives, or generic technical tasks.

## Required inputs

- Feature intent and value
- Scope and non-goals
- Success criteria

## Instructions

1. Confirm routed type is `Feature`.
2. Draft locally in `.tmp/FEATURE-<context>.md`.
3. Structure draft with:
   - Story/problem statement
   - Scope (in/out)
   - Functional requirements
   - Acceptance criteria
   - Dependencies/risks
4. Check that scope boundaries and non-goals are explicit.
5. Return draft summary for orchestrator review/publish flow.

Template fallback:
- `skills/fusion-issue-author-feature/assets/issue-templates/feature.md`

## Expected output

- Draft file path in `.tmp/`
- Proposed title/body summary
- Feature-specific scope and acceptance summary

## Safety & constraints

Do not perform mutation directly; mutation stays in `fusion-issue-authoring`.
