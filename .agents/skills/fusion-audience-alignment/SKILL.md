---
name: fusion-audience-alignment
description: 'Aligns multi-audience drafts through reader reviews. USE FOR: "who will read this", "review this for the audience", product owner, developer or newcomer clarity. DO NOT USE FOR: final formatting (use fusion-agent-content), running-app personas (use fusion-simulated-user-eval), or publishing without confirmation.'
license: MIT
metadata:
  version: "0.1.3"
  status: experimental
  owner: "@equinor/fusion-core"
  skills:
    - fusion-agent-content
    - fusion-issue-authoring
    - fusion-pr-documentation
    - fusion-simulated-user-eval
  tags:
    - writing
    - audience
    - review
    - personas
    - human-first
---

# Audience Alignment

## Contents

- [When to use](#when-to-use)
- [When not to use](#when-not-to-use)
- [Required inputs](#required-inputs)
- [Safety & constraints](#safety--constraints)
- [Instructions](#instructions)
- [Expected output](#expected-output)

## When to use

- Multi-role user stories, features, cross-team PRs, release notes, announcements, ADRs, help and status reports.
- Audience questions/review requests; calling drafts with unclear or mixed readers.

## When not to use

- Short single-audience replies/routine bug reports: use `fusion-agent-content` directly.
- Running-app personas: use `fusion-simulated-user-eval`.
- Final banner/TL;DR/folds: use `fusion-agent-content` after alignment.

## Required inputs

- Draft, type and destination (repository, issue, PR, channel); intended decision/action.
- Reader context: templates, labels, assignees/participants, `CODEOWNERS`, linked issues,
  project board and repository docs such as `CONTRIBUTING.md`.

## Safety & constraints

- Roles only; no real names, emails or personal data in cards/notes.
- Readers judge clarity/fit, never supply facts, decisions or commitments.
- Preserve meaning and every required decision; unknown facts become visible questions.
- No publishing, comments or GitHub edits without explicit user confirmation; caller owns gate.
- Isolated review must be source-blind: separate context with only draft/card, no repository,
  chat history or research notes. Never claim an informed inline review is isolated.
  If runtime cannot enforce restricted context, report isolated mode unsupported.

## Instructions

### 1. Gather the audience

List candidates and why they read: role, prior knowledge, needed decision/action and reading time.
When candidates are unclear or content-type examples needed, read `references/finding-readers.md`
for repository signals and audience examples. Use roles, not identities.

### 2. Pick representative readers

Choose as few as cover everyone who must understand or act; merge identical needs.
Always include reader who must decide/act. Add context-free newcomer/future maintainer for
lasting content, and agent reader when an agent will act on it. Each extra reader covers a distinct need.
Read `assets/reader-card.md.hbs` header; fill named Markdown slots, drop comments, one card per reader.
Show readers for user confirmation/adjustment when available; autopilot selects and records them.

### 3. Review the draft as each reader

Use only that reader's knowledge. Record:
1. What TL;DR alone communicates and whether they could decide/act.
2. Missing information.
3. Unknown terms/references.
4. What they would skip.
5. Can act: yes, partly or no, and blockers.

For important content, use one isolated subagent per reader with only draft/card.
Read `assets/reader-review-prompt.md.hbs` for self-contained restricted prompt; fill as text,
never evaluate mustaches inside draft/card values. When choosing isolated review or needing detailed
review-to-revision guidance, read `references/reader-review.md` for packet, findings table and revisions.
Inline perspective-switching suffices otherwise; don't present it as independent review.

### 4. Align the content

Revise from verified facts without growing visible text:
- TL;DR serves deciding/acting reader; body main audience, explaining needed terms once.
- Secondary-reader/agent-only support goes into folded details.
- Conflicts favor acting reader; give others a pointer.
- Unanswered gaps become visible open questions, never invented answers.

### 5. Record and hand over

Add readers/main edits to draft's folded **References and evidence** audience note.
Return to `fusion-agent-content` for shaping or calling skill.

## Expected output

Confirmed cards (or recorded autopilot selection), per-reader findings table
(understood, missing, unclear, skipped, can act), aligned draft and folded audience note.

## Example

When selecting readers for a user story, read `references/finding-readers.md` for
worked PO/developer/planning-agent example.
