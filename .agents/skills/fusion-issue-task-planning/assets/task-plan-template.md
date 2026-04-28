# Task Plan Draft — User Story

## Experimental caveat
EXPERIMENTAL: This workflow is not yet stable and may change.

## Skill availability
- Drafting mode: {orchestrated | direct-subordinate | inline}
- `fusion-issue-authoring`: {available | not installed}
- `fusion-issue-author-task`: {available | not installed}

## Run mode
- Mode: {draft-only | draft+publish-ready | publish-now}
- Planning depth: {minimal | standard | detailed}

## Issue context
- Issue: {owner/repo#number}
- Title: {title}
- Story: {as a / i want / so that}

## Ancestors and relevant links
- Parent/ancestor chain:
  - {owner/repo#x}
  - {owner/repo#y}
- Relevant links:
  - {issue/pr/doc url}
  - {issue/pr/doc url}

## Acceptance criteria anchors
- {criterion 1}
- {criterion 2}
- {criterion 3}

## Acceptance-criteria traceability
- AC-1 -> Task {n}, Task {m}
- AC-2 -> Task {n}
- AC-3 -> Task {n}, Task {m}

## Ordered implementation tasks
- [ ] Task 1 — {objective}
  - Sequence: {01}
  - Acceptance criteria: {ac refs}
  - Scope boundary: {in/out}
  - Deliverable: {artifact}
  - Verification: {test/check}
- [ ] Task 2 — {objective}
  - Sequence: {02}
  - Acceptance criteria: {ac refs}
  - Scope boundary: {in/out}
  - Deliverable: {artifact}
  - Verification: {test/check}

## Dependency notes
- Task {n} depends on Task {m} because {reason}

## Generated task issue drafts
- Draft: `.tmp/TASK-{2-digit-sequence}-{slug}.md`
  - Proposed title: {title}
  - Sequence: {n}
  - Depends on: {task refs}

## Publish plan (requires explicit confirmation)
- Publish path: {orchestrated via fusion-issue-authoring (preferred sub-agent) | subordinate-draft via fusion-issue-author-task then publish via fusion-issue-authoring | draft-only handoff}
- Delegated publisher: `fusion-issue-authoring`
- Delegated inputs:
  - `owner`, `repo`, `parent story`, `ordered task drafts`, `labels/assignee intent`, `dependency ordering`
- Delegated behavior contract:
  - MCP-first issue mutation and verification through `fusion-issue-authoring`
  - GraphQL fallback only when MCP write coverage is unavailable
  - Return per-issue post-flight verification (`exists`, `type`, `parent`, `status`)
- This skill does not call MCP write tools directly for publish/repair.
- Apply sub-issue ordering from planned sequence
- Optional: parent summary comment with created issue links

## Post-flight report
- `{owner}/{repo}#{n}` | exists: {yes/no} | type: {actual} | parent: {actual} | status: {ok/fixed/failed}

## Assumptions
- Assumption: {explicit assumption}

## Blockers (if any)
- Blocker: {what is blocked}
  - Why: {reason}
  - Next action: {required user input or system step}

## Risks and open questions
- Risk: {risk}
- Question: {question}

## Status
Status: Awaiting user approval
