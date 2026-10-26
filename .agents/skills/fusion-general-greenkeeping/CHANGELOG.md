# Changelog

## 0.1.1 - 2026-10-24

### patch

- [#331](https://github.com/equinor/fusion-skills/pull/331) [`2513163`](https://github.com/equinor/fusion-skills/commit/2513163edad3e78e1df29476322eb6e63106f392) - Add optional, caller-owned assessment-to-discussion assistance with shared report

  authoring, destination checks, final-preview approval and reconciliation boundaries.

  resolves equinor/fusion-core-tasks#2573
  refs equinor/fusion-core-tasks#2561

## 0.1.0 - 2026-10-22

### minor

- [#326](https://github.com/equinor/fusion-skills/pull/326) [`a656f51`](https://github.com/equinor/fusion-skills/commit/a656f51c3836906f6ed96823f4221a4dda769c9e) - Add experimental general repository-health greenkeeping as an installable entry skill.


  - Check README and contributor docs against executable configuration, CODEMAP accuracy, ownership and
    security policy, stale or duplicated configuration, and dead references
  - Report evidence-backed findings by priority, separating confirmed issues, suggestions, unknowns and
    respected local conventions; never flag conventions the repository deliberately follows
  - Default to read-only reports; draft issues or apply only selected fixes behind confirmation gates,
    with no commit, push or publication without approval
  - Hand off workflow checks to fusion-repository-greenkeeping and dependency decisions to
    fusion-dependency-review; mark created issues and pull requests with the greenkeeping marker
  - Interactive only; unattended Greenkeeper use follows the catalog service-mode contract

  resolves equinor/fusion-core-tasks#2543

### patch

- [#328](https://github.com/equinor/fusion-skills/pull/328) [`87e4629`](https://github.com/equinor/fusion-skills/commit/87e462937f8cac73737942b9f3c395f80f508cbf) - Route .NET service runtime, Fusion library, Roles V2, package and service test maintenance to

  `fusion-service-greenkeeping`.

  refs equinor/fusion-core-tasks#2542
