---
name: fusion-issue-task-planning
description: Plan and break down user-story issues into ordered, traceable task issue drafts with explicit publish gates.
license: MIT
metadata:
   version: "0.1.5"
   status: experimental
   owner: "@equinor/fusion-core"

   skills:
      - fusion-issue-authoring
      - fusion-issue-author-task
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
   - `inline`: neither available; stay in **draft-only** mode, generate task drafts with a minimal built-in structure (`Title`, `Problem`, `Scope`, `Acceptance criteria mapping`, `Verification`, `Dependencies`), and avoid direct references to another skill's `assets/` files.
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

6. Generate task issue drafts
   - `orchestrated`: route through `fusion-issue-authoring` with issue type `Task`
   - `direct-subordinate`: invoke `fusion-issue-author-task` in draft-only mode and output explicit publish instructions that delegate final mutation to `fusion-issue-authoring`
   - `inline`: write `.tmp/TASK-<nn>-<slug>.md` drafts using the minimal built-in structure from step 1
   - Keep drafts local until explicit publish approval.

7. Generate plan preview
   - Write `.tmp/USER-STORY-TASK-PLAN-<context>.md` from `assets/task-plan-template.md`.
   - Include summary, traceability, ordered tasks, draft paths, publish plan, assumptions, risks.

8. Publish only after explicit confirmation
   - Require explicit confirmation in the same turn.
   - Stop if unresolved assumptions remain.
   - Delegate publish execution to `fusion-issue-authoring` and prefer sub-agent invocation for task issue creation/update/linking.
   - Pass required context to `fusion-issue-authoring`: `owner`, `repo`, parent story reference, ordered task drafts, labels/assignee intent, and dependency ordering.
   - Require `fusion-issue-authoring` to keep MCP-first behavior and apply GraphQL fallback only when MCP write coverage is unavailable.
   - The orchestrator's session-cache rules apply to all delegated calls: labels, assignee candidates, and issue types are fetched once per session and reused across all task issues in the batch.
   - Budget awareness: a task-planning publish of N tasks costs ~N issue-write mutations + optional sub-issue link mutations. If N > 5, warn the user about rate-limit risk and offer to publish in batches.
   - Do not call MCP write tools directly from this skill in publish mode.
   - Hard fail publish mode if delegated execution returns unresolved item-level failures.

9. Repair mode for already-created tasks
   - If tasks were created but are missing `Issue Type` or parent linkage, delegate repair to `fusion-issue-authoring` and prefer sub-agent invocation.
   - Provide per-issue repair intent (`set type=Task`, add missing parent links, preserve order) and require verification results from the delegated run.
   - Repair mode must be idempotent: skip already-correct issues and fix only missing metadata.
   - Run post-flight verification after repairs and return actionable failures.

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
4. Ordered tasks
5. Draft file paths
6. Publish plan
7. Assumptions, risks, and open questions

Always include: `Status: Awaiting user approval` until publish is confirmed and completed.

For `publish-now` or `repair` mode, include a per-issue post-flight report with:
- issue exists
- issue type equals requested type
- parent equals expected story number
- status (`ok`, `fixed`, or `failed`)

## Assets

- [assets/follow-up-questions.md](assets/follow-up-questions.md)
- [assets/task-plan-template.md](assets/task-plan-template.md)

## Safety & constraints

- This skill is mutation-capable. Repository-local workflow instructions take precedence over inline guidance when they conflict.
- Never mutate GitHub state without explicit confirmation.
- Never infer acceptance criteria without flagging assumptions.
- Always preserve AC traceability in the task plan.
- Keep drafts in `.tmp/` before any publish action.
- In publish/repair mode, treat missing `Issue Type` or missing parent linkage as a failure until post-flight checks pass.
- Delegate mutation/repair execution to `fusion-issue-authoring` (prefer sub-agent) and do not call MCP write tools directly from this skill.
