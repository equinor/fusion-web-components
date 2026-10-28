# Changelog

## 0.2.1 - 2026-10-27

### patch

- [#336](https://github.com/equinor/fusion-skills/pull/336) [`bf60e9e`](https://github.com/equinor/fusion-skills/commit/bf60e9e76a812735b3ff0cde8140eb5604a506f7) - Sync shared provenance fill rules: resolve authoring-turn metadata before fallback,

  with bounded lookup, model-change and delegate attribution, and privacy limits.

  fixes equinor/fusion-skills#335

## 0.2.0 - 2026-10-22

### minor

- [#325](https://github.com/equinor/fusion-skills/pull/325) [`231032f`](https://github.com/equinor/fusion-skills/commit/231032f25de3a8a2ea00c61d7fecae28c2194094) - Add warden feedback mode: evaluate greenkeeping runs, dedupe skill feedback by root cause, publish unattended under trusted runtime policy.

- [#329](https://github.com/equinor/fusion-skills/pull/329) [`0650826`](https://github.com/equinor/fusion-skills/commit/06508269c80c302067458b002fe89183d748b7f7) - Add the shared service-mode contract for running skills unattended.


  - Define `fusion-service-mode/1`: given-not-asked task inputs, maintainer decisions reported as findings, allowed and forbidden actions, time/token stop rules
  - Define one proposal per fingerprint with kind (`fix`, `finding`, `resolved`, `none`), confidence, evidence, validation and provenance
  - Define stable fingerprint normalisation so the same finding keeps one fingerprint across runs
  - Interactive skill behaviour is unchanged; service mode activates only through an explicit service task

  resolves equinor/fusion-core-tasks#2536

## 0.1.0 - 2026-10-22

### minor

- [#310](https://github.com/equinor/fusion-skills/pull/310) [`cdb11c9`](https://github.com/equinor/fusion-skills/commit/cdb11c93bf583d66003f56fb9be753ae7b43be70) - Keep fusion-skills focused on discovery, installation, updates, authoring and

  skill health. Delegate workflow setup/updates to fusion-repository-greenkeeping
  without bundling workflow templates or deployment guides.
  Retire the legacy embedded skills-sync workflow example; use companion's
  reviewed APM template instead of copying an internal reusable-workflow call.

  resolves equinor/fusion-skills#303

  refs equinor/fusion-skills#299

## 0.0.1 - 2026-10-18

### patch

- [#284](https://github.com/equinor/fusion-skills/pull/284) [`a2eaf0e`](https://github.com/equinor/fusion-skills/commit/a2eaf0ebd3d534184b5b215678ef315e880aa5db) - Generate the first tracked version and changelog for the `fusion-skills` skill now that its release key is distinct from the repository package.


  fixes equinor/fusion-skills#284
