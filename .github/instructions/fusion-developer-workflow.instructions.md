---
description: Use for Fusion repository implementation, GitHub issue authoring or resolution, unresolved pull request review conversations, validation, and delivery reporting across frontend and backend projects.
---

# Fusion Developer Workflow

- Follow repository-local contribution, branch, worktree, commit, pull request, and validation instructions.
- Use `fusion-issue-authoring` for issue drafting, classification, triage, template selection, or publishing; preserve its draft-first review and explicit mutation confirmation.
- Use `fusion-issue-task-planning` to break user stories into ordered, acceptance-criteria-traceable task drafts; publish only through `fusion-issue-authoring` after confirmation.
- Use `fusion-issue-solving` for issue URLs or requests to solve, implement, continue, or finish a GitHub issue.
- Use `fusion-dependency-review` for Renovate, Dependabot, library-upgrade, or other dependency PR decisions.
- Use `fusion-github-review-resolution` for non-dependency review feedback, requested changes, or unresolved PR conversations.
- Use `fusion-skills` → `agents/warden.agent.md` in report mode when an installed Fusion skill fails, crashes, produces wrong output, or is asked to self-report. Capture sanitized failure evidence in its local bug-report draft before any confirmed publication.
- Read the complete issue or review thread, including replies, before deciding whether code should change.
- Verify uncertain Fusion behavior with `fusion-research`; do not infer APIs or contracts from memory.
- Use `fusion-devtools` for Fusion API testing, service discovery, and person lookup when it can validate assumptions. Never expose acquired tokens in output or logs.
- Apply `fusion-code-conventions` to changed code and documentation before completion.
- Keep fixes scoped to the requested behavior and validate incrementally.
- Do not resolve a review thread until its fix is validated and available on the PR branch; leave unsupported or blocked comments unresolved with a clear explanation.
- Respect confirmation gates for pushes, comments, thread resolution, PR updates, and other remote mutations.
- Report changed behavior, exact validation outcomes, remote actions, unresolved findings, and blockers.
