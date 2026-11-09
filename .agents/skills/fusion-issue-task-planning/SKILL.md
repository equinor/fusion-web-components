---
name: fusion-issue-task-planning
description: Plan and break down user-story issues into ordered, traceable task issue drafts with explicit publish gates.
license: MIT
metadata:
   version: "0.3.0"
   status: experimental
   owner: "@equinor/fusion-core"

   skills:
      - fusion-issue-authoring
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

Experimental, not stable; behavior, structure, outputs may change between versions.

## When to use

Plan actionable tasks for existing User Story before implementation: "plan tasks for #123", "break this story into steps", "create task issue drafts from this user story".

## When not to use

Direct implementation, PR review, or unconfirmed GitHub mutations.

## Required inputs

Issue (`owner/repo#number` or URL); depth (`minimal`, `standard`, `detailed`), default `standard`; run mode (`draft-only`, `draft+publish-ready`, `publish-now`), default `draft-only`. When missing inputs block planning, read `assets/follow-up-questions.md`; ask up to 3 focused questions per batch, state safe assumptions.

## Safety & constraints

- This skill is mutation-capable. Repository-local workflow instructions take precedence over inline guidance when they conflict.
- Explicit same-turn confirmation before any mutation, including `publish-now` and repair. Run mode is not approval. Delegate mutation/repair to `fusion-issue-authoring` (prefer sub-agent); never call MCP write tools directly. Missing orchestrator: draft-only artifacts and explicit publish handoff.
- Never infer acceptance criteria without flagged assumptions; always preserve AC traceability. Keep drafts in `.tmp/` before publishing.
- Publication blocked until devil's advocate confirms sound split or user explicitly accepts listed risks. Unresolved assumptions, uncovered requirements or untraced tasks still block publication; draft-only ambiguity exception below does not authorize writes.
- Publish/repair fails until issue exists, requested `Issue Type` and expected parent linkage pass post-flight. Unresolved item failures: hard fail, exact per-issue `failed` reasons; stop further mutations pending user confirmation, retain unresolved items for explicit decision.

## Tool format

Tool names: `<mcp_server>::<tool>` (example: `mcp_github::sub_issue_write`).

## Instructions

Execute in order; state assumptions.

1. Probe preferred skills and classify drafting mode
   - `orchestrated`: `fusion-issue-authoring` available; draft through its task mode, with explicit publish gates handled by the orchestrator.
   - `inline`: `fusion-issue-authoring` unavailable; stay in **draft-only** mode, generate task drafts from the built-in `assets/task-issue-draft.md.hbs` (title plus `What to do`, `Scope`, `Done when`, a visible `Blocked by`, optional `Decisions and risks`, and folded sequence, AC traceability, dependency reasoning, and verification details), and avoid direct references to another skill's `assets/` files.
   - Prefer `fusion-issue-authoring` task mode; let it read/apply its `agents/task.agent.md` and select templates. Do not bypass its shared gates with direct cross-skill file references.
   - Never stop due to missing preferred skills; degrade gracefully.

2. Research the user story
   - Read title/body, acceptance criteria, scenarios, ancestor chain, existing sub-issues, related links. Ambiguous issue type: confirm `User Story`.

3. Clarify only when needed
   - At most 3 questions per batch; continue with explicit assumptions when safe defaults exist.

4. Extract planning anchors
   - Outcomes, constraints/non-goals, verification points.

5. Agree technical plan
   - Read `references/technical-plan.md`. Propose affected areas, approach, at least one alternative, risks, test strategy; tag claims `[stated]`/`[verified: <source>]`/`[assumed]`. User confirms/edits before tasks; unattended lists unconfirmed decisions as assumptions.
   - Unknowns become research questions (question, sources, stop condition); blocking ones become first-sequenced research task drafts.
   - Skip for `minimal` depth or obvious decomposition; state skip in plan preview.

6. Build dependency-ordered tasks
   - Each: objective, scope boundary, deliverable, verification method, mapped AC. Prefer independently verifiable slices.
   - Minimum tasks cover all AC; every task maps to at least one. Unmapped quality-of-life tasks are suggestions (title/value), not drafts unless selected; autopilot lists only.
   - Required closure criteria only in "Done when"; desirable extras under **Stretch goals**.

7. Run devil's-advocate review before drafting
   - Count architecture-ambiguity signals:
     - Unresolved design/architecture in story, comments, or ancestors
     - Backend/frontend implicit API, data-model, ownership contract not agreed
     - Discovery/research/alignment alongside implementation without explicit blocker
     - Vague/circular dependencies ("after backend is done", "when design is ready")
     - Unclear/contested component, API, data-model ownership
   - Two or more: `orchestrated` asks `fusion-issue-authoring` to read/apply its `agents/devils-advocate.agent.md` in **interrogator mode**, no user trigger needed. `inline`: apply five-signal inline DA checklist, surface `⚠ Ambiguity checklist`; user resolves/explicitly accepts each before drafts.
   - Zero/one: **moderate mode**, up to 3 concerns, continue after acknowledgement.
   - **Draft-only exception**: unresolved ambiguities may proceed to drafts in `draft-only`, but plan preview starts with `⚠ Ambiguity warning` listing each. Publication remains blocked until risks accepted.

8. Generate task issue drafts
   - `orchestrated`: route through `fusion-issue-authoring` with issue type `Task` in draft-only mode; it reads/applies its `agents/task.agent.md`, then returns local drafts for plan review.
   - `inline`: write `.tmp/TASK-<nn>-<slug>.md` drafts from `assets/task-issue-draft.md.hbs`
   - Shape every task body for human readers (see [Human-first output](#human-first-output)).
   - Keep drafts local until explicit publish approval.

9. Check coverage
   - List requirements/AC with no task and tasks mapping to none, or `Full coverage`. Both block publication until resolved: uncovered requirement gets task, deferral or accepted gap; untraced task dropped, moved to suggestions or mapped after confirmation.

10. Generate plan preview
   - Write `.tmp/USER-STORY-TASK-PLAN-<context>.md` from `assets/task-plan-template.md.hbs`: summary, technical plan, research questions, traceability, coverage, ordered tasks, undrafted suggestions, draft paths, publish plan, assumptions/risks.
   - Before filling either template, read selected `.hbs` header, `assets/partials/agent-content/README.md`, and named partials: `assets/partials/agent-content/banner.hbs`, `assets/partials/agent-content/tldr.hbs`, `assets/partials/agent-content/references.hbs`; `assets/partials/agent-content/details.hbs` only for inline task draft. Fill manually; no renderer ships.

11. Publish only after explicit confirmation
   - Apply same-turn confirmation/assumption/DA/coverage gates above. When publishing approved drafts, read `references/publish-and-repair.md` for delegated payload and verification contract.
   - No milestone for tasks, even story/Feature inherited milestone. Prefer sub-agent execution.
   - MCP-first; GraphQL only missing MCP write coverage. Reuse batch caches: labels/candidates per repo, types per organization.
   - Sub-issue links/order are sole child list; no story-body task checklist or parent comment listing tasks.
   - N tasks cost ~N issue writes plus optional links; N > 5: warn rate-limit risk, offer batches.

12. Repair mode for already-created tasks
   - For missing/incorrect `Issue Type` or parent linkage, read `references/publish-and-repair.md` for delegated `type=Task`/parent/order repair. Idempotent: skip correct issues, change only missing metadata; require post-flight checks and actionable failures.

## Human-first output

Use installed `fusion-agent-content`, otherwise banner `<sub>🤖 Drafted by <agent> (<tool>) · <model> · <effort> reasoning</sub>` from runtime, never guessed (`model not reported` if unknown). Quoted `> **TL;DR:** ...` of 1–3 sentences; task `What to do` serves as TL;DR. Preserve template headings; visible `Done when`/AC, blockers, decisions, risks. Fold sequence/AC mapping/dependency reasoning/verification in `<details><summary>Details</summary>`; end `<details><summary>References and evidence</summary>` for skills, references, evidence.

## Expected output

Return heading order:
1. Experimental caveat
2. Story summary
3. Technical plan and research questions
4. Acceptance-criteria traceability and coverage
5. Ordered tasks (minimum set)
6. Suggested nice-to-have tasks (not drafted)
7. Draft file paths
8. Publish plan
9. Assumptions, risks, and open questions

Always `Status: Awaiting user approval` until confirmed and completed. For `publish-now` or `repair`, per-issue post-flight: exists, issue type equals requested type, parent equals story number, status (`ok`, `fixed`, `failed`).
