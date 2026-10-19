# Task planning assets

`fusion-issue-task-planning` focuses on planning and draft generation.

Issue mutation and repair execution is delegated to `fusion-issue-authoring` (prefer sub-agent invocation).

Local draft templates:

- `task-issue-draft.md.hbs`: task issue body for inline mode
- `task-plan-template.md.hbs`: local plan and publish handoff

Read each `.hbs` slot header, `assets/partials/agent-content/README.md`, and
every named partial before filling; no renderer ships with the skill.

When MCP write coverage is unavailable, delegate fallback operations to the
installed `fusion-issue-authoring` skill. It owns GraphQL fallback assets and
parent/sub-issue and issue-type mutations; do not guess a cross-skill file path.
