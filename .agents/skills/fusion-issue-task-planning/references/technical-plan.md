# Technical plan and coverage

Agree how story gets built before splitting into tasks; check nothing lost after.

## Plan step

Run after planning anchors, before building tasks. Skip for `minimal` depth or small story with obvious decomposition; say so in plan preview.

Propose short plan, one screen max:

- **Affected areas**: repos, packages, services, files or components touched.
- **Approach**: chosen design in two to four bullets.
- **Alternatives**: at least one considered option and why not chosen.
- **Risks**: concrete risks only, each with mitigation or owner.
- **Test strategy**: how acceptance criteria get verified (unit, integration, manual, evaluation).

Evidence rules:

- Fusion APIs, platform behavior and skill catalog facts: look up with `fusion-research` when installed.
- Repo conventions and ADRs: check with `fusion-code-conventions` when installed, else read contributor docs and ADRs directly.
- Tag plan claims `[stated]`, `[verified: <source>]` or `[assumed]`, same as `fusion-issue-authoring` drafting. Unverifiable claims stay `[assumed]`.

User confirms or edits plan before tasks get built. Unattended: proceed, list unconfirmed plan decisions under assumptions.

## Research questions

Unknowns plan cannot settle become research questions, not hidden assumptions. Each has:

- **Question**: one specific thing to find out.
- **Sources**: where to look (docs, code, owners, prior issues).
- **Stop condition**: answer found, or time box reached with best evidence.

Questions that block implementation become research task drafts sequenced first (`Blocked by` on dependent tasks). Non-blocking questions stay in plan preview as open questions.

## Where plan lives

GitHub issues stay source of truth; no repo spec files.

- Plan preview `.tmp/USER-STORY-TASK-PLAN-<context>.md` holds full plan.
- Each task draft carries decisions and risks it depends on in `Decisions and risks`.
- Add plan summary to story only when user asks.

## Coverage check

After drafting tasks, before plan preview:

- **Uncovered requirements**: functional requirements or acceptance criteria with no task.
- **Untraced tasks**: tasks mapping to no requirement or criterion.

Report both lists in plan preview, or `Full coverage` when both empty. Both block publication until resolved: uncovered requirement needs task, deferral or user-accepted gap; untraced task gets dropped, moved to nice-to-have suggestions or mapped after user confirms. Coverage not run: preview says `Not checked`, never `Full coverage`.
