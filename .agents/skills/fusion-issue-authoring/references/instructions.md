# Issue authoring guidance

Goal: create clear GitHub issues fast, with draft-first review and safe mutation order.

## Core rules

- Keep drafts concise and outcome-focused.
- Use full issue references (`owner/repo#123`).
- Never mutate before explicit publish confirmation.
- Ask only essential clarifying questions.
- Resolve repository and labels before mutation.

## Workflow

1. Classify issue type (`Bug`, `Feature`, `User Story`, `Task`).
2. Resolve destination repository.
3. Check template source in order:
	- repository template (`.github/ISSUE_TEMPLATE/`)
	- specialist fallback template
4. Check duplicates with `search_issues`.
5. Draft in `.tmp/{TYPE}-{CONTEXT}.md`.
6. Review with user and apply edits.
7. Ask explicit publish confirmation.
8. Mutate via MCP in this order:
	- `issue_write` create/update (labels/assignees included as needed)
	- `sub_issue_write` for sub-issue ordering/links
	- `add_issue_comment` for blocker/status notes when requested

MCP failure handling:
- If mutation fails due to missing MCP server/auth/config, explain the failure clearly.
- Point user to `references/mcp-server.md` install-assist.
- Retry mutation after user confirms setup is complete.

Type parameter rule:
- Use cached issue types for the organization when available.
- Call `list_issue_types` only on cache miss (or when cache is invalid).
- Send `type` only when the repository supports issue types.
- Omit `type` when issue types are unsupported.

## Task mode

- Prefer small, single-purpose tasks.
- For broad requests, suggest a short checklist first.
- For bulk creation, include dependency order and blockers.
- Use issue type `Task` for all task decomposition issues.

## Relationships

- Use sub-issues for decomposition under a parent objective.
- Use sub-issue ordering to represent prerequisites.
- Stop and fix if links are contradictory.

Quick check:
1. Can issue start now? If no, place it later in sub-issue order and note blocker context.
2. Is it part of a parent objective? If yes, add as sub-issue.
3. Any contradiction? If yes, correct plan before mutation.

## Labels and assignees

- Query repository labels first; propose only existing labels.
- If requested labels are missing, ask whether to proceed with available labels.
- Ask assignee intent explicitly (`@me`, specific login, or unassigned).

## MCP reference

Use `skills/fusion-issue-authoring/references/mcp-server.md` for:
- GitHub MCP server link
- preferred issue-authoring tools
- payload examples (issue create/update, type, sub-issues)

## Template fallbacks

- Feature: `skills/fusion-issue-author-feature/assets/issue-templates/feature.md`
- User Story: `skills/fusion-issue-author-user-story/assets/issue-templates/user-story.md`
- Bug: `skills/fusion-issue-author-bug/assets/issue-templates/bug.md`
- Task: `skills/fusion-issue-author-task/assets/issue-templates/task*.md`