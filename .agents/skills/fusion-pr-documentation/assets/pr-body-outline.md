# PR body outline

Use this to fill the repository's PR template with a coherent account. Keep every template heading, HTML comment, checklist item, and their order; put the answers below under the closest matching heading. Use the fallback skeleton only when the repository has no template.

Wrap the template in the human-first shape from `fusion-agent-content`: a runtime-sourced banner and a quoted `> **TL;DR:**` above the first heading (quote any list under it too), short prose under each heading, then a folded **Details** block and a folded **References and evidence** block last. When the template has its own summary section, the TL;DR goes directly above it; repository template rules win where they conflict.

## Narrative questions

Answer in this order when practical:

1. What problem did users, developers, or operators have?
2. Why does that problem matter to the linked product work now?
3. What earlier implementation or decision is the starting point?
4. How does this PR change observable behavior?
5. What remains intentionally unfinished or out of scope?
6. Which security, deployment, migration, compatibility, or ownership boundary must be preserved?
7. Where should a reviewer start?
8. What evidence demonstrates the result?

Write short, natural prose under meaningful headings, for a teammate with thirty seconds. Use tables or bullets only where they make roles, boundaries, evidence, or review steps easier to scan.

## What stays visible and what folds

| Visible | Folded under **Details** | Folded under **References and evidence** (last) |
| --- | --- | --- |
| Banner, TL;DR, why, what changes, boundaries, risks, breaking changes | Full file lists, command tables and output, raw data | Skills used (with version when known) |
| Which issues close and which are referenced, with the role of each | A review guide longer than a few lines | Skill references read |
| One-line validation result, including what was not run | Implementation notes most reviewers skip | Verified issues, PRs, docs, ADRs, and commands, one line each on what they show |

## Mapping to common template headings

| Template heading (examples) | Answers |
| --- | --- |
| Why / Intent / Motivation / Summary | 1, 2 |
| Current behavior / Background / Context | 3 |
| New behavior / Description of work / Changes | 4, 6 |
| Out of scope / Follow-ups / Known limitations | 5 |
| References / Related issue / Links | Verified relationships, each marked close or reference as decided |
| Reviewer focus / How to review | 7 |
| Testing / Validation / Checklist | 8 — one visible result line; observed commands and outcomes folded under **Details** |

Tick a template checkbox only when it is true and observed. Leave unchecked boxes unchecked and explain in prose when relevant.

## Fallback skeleton (no repository template)

Read and fill [pr-body-outline.md.hbs](pr-body-outline.md.hbs) only when the
target repository has no PR template. Read its `.hbs` slot header,
`assets/partials/agent-content/README.md`, and every named partial first.
No renderer ships with the skill; insert Markdown values as written.

Replace the banner placeholders with values the runtime reports; write `model not reported` rather than guessing.

## Anti-patterns

- A generated file list or commit summary in place of a narrative, or a body that opens with one
- A TL;DR that repeats the title or is not a quote block, or a guessed model in the banner
- Risks, breaking changes, failures, or closing choices hidden inside a folded block
- Planned behavior described as implemented
- A test checklist with boxes ticked for checks that were not run
- Relationships listed without explanation
- Template sections deleted because they felt redundant
