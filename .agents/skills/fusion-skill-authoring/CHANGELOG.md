# Changelog

## 0.3.3 - 2026-03-23

### patch

- [#121](https://github.com/equinor/fusion-skills/pull/121) [`831f8ee`](https://github.com/equinor/fusion-skills/commit/831f8eed3054ee747d3300c9144312ef3b5c02e0) - Add devil's advocate agent for skill authoring


  - Always-on moderate mode raises 2-3 key concerns during scoping/drafting
  - Interrogator mode runs full structured interview on explicit user request or when the orchestrator detects significant ambiguity
  - Wired into SKILL.md helper agents and Step 6 validation sections

  Refs: equinor/fusion-core-tasks#847

## 0.3.2 - 2026-03-18

### patch

- [#98](https://github.com/equinor/fusion-skills/pull/98) [`6bb9cdc`](https://github.com/equinor/fusion-skills/commit/6bb9cdcc1e2e0ed25d562bfd5db4dfab52559c0f) - Extract template baseline and validation signals to references/


  - Move folder structure and SKILL.md baseline template to `references/skill-template-baseline.md`
  - Move success/failure signals and recovery steps to `references/validation-signals.md`
  - Reduce SKILL.md from 356 to 286 lines (below 300-line CI warning threshold)

## 0.3.1 - 2026-03-18

### patch

- [#88](https://github.com/equinor/fusion-skills/pull/88) [`8cd7d9d`](https://github.com/equinor/fusion-skills/commit/8cd7d9d3a878b27425eb8a3e7be8398278e337e3) - Document SKILL.md size limits and CI guardrails


  - Document 300-line recommended limit (triggers CI warning)
  - Document 500-line hard limit (fails CI)
  - Clarify expectation to move overflow to references/ early
  - Add failure signal for exceeding size thresholds

  Relates to: equinor/fusion-core-tasks#84

## 0.3.0 - 2026-03-09

### minor

- [#60](https://github.com/equinor/fusion-skills/pull/60) [`0e7d702`](https://github.com/equinor/fusion-skills/commit/0e7d702f01d8a768f6295fc6d08d8732768edbf4) - Refresh `fusion-skill-authoring` with clearer discovery cues, decision-gated authoring guidance, and a Fusion-flavored helper-agent layer inspired by Anthropic's `skill-creator`.


  - modernize the main skill around reuse-first, evaluation-first, and progressive-disclosure patterns
  - default portable scaffold naming to `custom-<name>` unless the target repository defines a stronger convention
  - strengthen the follow-up questions and skill-readiness checklist for real skill authoring work
  - keep the shipped package portable while restoring Fusion-specific overlays for `fusion-`, reserved skill lanes, and local validation in repo-local instructions
  - bundle installable helper agents for scoping, review, and trigger tuning inside the skill package

  resolves equinor/fusion-core-tasks#499

## 0.2.2 - 2026-03-05

### patch

- [#55](https://github.com/equinor/fusion-skills/pull/55) [`2d346c8`](https://github.com/equinor/fusion-skills/commit/2d346c812b4927ed1fdf17c92d51856d1fdc09c3) - Add required ownership metadata (`metadata.owner`, `metadata.status`) to all skills. Owner is set to `@equinor/fusion-core` (repository default) and status is set according to skill lifecycle (`active` for production skills, `experimental` for early-stage skills). Sponsor metadata was considered but is not required for MVP.


  resolves equinor/fusion-core-tasks#474

## 0.2.1 - 2026-02-20

### patch

- [#23](https://github.com/equinor/fusion-skills/pull/23) [`14b9c99`](https://github.com/equinor/fusion-skills/commit/14b9c9902dbf8bafdae9fe0fc6c08c81dec004b1) - Migrate issue authoring guidance from helper scripts to GitHub MCP-first workflows, including MCP metadata declarations and updated orchestration/ref docs.


  resolves equinor/fusion-skills#21

## 0.2.0 - 2026-02-20

### minor

- [#10](https://github.com/equinor/fusion-skills/pull/10) [`d473723`](https://github.com/equinor/fusion-skills/commit/d4737239be54736e344d74be4ce8271b9be84313) - Adds structured frontmatter metadata for discoverability and clarifies skill relationship semantics.


  Scope delivered:
  - Added `metadata.tags` to affected skills for discoverability.
  - Renamed relationship keys to a clearer schema: `skill_role` → `role`, `required_skill` → `orchestrator`, `sub_skills` → `skills`.
  - Updated dependent role value from `subskill` to `subordinate` to explicitly indicate orchestrator dependency.
  - Updated skill authoring guidance to document `metadata.role`, `metadata.orchestrator`, `metadata.skills`, and `metadata.tags`.

- [#7](https://github.com/equinor/fusion-skills/pull/7) [`2194e7a`](https://github.com/equinor/fusion-skills/commit/2194e7a99f6055dd394dffca6e0e6286d3bb2d41) - Updates skill authoring defaults and metadata constraints to support complex repository-internal skill relationships.


  Scope delivered:
  - Permitted YAML arrays in frontmatter `metadata` specifically for modeling skill relationships (e.g., `metadata.sub_skills` or `metadata.required_skill`).
  - Updated documentation and checklists to reflect the new versioning and metadata standards.

## 0.1.1 - 2026-02-20

### patch

- [#4](https://github.com/equinor/fusion-skills/pull/4) [`7dad576`](https://github.com/equinor/fusion-skills/commit/7dad5761f18701c15048130951d150e477c95189) - Fix wording in the skill changelog and align metadata/versioning consistency for the updated skill package.

## 0.1.0 - 2026-02-19

### minor

- [#2](https://github.com/equinor/fusion-skills/pull/2) [`57d6f8b`](https://github.com/equinor/fusion-skills/commit/57d6f8b744fe5e3e4b0e4e61a229d009d4bbb32f) - New authoring skill to standardize how skills are created and reduce inconsistency. 

  The skill guides contributors to reuse existing skills when possible, collect required inputs, scaffold the skill structure, and run validation/checklist steps.
