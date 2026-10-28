# Changelog

## 0.2.1 - 2026-10-27

### patch

- [#336](https://github.com/equinor/fusion-skills/pull/336) [`bf60e9e`](https://github.com/equinor/fusion-skills/commit/bf60e9e76a812735b3ff0cde8140eb5604a506f7) - Sync shared provenance fill rules: resolve authoring-turn metadata before fallback,

  with bounded lookup, model-change and delegate attribution, and privacy limits.

  fixes equinor/fusion-skills#335

## 0.2.0 - 2026-10-22

### minor

- [#323](https://github.com/equinor/fusion-skills/pull/323) [`e830a57`](https://github.com/equinor/fusion-skills/commit/e830a57a330a34f92c3a26ea6480b6f57c8ef31b) - Mark greenkeeping issues and pull requests so maintainers can spot and filter them.


  - Start created issue and pull request titles with `☘️ `
  - Apply the `☘️ Fusion Greenkeep` label; ask before creating it when missing
  - Standalone APM sync template `1.1.0` titles its PR `☘️ chore(apm): sync dependencies`,
    creates the label when missing and adds it to an already-open sync PR

- [#327](https://github.com/equinor/fusion-skills/pull/327) [`8274bb1`](https://github.com/equinor/fusion-skills/commit/8274bb10c7e4e40fa65d99bcd2e952cac8db69bb) - Add a read-only Greenkeeper enrolment readiness report.


  - Check default-branch CI build and tests (`.yml` and `.yaml` workflows), agent instructions,
    Fusion APM packages, known migrations and ownership; each check is ready, not ready or
    unverified, with evidence
  - Reuse the Copilot readiness instruction checks; unverified never counts as passing
  - Fill one issue-shaped report template with enrolment steps when ready
  - Publish only after the maintainer confirms the shown report; never retry a refused publish

  refs equinor/fusion-core-tasks#2538

- [#325](https://github.com/equinor/fusion-skills/pull/325) [`231032f`](https://github.com/equinor/fusion-skills/commit/231032f25de3a8a2ea00c61d7fecae28c2194094) - Close runs with fusion-skills warden feedback (toolchain self-evaluation).

## 0.1.0 - 2026-10-22

### minor

- [#310](https://github.com/equinor/fusion-skills/pull/310) [`cdb11c9`](https://github.com/equinor/fusion-skills/commit/cdb11c93bf583d66003f56fb9be753ae7b43be70) - Introduce experimental repository greenkeeping as standalone owner of common

  workflow catalogue, agent fill rules, provenance and reviewed
  customization-preserving upgrades. Document source-verified app deployment/OIDC.
  Keep workflow assets separate from skill lifecycle management.

  resolves equinor/fusion-skills#300

  refs equinor/fusion-skills#299

- [#310](https://github.com/equinor/fusion-skills/pull/310) [`cdb11c9`](https://github.com/equinor/fusion-skills/commit/cdb11c93bf583d66003f56fb9be753ae7b43be70) - Ship one canonical agent-filled APM Sync Handlebars template with explicit

  auth choices, provenance and reviewed-update guidance. Reuse update
  branches/PRs and skip lockfile-only changes. Add an agent-filled reusable caller
  template for internal `equinor` repositories, passing the `apm-token` secret. Detect
  consumer and dependency visibility to choose caller or standalone template and token.

  resolves equinor/fusion-skills#301

  refs equinor/fusion-skills#299
  refs equinor/fusion-skills#296

- [#310](https://github.com/equinor/fusion-skills/pull/310) [`cdb11c9`](https://github.com/equinor/fusion-skills/commit/cdb11c93bf583d66003f56fb9be753ae7b43be70) - Add two Fusion app deployment workflow templates, both reusing the maintained

  Fusion publish action for OIDC and publication:

  - `app-deploy` 1.0.0: manual default-branch dispatch for one app, choosing one
    environment or all; frozen npm/pnpm/Bun install, packed app-key check, build once.
  - `app-monorepo-deploy` 1.0.0: Changesets version PRs/releases, then build once
    and deploy the allowlisted released app (scoped packages included), following
    Fusion Core apps. Requires event-capable release credential.

  Both deploy an ordered environment list (`ci`, `fqa`, `fprd`, `tr`, `next`) one at a
  time through protected GitHub environments, generate opt-in config inside each
  environment job, let newer runs supersede older ones, and pin actions by commit SHA.

  Action manages its publication CLI (`latest`); config generation precedes action
  login. Both templates pass the action an absolute working directory, because it
  resolves artifact paths against that value from inside it. No token export or duplicate-version recovery.

  resolves equinor/fusion-skills#302

  refs equinor/fusion-skills#299

- [#310](https://github.com/equinor/fusion-skills/pull/310) [`cdb11c9`](https://github.com/equinor/fusion-skills/commit/cdb11c93bf583d66003f56fb9be753ae7b43be70) - Add agent-filled `copilot-setup-steps` template so Copilot cloud agent and code

  review start with dependencies installed for Node, .NET or both: frozen Node
  installs, SDK pinned by `global.json` or exact version and enforced repository-wide
  by a pin above the checkout (verified before restore, so newer preinstalled SDKs
  or nested pins cannot change selection), explicit solution restore, optional locked
  mode and tool restore. Uses only job keys Copilot honors, read-only
  permissions, and runs itself as a check when changed so failed setup is visible.
  Guide explains when a separate `copilot-code-review.yml` is warranted.

  resolves equinor/fusion-skills#312

  refs equinor/fusion-skills#311

- [#310](https://github.com/equinor/fusion-skills/pull/310) [`cdb11c9`](https://github.com/equinor/fusion-skills/commit/cdb11c93bf583d66003f56fb9be753ae7b43be70) - Add an agent-run Copilot readiness check. It inventories setup and instruction

  files and reports objective findings with proposed fixes: missing, failing or
  non-default-branch setup; ignored job keys; `applyTo` patterns matching nothing;
  invalid `excludeAgent`; broken links, missing scripts and conflicting rules.
  Unreadable run status is reported as unverified. Nothing changes without approval.

  resolves equinor/fusion-skills#313

  refs equinor/fusion-skills#311
