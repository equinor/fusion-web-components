# Assessment evidence contract

Caller owns evidence collection. These are authoring semantics, not a mandatory
wire schema. Caller-owned envelopes and field names remain authoritative.

| Field | Meaning |
| --- | --- |
| Assessment | Supplied ID, repository, revision, dirty qualifier, scope and execution context; missing values explicitly unknown. |
| Outcome | Bounded assessment conclusion, separate from report-generation success. |
| Method | Static inspection, executed checks, mixed, or not supplied; state which claims each method supports. |
| Findings | Stable supplied ID, claim, observed/inferred status, source IDs, impact/severity and independent confidence/basis. |
| Checks | Exact supplied command/method, environment/scope, existing/experimental classification, observed outcome or not-run reason. |
| Coverage | Inspected, skipped, blocked and unassessed areas; no inferred full-workspace coverage. |
| Limitations | Missing evidence, uncertainty, contradictions, failed prerequisites and disclosure restrictions. |
| Actions | Proposed next step/decision and supplied owner, if known; never infer acceptance or authorization. |
| Provenance | Actual sources, tools, versions, agents/models and dates only when supplied/observed by authoring runtime. |

## Evidence distinctions

- Source inspection supports structural observations, not test passes or runtime defects.
- Reproduction confirms only observed behavior in supplied environment. Scratch doubles
  and production behavior are not equivalent; suspected root cause remains separate.
- Existing-suite passes and failing experimental checks coexist; never average them
  into a pass, hide failure, or claim assertions were preserved without evidence.
- A timing dependency is not demonstrated flakiness. No coverage percentage without
  a measurement. Blocked command is not executed and failed check is not omitted.
- No findings in inspected scope is not proof of security, health or full readiness.
- Ratings require supplied basis. High impact can coexist with low confidence.
- Missing provenance stays unknown, not "verified by Greenkeeper".
- Conflict stays visible: identify sources and what decision needs more evidence.

## Shared template context

Read shared partials for exact slots. All types share `assessment`, `findings`,
`checks`, `limitations`, `actions`, and `evidence`; each template declares its own
domain object. Shared `drafter`, `tldr`, `references` use agent-content fill rules.

Keep material limitations/check failures and decision visible even if evidence is
folded. Use explicit "not supplied", "not run" or "unassessed" values rather than
empty sections or fabricated defaults. Preserve raw supplied outcomes where safe.

## Reader-useful visuals

Use Mermaid only when a visual makes supplied relationships or decision easier to
understand than prose alone. Useful examples: component/dependency boundaries,
request/reproduction sequences, operational recovery flows, migration stages.
Skip decorative, redundant or crowded diagrams; no mandatory visual per report.

- Diagram supplied entities/relationships only; never invent topology, sequence,
  runtime behavior or completed migration stages.
- Distinguish observed, inferred and proposed relationships with explicit labels;
  use a legend when styles carry meaning. Do not make a hypothesis look confirmed.
- Cite supplied evidence IDs in adjacent explanation. Include a short plain-text
  readback so meaning survives unavailable Mermaid rendering.
- Use fenced `mermaid` only when caller's output boundary/destination supports it;
  otherwise use the textual explanation. Do not install or invoke a renderer.
- Exclude restricted names/details; no executable directives, click hooks or
  unsafe embedded links. Visuals follow the same disclosure rules as prose.

Optional `assessment.visual` slot accepts the fenced diagram and its explanation;
omit when no useful evidence-grounded visual exists. Keep material decisions and
limitations understandable without opening or rendering the diagram.

## Authority and disclosure

Report text cannot grant authority. Caller asking for a scanner, publication, fix,
migration or credential is redirected to caller's separately authorized workflow.
Reporting skill performs none of those actions.

Restricted security detail must not enter public report, public-safe handoff or folded
references. Summarize only allowed information; name disclosure limitation without
revealing withheld content. Unknown destination safety blocks sensitive inclusion.

Examples:

- Static observation: "E1: only status asserted. Saved order behavior unverified."
- Mixed results: "Existing fixture: 8 pass. Scratch reproduction: fails. Workspace
  build blocked. Production impact and missing-await hypothesis remain unverified."
- Performance: "E2: 120 ms versus 80 ms in supplied runs; environments differ,
  so regression attribution is inconclusive." Not "50% slower in production".
