---
name: fusion-issue-task-planning
description: Plan and break down user-story issues into ordered, traceable task issue drafts with explicit publish gates.
license: MIT
metadata:
   version: "0.2.1"
   status: experimental
   owner: "@equinor/fusion-core"

   skills:
      - fusion-issue-authoring
      - fusion-issue-author-task
      - fusion-agent-content
   tags:
      - github
      - planning
      - user-story
      - task-planning
   mcp:
      required:
         - github
      suggested:
         - mcp_fusion
---

# User Story Task Planning

## Experimental caveat

This skill is experimental and not yet stable. Behavior, structure, and outputs may change between versions.

## When to use

Use this skill when you need an actionable task plan for a User Story issue before implementation.

Typical triggers:
- "plan tasks for #123"
- "break this story into steps"
- "create task issue drafts from this user story"

## When not to use

Do not use this skill for direct code implementation, PR review, or GitHub mutations without explicit confirmation.

## Required inputs

- Target issue reference (`owner/repo#number` or URL)
- Desired planning depth (`minimal`, `standard`, `detailed`)
- Run mode (`draft-only`, `draft+publish-ready`, or `publish-now`)

If missing inputs block planning, ask up to 3 focused follow-up questions from `assets/follow-up-questions.md`.

## Defaults

- Planning depth: `standard`
- Run mode: `draft-only`
- Publish behavior: explicit same-turn confirmation required before any mutation

## Tool format

- Tool names follow `<mcp_server>::<tool>` (example: `mcp_github::sub_issue_write`).

## Instructions

Execute in order and state assumptions explicitly.

1. Probe preferred skills and classify drafting mode
   - `orchestrated`: both `fusion-issue-authoring` and `fusion-issue-author-task` available; full workflow with explicit publish gates handled by the orchestrator.
   - `direct-subordinate`: only `fusion-issue-author-task` available; operate in **draft-only** mode using its templates and safeguards, do **not** perform any GitHub mutations, and surface drafts plus clear instructions for how an orchestrator or user should publish them.
   - `inline`: neither available; stay in **draft-only** mode, generate task drafts from the built-in `assets/task-issue-draft.md.hbs` (title plus `What to do`, `Scope`, `Done when`, a visible `Blocked by`, optional `Decisions and risks`, and folded sequence, AC traceability, dependency reasoning, and verification details), and avoid direct references to another skill's `assets/` files.
   - Prefer `fusion-issue-author-task` whenever it is available; do not bypass it with direct cross-skill file references.
   - Never stop due to missing preferred skills; degrade gracefully.

2. Research the user story
   - Gather title, body, acceptance criteria, scenarios, ancestor chain, existing sub-issues, and related links.
   - If issue type is ambiguous, confirm whether to proceed as `User Story`.

3. Clarify only when needed
   - Ask at most 3 questions per batch.
   - Continue with explicit assumptions when safe defaults exist.

4. Extract planning anchors
   - Outcomes
   - Constraints and non-goals
   - Verification points

5. Build dependency-ordered tasks
   - For each task include objective, scope boundary, deliverable, verification method, and mapped AC references.
   - Prefer independently verifiable slices.
   - Plan the minimum: every task must map to at least one acceptance criterion, and together the tasks must cover all of them. A task that maps to none is a nice-to-have, not part of the plan.
   - Keep each task's "Done when" to what is required to close it; put desirable extras under **Stretch goals**.
   - List nice-to-have quality-of-life tasks separately as suggestions (title and one line of value). Draft them only if the user picks them; in autopilot, list them in the plan only.

6. Run devil's-advocate review before drafting
   - Inspect the proposed task set for architecture-ambiguity signals:
     - Unresolved design or architecture decisions mentioned in the story, comments, or ancestor issues
     - Backend and frontend tasks that share an implicit API, data model, or ownership contract not yet agreed
     - A discovery, research, or alignment task alongside concrete implementation tasks with no explicit blocking relationship
     - Dependency statements that are vague or circular ("after backend is done", "when design is ready")
     - Component, API, or data-model ownership that is unclear or contested
   - If two or more signals are present:
     - `orchestrated` mode: route through `fusion-issue-authoring` → `agents/devils-advocate.agent.md` in **interrogator mode** automatically — no user trigger required.
     - `direct-subordinate` or `inline` mode: run an inline DA checklist using the same five signals above; surface findings as a structured `⚠ Ambiguity checklist` and require the user to resolve or explicitly accept each before draft generation.
   - If zero or one signal is present, run in **moderate mode**: surface up to 3 concerns and continue after the user acknowledges.
   - **Publish gate** (all modes): do not publish tasks until either the devil's advocate confirms the split is sound or the user explicitly accepts the listed risks.
   - **Draft-only exception**: in `draft-only` mode, draft generation may proceed even with unresolved ambiguities, but emit an `⚠ Ambiguity warning` block at the top of the plan preview listing each unresolved item. Publication remains blocked until risks are accepted.

7. Generate task issue drafts
   - `orchestrated`: route through `fusion-issue-authoring` with issue type `Task`
   - `direct-subordinate`: invoke `fusion-issue-author-task` in draft-only mode and output explicit publish instructions that delegate final mutation to `fusion-issue-authoring`
   - `inline`: write `.tmp/TASK-<nn>-<slug>.md` drafts from `assets/task-issue-draft.md.hbs`
   - Shape every task body for human readers (see [Human-first output](#human-first-output)).
   - Keep drafts local until explicit publish approval.

8. Generate plan preview
   - Write `.tmp/USER-STORY-TASK-PLAN-<context>.md` from `assets/task-plan-template.md.hbs`.
   - Before filling either template, read its `.hbs` slot header, `assets/partials/agent-content/README.md`, and every named partial; no renderer ships with the skill.
   - Include summary, traceability, ordered tasks, suggested nice-to-have tasks (not drafted), draft paths, publish plan, assumptions, risks.

9. Publish only after explicit confirmation
   - Require explicit confirmation in the same turn.
   - Stop if unresolved assumptions remain.
   - Delegate publish execution to `fusion-issue-authoring` and prefer sub-agent invocation for task issue creation/update/linking.
   - Pass required context to `fusion-issue-authoring`: `owner`, `repo`, parent story reference, ordered task drafts, labels/assignee intent, and dependency ordering.
   - Pass no milestone: tasks don't get one, even when the story or Feature has one (see the milestone gate in `fusion-issue-authoring`).
   - Require `fusion-issue-authoring` to keep MCP-first behavior and apply GraphQL fallback only when MCP write coverage is unavailable.
   - The orchestrator's session-cache rules apply to all delegated calls: labels, assignee candidates, and issue types are fetched once per session and reused across all task issues in the batch.
   - Link tasks to the story as sub-issues and let that list be the record. Don't add a checklist of the tasks to the story body or post a parent comment listing them.
   - Budget awareness: a task-planning publish of N tasks costs ~N issue-write mutations + optional sub-issue link mutations. If N > 5, warn the user about rate-limit risk and offer to publish in batches.
   - Do not call MCP write tools directly from this skill in publish mode.
   - Hard fail publish mode if delegated execution returns unresolved item-level failures.

10. Repair mode for already-created tasks
   - If tasks were created but are missing `Issue Type` or parent linkage, delegate repair to `fusion-issue-authoring` and prefer sub-agent invocation.
   - Provide per-issue repair intent (`set type=Task`, add missing parent links, preserve order) and require verification results from the delegated run.
   - Repair mode must be idempotent: skip already-correct issues and fix only missing metadata.
   - Run post-flight verification after repairs and return actionable failures.

## Human-first output

Task issue bodies and any plan summary shown to the user are read by people, so give them one shape. When `fusion-agent-content` is installed, use it; otherwise follow this outline:
- First line: `<sub>🤖 Drafted by <agent> (<tool>) · <model> · <effort> reasoning</sub>`, filled from runtime metadata and never guessed (write `model not reported` when unknown).
- A quoted TL;DR (`> **TL;DR:** ...`) of 1–3 sentences; for a task issue, its `What to do` section serves as the TL;DR. Then the template headings in plain prose.
- Fold sequence, AC traceability, the reasoning behind dependencies, and verification commands into `<details><summary>Details</summary>`, and end with `<details><summary>References and evidence</summary>` (skills, references read, evidence).
- Keep `Done when` / acceptance criteria, blocking dependencies (which issues block this one), decisions, and risks visible. Templates from `fusion-issue-authoring` keep their headings; add the banner and folded blocks around them.

## Common failures and resolution

- `fusion-issue-authoring` is unavailable in the runtime
   - Stay in draft-only mode and return publish-ready artifacts plus explicit handoff instructions.
- Delegated publish returns partial failures
   - Return per-issue `failed` status with exact reason and stop further mutations until user confirmation.
- Task issues are created but not linked to the parent story
   - Trigger delegated repair through `fusion-issue-authoring` and require post-flight verification output.
- Task exists but `Issue Type` is missing or incorrect
   - Trigger delegated repair through `fusion-issue-authoring` with `type=Task` intent and verify results.
- Post-flight verification reports partial failures
   - Return per-issue `failed` status with exact reason, stop publish flow, and keep unresolved items for explicit user decision.

## Expected output

Return in this heading order:
1. Experimental caveat
2. Story summary
3. Acceptance-criteria traceability
4. Ordered tasks (minimum set)
5. Suggested nice-to-have tasks (not drafted)
6. Draft file paths
7. Publish plan
8. Assumptions, risks, and open questions

Always include: `Status: Awaiting user approval` until publish is confirmed and completed.

For `publish-now` or `repair` mode, include a per-issue post-flight report with:
- issue exists
- issue type equals requested type
- parent equals expected story number
- status (`ok`, `fixed`, or `failed`)

## Assets

- [assets/follow-up-questions.md](assets/follow-up-questions.md)
- [assets/task-plan-template.md.hbs](assets/task-plan-template.md.hbs) (local working draft, not published)
- [assets/task-issue-draft.md.hbs](assets/task-issue-draft.md.hbs) (human-first task issue body for `inline` mode)

## Safety & constraints

- This skill is mutation-capable. Repository-local workflow instructions take precedence over inline guidance when they conflict.
- Never mutate GitHub state without explicit confirmation.
- Never infer acceptance criteria without flagging assumptions.
- Always preserve AC traceability in the task plan.
- Keep drafts in `.tmp/` before any publish action.
- In publish/repair mode, treat missing `Issue Type` or missing parent linkage as a failure until post-flight checks pass.
- Delegate mutation/repair execution to `fusion-issue-authoring` (prefer sub-agent) and do not call MCP write tools directly from this skill.
