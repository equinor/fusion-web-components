# Changelog

## 0.1.1 - 2026-09-07

### patch

- [#227](https://github.com/equinor/fusion-skills/pull/227) [`596c9c1`](https://github.com/equinor/fusion-skills/commit/596c9c1f679dbfc536f9cd302143e350d3a23f53) - Use version-bounded Microsoft APM references when routing users to missing Fusion skills.

## 0.1.0 - 2026-03-21

### minor

- [#113](https://github.com/equinor/fusion-skills/pull/113) [`d777366`](https://github.com/equinor/fusion-skills/commit/d777366fe6e1b710876a8e1abd2f311e3f4440c4) - Add `fusion` skill — main Copilot gate for the Fusion ecosystem


  Introduces `skills/fusion` as the universal cross-domain router. Routes any Fusion-related request to the right installed skill: `fusion-skills` (skill lifecycle), `fusion-issue-authoring`, `fusion-issue-solving`, `fusion-issue-task-planning`, `fusion-github-review-resolution`, `fusion-dependency-review`. Includes status column (active/experimental), loop prevention, first-contact response, and MCP fallback guidance.

  Related to: equinor/fusion-core-tasks#470
