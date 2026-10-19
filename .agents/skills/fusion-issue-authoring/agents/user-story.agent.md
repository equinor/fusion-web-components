# Author User Story Issue

## When to use

Use this agent mode when the request is primarily about user workflow and behavior from a specific role perspective.

## When not to use

Do not use this agent mode for pure bug reports, generic feature specs without user narrative, or technical enablement tasks.

## Required inputs

- User role and workflow context
- Story goal (`As a... I want... so that...`)
- Key scenarios and success criteria

## Instructions

1. Confirm routed type is `User Story`.
2. Draft locally in `.tmp/USER-STORY-<context>.md`.
3. Structure draft with:
   - Story statement
   - Context/pain points
   - Functional requirements
   - Scenarios (`Given/When/Then`)
   - Validation approach
   - Open with the banner and a quoted TL;DR, and end with the folded Details and References and evidence blocks (see Human-first output in `SKILL.md`)
4. Ensure scenarios are testable and role-centered.
5. Return draft summary for orchestrator review/publish flow.

Template fallback:
- `assets/issue-templates/user-story.md.hbs`

Before filling the fallback, read its `.hbs` slot header,
`assets/partials/agent-content/README.md`, and every named partial.
No renderer ships with the skill.

## Expected output

- Draft file path in `.tmp/`
- Proposed title/body summary
- Story-specific scenario and validation summary

## Safety & constraints

Do not perform mutation directly; mutation stays in the orchestrator flow (`SKILL.md`).
