---
name: fusion-issue-solving
description: 'Resolves GitHub issues through implementation, validation and PR preparation. USE FOR: solve #123, work on #123, continue or finish an issue, direct GitHub issue URLs (https://github.com/owner/repo/issues/123). DO NOT USE FOR: issue drafting, PR review only, non-implementation research, read-only repositories or unconfirmed publishing.'
license: MIT
metadata:
  version: "0.3.1"
  status: experimental
  owner: "@equinor/fusion-core"
  skills:
    - fusion-agent-content
    - fusion-github-review-resolution
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

Solve/continue GitHub issues end-to-end, including current-repo short refs and direct URLs such as `lets work on https://github.com/owner/repo/issues/123`.

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

Treat GitHub issue URLs as interchangeable with `#123` references for verbs like `solve`, `fix`, `implement`, `continue`, `finish`, or `work on`. A direct GitHub issue URL can serve as the main request payload when no competing intent is stated.

## When not to use

Issue drafting only, no implementation expected, or repo writes disallowed.

## Required inputs

Before execution: issue URL or `owner/repo#number`; repo and branch/worktree decision; acceptance criteria/non-goals; repo-required validation commands. Accept session-confirmed worktree decisions using step 1's association checks. Optional: related issues/PRs, risk priorities, commit/PR granularity.

## Safety & constraints

- This skill is mutation-capable. Repository-local workflow instructions take precedence over inline guidance when they conflict.
- Never request/expose secrets; destructive commands require explicit confirmation.
- Explicit confirmation before every GitHub create/edit/comment/close mutation. Autopilot issue-link recommendations do not authorize publishing. Keep changes minimal, issue-scoped; follow contribution/workflow rules, including commit, validation, changeset, PR, and branch policies.
- Claim checks passed only after running them; fix relevant failures and rerun before proceeding.
- Rate limits: report clearly, stop non-essential operations/retry loops, continue local implementation/PR preparation where possible; safe retry sequence. Respect `retry-after`/`x-ratelimit-reset`; never retry early. GraphQL fallback only missing MCP coverage; batch fields, 5 secondary-limit points per mutation vs 1 per query, pause at least 1 second between mutations.

## Instructions

1. Before other workflow questions, check current session's worktree state, including earlier creation announcements available in context; exact wording is immaterial. Confirm only when session context explicitly associates the active worktree with the requested issue, or its metadata matches the issue URL or repository-plus-number. A branch/worktree name containing only the issue number is ambiguous. A creation announcement confirms isolation, not issue association by itself. If confirmed, continue there without asking again, creating another worktree, or switching. Otherwise ask whether to use a dedicated git worktree; if yes, use/create it and continue there.
2. Read issue body, labels, linked discussions once; reuse. Restate implementable scope and explicit non-goals.
3. Check current user's primary-issue assignment. If absent, ask self-assignment before continuing. For each sub-issue to resolve/close, check once/cache; ask self-assignment if absent before closure.
4. Apply low-token GitHub strategy
   - MCP-backed tools over ad hoc `gh api`/GraphQL equivalents. Cache issue metadata, duplicates, type support, label sets, candidate results; no duplicate/repeated lookups.
   - Delegated authoring session caches: labels/candidates per repo, types per organization, reused across calls.
   - Typical budget ~20 MCP reads/~5 mutations; approaching 30+ calls, pause optional enrichment and proceed locally. Apply rate-limit gates above.
5. Track dependency-ordered actionable todos, exactly one in progress; update completion. When using execution checklist, read `assets/issue-solving-checklist.md` for checkpoints.
6. Inspect relevant files/tests/adjacent usage before edits; fix root cause, not surface symptoms.
7. Implement small AC-aligned changes; no unrelated refactors or generated release artifacts.
8. Validate targeted checks then required project checks; fix relevant failures and rerun.
9. Prepare PR-ready output
   - Summarize scope/why, validation evidence, follow-ups. Read `references/pr-preparation.md` when preparing PR draft for repo-policy-aware setup and issue-link defaults; optional installed `fusion-pr-documentation`.
   - Issue/context-specific `.tmp/` draft, never shared `.tmp/pr-body.md`; base on `.github/pull_request_template.md`, update as implementation evolves.
   - Determine the base from repository and task evidence. If context establishes a verified, intended base (for example, the branch this work targets), propose it; otherwise read the repository-reported default. Verify every proposed branch exists. Never assume `main`/`master` or offer alternatives without evidence. Follow repository-local confirmation rules; otherwise ask only when the target is ambiguous or its intended/default branch cannot be established.
   - Ask whether the PR should be assigned to the user and whether related issues should be linked. Ask each issue's close/reference choice with recommended default: close completed AC, reference parent/partial/rollout/cross-repo support. Honor stated intent; unavailable user, apply recommendation and disclose which issues close in PR/delivery. Repo-local closure rules win.
   - Shape PR draft and delivery using Human-first output below.
   - Create PRs as draft only. Mark ready only when ready for human review: gate passed, documented exception, or the person's word when no gate applies. Never wait for CI checks.
10. Optional GitHub mutations
   - Ask explicit confirmation before each mutation. Objective status/comments only requested; prefer MCP equivalents.
   - Requested PR create/update uses repo template and draft file, confirmed base, draft state, assignee, close/reference links. Read published body back; verify exactly chosen issues use closing keywords. Rate-limit failure: stop loops, report safe retry plan.
   - After PR publication, before requesting human review, apply repository-local review-gate instructions. For an applicable Copilot gate, use installed `fusion-github-review-resolution`; report missing companion/tooling as blocked, never a passed gate. Preserve its bounded rounds, critical-finding stops and documented unavailability exception. Review requests need separate workflow authority; headless/autopilot does not waive mutation restrictions.

## Human-first output

When writing PR body or delivery report, use installed `fusion-agent-content` or read `references/human-first-output.md` for runtime banner (never guessed), quoted TL;DR, repo headings, and folds. Keep validation result, risks, issues closing visible. Optional installed `fusion-pr-documentation` for PR body.

## Expected output

Human-first delivery report:
- Visible: banner, outcome/next-action TL;DR, one-line validation, risks/blockers, assignment decisions needing attention, created `.tmp/` PR draft path.
- **Details**: scope versus original criteria, changed files, exact check commands/output, primary/sub-issue assignment decisions, MCP/cache/fallback strategy.
- **References and evidence** last: skills, references, sources used.
