# Session cache policy

Use when hydrating or validating labels, assignees, or issue types. Host owns cache/scratch locations and tool adapters; MCP names are examples. Use prefetched validated metadata when available. Interactive questions below become safe recorded defaults or required-field blockers in automated runs, never invented answers.

## Label caching

Never one point lookup per label.

1. First label request for `owner/repo`: bulk fetch, cache for session
   - prefer host session cache
   - fallback: `issue-authoring-labels-<owner>-<repo>.json` in host scratch storage (exclude from commits)
2. Cache hit: filter locally, send surviving set in first `issue_write`
3. Only point lookups + no cache: ask to skip optional labels or send user-confirmed labels only in first `issue_write` and handle a single rejection path; no per-label loop
4. Refresh cache only on repo change or explicit user request
5. Rate limits block label enrichment: ask to continue without optional labels; no retry loop

## Assignee caching

Never repeat same lookup per session.

1. `@me` or exact login → skip `mcp_github::search_users`
2. Lookup needed: cache by `owner/repo+query`
   - prefer host session cache
   - fallback: `issue-authoring-assignee-candidates-<owner>-<repo>.json` in host scratch storage (exclude from commits)
3. Contributors/members available: hydrate cache once, reuse; otherwise reuse first `search_users` result
4. Rate limits block enrichment: ask to continue unassigned or with `@me`

## Issue type caching

Never call `mcp_github::list_issue_types` every request.

1. In-session cache: `owner → [types]`
2. Cache hit: validate locally. Cache miss: call, then cache
3. `issue_write` fails on `type` → mark owner `types_unsupported` for session, omit `type`

Optional: `issue-type-cache.json` in host scratch storage (exclude from commits)
- refresh when owner changes or validation fails.

## Duplicate search minimization

- Prefer one focused query that combines key title terms and repository scope.
- Reuse the same duplicate search result set throughout draft review unless the problem statement changes.
- Avoid broad repeated searches after mutation failures; resolve auth/config first.
