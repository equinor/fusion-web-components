# Changelog

## 0.4.0 - 2026-11-21

### minor

- [#493](https://github.com/equinor/fusion-skills/pull/493) [`6ad5348`](https://github.com/equinor/fusion-skills/commit/6ad5348913e97384b0e38b8b51d22bb917135fd5) - Add read-only `diagnose` mode to `agents/warden.agent.md` and `SKILL.md` routing.


  - Inspect installed APM provenance/drift, trigger collisions, missing MCP servers, and frontmatter/size issues without mutating workspace files

## 0.3.0 - 2026-11-21

### minor

- [#488](https://github.com/equinor/fusion-skills/pull/488) [`d8375b3`](https://github.com/equinor/fusion-skills/commit/d8375b3257243816be28b004e4df61967f215ca0) - Add a runtime-boundary rule and make the service-mode contract defer authority to the host runtime.


  - Add `references/runtime-boundary.md`: skills own maintenance checks, remediation craft, verification and output shape; the host runtime owns execution authority, approvals, branches/commits, labels, credentials and publishing.
  - Interactive hosts default to non-mutating advice until the developer approves changes; automated hosts work within their authorized scope, tools and verification commands.
  - Supersede `fusion-service-mode/1` bans on commits, branches, workflows, `CODEOWNERS`, APM manifests and companion skills. Path protection now comes from the host task's optional `protectedPaths`.
  - Scope `☘️ Fusion Greenkeep` label creation to hosts that publish directly.

  resolves equinor/fusion-skills#483
  refs equinor/fusion-skills#479

## 0.2.5 - 2026-11-11

### patch

- [#437](https://github.com/equinor/fusion-skills/pull/437) [`8a4b430`](https://github.com/equinor/fusion-skills/commit/8a4b430d8ea5e1e06d6350c391e7993f5a3a7fcc) - Use Fusion Greenkeeper or reviewed manual APM commands for installed-skill updates. Never suggest APM sync or offer workflow setup from update checks, missing workflows or generic automation requests. Route setup only on an explicit APM workflow request.


  resolves equinor/fusion-core-tasks#2921

## 0.2.4 - 2026-11-01

### patch

- [#395](https://github.com/equinor/fusion-skills/pull/395) [`41ebc0f`](https://github.com/equinor/fusion-skills/commit/41ebc0fcdd462e138d299bd9a784e65f900b40bb) - Load warden report details only in report mode and retain sanitization, dedupe and publication gates before dispatch. Add direct conditional resource links and contract navigation.


  resolves equinor/fusion-core-tasks#2686

## 0.2.3 - 2026-11-01

### patch

- [#378](https://github.com/equinor/fusion-skills/pull/378) [`ca584cf`](https://github.com/equinor/fusion-skills/commit/ca584cff41be1622d5b98dd93371a6d3bdde3189) - Compress shared template fill guidance while preserving provenance, privacy and output rules.


  refs equinor/fusion-core-tasks#2678

## 0.2.2 - 2026-11-01

### patch

- [#363](https://github.com/equinor/fusion-skills/pull/363) [`f34c0d9`](https://github.com/equinor/fusion-skills/commit/f34c0d9dc7de15e59ec643407914e98ad8288245) - Shorten lifecycle discovery wording while keeping authoring, failure reports, greenkeeping feedback and repository-workflow exclusions.


  refs equinor/fusion-core-tasks#2670

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
