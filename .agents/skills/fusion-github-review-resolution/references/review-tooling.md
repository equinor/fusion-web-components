# Review tooling

When dedicated MCP coverage is missing or scripted execution is chosen, use this map and the recipes below. Scripts require Bash, authenticated `gh` and `jq`. Reads contact GitHub; only approved apply mode posts replies and resolves threads.

## Tooling map (MCP vs GraphQL)

Use GitHub MCP tools for high-level PR operations and any dedicated review-thread mutations the current client exposes. Use GraphQL for thread-level review operations when MCP coverage is missing.

| Workflow action | Preferred tool | Notes |
|---|---|---|
| Request reviewer / update PR metadata | `mcp_github_update_pull_request` | Works for collaborator reviewers and standard PR updates. |
| Create or submit PR review | `mcp_github_pull_request_review_write` | Handles pending review lifecycle actions. |
| Add general PR comment | `mcp_github_add_issue_comment` | Adds issue-style comment to PR conversation, not inline thread reply. |
| List review threads and comments | `assets/pull-request-review-threads.graphql` | Use with `gh api graphql -f query=@assets/pull-request-review-threads.graphql` for thread-level context. |
| Count unresolved threads for specific review id | `assets/unresolved-thread-count-for-review.graphql` | Post-process response (for example with `jq`) to filter by review id and unresolved state. |
| Reply to a review thread | `Dedicated MCP review-thread reply tool`, otherwise `assets/add-pull-request-review-thread-reply.graphql` | Prefer the MCP tool when available; otherwise use the bundled thread-scoped mutation instead of ad hoc scripts. |
| Resolve a review thread | `Dedicated MCP review-thread resolve tool`, otherwise `assets/resolve-review-thread.graphql` | Use the matching structured tool for the current client/session. ⚠️ GraphQL note: `resolveReviewThread` uses `threadId`, not `pullRequestReviewThreadId`. |
| List PR reviews (review URL/id lookup support) | `assets/pull-request-reviews.graphql` | Useful when starting from review URL context. |

> **Pro tip:** See each `.graphql` file in assets for complete mutation/query syntax and parameter names.

### GraphQL cost awareness

Review-resolution workflows make multiple GraphQL mutation calls (reply + resolve per thread). Be conservative:

- Mutations cost 5 secondary-limit points each (vs 1 for read queries). Budget accordingly when processing many threads.
- Pause at least 1 second between consecutive mutation calls to avoid secondary rate limits.
- Keep `first`/`last` connection arguments small (prefer `first: 100` only when you need all threads in a single page).
- If a secondary rate-limit error or `retry-after` header is returned, stop processing and respect the indicated wait before retrying.
- Always prefer a dedicated MCP review-thread tool over raw GraphQL when the client exposes one.

### Token budget guidance

- Fetch the full thread list once and reuse it for all per-thread work; do not re-fetch threads between reply and resolve.
- Budget estimate: for N unresolved threads expect ~1 list call + N reply mutations + N resolve mutations = 1 + 2N calls. A 10-thread review costs ~21 calls.
- If the thread count exceeds 15, warn the user about rate-limit risk before starting mutations and offer to batch in smaller groups.
- Cache PR metadata (title, branch, CI status, changed files) from the first fetch and reuse it for commit messages and replies.
- Avoid redundant PR-level reads between steps; the data does not change within a single resolution run.

## Optional scripted execution

   - Use `scripts/get-review-comments.sh` to fetch matching review comments (including sub-comments associated with the review id).
   - Results are limited to the first 100 review threads and first 100 comments per thread.
   - Example test:
      - `skills/.experimental/fusion-github-review-resolution/scripts/get-review-comments.sh --owner equinor --repo fusion-skills --pr 27 --review-id 3837647674`
   - Use `--include-outdated` when you need comments from outdated matching threads.
   - Use `scripts/resolve-review-comments.sh` to reply+resolve matching threads with a dry-run-first duplicate-reply guard.
   - Keep default dry-run behavior; use `--apply` only after fixes are committed and pushed.
   - By default the script refuses to add another authenticated-user reply to a thread that already contains one; use `--allow-additional-reply` only after manual inspection.
   - Example dry-run:
      - `skills/.experimental/fusion-github-review-resolution/scripts/resolve-review-comments.sh --owner equinor --repo fusion-skills --pr 27 --review-id 3837647674 --include-resolved`
   - Example apply (write the multi-line reply to a file first, so the banner and any `<details>` block survive):
      - `skills/.experimental/fusion-github-review-resolution/scripts/resolve-review-comments.sh --owner equinor --repo fusion-skills --pr 27 --review-id 3837647674 --apply --message-file reply.md`
