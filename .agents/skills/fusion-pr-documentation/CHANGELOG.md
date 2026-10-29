# Changelog

## 0.1.2 - 2026-10-27

### patch

- [#336](https://github.com/equinor/fusion-skills/pull/336) [`bf60e9e`](https://github.com/equinor/fusion-skills/commit/bf60e9e76a812735b3ff0cde8140eb5604a506f7) - Sync shared provenance fill rules: resolve authoring-turn metadata before fallback,

  with bounded lookup, model-change and delegate attribution, and privacy limits.

  fixes equinor/fusion-skills#335

## 0.1.1 - 2026-10-18

### patch

- [#285](https://github.com/equinor/fusion-skills/pull/285) [`8fa30e1`](https://github.com/equinor/fusion-skills/commit/8fa30e119d3959c4691c5e099b15bc6724e7794e) - Extract the fallback PR body into an agent-fillable `.md.hbs` asset. Retain

  the narrative guide as Markdown and target repository template priority,
  including preservation of repository headings, comments, and checklists.

  resolves equinor/fusion-core-tasks#2439

## 0.1.0 - 2026-10-18

### minor

- [#278](https://github.com/equinor/fusion-skills/pull/278) [`39698ca`](https://github.com/equinor/fusion-skills/commit/39698ca53d26dfabf6c0a95845e8ed314ccf7f6c) - Add experimental `fusion-pr-documentation` skill that researches, drafts, and updates pull request descriptions as durable project documentation.


  - Grounds claims in the diff, repository docs (ADRs, specs, `CODEMAP.md`, README), and live GitHub issues and PRs via the gh CLI, GitHub MCP, or Fusion PM MCP; treats optional semantic search as discovery only
  - Inspects and preserves the repository pull request template and defers to repository-local PR rules
  - Asks per linked issue whether merging should close it or only reference it, recommending the most logical choice (usually close), and applies the recommendation when the user is unavailable
  - Shapes bodies for human readers via `fusion-agent-content` (inline summary when it is not installed): runtime-sourced banner, quoted TL;DR, template headings in prose, file lists and command output folded under Details, and a folded References and evidence block last, with validation result, risks, and close-or-reference choices kept visible
  - Uses lowercase closing keywords and `owner/repo#123` references in its examples, templates, and publish checklist
  - Reports only observed validation, separates pre-existing failures, and names checks that were not run
  - Requires confirmation before creating or updating a PR and reads the live body back afterwards

  resolves equinor/fusion-core-tasks#2407
  refs equinor/fusion-skills#244
