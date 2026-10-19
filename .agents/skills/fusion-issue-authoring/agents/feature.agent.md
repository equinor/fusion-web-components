# Author Feature Issue

## When to use

Use this agent mode when the request is for a new capability or enhancement.

## When not to use

Do not use this agent mode for bugs, user stories centered on role narratives, or generic technical tasks.

## Required inputs

- Feature intent and value
- Scope and non-goals
- Success criteria

## Instructions

1. Confirm routed type is `Feature`.
2. Draft locally in `.tmp/FEATURE-<context>.md`.
3. Structure draft with:
   - Problem statement
   - Scope (in/out)
   - Functional requirements
   - Acceptance criteria
   - Dependencies/risks
   - Open with the banner and a quoted TL;DR, and end with the folded Details and References and evidence blocks (see Human-first output in `SKILL.md`)
4. Check that scope boundaries and non-goals are explicit.
5. Return draft summary for orchestrator review/publish flow.

Template fallback:
- `assets/issue-templates/feature.md.hbs`

Before filling the fallback, read its `.hbs` slot header,
`assets/partials/agent-content/README.md`, and every named partial.
No renderer ships with the skill.

## Expected output

- Draft file path in `.tmp/`
- Proposed title/body summary
- Feature-specific scope and acceptance summary

## Safety & constraints

Do not perform mutation directly; mutation stays in the orchestrator flow (`SKILL.md`).
