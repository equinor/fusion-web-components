# PR body outline

Fill repository PR template with coherent narrative. Preserve headings, HTML comments, checklist items/order; map answers below to nearest heading. Fallback skeleton only when no repository template.

Use `fusion-agent-content` shape: runtime banner, quoted `> **TL;DR:**` above first heading or existing summary (quote lists too), short prose, folded **Details**, folded **References and evidence** last. Repository template rules win.

## Narrative questions

Answer in order when practical:

1. What problem did users, developers, or operators have?
2. Why does that problem matter to the linked product work now?
3. What earlier implementation or decision is the starting point?
4. How does this PR change observable behavior?
5. What remains intentionally unfinished or out of scope?
6. Which security, deployment, migration, compatibility, or ownership boundary must be preserved?
7. Where should a reviewer start?
8. What evidence demonstrates the result?

Write short, natural prose for thirty-second review. Tables/bullets only for clearer roles, boundaries, evidence or review steps.

## What stays visible and what folds

| Visible | Folded under **Details** | Folded under **References and evidence** (last) |
| --- | --- | --- |
| Banner, TL;DR, why, what changes, boundaries, risks, breaking changes | Full file lists, commands/output, raw data | Skills used (with version when known) |
| Which issues close and which are referenced, with the role of each | A review guide longer than a few lines | Skill references read |
| One-line validation result, including what was not run | Implementation detail | Verified issues/PRs/docs/ADRs/commands, each with evidence role |

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

Tick checkboxes only when observed true; explain relevant unchecked items.

## Fallback skeleton (no repository template)

Only without repository template, fill [pr-body-outline.md.hbs](pr-body-outline.md.hbs). Read `.hbs` header, `assets/partials/agent-content/README.md` and named partials first. No renderer; insert Markdown values verbatim.

Banner: `<sub>🤖 Drafted by <agent> (<tool>) · <model> · <effort> reasoning</sub>`. Without custom agent, `Drafted with <tool>`; unresolved model: `model not reported`. Never guess provenance.

## Anti-patterns

- A generated file list or commit summary in place of a narrative, or a body that opens with one
- A TL;DR that repeats the title or is not a quote block, or a guessed model in the banner
- Risks, breaking changes, failures, or closing choices hidden inside a folded block
- Planned behavior described as implemented
- A test checklist with boxes ticked for checks that were not run
- Relationships listed without explanation
- Template sections deleted because they felt redundant
