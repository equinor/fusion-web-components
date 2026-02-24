# GitHub MCP server reference

Use this file for GitHub MCP-specific tools and payload examples.

- Server repository: https://github.com/github/github-mcp-server

## Preferred issue-authoring tools

- `issue_write`: create or update issues.
- `search_issues`: search issues for duplicates/context.
- `sub_issue_write`: add/remove/reprioritize sub-issues.
- `search_users`: search users for assignment candidates.
- `add_issue_comment`: add comment to issue.
- `list_issue_types`: list available issue types.

## MCP readiness check

Run a read-only probe before issue authoring:

1. Try `search_issues` in the target repository with a lightweight query.
2. If that succeeds, MCP is ready.
3. If tools are unavailable or auth fails, run install-assist below.

## Install assist (VS Code)

1. Ensure VS Code supports remote MCP.
2. Configure GitHub MCP server:

```json
{
  "servers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    }
  }
}
```

3. Open Copilot Chat Agent mode and complete OAuth sign-in if prompted.
4. Re-run readiness probe (`search_issues`).

If remote MCP is not available in the host, use local server setup from the GitHub MCP server README.

## Tool quick map

- `issue_write` - Create or update issue.
- `search_issues` - Search issues.
- `sub_issue_write` - Change sub-issue.
- `search_users` - Search users.
- `add_issue_comment` - Add comment to issue.

## Blocking dependency note

There is no dedicated Issues MCP tool in this set for setting blocking/blocked links directly.

- Prefer `sub_issue_write` to organize issues in a logical execution order.
- Use `add_issue_comment` (or issue body text) to document blocker relationships when needed.

## `type` parameter rule

`type` is optional.

- Use `list_issue_types` to get valid type values for the organization.
- Only send `type` when the repository has issue types configured.
- If issue types are unsupported, omit `type`.

## Issue type lookup caching (recommended)

Do **not** run `list_issue_types` on every request.

Use this strategy:

1. Keep an in-session cache keyed by organization owner (`owner -> [types]`).
2. On create/update where `type` may be used:
  - if cache hit: validate against cached values
  - if cache miss: call `list_issue_types`, then cache result
3. If `issue_write` with `type` fails due to unsupported types, mark that owner as `types_unsupported` for the session and omit `type` afterwards.

Optional local cache file for longer runs:
- `.tmp/issue-type-cache.json` (never committed)
- refresh when owner changes or validation fails.

## Example props

### Create a Task issue

Only include `type` when issue types are supported.

```json
{
  "method": "create",
  "owner": "equinor",
  "repo": "fusion-skills",
  "title": "task: migrate issue-authoring flows to MCP",
  "body": "## Objective\nMove issue authoring from scripts to MCP-based operations.",
  "type": "Task",
  "assignees": ["odinr"]
}
```

### Update an issue and set type

Only include `type` when issue types are supported.

```json
{
  "method": "update",
  "owner": "equinor",
  "repo": "fusion-skills",
  "issue_number": 21,
  "type": "Task",
  "body": "Updated body with latest scope and checklist."
}
```

### Add a sub-issue to a parent issue

```json
{
  "method": "add",
  "owner": "equinor",
  "repo": "fusion-skills",
  "issue_number": 21,
  "sub_issue_id": 3969391411
}
```

Note: `sub_issue_id` is the sub-issue **ID**, not issue number.

### Reprioritize sub-issues

```json
{
  "method": "reprioritize",
  "owner": "equinor",
  "repo": "fusion-skills",
  "issue_number": 21,
  "sub_issue_id": 3969391411,
  "after_id": 3969391300
}
```

Use either `after_id` or `before_id` for reprioritization.

## Minimal task-batch order

1. `issue_write` create
2. `issue_write` set labels/type/assignee
3. `sub_issue_write` add/reprioritize children in execution order
4. Optional: `add_issue_comment` to record blocker context