# Issue authoring guidance

Goal: create clear GitHub issues fast, with draft-first review and safe mutation order.

## Core rules

- Keep drafts concise and outcome-focused.
- Use full issue references (`owner/repo#123`).
- Never mutate before explicit publish confirmation.
- Ask only essential clarifying questions.
- Resolve repository and labels before mutation.
- Prefer MCP tools first and avoid ad hoc GitHub API/GraphQL retries when an MCP equivalent exists.

## Low-token strategy

- Fetch required context once and reuse it through the run.
- Run one focused duplicate check; avoid repeated broad searches.
- Query labels only when labels are needed for the current mutation, then cache the full repository label set and filter locally.
- Avoid assignee-candidate lookups when the user already provided `@me` or an exact login; cache ambiguous assignee results for the active session.
- Cache issue types per organization and skip repeated `list_issue_types` calls on cache hit.
- Run sub-issue mutations only for relationships that actually changed.
- If rate limits are hit, stop optional lookups and return a clear retry plan.

## Repository routing

Routing is repo-specific. When no explicit repository is given, read the active workspace's `CONTRIBUTING.md` and `contribute/` docs and apply any issue routing rules found there. See SKILL.md Step 2 for the authoritative flow. Never hardcode destinations in this skill.

## Workflow

1. Classify issue type (`Bug`, `Feature`, `User Story`, `Task`).
2. Resolve destination repository (apply contributor guide routing when in the active workspace context).
3. Check template source in order:
	- repository template (`.github/ISSUE_TEMPLATE/`)
	- specialist fallback template
4. Check duplicates with `mcp_github::search_issues`.
5. Draft in `.tmp/{TYPE}-{CONTEXT}.md`.
6. Review with user and apply edits.
7. Ask explicit publish confirmation.
8. Mutate via MCP in this order:
	- `mcp_github::issue_write` create/update with full known payload (labels/assignees/type when supported)
	- optional single follow-up `mcp_github::issue_write` only for fields unavailable in the first call
	- `mcp_github::sub_issue_write` for sub-issue ordering/links only when changes are needed
	- `mcp_github::add_issue_comment` for blocker/status notes only when requested

MCP failure handling:
- If mutation fails due to missing MCP server/auth/config, explain the failure clearly.
- Point user to `references/mcp-server.md` install-assist.
- Retry mutation after user confirms setup is complete.

Type parameter rule:
- Use cached issue types for the organization when available.
- Call `mcp_github::list_issue_types` only on cache miss (or when cache is invalid).
- Send `type` only when the repository supports issue types.
- Omit `type` when issue types are unsupported and treat that owner as unsupported for the rest of the session.

Rate-limit fallback:
- Detect and surface rate-limit failures clearly.
- Do not retry in tight loops; respect `retry-after` and `x-ratelimit-reset` headers.
- GraphQL mutations cost 5 secondary-limit points each; minimize separate mutation calls.
- Pause at least 1 second between consecutive GraphQL mutation calls.
- Preserve local drafts in `.tmp/` and any session cache artifacts, then provide a safe retry path for the user.

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

- On the first label lookup for `owner/repo`, fetch the repository label set once and write a session cache artifact. Prefer `/memories/session/{owner}-{repo}-labels.json` when the host exposes session memory; otherwise use `.tmp/issue-authoring-labels-{owner}-{repo}.json`.
- On later label checks, read the cached label set and filter locally; do not validate labels with repeated point lookups.
- If only point label lookups are available and no cached label set exists, ask whether to continue without optional labels or include only user-confirmed labels in the first `mcp_github::issue_write` call. Do not loop one lookup per label.
- If requested labels are missing from the cached set, ask whether to proceed with available labels.
- Ask assignee intent explicitly (`@me`, specific login, or unassigned).
- If the user gives `@me` or an exact GitHub login, do not run `mcp_github::search_users`.
- When assignee search is needed, cache the result set for the active session keyed by owner/repo (or owner) and query. Prefer `/memories/session/{owner}-{repo}-assignee-candidates.json` or `/memories/session/{owner}-assignee-candidates.json`; otherwise use `.tmp/issue-authoring-assignee-candidates-{owner}-{repo}.json`.
- If the host exposes repository contributors or organization members, hydrate that cache once and reuse it; otherwise reuse the first `mcp_github::search_users` result for the same query.

## MCP reference

Use `references/mcp-server.md` for:
- GitHub MCP server link
- preferred issue-authoring tools
- payload examples (issue create/update, type, sub-issues)

## Template fallbacks

- Feature: `assets/issue-templates/feature.md`
- User Story: `assets/issue-templates/user-story.md`
- Bug: `assets/issue-templates/bug.md`
- Task: `assets/issue-templates/task*.md`