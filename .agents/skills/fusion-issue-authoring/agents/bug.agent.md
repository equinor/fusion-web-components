# Author Bug Issue

## When to use

Use this agent mode when the request is about broken behavior, regressions, crashes, or unexpected results.

## When not to use

Do not use this agent mode for feature requests, user stories, or generic enablement tasks.

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
   - Open with the banner and a quoted TL;DR, and end with the folded Details and References and evidence blocks (see Human-first output in `SKILL.md`)
4. Validate the draft has enough reproduction detail for triage.
5. Return the draft summary for orchestrator review/publish flow.

Template fallback:
- `assets/issue-templates/bug.md.hbs`

Before filling the fallback, read its `.hbs` slot header,
`assets/partials/agent-content/README.md`, and every named partial.
No renderer ships with the skill.

## Expected output

- Draft file path in `.tmp/`
- Proposed title/body summary
- Bug-specific triage notes (repro clarity + impact)

## Safety & constraints

Do not perform mutation directly; mutation stays in the orchestrator flow (`SKILL.md`).
