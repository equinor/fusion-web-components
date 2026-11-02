---
name: fusion-github-review-resolution
description: 'Resolves GitHub PR review threads by judging feedback, fixing valid concerns and replying before resolution. USE FOR: unresolved review threads, changes requested, fix review comments, PR review URLs (#pullrequestreview-...). DO NOT USE FOR: feedback summaries, new PRs, dependency verdicts (use fusion-dependency-review), read-only branches or unconfirmed mutations.'
license: MIT
compatibility: Requires GitHub MCP server or gh CLI, and git.
metadata:
   version: "0.2.4"
   status: experimental
   owner: "@equinor/fusion-core"
   skills:
      - fusion-agent-content
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

- Unresolved inline review threads, review feedback or changes requested; includes open conversations found while
  working on, improving or merging a PR.
- Activate immediately for `https://github.com/<owner>/<repo>/pull/<number>#pullrequestreview-<id>` or
  `https://github.com/<owner>/<repo>/pull/<number>` when context implies review work.
- When intent is unclear, read `references/activation-examples.md` for explicit and implicit request examples.

## When not to use

- No unresolved comments; targeted threads already resolved or outdated and acknowledged; summary-only requests;
  intentionally read-only branch/worktree.
- Dependency verdicts or new PRs, rather than review-thread remediation.

## Required inputs

Owner/name, PR number/URL, optional review id (`pullrequestreview-<id>`), head/worktree choice and required checks.
Extract URL identifiers; confirm remaining inputs. Already on PR head: skip worktree question.
Optional: linked issue and commit granularity when comments overlap.

## Safety & constraints

- This skill is mutation-capable. Repository-local workflow instructions take precedence over inline guidance when they conflict.
- Defer commit conventions/granularity, validation, changesets, PR rules and branch-refresh policy to
  repository-local instructions at use.
- Require explicit user confirmation before push, thread reply/resolution or review requests. Stop without approval;
  `--apply` is not consent.
- Never expose secrets/tokens in logs/replies. Prefer argv-based execution over shell-interpolated commands.
- Keep diffs scoped; escalate ambiguity before edits/writes. Do not resolve a thread that is still uncertain.
- Before reply/resolution, fixes must be committed, validated and available on PR head. No fabricated check results
  or force-push; regular commits, one push.
- Draft replies before mutations. Re-fetch thread state after errors, timeouts or uncertain results before retrying;
  no blind retries or stacked replies. Report failed/unresolved state rather than claiming closure.
- Keep script dry-run default; explicit `--apply` only after committed/pushed fixes and approval.
  `--allow-additional-reply` requires manual inspection.
- Bundled queries/scripts cap first 100 threads and first 100 comments per thread; don't claim exhaustive closure
  from incomplete data.
- Pause at least 1 second between consecutive mutations. Stop on secondary rate limits and respect `retry-after`.
  Above 15 threads, warn before writes and offer smaller batches.

## Instructions

Follow this phase order unless user explicitly requests another:
fetch → analyze → fix → validate → push → reply → resolve → verify. Do not interleave GitHub thread mutations with
code-editing retries.

1. Determine branch/worktree context
   - Compare current branch with PR head. Already matched: proceed without worktree question.
   - Otherwise, including shared `main`/`master`, ask about dedicated git worktree before other workflow questions;
     use/create it if chosen.

2. Gather unresolved comments and create working tracker
   - Copy/open `assets/review-resolution-checklist.md`; fill context and update each thread's tracking row
     throughout.
   - Fetch once, scope original comments to supplied review id, and capture targeted ids/unresolved count before
     writes.
   - Record thread/comment/parent review ids, path, original body and all subsequent replies. Read full chains,
     including contributor clarifications; scoping originals must not discard context.
   - Cache PR title/branch/CI/changed files. Reuse reads; none between reply and resolve except failure
     reconciliation.

3. Understand, research, and judge each comment
   - Read files/nearby logic; classify correct, partially correct, outdated or incorrect against current
     code/requirements. Reviewers are not automatically correct; avoid stale/wrong-feedback churn.
   - Valid: verify root cause and smallest safe fix. If the feedback is clearly incorrect or outdated, draft
     evidence-based rationale instead of code changes.
   - Uncertain: inspect adjacent tests/usages. If doubt remains after local research, ask the user before edits or
     thread mutation.

4. Fix, check, commit (per comment)
   - Fix valid/partial concerns only; targeted checks first, then required repository checks.
   - One commit per comment when practical; inseparable comments may share a commit, mapped in both replies. Record
     declined rationale in tracker.

5. Push once after all fixes
   - After all commits and checks, confirm and push branch updates once.

6. Reply and resolve each review comment
   - Prefer dedicated current-session GitHub MCP reply/resolve tools, then bundled GraphQL assets or
     `scripts/resolve-review-comments.sh`; never ad hoc temporary Python scripts, one-off batch helpers or blind
     `gh api` retry loops.
   - Prepare exactly one planned reply per targeted thread. Post at most one reply attempt per thread per run.
   - Equivalent agent reply exists: reuse and resolve only if still open. Different reply: stop and inspect
     manually.
   - Reply with file/line/change/commit hashes or incorrect/outdated rationale; resolve immediately after, never
     before or without reply. Never post a reply without then resolving the thread; uncertain/failed outcomes use
     reconciliation gate above.
   - For missing MCP coverage, read `references/review-tooling.md` for tool map, GraphQL syntax and cost detail. For
     reads, use `assets/pull-request-review-threads.graphql` (full threads),
     `assets/unresolved-thread-count-for-review.graphql` (first comment per thread; filter by review ID and
     `isResolved` yourself, it is not scoped), or `assets/pull-request-reviews.graphql` (review lookup) as needed.
   - For approved GraphQL writes, read `assets/add-pull-request-review-thread-reply.graphql` and
     `assets/resolve-review-thread.graphql` for reply and resolution syntax.

7. Verify closure state
   - Re-check targeted threads: unresolved count zero and no duplicate agent replies from this run. Re-check latest
     CI when workflow expects green checks.

8. Ask whether to request a new review from the original review author
   - After push and resolution, ask; only if approved, request original reviewer's username and report sent status.

## Optional scripted execution

When choosing scripts, read `references/review-tooling.md` for prerequisites, intact examples and filters.
`scripts/get-review-comments.sh` fetches matching comments; `--include-outdated` includes outdated matches.
`scripts/resolve-review-comments.sh` defaults to guarded dry-run; apply gates above.

Script inputs: `--owner`, `--repo`, `--pr`, `--review-id`; `--include-resolved` inspects resolved threads;
`--message-file` preserves multiline replies.

## Human-first replies

When drafting a valid/partial reply, read `assets/replies/fixed.md.hbs`; for incorrect/outdated feedback, read
`assets/replies/declined.md.hbs`. Read selected `.hbs` slot header, `assets/partials/agent-content/README.md`, and
named `assets/partials/agent-content/banner.hbs`, `assets/partials/agent-content/details.hbs`,
`assets/partials/agent-content/references.hbs`; fill manually, no renderer.

Use installed `fusion-agent-content`; if absent, read `references/reply-format.md` for standalone reply/report
shape and example. No guessed model/effort; `model not reported` when unknown. Keep decision/reason/commit visible;
fold long evidence.

## Expected output

Report processed counts/dispositions (fixed, declined rationale, escalated), files, commit hashes/messages,
checks/outcomes, push status, per-thread reply/resolution confirmations, checklist path and unresolved
threads/blockers.

## Linked issue usage

When supplied (for example `equinor/fusion-core-tasks#432`), mention issue in progress/final reports, stay within
scope and avoid unrelated PR automation. Outdated unresolved threads: explain with commit reference or leave open
and report why.
