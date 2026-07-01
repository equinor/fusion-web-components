---
name: fusion-issue-author-bug
description: "DEPRECATED: Use fusion-issue-authoring instead. Previously: Draft and update bug issues using a bug-focused structure."
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
    - bug
    - deprecated
  mcp:
    required:
      - github
---

> **DEPRECATED**: This skill has been consolidated into [`fusion-issue-authoring`](../../fusion-issue-authoring/SKILL.md). Install only `fusion-issue-authoring` for full bug/feature/user-story/task authoring capability. See [equinor/fusion-core-tasks#802](https://github.com/equinor/fusion-core-tasks/issues/802) for details.

# Author Bug Issue

## Dependency

Requires `fusion-issue-authoring` as the top-level orchestrator for classification, shared gates, and publish flow.

## When to use

Use this skill when the request is about broken behavior, regressions, crashes, or unexpected results.

## When not to use

Do not use this skill for feature requests, user stories, or generic enablement tasks.

## Required inputs

- Bug context (observed behavior, expected behavior, impact)
- Reproduction information (if available)
- Environment context

## Instructions

1. Confirm routed type is `Bug`.
2. Draft locally in `.tmp/BUG-<context>.md`.
3. Structure draft with:
   - Description
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Environment
   - Impact
4. Validate the draft has enough reproduction detail for triage.
5. Return the draft summary for orchestrator review/publish flow.

Template fallback:
- `skills/fusion-issue-author-bug/assets/issue-templates/bug.md`

## Expected output

- Draft file path in `.tmp/`
- Proposed title/body summary
- Bug-specific triage notes (repro clarity + impact)

## Safety & constraints

Do not perform mutation directly; mutation stays in `fusion-issue-authoring`.
