# Changelog

## 0.1.4 - 2026-10-22

### patch

- [#326](https://github.com/equinor/fusion-skills/pull/326) [`a656f51`](https://github.com/equinor/fusion-skills/commit/a656f51c3836906f6ed96823f4221a4dda769c9e) - Route general repository-health requests (README and contributor docs, CODEMAP, ownership,

  configuration drift, dead references) to experimental general greenkeeping.

  refs equinor/fusion-core-tasks#2543

- [#328](https://github.com/equinor/fusion-skills/pull/328) [`87e4629`](https://github.com/equinor/fusion-skills/commit/87e462937f8cac73737942b9f3c395f80f508cbf) - Route Fusion .NET service and backend-only repository greenkeeping to experimental `fusion-service-greenkeeping`.


  refs equinor/fusion-core-tasks#2542

## 0.1.3 - 2026-10-22

### patch

- [#310](https://github.com/equinor/fusion-skills/pull/310) [`cdb11c9`](https://github.com/equinor/fusion-skills/commit/cdb11c93bf583d66003f56fb9be753ae7b43be70) - Route APM sync and Fusion app workflow requests directly to experimental

  fusion-repository-greenkeeping. Keep skill lifecycle requests with fusion-skills.

  refs equinor/fusion-skills#299

- [#310](https://github.com/equinor/fusion-skills/pull/310) [`cdb11c9`](https://github.com/equinor/fusion-skills/commit/cdb11c93bf583d66003f56fb9be753ae7b43be70) - Route Copilot setup and Copilot readiness requests to fusion-repository-greenkeeping.


  refs equinor/fusion-skills#313

## 0.1.2 - 2026-10-18

### patch

- [#292](https://github.com/equinor/fusion-skills/pull/292) [`436001c`](https://github.com/equinor/fusion-skills/commit/436001c67afe82ee68202b3c76ca7825ce0ede34) - Route Fusion app repository maintenance and plan resumption to experimental app greenkeeping,

  keeping skill lifecycle operations and dependency PR review on their existing paths.

  refs equinor/fusion-core-tasks#2455

## 0.1.1 - 2026-09-07

### patch

- [#227](https://github.com/equinor/fusion-skills/pull/227) [`596c9c1`](https://github.com/equinor/fusion-skills/commit/596c9c1f679dbfc536f9cd302143e350d3a23f53) - Use version-bounded Microsoft APM references when routing users to missing Fusion skills.

## 0.1.0 - 2026-03-21

### minor

- [#113](https://github.com/equinor/fusion-skills/pull/113) [`d777366`](https://github.com/equinor/fusion-skills/commit/d777366fe6e1b710876a8e1abd2f311e3f4440c4) - Add `fusion` skill — main Copilot gate for the Fusion ecosystem


  Introduces `skills/fusion` as the universal cross-domain router. Routes any Fusion-related request to the right installed skill: `fusion-skills` (skill lifecycle), `fusion-issue-authoring`, `fusion-issue-solving`, `fusion-issue-task-planning`, `fusion-github-review-resolution`, `fusion-dependency-review`. Includes status column (active/experimental), loop prevention, first-contact response, and MCP fallback guidance.

  Related to: equinor/fusion-core-tasks#470
