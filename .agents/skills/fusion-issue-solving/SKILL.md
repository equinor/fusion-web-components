---
name: fusion-issue-solving
description: 'Handles GitHub issue resolution end-to-end for prompts like "solve #123", "lets solve #123", "work on #123", "work on https://github.com/owner/repo/issues/123", or by pasting a direct GitHub issue URL as the request. USE FOR: solve #123, continue work on issue #123, work on https://github.com/owner/repo/issues/123, paste a GitHub issue URL for implementation work. DO NOT USE FOR: issue drafting only, PR review only, or non-implementation research.'
license: MIT
metadata:
  version: "0.1.6"
  status: experimental
  owner: "@equinor/fusion-core"
  tags:
    - github
    - github-issue
    - issue-solving
    - issue-workflow
    - implementation
    - workflow
    - continue
  mcp:
    suggested:
      - github
      - mcp_fusion
---

# Issue Solving Workflow

## When to use

Use this skill when the user wants to solve or continue a GitHub issue end-to-end, including short current-repo prompts like `solve #123`, direct GitHub issue URLs, or requests like `lets work on https://github.com/owner/repo/issues/123`.

Typical triggers:
- "lets solve #123"
- "solve #123"
- "work on #123"
- "lets work on https://github.com/owner/repo/issues/123"
- "https://github.com/owner/repo/issues/123"
- "continue work on issue #123"
- "implement issue #123 end-to-end"
- "work on this ticket: [issue URL]"
- "research, implement, and prepare a PR for this issue"

Treat GitHub issue URLs as interchangeable with `#123` references for verbs like `solve`, `fix`, `implement`, `continue`, `finish`, or `work on`. A direct GitHub issue URL can also serve as the main request payload for this workflow when no competing intent is stated.

## When not to use

Do not use this skill when:
- the request is only issue drafting/authoring,
- no implementation changes are expected,
- repository write operations are disallowed.

## Required inputs

Collect before execution:
- issue URL or `owner/repo#number`,
- repository and branch/worktree decision,
- acceptance criteria and out-of-scope constraints,
- required validation commands for the target repository.

Optional inputs:
- related issues/PRs,
- risk areas to prioritize,
- requested commit/PR granularity.

## Instructions

1. Ask whether to use a dedicated git worktree
   - Ask this before any other workflow questions.
   - If yes, use/create the worktree and continue there.

2. Confirm issue context and success criteria
   - Read the issue body, labels, and linked discussions once, then reuse that context instead of refetching.
   - Restate the implementable scope and explicitly list out-of-scope items.

3. Confirm assignee intent for issue closure work
   - Check whether the current user is assigned to the primary issue.
   - If the current user is not assigned, ask whether they want to assign themselves before continuing.
   - For each sub-issue that will be resolved or closed by this workflow, check assignee status once and reuse the result for closure decisions.
   - If the current user is not assigned on a sub-issue, ask whether they want to assign themselves before resolving/closing it.

4. Apply low-token GitHub strategy
   - Prefer MCP-backed tools over ad hoc `gh api` or GraphQL calls when equivalent tools exist.
   - Avoid duplicate lookups for labels, issue types, and duplicate detection.
   - Cache per-run context (issue metadata, duplicate matches, issue-type support, label sets, assignee candidates) and reuse it — do not re-fetch data that was already retrieved in this session.
   - When delegating to `fusion-issue-authoring` or its subordinate skills, the orchestrator's session-cache rules apply: labels and assignee candidates are fetched once per repository, issue types once per organization.
   - Use GraphQL fallback only when MCP coverage is unavailable and do not loop retries.
   - GraphQL mutations cost 5 secondary-limit points each (vs 1 for queries); batch fields into single calls and pause at least 1 second between mutation calls.
   - Budget awareness: a typical implementation session (read issue + duplicate check + 1–2 mutations + sub-issue links) should stay under ~20 MCP read calls and ~5 mutations. If the running total approaches 30+ calls, pause optional enrichment and proceed with local work.
   - Respect `retry-after` and `x-ratelimit-reset` headers; do not retry before the indicated wait.
   - If rate limits are hit, stop non-essential operations and continue with local implementation/PR preparation when possible.

5. Build and track a concrete plan
   - Create actionable todos ordered by dependencies.
   - Keep exactly one step in progress and update status as work completes.

6. Research before edits
   - Inspect relevant files, tests, and adjacent usage.
   - Prefer root-cause fixes over surface patches.

7. Implement in small scoped changes
   - Keep each change aligned to issue acceptance criteria.
   - Avoid unrelated refactors and generated release artifacts.

8. Validate incrementally
   - Run targeted checks first, then required project checks.
   - If checks fail, fix relevant issues and re-run before proceeding.

9. Prepare PR-ready output
   - Summarize what changed and why.
   - Include validation evidence and known follow-ups.
   - Draft the PR body in a `.tmp/` file with an issue/context-specific name (for example, `.tmp/pr-body-issue-123-scope-summary.md`), not a shared `.tmp/pr-body.md`.
   - Base the draft on `.github/pull_request_template.md` and keep it updated as implementation evolves.
   - Ask which base branch to target and propose a likely default (typically `main`, or the branch the current branch was cut from).
   - Ask whether the PR should be opened as draft or ready for review.
   - Ask whether the PR should be assigned to the user and whether related issues should be linked.

10. Optional GitHub mutation steps
   - Before any GitHub mutation (create/edit/comment/close), ask for explicit user confirmation.
   - If requested, update issue status/comments with objective progress.
   - Prefer MCP tool mutations over ad hoc API calls when equivalent operations exist.
   - If GitHub API rate limits block mutation, report the failure clearly, stop retry loops, and propose a safe retry sequence.
   - If requested, create or update the PR using the repository PR template and the `.tmp/` PR body draft file, using the confirmed base branch, draft/ready state, assignee choice, and related issue links.

## Expected output

Return a concise delivery report with:
- implemented scope vs original issue criteria,
- files changed,
- validation commands and outcomes,
- assignment decisions for primary issue and affected sub-issues,
- API usage strategy used (MCP-first/cache reuse/fallbacks),
- open risks/blockers,
- PR body summary (or `.tmp/` draft file path when created).

## Assets

- [assets/issue-solving-checklist.md](assets/issue-solving-checklist.md)

## Safety & constraints

- This skill is mutation-capable. Repository-local workflow instructions take precedence over inline guidance when they conflict.
- Never request or expose secrets/credentials.
- Never run destructive commands without explicit confirmation.
- Keep changes minimal and scoped to the issue.
- Do not claim checks passed without running them.
- Follow repository instructions and contribution rules.
