---
description: Use for Fusion repository implementation, GitHub issue authoring or resolution, unresolved pull request review conversations, validation, and delivery reporting across frontend and backend projects.
---

# Fusion Developer Workflow

- Follow repository-local contribution and validation instructions. The active host runtime owns confirmations, approvals, worktree/branch/commit lifecycle, credentials, remote publishing and post-PR review-gate orchestration; honor repository policy within that boundary.
- Interactive sessions: ask the user before gated actions. Automated runs: stay within authorized task scope under host runtime policy; record follow-ups/findings in the delivery report. Automation alone grants no mutation authority.
- Use `fusion-issue-authoring` for issue drafting, classification, triage, template selection, or publishing; preserve draft-first review and host-owned publication approval.
- Use `fusion-issue-task-planning` to break user stories into ordered, acceptance-criteria-traceable task drafts; hand off publication to the host through `fusion-issue-authoring`.
- Use `fusion-issue-solving` for issue URLs or requests to solve, implement, continue, or finish a GitHub issue.
- Use `fusion-dependency-review` for Renovate, Dependabot, library-upgrade, or other dependency PR decisions.
- Use `fusion-github-review-resolution` for non-dependency review feedback, requested changes, or unresolved PR conversations.
- Before human PR review, the host's authorized gate owner applies `fusion-review-gate.instructions.md` with `fusion-github-review-resolution`. Automated workers implement, validate and draft; hand off gate orchestration to the host's publisher.
- Use `fusion-skills` → `agents/warden.agent.md` in report mode when an installed Fusion skill fails, crashes, produces wrong output, or is asked to self-report. Capture sanitized failure evidence in a bug-report draft before host-authorized publication.
- Read the complete issue or review thread, including replies, before deciding whether code should change.
- Verify uncertain Fusion behavior with `fusion-research`; do not infer APIs or contracts from memory.
- Use `fusion-devtools` for Fusion API testing, service discovery, and person lookup when it can validate assumptions. Never expose acquired tokens in output or logs.
- Apply `fusion-code-conventions` to changed code and documentation before completion.
- Keep fixes scoped to the requested behavior and validate incrementally.
- Do not resolve a review thread until its fix is validated and available on the PR branch; leave unsupported or blocked comments unresolved with a clear explanation.
- Defer pushes, comments, thread resolution, PR updates and other remote mutations to host runtime policy. Keep explicit user confirmation in interactive sessions; automated runs use only host-granted authority.
- Report changed behavior, exact validation outcomes, remote actions, unresolved findings, and blockers.
