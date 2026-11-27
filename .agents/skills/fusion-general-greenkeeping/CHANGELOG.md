# Changelog

## 0.4.1 - 2026-11-21

### patch

- [#493](https://github.com/equinor/fusion-skills/pull/493) [`6ad5348`](https://github.com/equinor/fusion-skills/commit/6ad5348913e97384b0e38b8b51d22bb917135fd5) - Trim workflow summary from `SKILL.md` description to pure trigger and anti-trigger cues (under 400-char budget).

## 0.4.0 - 2026-11-21

### minor

- [#488](https://github.com/equinor/fusion-skills/pull/488) [`d8375b3`](https://github.com/equinor/fusion-skills/commit/d8375b3257243816be28b004e4df61967f215ca0) - Make general greenkeeping runtime-agnostic.


  - Remove the unattended-run exclusion and "Interactive only" service-mode section; automated hosts run within their authorized scope.
  - Replace per-command approval locks for builds, tests, scripts and `git`/`gh` reads with host permissions; interactive sessions still default to non-mutating diagnosis until the developer approves changes.
  - Scope `☘️ Fusion Greenkeep` label creation to publishing hosts.

  resolves equinor/fusion-skills#483
  refs equinor/fusion-skills#479

## 0.3.0 - 2026-11-08

### minor

- [#419](https://github.com/equinor/fusion-skills/pull/419) [`9e4bedd`](https://github.com/equinor/fusion-skills/commit/9e4beddf47bfe9a6a45925113fddae0e8b2d4bdf) - Check whether a repository follows its own rules, not only whether docs match

  files. New lanes: rule coherence (contributor docs, `AGENTS.md`, instructions
  and ADRs that contradict or duplicate each other), rule compliance (bounded
  sample of the locally resolved default branch after approved read-only `git`
  commands, patterns with counts, network only with approval), ADR lifecycle
  (superseded or contradicted ADRs, discovered in common ADR directories) and docs
  coverage (contributor
  workflows no doc describes). Rule conflicts are a new `decision` finding class:
  greenkeeping asks which source wins and never edits before the maintainer
  chooses. Declares `fusion-code-conventions` as companion for convention and ADR
  compliance checks.

  resolves equinor/fusion-core-tasks#2859

## 0.2.2 - 2026-11-01

### patch

- [#384](https://github.com/equinor/fusion-skills/pull/384) [`c554907`](https://github.com/equinor/fusion-skills/commit/c5549072df77c0903d8279e428912bc49ad34a75) - Load greenkeeping lane and mode detail only when needed; preserve evidence, approval, resumption and stop contracts.


  resolves equinor/fusion-core-tasks#2682

## 0.2.1 - 2026-11-01

### patch

- [#363](https://github.com/equinor/fusion-skills/pull/363) [`f34c0d9`](https://github.com/equinor/fusion-skills/commit/f34c0d9dc7de15e59ec643407914e98ad8288245) - Shorten the skill description, which is loaded on every turn. Triggers, exclusions that separate it from sibling skills, and safety exclusions are unchanged, and a routing evaluation confirms requests still reach this skill.


  resolves equinor/fusion-core-tasks#2666

## 0.2.0 - 2026-10-31

### minor

- [#353](https://github.com/equinor/fusion-skills/pull/353) [`e2c276a`](https://github.com/equinor/fusion-skills/commit/e2c276a0be5dd41001061948859471aa12ec0d0f) - Add bounded research and working-confidence stop heuristics for smallest evidenced hygiene fixes,

  without changing approval or validation gates.

  refs equinor/fusion-poc-greenkeeper#45

### patch

- [#356](https://github.com/equinor/fusion-skills/pull/356) [`ba79254`](https://github.com/equinor/fusion-skills/commit/ba79254ce5a7a1ffa6fbefc093a6dc03aec827c6) - Route GitHub Actions audits, APM health, JavaScript toolchain and .NET build configuration checks to the companion greenkeeping lanes that own them.


  refs equinor/fusion-poc-greenkeeper#45

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
