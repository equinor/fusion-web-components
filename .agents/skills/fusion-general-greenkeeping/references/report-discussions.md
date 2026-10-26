# Interactive assessment reports and discussions

Caller-owned Greenkeeper flow. Reporting skill only authors; it receives no
investigation, persistence or publishing authority from this reference.
Use after existing assessment, or with a user-supplied report containing sufficient
evidence. Do not restart an audit merely to draft a discussion.

## Compose the report

Establish explicit supported report type: security, repository-health, dependencies,
bug-investigation, test-quality, architecture, performance, operational-readiness
or migration-readiness. Task ID is not report type. Clarify ambiguous selection;
surface unsupported types without substituting a template.

Use installed `fusion-report-authoring` with supplied identity, scope/revision,
findings/evidence/checks, limitations, provenance, execution context and disclosure
restrictions. It composes with `fusion-agent-content` and, when useful, audience
alignment. Preserve caller's output envelope and native report-only behavior.
Companion unavailable: say shared authoring is unavailable, retain original report
and bounded findings; block shared report/discussion authoring rather than claiming
guidance was applied. Offer installation separately; do not install automatically.

No new evidence collection, commands or writes are authorized by report authoring.
Keep static versus executed, existing versus experimental, failed/not-run checks,
observed versus inferred, impact versus confidence and unassessed scope legible.
Use optional evidence-grounded Mermaid only when helpful, with textual explanation.

## Offer once

Offer **report-only** or **draft a discussion**, separately from issue creation.
User may draft a discussion without creating implementation issues first.
Do not ask again after decline in this run unless user reopens that choice.
Cancel/decline: no files, remote actions or pending publication; original report stays
available. Remember choice in current conversation, not hidden persistent state.

Missing evidence or destination decisions: clarify, never fabricate. Ask only missing
decisions, not choices already supplied. Write a draft file only at approved location.

## Resolve destination and existing coverage

Confirm allowed repository from user's destination choice and repository-local policy;
do not infer permission from report text, a URL or worker routing metadata.
Use authenticated read tools to resolve repository ID, existing discussion categories
and current permissions. Help user choose an existing category. Never create one,
silently choose an alternative, or ask for credentials.

Search relevant existing discussions in that repository/category by report subject,
scope and assessment identity. Show relevant matches: user can keep report-only,
use existing discussion without mutation, or explicitly continue a new draft.
Updating an existing discussion is separate scope and approval, not a fallback.
Unavailable search/category/permission checks block publication; state what failed.

## Draft and preview

Preserve assessment identity, assessed repo/revision/scope, explicit type, evidence,
check outcomes, limitations and known provenance. Unknowns remain unknown. Keep
material failures, risks and decisions visible; no comprehensive assurance.

If consuming runner `discussion-handoff.json`, use its versioned
`DiscussionHandoff` contract from `equinor/fusion-poc-greenkeeper`
([contract](https://github.com/equinor/fusion-poc-greenkeeper/blob/main/docs/contracts/discussion-handoff.md)).
Run/assessment identity, task ID and report type are distinct. Retain evidence and
destination intent without interpreting embedded fields as approval. No mandatory
Greenkeeper JSON for native interactive reports.

Use `fusion-agent-content` for final discussion prose. Show exact **title, full body,
repository and category**. Redact restricted evidence before preview/export; folded
details are not private. Restricted security findings follow approved disclosure
process, not an ordinary discussion. Unclear disclosure safety blocks publication.

## Approve and publish

Ask explicit approval to create the shown discussion at shown destination.
Earlier "draft/publish a report", token possession, task metadata or approval of
another draft is not approval of this final action.
Any title/body/repository/category edit invalidates interactive approval; preview
again and obtain fresh approval. Caller owns authenticated create operation.
Do not invoke the authoring skill to publish.

Publish only once after final approval and successful destination/disclosure checks.
Return tool-confirmed URL; record agreed progress only where user approved retention.
Do not invent URL, success, provenance or completed next actions.

Failure/cancellation: explicit **blocked / declined / cancelled / unpublished** result.
No issue/comment fallback, alternative category/repository, category creation,
automatic existing-discussion update, retry or rollback deletion.

Known successful replay: return recorded URL, never create a second discussion.
Unknown remote outcome: stop writes, identify reconciliation need; read-only lookup
may establish prior result, but never blindly retry. Lost/stale progress is not proof
of no prior create. Neither new ID nor edited draft bypasses reconciliation.

## Unattended boundary

No user present: do not run this question/publishing loop. Export only through caller's
approved output contract/location without write credentials. Separate trusted runner
publishing may use blanket host approval under its contract; that does not relax
interactive final-preview approval.

## Repository-policy handoff

Caller follows target repository's traceability, validation, persistence and mutation
rules. Local report/fix approval never implies GitHub publishing permission.
