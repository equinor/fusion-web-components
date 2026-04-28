# Changelog

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
