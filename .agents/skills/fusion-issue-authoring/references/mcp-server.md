# GitHub MCP server reference

Use this file for GitHub MCP-specific tools and payload examples.

- Server repository: https://github.com/github/github-mcp-server

## Preferred issue-authoring tools

- `mcp_github::issue_write`: create or update issues.
- `mcp_github::search_issues`: search issues for duplicates/context.
- `mcp_github::sub_issue_write`: add/remove/reprioritize sub-issues.
- `mcp_github::search_users`: search users for assignment candidates.
- `mcp_github::add_issue_comment`: add comment to issue.
- `mcp_github::list_issue_types`: list available issue types.

## High-cost operations and mitigation

Common expensive paths in issue workflows:

- repeated label lookups for the same repository,
- repeated assignee-candidate searches for the same repository/org and query,
- repeated `list_issue_types` calls per issue,
- repeated duplicate searches with broad queries,
- unnecessary second-pass issue updates for labels/assignees,
- GraphQL fallback retries that loop on rate-limit errors.

Mitigation policy:

- cache repository labels per `owner/repo` for the active session,
- cache assignee-candidate results per `owner/repo` (or owner) and query for the active session,
- cache issue types per owner for the active session,
- run one focused duplicate search unless scope materially changes,
- send full known issue payload in the first `issue_write` call,
- run GraphQL fallback only when MCP coverage is missing and without retry loops.

## MCP readiness check

Run a read-only probe before issue authoring:

1. Try `mcp_github::search_issues` in the target repository with a lightweight query.
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
4. Re-run readiness probe (`mcp_github::search_issues`).

If remote MCP is not available in the host, use local server setup from the GitHub MCP server README.

## Tool quick map

- `mcp_github::issue_write` - Create or update issue.
- `mcp_github::search_issues` - Search issues.
- `mcp_github::sub_issue_write` - Change sub-issue.
- `mcp_github::search_users` - Search users.
- `mcp_github::add_issue_comment` - Add comment to issue.

## Blocking dependency note

There is no dedicated Issues MCP tool in this set for setting blocking/blocked links directly.

- Prefer `mcp_github::sub_issue_write` to organize issues in a logical execution order.
- Use `mcp_github::add_issue_comment` (or issue body text) to document blocker relationships when needed.

## `type` parameter rule

`type` is optional.

- Use `mcp_github::list_issue_types` to get valid type values for the organization.
- Only send `type` when the repository has issue types configured.
- If issue types are unsupported, omit `type`.

## Label lookup caching (recommended)

Do **not** validate requested labels with one point lookup per label.

Use this strategy:

1. On the first label request for `owner/repo`, do one repository-wide label fetch or equivalent bulk read and cache the result for the active session.
2. Prefer a host session-memory artifact when available:
  - `/memories/session/<owner>-<repo>-labels.json`
  - fallback: `.tmp/issue-authoring-labels-<owner>-<repo>.json` (never committed)
3. On cache hit, filter requested labels locally and send only the surviving set in the first `mcp_github::issue_write` call.
4. If the host only exposes point label lookups and no cached label set exists yet, do not loop through labels. Ask whether to skip optional labels or include only user-confirmed labels in the first mutation and accept a single rejection path.
5. Refresh the cache only when the repository changes or the user explicitly asks for a reload.

## Assignee candidate caching (recommended)

Do **not** repeat the same assignee-candidate lookup for every issue in a session.

Use this strategy:

1. If the user says `@me` or gives an exact GitHub login, skip `mcp_github::search_users` entirely.
2. When lookup is needed, cache candidate results keyed by `owner/repo + query` (or `owner + query` if repository scoping is unavailable).
3. Prefer a host session-memory artifact when available:
  - `/memories/session/<owner>-<repo>-assignee-candidates.json`
  - `/memories/session/<owner>-assignee-candidates.json`
  - fallback: `.tmp/issue-authoring-assignee-candidates-<owner>-<repo>.json` (never committed)
4. If the host exposes repository contributors or organization members, hydrate that cache once per session and reuse it. Otherwise, reuse the first `mcp_github::search_users` result for the same query.
5. If rate limits block candidate enrichment, ask whether to continue unassigned or with `@me` instead of retrying lookup loops.

## Issue type lookup caching (recommended)

Do **not** run `mcp_github::list_issue_types` on every request.

Use this strategy:

1. Keep an in-session cache keyed by organization owner (`owner -> [types]`).
2. On create/update where `type` may be used:
  - if cache hit: validate against cached values
  - if cache miss: call `mcp_github::list_issue_types`, then cache result
3. If `mcp_github::issue_write` with `type` fails due to unsupported types, mark that owner as `types_unsupported` for the session and omit `type` afterwards.

Optional local cache file for longer runs:
- `.tmp/issue-type-cache.json` (never committed)
- refresh when owner changes or validation fails.

## Duplicate search minimization

- Prefer one focused query that combines key title terms and repository scope.
- Reuse the same duplicate search result set throughout draft review unless the problem statement changes.
- Avoid broad repeated searches after mutation failures; resolve auth/config first.

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

1. `mcp_github::issue_write` create/update with full known fields (`title`, `body`, `labels`, `assignees`, optional `type`) using cache-backed label/assignee data when available
2. Optional single follow-up `mcp_github::issue_write` only for fields that were unavailable in step 1
3. `mcp_github::sub_issue_write` add/reprioritize children in execution order only when linkage changed
4. Optional: `mcp_github::add_issue_comment` to record blocker context when requested

## Rate-limit fallback behavior

GitHub GraphQL limits (summary from https://docs.github.com/en/graphql/overview/rate-limits-and-query-limits-for-the-graphql-api):

| Limit | Value |
|---|---|
| Primary budget | 5,000 pts/hour per user (1,000 for `GITHUB_TOKEN` in Actions) |
| Mutation secondary cost | 5 pts per GraphQL mutation, 1 pt per read query |
| Secondary throughput | max 2,000 pts/minute; max 80 content-creating requests/minute |
| Concurrency | max 100 concurrent requests (shared REST + GraphQL) |
| Timeout | 10 s per request; timeout deducts extra points |

Behavior when limits are approached or hit:

- Check `x-ratelimit-remaining` and `retry-after` headers; respect the reset window.
- Stop optional label/assignee enrichments and avoid automatic retry loops.
- Pause at least 1 second between consecutive mutation calls.
- Preserve draft state and return a clear retry sequence to the user.
- Prefer MCP calls over ad hoc GraphQL retries when equivalent MCP tools are available.
- Never retry a request that returned a secondary rate-limit error without waiting for the `retry-after` period.

### Per-session budget estimate

A typical multi-issue authoring session with cache-first behavior:

| Activity | Calls (with caching) | Calls (without caching) |
|---|---|---|
| Label set fetch per repo | 1 | N × L (N issues × L labels each) |
| Issue-type lookup per org | 1 | N |
| Duplicate search per issue | N | N |
| Assignee lookup per session | 0–1 | N |
| Issue create/update | N | N |
| Sub-issue link | 0–N | 0–N |
| **Total for 3 issues, 3 labels each** | **~10** | **~25+** |

Stay under ~30 MCP calls per session for a typical 3-issue run. If the running total approaches this threshold, stop optional enrichment (extra label checks, assignee searches, duplicate re-scans) and proceed with the data already cached.
