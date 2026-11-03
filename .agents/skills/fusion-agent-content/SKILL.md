---
name: fusion-agent-content
description: 'Shapes agent-written GitHub issues, PRs, reviews and delivery reports with provenance, TL;DR and folded evidence. USE FOR: "write this up for humans", "add a TL;DR". DO NOT USE FOR: audience review (use fusion-audience-alignment), skill or agent instructions, commit messages, end-user help, or publishing without confirmation.'
license: MIT
metadata:
  version: "0.2.0"
  status: experimental
  owner: "@equinor/fusion-core"
  skills:
    - fusion-audience-alignment
    - fusion-issue-authoring
    - fusion-pr-documentation
    - fusion-github-review-resolution
  tags:
    - writing
    - github
    - pull-request
    - issues
    - provenance
    - human-first
---

# Agent Content for People

## Contents

- [When to use](#when-to-use)
- [When not to use](#when-not-to-use)
- [Required inputs](#required-inputs)
- [Safety & constraints](#safety--constraints)
- [Instructions](#instructions)
- [Expected output](#expected-output)

## When to use

- Draft/update issues, PR descriptions, review replies, comments, verdicts, bug or delivery reports.
- Shape bodies from authoring skills such as `fusion-issue-authoring` or `fusion-pr-documentation`.
- Make agent text shorter/readable; add TL;DR, provenance or evidence.

## When not to use

- Reader selection/review: use `fusion-audience-alignment` first.
- Skill files, agent instructions or other agent-facing text.
- Commit messages: keep short and conventional.
- End-user product help: its own style guide, no banner.
- Machine-read JSON, YAML or changesets.

## Required inputs

- Type/destination (repository, issue, PR, thread) and existing repository template.
- Actual writer's runtime-reported tool, custom agent if any, model and reasoning effort.
- Skills/references read and evidence gathered: files, issues, docs, commands/results.
- Known readers; otherwise teammate reviewing work and future maintainer.

## Safety & constraints

- Repository templates/contributor guides prevail; preserve headings/order, add framing around them.
- Never invent model, effort, skill or source. Mark unknowns; resolve model/effort independently.
- Never export raw session data or infer provenance. Attribute actual authoring turn, not requested model.
- Folds remain public: no secrets, tokens, personal data or internal-only links.
- Keep acceptance criteria, decisions, risks, breaking changes, migration/security notes, open questions,
  one-line validation result and issue closure/reference choices visible. Fold support, not failures.
- No publishing, comments or GitHub edits without explicit user confirmation; caller owns that gate.

## Instructions

### 1. Shape the content

Read `assets/content-skeleton.md.hbs`, its header, `assets/partials/agent-content/README.md`
and named partials under this skill's `assets/partials/`. Fill by hand; no renderer installation/execution.
Order: banner first; quoted TL;DR; repository-template body; folded **Details**;
folded **References and evidence**, always last.

### 2. Write the banner

```markdown
<sub>🤖 Drafted by fusion-developer (GitHub Copilot) · claude-opus-5.5 · high reasoning</sub>
```

- Name custom agent, then tool in parentheses; otherwise `Drafted with GitHub Copilot`.
- Before fallback, resolve authoring-turn metadata using [shared fill rules](assets/partials/agent-content/README.md#resolve-drafter-metadata):
  supplied runtime metadata, bounded supported lookup within caller restrictions, honest fallback last.
  Keep independently verified fields; disclose lookup limitations.
- Relay/cosmetic formatting retains original attribution; substantive rewrite refreshes authoring metadata.
  Attribute delegated writer, not coordinator; list contributors under references.
- Don't add banner to user-written text posted unchanged.

### 3. Write the TL;DR and body for people

- Quote one to three sentences starting with `> **TL;DR:**`; quote any list too.
  Outcome and ask, not repeated title. First template section already serving as summary
  (such as task's "What to do") can serve as TL;DR.
- Write for teammate with thirty seconds: natural sentences, short paragraphs, bullets only for real lists.
- **Aggregate content** (3+ similar items: combined PR, batch report, multi-finding summary): the item list is the content.
  Visible table, one row per item; prose only for items needing a decision; shared caveat once. TL;DR gives counts and ask.
  Combined PRs: `fusion-pr-documentation` → `references/combined-pr.md`.
- **No process narration** in the visible part: write about the repository and the reader's decision, not the agent's
  inputs, workers, prompts, tooling or temp paths. An environment gap becomes one actionable line ("CI passes on this branch").
- Aim for one visible screen; shorten by folding, never dropping needed facts.
- When prose needs detailed guidance or worked examples, read `references/writing-for-people.md`
  for reader-first phrasing, list/table choices and before/after examples.

### 4. Fold details and references

- **Details**: implementation notes, file lists, command output, raw data, supporting tables such as per-item
  validation. A table that is the content (aggregate item list) stays visible.
- Issues/PRs: `owner/repo#123`, never custom-label Markdown links.
- **References and evidence**, last fold: actual skills (versions when known), skill references read,
  claim evidence (issues, PRs, docs, ADRs, commands/results), each with what it shows.
- When nested folds, placement or citation examples are needed, read `references/details-and-references.md`
  for fold syntax, section-local placement and provenance examples.

### 5. Check before handing over

Apply `assets/pre-post-checklist.md` before returning draft to caller/user.
Publication stays with confirmed calling workflow.

## Expected output

Five-part draft with accurate banner; short note on unknown metadata or unverified evidence.

## Example

When drafting a PR description (including a combined PR) or needing an anti-example, read `references/writing-for-people.md`
for worked PR example and before/after prose.
