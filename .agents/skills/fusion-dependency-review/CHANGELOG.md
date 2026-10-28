# Changelog

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
