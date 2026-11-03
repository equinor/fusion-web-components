# MCP payload examples

## Blocking dependency note

No dedicated blocking/blocked links tool. Use `mcp_github::sub_issue_write` for execution order; `mcp_github::add_issue_comment` or body text for blocker context.

## `type` parameter rule

Optional. Get valid values with `mcp_github::list_issue_types`. Send only when repo has issue types configured; omit otherwise.

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

> **`sub_issue_id` is the GitHub object ID, NOT the issue number.**
>
> | Format | Example | Used in URLs / UI? |
> |---|---|---|
> | Issue number | `#79`, `79` | Yes |
> | Object ID | `3969391411` | No — internal only |
>
> **Always retrieve the object ID before calling `sub_issue_write`.**
>
> ```bash
> # Get the object ID for a sub-issue by its number
> gh api repos/OWNER/REPO/issues/NUMBER -q '.id'
> # Example: gh api repos/equinor/fusion-skills/issues/79 -q '.id'
> # Output: 3969391411
> ```

```json
{
  "method": "add",
  "owner": "equinor",
  "repo": "fusion-skills",
  "issue_number": 21,
  "sub_issue_id": 3969391411
}
```

#### Troubleshooting sub-issue linking

| Symptom | Likely cause | Fix |
|---|---|---|
| 404 error | Used issue number instead of object ID | Run `gh api repos/OWNER/REPO/issues/NUMBER -q '.id'` to get the correct ID |
| "Invalid input" error | `sub_issue_id` missing or wrong format | Confirm value is a numeric ID (e.g. `3969391411`), not a string or `#79` |
| Sub-issue not added silently | Parent issue or sub-issue does not exist, or insufficient permissions | Verify both issues exist and the token has write access |

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

Use either `after_id` or `before_id` for reprioritization. Both `sub_issue_id` and `after_id`/`before_id` are object IDs, not issue numbers.
