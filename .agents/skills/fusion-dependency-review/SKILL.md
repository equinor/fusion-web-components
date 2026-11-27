---
name: fusion-dependency-review
description: 'USE FOR: dependency update PRs, Renovate/Dependabot PRs, library upgrades, npm/pnpm/Yarn/Bun/NuGet security-audit fixes, "should we merge this update". DO NOT USE FOR: feature PRs or code reviews, dependency bot config, or merging without confirmation.'
license: MIT
compatibility: Works from host-supplied PR context (metadata, diff, comments) alone. Live lookup via GitHub MCP server or gh CLI only when the host grants GitHub access and context is missing. Uses fusion-issue-authoring for follow-up handoff.
metadata:
  version: "0.7.1"
  status: experimental
  owner: "@equinor/fusion-core"
  skills:
    - fusion-agent-content
    - fusion-pr-documentation
    - fusion-github-review-resolution
  tags:
    - github
    - pull-request
    - dependency-review
    - dependency-updates
    - security
  mcp:
    suggested:
      - github
---

# Dependency Review

Research PR discussion; assess security/quality/impact; give evidenced verdict.

## When to use

- Dependency update/library bump review, Renovate/Dependabot PR, merge-safety question.
- Dependency PR URL or title patterns: `chore(deps):`, `fix(deps):`, `bump`, `update`.
- Package-audit findings to fix, direct or transitive: `pnpm audit`, `npm audit`, `yarn npm audit`,
  `bun audit`, NuGetAudit warnings.

## When not to use

- Feature/application code reviews, bot configuration, organizational dependency policy.
- Approval/merge without explicit user confirmation.

## Required inputs

Owner/repo; PR number/URL, host-prefetched PR context (metadata, diff, comments/threads, CI) or copied
package/version/files/CI summary; optional concerns. Prefetched context is first-class, sufficient input.
Missing/ambiguous target: ask minimum question; known repo: GitHub MCP shortlist
(number/title/package/author/CI). Never guess; return `Awaiting user PR selection`.
For clarification read `references/questions.md`; read and apply `agents/target-pr-advisor.md`.
Audit findings need no PR: repo/workspace, package manager, audit output or approval to run audit.

## Safety & constraints

This skill is mutation-capable. Repository-local workflow instructions take precedence over inline guidance when they conflict.

- Repo owns commits/validation/changesets/PRs/refresh. Read its rules at point of use.
- No secrets/tokens; never invent versions, changelog, sources, audit/security or CI passes.
- PR context: use host-prefetched metadata/diff/comments/threads first. Fetch live via `gh`/GitHub MCP only
  for missing context and only when host grants GitHub access. Never probe auth (`gh auth status`,
  unauthenticated `curl`); absent live auth never stops analysis when prefetched context is supplied.
  Interactive live PR without prefetched discussion: retrieval failure stops analysis. Gaps lower confidence;
  report them. One packet; no per-lens refetch or dismissing inconvenient concerns.
- Interactive live PR: authorized research checkpoint comment before branch mutation/rebase/push;
  final verdict before approval/hold/decline/merge. Posting unavailable/unauthorized: stop
  affected actions; report blocked PR record. Never skip checkpoints.
- Require accepted verdict before branch work; explicit maintainer confirmation before rebase,
  push, force-push, approval or merge. Local work grants no publication/merge authority.
- Refresh with latest base by rebase, never merge base into Dependabot/Renovate PR branch.
  State sync needs before patching; preserve unrelated work.
- Any `blocking` lens bars `merge`. Unresolved concerns reduce confidence and normally bar `merge`
  unless explicitly resolved/rebutted with evidence.
- Licence/terms change: classify per `references/unattended-updates.md`. Routine (permissive ->
  permissive, or CI/build-only tooling without new use restrictions): evidence note, no HOLD.
  Missing-file exceptions below require newly introduced package or verified unchanged material terms
  across installed-to-target interval. Actual transitions: normal licence-change tiers; unknown interval: HOLD.
  Missing tarball licence file with matching published/exact-version upstream permissive declarations
  and applicable text, no conflicts: routine note; preserve notices and stricter repo/legal policy, never infer sibling coverage.
  Matching published/exact-version upstream permissive declarations without text or conflicts: only a produced,
  maintainer-only-merged PR may use visible `Licence/terms change, merging accepts it:` flag naming
  package/version, SPDX licence, `no licence file`, checked URLs and missing text; otherwise HOLD.
  Copyleft, commercial/dual/keys/paid, source-available/non-commercial/field-of-use, narrowed
  shipped/linked terms: HOLD until maintainer/legal owner explicitly accepts. Unknown, undeclared,
  conflicting or uncorroborated terms: HOLD, even maintainer-only output. CI/API compatibility cannot waive
  acceptance. Produced PR only a maintainer merges (no auto/agent merge): verified needs-a-human change
  gets visible "merging accepts it" flag, not HOLD; other blockers remain.
- No repository-wide rule downgrades/disables, weakening glob/path overrides or removed CI
  checks to get green. Broad suppression is quality `blocking` even with green CI. Only narrow
  inline-reason suppressions. New defaults: preserve behaviour with first-class opt-outs;
  maintainer decides adoption/rejection, never silently.
- Audit findings: never hide. No ignore/suppress entry (`audit.ignore`, `NuGetAuditSuppress`),
  registry-error tolerance as evidence, lowered audit scope or forced major unattended.
  Overrides/pins need approval of exact entries. Unfixed findings reported with evidence.
- Host-assigned unattended: caller owns confirmation/Git/comments/publication. Checkpoints/verdict
  posted only when host requires/authorizes. Missing comment permission never blocks authorized
  local work; references grant no authority or host-limit bypass.

## Instructions

1. Resolve target. **Interactive live PR**: read `references/instructions.md` for checkpoint/
   decision sequence. **Host-assigned**: read `references/unattended-updates.md` for warm-up,
   bounded regeneration/research/validation/delivery. **Copied context**: use supplied evidence,
   expose gaps, honor caller output/tools; no PR posting. **Audit findings**: read
   `references/audit-remediation.md` for evidence, four-step fix order, patch handling and
   per-manager commands. Plan read-only; apply approved steps only; fixes needing a major follow steps 2–8.
2. Read and apply `agents/research-advisor.md`: shared packet with metadata/base/head/branch,
   package/ecosystem/versions/type/usage, diff/transitives/CI, discussion inventory
   (top-level/thread/unresolved/outdated/answered), sources/gaps, changelog/breaks/regressions/
   advisories/licences, validation/sync plan. Compare official terms across full interval,
   skipped releases/relevant transitives included. For Actions/Docker/licence transitions,
   read corresponding `references/unattended-updates.md` sections for evidence/terms checks.
3. Non-pure-patch/break/code-config adaptation: read `references/upgrade-migration.md`. Read-only
   here: identify upstream guide/tooling, planned commands, expected findings, suppressions and
   default decisions for the packet. No edits, commands that change the branch, or reruns before
   the checkpoint and accepted verdict; apply them in step 7.
4. Interactive live PR: draft `assets/research-template.md.hbs` checkpoint; authorize/post before
   mutation. Verify context/discussion/source inventory and validation/sync plan complete. For
   complex/multi-package or retained tracking, read `assets/review-tracker.md`; all checkpoints
   stay mandatory without tracker.
5. Read and apply `agents/security-advisor.md`, `agents/code-quality-advisor.md`,
   `agents/impact-advisor.md` to same packet for evidenced lenses. Prefer parallel where supported;
   otherwise apply inline sequentially. Preserve disagreement; parent owns review. All lenses before verdict.
6. Read and apply `agents/verdict-advisor.md`: independent recommendation/confidence/readiness.
   Pending checks/routine approval affect readiness only. Major: explicit compatibility evidence,
   not semver-only low confidence. Verify lens evidence, concerns reflected/rebutted, licence
   tier/acceptance, independent dimensions, branch plan/follow-up, no broad suppressions, defaults flagged.
7. Accepted branch work after checkpoints/authorization: read and apply `agents/source-control-advisor.md`
   for sync/conflicts/focused checks. Apply step 3's migration plan: upstream guide/tooling first within
   authority; record command/output ("no migration needed" only if observed), fix code findings, rerun
   checks, report suppressions/default decisions. Refresh verdict with actual patch/rebase/check results.
8. Draft `assets/verdict-template.md.hbs`; interactive live PR: post before decision action.
   Explicit follow-up: propose `fusion-issue-authoring` handoff as `Task`, `Bug` or `User Story`.
   Maintainer decides approve/hold/decline/create follow-up; act only as authorized.
   Post-PR review gate belongs to publisher layer: interactive publisher, before requesting human review of
   an existing or replacement PR, applies repository-local review-gate policy through installed
   `fusion-github-review-resolution`; host-owned publication: host runs gate, worker returns verdict only. Research lenses/verdict are not a completed Copilot PR
   review. Missing companion/tooling blocks the gate; use only its documented unavailability exception.
   Keep dependency verdict/licence/CI blockers independent; a passed gate never waives them or grants mutations.

## Expected output

Target unresolved: shortlist/question, `Awaiting user PR selection`. Otherwise package/versions/type,
discussion/concerns, sourced research, evidenced lenses, recommendation/rationale/confidence/readiness,
follow-up or none, handoff/action prompt. Migration: guide/command/output/findings/suppressions/reasons/
deferred decisions. Distinguish unrun checks, research and runtime validation.
Audit findings: before/after counts by severity, fixes per step, overrides changed with reason,
remaining findings with reason/next step, existing ignore entries.

### Human-first output

Comments: installed `fusion-agent-content`, else bundled shape. When filling `.hbs`, read header,
`assets/partials/agent-content/README.md` and named partials:
`assets/partials/agent-content/banner.hbs`, `assets/partials/agent-content/tldr.hbs`,
`assets/partials/agent-content/details.hbs`, `assets/partials/agent-content/references.hbs`.
Manual fill, no renderer. Caller shape wins. Runtime metadata only; quoted TL;DR (`> **TL;DR:**`);
visible decision/confidence/readiness/blockers/risks/follow-up/prompt; fold support under **Details**,
sources last under **References and evidence**.

Combined PR of several reviewed updates: verdicts feed its body but don't shape it. Write body with `fusion-pr-documentation` → `references/combined-pr.md`; held or blocked verdicts become **Updates not included**, behavior changes become **Needs your attention**.
