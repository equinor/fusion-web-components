# Changelog

## 0.5.0 - 2026-11-10

### minor

- [#430](https://github.com/equinor/fusion-skills/pull/430) [`b529e41`](https://github.com/equinor/fusion-skills/commit/b529e410c0c893c2ed4a0e5d945f881c28b10b8a) - Add security-audit remediation guidance for pnpm, npm, Yarn, Bun and NuGet


  - New `references/audit-remediation.md`: JSON audit baseline and same-scope re-audit, then a four-step order: fix stale overrides, update within the allowed range, override on the same release line, report the rest
  - Guardrails against hiding findings: no unattended ignore or suppress entries (`--ignore-unfixable`, `audit.ignore`, `NuGetAuditSuppress`), registry-error tolerance is informational only, no forced majors, auto-fix output is a proposal
  - Patch handling for `patchedDependencies` and `patch:` resolutions: verify or re-create the patch, or leave the package and report it
  - Per-manager commands and override fields checked against official documentation, including `bun audit fix` and `dotnet package update --vulnerable`
  - Route audit findings from `SKILL.md` and the unattended-update reference; overrides stay held proposals unless the host authorises manifest changes

  resolves equinor/fusion-skills#429

## 0.4.2 - 2026-11-01

### patch

- [#383](https://github.com/equinor/fusion-skills/pull/383) [`9dd268f`](https://github.com/equinor/fusion-skills/commit/9dd268f19bf27e76c2b0371448ba47218a001c0d) - Point combined dependency PR bodies to the `fusion-pr-documentation` combined PR outline, from both the human-first output section and the unattended maintainer summary. Verdicts feed its attention and not-included sections; worker and candidate jargon stays out of the visible text.


  refs equinor/fusion-skills#380

- [#378](https://github.com/equinor/fusion-skills/pull/378) [`ca584cf`](https://github.com/equinor/fusion-skills/commit/ca584cff41be1622d5b98dd93371a6d3bdde3189) - Compress shared template fill guidance while preserving provenance, privacy and output rules.


  refs equinor/fusion-core-tasks#2678

- [#385](https://github.com/equinor/fusion-skills/pull/385) [`822abf6`](https://github.com/equinor/fusion-skills/commit/822abf66b9a3dc7f4e48d97cf85db2c4ee4cca8e) - Load dependency-review phase guidance by run type and keep tracker checkpoints mandatory without an unconditional tracker read. Preserve verdict, licence, migration and publication gates.


  resolves equinor/fusion-core-tasks#2683

## 0.4.1 - 2026-11-01

### patch

- [#363](https://github.com/equinor/fusion-skills/pull/363) [`f34c0d9`](https://github.com/equinor/fusion-skills/commit/f34c0d9dc7de15e59ec643407914e98ad8288245) - Shorten the skill description, which is loaded on every turn. Triggers, exclusions that separate it from sibling skills, and safety exclusions are unchanged, and a routing evaluation confirms requests still reach this skill.


  resolves equinor/fusion-core-tasks#2666

## 0.4.0 - 2026-10-31

### minor

- [#357](https://github.com/equinor/fusion-skills/pull/357) [`70cc23a`](https://github.com/equinor/fusion-skills/commit/70cc23adab3506bf96f31972a7e1e0a04c71dad7) - Extend dependency review with GitHub Actions and Docker base-image evidence checklists and an explicit licence-change HOLD gate.


  - Preserve action SHA and image digest conventions; assess workflow contracts, runner requirements, distro and runtime changes.
  - Distinguish research-only sandbox evidence and host-owned workflow publication permissions from compatibility failures.
  - Check licence and terms changes across the installed version interval; require human acceptance before recommending merge.

  refs equinor/fusion-poc-greenkeeper#45

## 0.3.0 - 2026-10-31

### minor

- [#353](https://github.com/equinor/fusion-skills/pull/353) [`e2c276a`](https://github.com/equinor/fusion-skills/commit/e2c276a0be5dd41001061948859471aa12ec0d0f) - Add stack-neutral unattended-update guidance for version-checked Node and NuGet regeneration,

  consumer discovery, release research, verdicts, release artifacts and maintainer summaries.
  Separate host-assigned from interactive routing: live-PR checkpoint comments stay mandatory for
  interactive runs; the calling host owns confirmation, comment and publication gates otherwise.

  refs equinor/fusion-poc-greenkeeper#45

## 0.2.3 - 2026-10-28

### patch

- [#348](https://github.com/equinor/fusion-skills/pull/348) [`1528b11`](https://github.com/equinor/fusion-skills/commit/1528b11a5ad762678ba4b5c977dbf23fe0a55090) - Follow upstream upgrade guides and resolve new tool findings instead of suppressing them.


  - Require the upstream upgrade or migration guide and documented migration tooling before hand-editing config
  - Forbid broad rule downgrades, path-based tool disables, and removed CI checks used only to pass CI; allow narrow, inline-justified suppressions
  - Surface newly enabled default behaviour as a maintainer decision, using first-class opt-outs meanwhile
  - Add migration steps to the research checkpoint, verdict template, and review tracker

  resolves equinor/fusion-core-tasks#2611

## 0.2.2 - 2026-10-27

### patch

- [#336](https://github.com/equinor/fusion-skills/pull/336) [`bf60e9e`](https://github.com/equinor/fusion-skills/commit/bf60e9e76a812735b3ff0cde8140eb5604a506f7) - Sync shared provenance fill rules: resolve authoring-turn metadata before fallback,

  with bounded lookup, model-change and delegate attribution, and privacy limits.

  fixes equinor/fusion-skills#335

## 0.2.1 - 2026-10-18

### patch

- [#285](https://github.com/equinor/fusion-skills/pull/285) [`8fa30e1`](https://github.com/equinor/fusion-skills/commit/8fa30e119d3959c4691c5e099b15bc6724e7794e) - Migrate research checkpoint and verdict comments to `.md.hbs`, preserving

  visible risk, recommendation, readiness, and confirmation gates. Keep the
  review tracker in Markdown and update all comment-template callers.

  resolves equinor/fusion-core-tasks#2438

## 0.2.0 - 2026-10-18

### minor

- [#268](https://github.com/equinor/fusion-skills/pull/268) [`02f4095`](https://github.com/equinor/fusion-skills/commit/02f4095399e20bc3e2625cb8e7ef31315a9e83b3) - Write dependency review comments for human readers


  - Add a "Human-first output" section that uses `fusion-agent-content` when installed, and list it in `metadata.skills`.
  - Restructure the verdict and research checkpoint templates: a runtime-reported banner, a quoted TL;DR with the verdict and the ask, visible decision, risks, blockers, follow-ups, and confirmation prompt, the lens analysis and upstream notes folded under Details, and references and evidence folded last.
  - Replace the `# 🤖 Bip Bop - <title>` heading with the banner in the templates, advisors, and detailed instructions. The review workflow and merge-confirmation gates are unchanged.

## 0.1.5 - 2026-09-07

### patch

- [#238](https://github.com/equinor/fusion-skills/pull/238) [`6ced569`](https://github.com/equinor/fusion-skills/commit/6ced569541a5474b34812d88c5b019397d328f78) - Separate dependency compatibility, evidence confidence, and mechanical merge readiness.


  - Allow well-researched major updates to receive high confidence
  - Keep pending checks and approval from incorrectly forcing a hold verdict
  - Add explicit readiness states to review outputs and templates

## 0.1.4 - 2026-05-07

### patch

- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md, agents, and references.


  - Drop articles, filler, hedging from SKILL.md activation body
  - Compress research-advisor and verdict-advisor agent files
  - Compress instructions and questions references

## 0.1.3 - 2026-03-24

### patch

- [#126](https://github.com/equinor/fusion-skills/pull/126) [`1470bc8`](https://github.com/equinor/fusion-skills/commit/1470bc81e1b04e9727049f01742ea881579ad57b) - Add repository-policy handoff section for governance alignment


  - Add explicit "Repository-policy handoff" section that defers commit, validation, changeset, and PR rules to repo-local instructions
  - Update source-control-advisor to also defer to repo-local workflow instructions

  Resolves equinor/fusion-core-tasks#581

## 0.1.2 - 2026-03-17

### patch

- [#85](https://github.com/equinor/fusion-skills/pull/85) [`c8ba3df`](https://github.com/equinor/fusion-skills/commit/c8ba3df924c5a712c835cdb9f4de44bac03b7ad4) - Make all GitHub-API-consuming skills more conservative with token usage.


  - `fusion-issue-authoring`: concrete session-cache flow for labels and assignee candidates; per-session budget table
  - `fusion-issue-solving`: expanded low-token strategy with session-cache references and budget awareness
  - `fusion-github-review-resolution`: token budget guidance for thread-heavy reviews; cache PR metadata once
  - `fusion-issue-task-planning`: session-cache delegation rules and batch-size warning for large task plans
  - `fusion-dependency-review`: explicit data-reuse rules across parallel advisor fan-out
  - `fusion-discover-skills`: tighter GraphQL budget and call-count cap for discovery sessions

  resolves equinor/fusion-core-tasks#797

## 0.1.1 - 2026-03-11

### patch

- [#73](https://github.com/equinor/fusion-skills/pull/73) [`c0070d2`](https://github.com/equinor/fusion-skills/commit/c0070d26e874e01aeef3d79f35fb2c3fb0198dcc) - Require the dependency review research and verdict outputs to use the Bip Bop title prefix.


  - align the advisor guidance with the required PR comment title format
  - update the research and verdict templates to start with the Bip Bop heading prefix

## 0.1.0 - 2026-03-10

### minor

- [#69](https://github.com/equinor/fusion-skills/pull/69) [`9503fd8`](https://github.com/equinor/fusion-skills/commit/9503fd8b9fdf1fd509d8cc765e316a57004addc9) - Add experimental dependency review skill


  - Structured research template for dependency update PRs
  - Helper advisors for research, security, code quality, impact, source control, and verdict synthesis
  - Multi-lens review analysis: security, code quality, impact
  - Reusable verdict template with recommendation, rationale, confidence, and follow-up
  - Review tracker/checklist asset for consistent dependency PR triage
  - GitHub MCP retrieval of existing PR comments and review threads before analysis
  - Minimal follow-up questions and candidate dependency PR listing when the target PR is unclear
  - Focused advisor/reference files for target-PR selection and detailed workflow sequencing
  - High-confidence evaluation coverage for dependency review
  - Advisor-driven source guidance, confidence rules, remediation handoff, and safe PR patching flow
  - Mandatory PR research checkpoint comments before mutation and final verdict comments before merge or decision
  - Evaluation prompt for dependency review validation
  - Explicit maintainer confirmation before any merge action

  resolves equinor/fusion-core-tasks#523
