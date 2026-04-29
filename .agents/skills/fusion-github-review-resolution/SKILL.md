---
name: fusion-github-review-resolution
description: "Resolves unresolved GitHub PR review threads end-to-end: evaluates whether each review comment is correct, applies a targeted fix when valid, replies with rationale when not, commits, and resolves the thread. USE FOR: unresolved review threads, PR review feedback, changes requested PRs, PR review URLs (#pullrequestreview-...), fix the review comments, close the open threads, address PR feedback. DO NOT USE FOR: summarizing feedback without code changes, creating new PRs, or read-only branches."
license: MIT
compatibility: Requires GitHub MCP server or gh CLI, and git.
metadata:
   version: "0.1.6"
   status: experimental
   owner: "@equinor/fusion-core"
   tags:
      - github
      - pull-request
      - review-comments
      - remediation
   mcp:
      suggested:
         - github
---

# Resolve GitHub Review Comments

## When to use

Use this skill when a pull request has unresolved inline review comments and you need a repeatable, auditable closure workflow.

Typical triggers (skill should activate on all of these):

**URL patterns — activate immediately:**
- `https://github.com/<owner>/<repo>/pull/<number>#pullrequestreview-<id>`
- `https://github.com/<owner>/<repo>/pull/<number>` (when context implies review work)

**Explicit user requests:**
- "Fix the review comments"
- "Address the review feedback on this PR"
- "There are unresolved review comments — fix them"
- "Resolve the conversations on this PR"
- "Handle all unresolved comments on this PR"
- "For each review comment: fix, test, commit, reply, resolve"
- "Close the open review threads"
- "Check this review and resolve the conversation when fixed"
- "Resolve outstanding review feedback"
- "The PR has changes requested — fix it"

**Implicit / agent-detected:**
- A PR is in "changes requested" state and the agent is asked to work on it
- A PR has unresolved review threads and the user asks to improve or merge the PR
- An agent working on a PR detects open review conversations

## When not to use

Do not use this skill when:
- no unresolved review comments exist,
- the request is only to summarize or describe feedback without making code changes,
- all targeted threads are already resolved or outdated and acknowledged,
- the branch/worktree is intentionally read-only.

## Required inputs

Collect before execution:
- repository owner/name,
- pull request number or URL,
- optional review id to scope comments (for example `pullrequestreview-<id>`),
- branch/worktree decision,
- required validation commands for the repository.

> **When a review URL is provided** (`github.com/<owner>/<repo>/pull/<number>#pullrequestreview-<id>`),
> auto-extract owner, repo, PR number, and review id from it.
> Only branch/worktree choice and validation commands still need confirming.

Optional context:
- linked issue reference (for example `equinor/fusion-core-tasks#432`),
- commit granularity preference when comments overlap the same file.

## Instructions

Follow this phase order unless the user explicitly asks for a different sequence: fetch → analyze → fix → validate → push → reply → resolve → verify. Do not interleave GitHub thread mutations with code-editing retries.

1. Ask whether to use a dedicated git worktree
   - Ask this before any other workflow questions.
   - If yes, use/create the worktree and continue there.

2. Gather unresolved comments and create working tracker
   - If a review URL with `#pullrequestreview-<id>` was provided, parse owner, repo, PR number, and review id from it before fetching.
   - **Copy or open `assets/review-resolution-checklist.md`—this becomes your working document.** Fill in the context section and update the comment tracking table as you work through each thread.
   - Fetch review threads for the PR and filter unresolved threads.
   - If a specific review id or review URL is provided, limit to comments from that review.
   - Within the targeted review, collect all comments associated with that review id (do not include replies from other reviews unless explicitly requested).
   - Build a working list with: thread id, comment id, parent review id, file path, original comment body, and all subsequent replies in that thread (including contributor replies).
   - Read the full reply chain for each thread — contributors may have added clarifications, constraints, or additional context that must be taken into account when deciding how to resolve the comment.
   - Capture a baseline list of targeted thread ids and unresolved-thread count before any GitHub mutation.

3. Understand, research, and judge each comment
   - Read the referenced file(s) and nearby logic.
   - Decide whether the feedback is correct, partially correct, outdated, or incorrect against the current code, requirements, and surrounding context.
   - Reviewers are not automatically correct; do not make code churn just to satisfy a comment that is stale or wrong.
   - If the feedback is correct, verify root cause and identify the smallest safe fix.
   - If the feedback is clearly incorrect or outdated, prepare a concise evidence-based reply instead of changing code unnecessarily.
   - If uncertain, inspect adjacent tests/usages before editing.
   - If doubt remains after local research, ask the user before making code changes or mutating that review thread.

4. Fix, check, commit (per comment)
   - Apply focused code/doc changes only for comments you judged valid or partially valid.
   - Run targeted checks first, then required repo checks.
   - Create one commit per comment when practical.
   - If two comments require one inseparable change, use one commit and map both comments to that commit in replies.
   - For comments you decline, record the reasoning in the tracker so the eventual reply is explicit and auditable.

5. Push once after all fixes
   - After all comment-related commits are created, push branch updates once.

6. Reply and resolve each review comment
   - Before any thread mutation, prefer structured tooling in this order:
     1. dedicated GitHub MCP review-thread reply/resolve tools exposed in the current client session,
     2. the bundled GraphQL assets or bundled `scripts/resolve-review-comments.sh`,
     3. never ad hoc temporary Python scripts, one-off batch helpers, or blind `gh api` retry loops.
   - Prepare exactly one planned reply per targeted thread from the checklist/tracker before posting anything.
   - Re-fetch the current thread state before retrying if a reply/resolve attempt errors, times out, or returns an uncertain result.
    - For each thread, these two steps are mandatory and must happen together in order unless the thread is still uncertain and waiting for user input:
       1. **Post a reply** on the thread: either describe what changed and include the commit hash(es), or explain why no code change was made because the comment is incorrect/outdated.
       2. **Resolve the thread** immediately after the reply is posted — never before.
   - Post at most one reply attempt per thread per run.
   - If an equivalent agent-authored reply already exists, do not post another reply; reuse it and only resolve if the thread is still unresolved.
   - If a different agent-authored reply already exists, stop and inspect manually rather than stacking another comment.
    - Do not resolve a thread that is still uncertain; escalate it to the user first.
   - Never resolve a thread without a reply. Never post a reply without then resolving the thread.
   - Keep replies specific: name the file/line changed and the commit, not just "fixed".

7. Verify closure state
   - Re-check review threads and confirm no targeted unresolved threads remain.
   - Confirm the targeted unresolved-thread count dropped to zero and no duplicate agent replies were created during this run.
   - Re-check latest CI status if the workflow expects green checks.

8. Ask whether to request a new review from the original review author
   - After fixes are pushed and threads are resolved, ask if the user wants to request a new review from the author of the review comments.
   - If yes, request review from that reviewer username and report that the request was sent.

9. Optional scripted execution
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
   - Example apply:
      - `skills/.experimental/fusion-github-review-resolution/scripts/resolve-review-comments.sh --owner equinor --repo fusion-skills --pr 27 --review-id 3837647674 --apply --message "Addressed in <commit>: <what changed>."`

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

## Expected output

Return a concise report containing:
- comments processed count,
- disposition summary (fixed, declined with rationale, escalated to user),
- files changed,
- commit list (hash + message),
- validation commands run and outcomes,
- confirmation of push,
- reply/resolve confirmation per thread,
- completed checklist location,
- any remaining unresolved threads or blockers.

## Linked issue usage

When an issue is provided (for example `equinor/fusion-core-tasks#432`):
- mention the issue in progress/final summaries,
- keep implementation aligned with issue scope,
- avoid expanding to unrelated PR automation.

## Safety & constraints

- This skill is mutation-capable. Repository-local workflow instructions take precedence over inline guidance when they conflict.
- Never expose secrets or tokens in logs/replies.
- Prefer argv-based process execution over shell-interpolated command strings.
- Keep diffs minimal and scoped to review feedback.
- Do not assume review feedback is correct; reason about it against the code and requirements first.
- If a comment remains ambiguous after research, ask the user instead of guessing.
- Do not resolve a thread without posting a concrete fix reply.
- Do not claim checks passed unless commands were actually run.
- Do not force-push; use regular commits and a single push after all fixes.
- If a comment is outdated but still unresolved, either:
  - resolve with a clear explanation and commit reference, or
  - leave unresolved and report why.
- In scripted mode, keep default dry-run behavior and require explicit `--apply` for mutations.
