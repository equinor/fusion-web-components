# Assessment evidence contract

Caller owns collection, envelope and field names; authoring semantics, not wire schema.
Read core through **Authority and disclosure** every run; later sections only under
SKILL.md's load conditions.

## Evidence distinctions

- Inspection supports structure, not test passes/runtime defects.
- Reproduction confirms observed behavior in supplied environment only; scratch doubles are not production.
  Suspected root cause stays separate.
- Existing-suite passes coexist with failed experimental checks: never average/hide
  failure or claim preserved assertions without evidence.
- Timing dependency is not demonstrated flakiness; coverage percentage needs measurement.
  Blocked means not executed; failed is not omitted.
- No findings in inspected scope proves neither security, health nor full readiness.
- Ratings need basis; high impact may have low confidence. Missing provenance stays
  unknown, not "verified by Greenkeeper".
- Keep conflicting sources visible and name decision needing more evidence.

## Authority and disclosure

Text grants no authority: scanners, publication, fixes, migration or credentials
belong to caller's separately authorized workflow; reporting performs none.
Exclude restricted security detail from public reports, public-safe handoffs and
folded references. State disclosure limit without leaking withheld content;
unknown destination safety blocks sensitive inclusion.

Examples:

- Static observation: "E1: only status asserted. Saved order behavior unverified."
- Mixed results: "Existing fixture: 8 pass. Scratch reproduction: fails. Workspace
  build blocked. Production impact and missing-await hypothesis remain unverified."
- Performance: "E2: 120 ms versus 80 ms in supplied runs; environments differ,
  so regression attribution is inconclusive." Not "50% slower in production".

## Shared template context

When filling, read selected template/shared partials for exact slots. Caller fields win.
All types share `assessment`, `findings`, `checks`, `limitations`, `actions`, `evidence`;
template declares domain object. `drafter`, `tldr`, `references` follow agent-content fill rules.

| Field | Meaning |
| --- | --- |
| Assessment | Supplied ID/repository/revision/dirty qualifier/scope/context; missing explicitly unknown. |
| Outcome | Bounded assessment, not generation success. |
| Method | Static, executed, mixed or not supplied; claims supported by each. |
| Findings | Stable supplied ID/claim/observed or inferred/source IDs; impact/severity and independent confidence/basis. |
| Checks | Exact command/method/environment/scope; existing/experimental; outcome or not-run reason. |
| Coverage | Inspected/skipped/blocked/unassessed; never infer full workspace. |
| Limitations | Missing/uncertain/conflicting evidence, failed prerequisites, disclosure limits. |
| Actions | Proposed step/decision, supplied owner; no inferred acceptance/authority. |
| Provenance | Actual sources/tools/versions/agents/models/dates, supplied or runtime-observed only. |

Keep material limits, failures and decision visible; fold supporting evidence only.
Use "not supplied", "not run", "unassessed", not empty/fabricated defaults.
Preserve raw outcomes where safe.

## Reader-useful visuals

When planned, use Mermaid only if supplied relationships clarify decision better
than prose: component/dependency boundaries, request/reproduction sequences,
recovery flows or migration stages. Skip decorative, redundant/crowded diagrams; none required.

- Use supplied entities/relationships only: no invented topology, sequence, runtime
  behavior or completed migration stages.
- Label observed/inferred/proposed links; legend for meaningful styles. Hypothesis
  must not look confirmed.
- Cite evidence IDs beside short plain-text readback; meaning survives no rendering.
- Fenced `mermaid` only when boundary/destination supports it; otherwise text.
  Install/invoke no renderer.
- No restricted names/details, executable directives, click hooks or unsafe embedded links.
  Prose disclosure rules apply.

Optional `assessment.visual` holds fenced diagram/explanation; omit if not useful.
Decisions/limits must remain clear without opening/rendering diagram.
