# Changelog

## 0.1.3 - 2026-03-18

### patch

- [#98](https://github.com/equinor/fusion-skills/pull/98) [`6bb9cdc`](https://github.com/equinor/fusion-skills/commit/6bb9cdcc1e2e0ed25d562bfd5db4dfab52559c0f) - Deprecate in favor of consolidated `fusion-issue-authoring` skill


  - Set `metadata.status: deprecated` and `metadata.successor: fusion-issue-authoring`
  - Move to `skills/.deprecated/` placement lane
  - Add deprecation notice pointing to the consolidated skill

  Resolves equinor/fusion-core-tasks#802

## 0.1.2 - 2026-03-05

### patch

- [#55](https://github.com/equinor/fusion-skills/pull/55) [`2d346c8`](https://github.com/equinor/fusion-skills/commit/2d346c812b4927ed1fdf17c92d51856d1fdc09c3) - Add required ownership metadata (`metadata.owner`, `metadata.status`) to all skills. Owner is set to `@equinor/fusion-core` (repository default) and status is set according to skill lifecycle (`active` for production skills, `experimental` for early-stage skills). Sponsor metadata was considered but is not required for MVP.


  resolves equinor/fusion-core-tasks#474

## 0.1.1 - 2026-02-20

### patch

- [#23](https://github.com/equinor/fusion-skills/pull/23) [`14b9c99`](https://github.com/equinor/fusion-skills/commit/14b9c9902dbf8bafdae9fe0fc6c08c81dec004b1) - Migrate issue authoring guidance from helper scripts to GitHub MCP-first workflows, including MCP metadata declarations and updated orchestration/ref docs.


  resolves equinor/fusion-skills#21

## 0.1.0 - 2026-02-20

### minor

- [#10](https://github.com/equinor/fusion-skills/pull/10) [`d473723`](https://github.com/equinor/fusion-skills/commit/d4737239be54736e344d74be4ce8271b9be84313) - Adds structured frontmatter metadata for discoverability and clarifies skill relationship semantics.


  Scope delivered:
  - Added `metadata.tags` to affected skills for discoverability.
  - Renamed relationship keys to a clearer schema: `skill_role` → `role`, `required_skill` → `orchestrator`, `sub_skills` → `skills`.
  - Updated dependent role value from `subskill` to `subordinate` to explicitly indicate orchestrator dependency.
  - Updated skill authoring guidance to document `metadata.role`, `metadata.orchestrator`, `metadata.skills`, and `metadata.tags`.

- [#7](https://github.com/equinor/fusion-skills/pull/7) [`2194e7a`](https://github.com/equinor/fusion-skills/commit/2194e7a99f6055dd394dffca6e0e6286d3bb2d41) - Implements `equinor/fusion-core-tasks#395` (sub-task of `#391`) by restructuring issue authoring skills into a top-level orchestrator plus type-specific specialists.


  Refs: `equinor/fusion-core-tasks#391`

  closes equinor/fusion-core-tasks#395

  Scope delivered:
  - `fusion-issue-authoring` is now the orchestration layer for shared gates (classification, labels, assignee, confirmation, publish flow).
  - Added specialist skills: `fusion-issue-author-bug`, `fusion-issue-author-feature`, `fusion-issue-author-user-story`, and `fusion-issue-author-task`.
  - Specialist skills now explicitly depend on `fusion-issue-authoring` and keep only type-specific guidance.
  - Moved fallback templates from shared assets to each specialist skill’s own `assets/issue-templates/`.
  - Added label listing helpers: `list-labels.sh` and `list-labels.ps1`.
  - Hardened relationship scripts for reliable GraphQL calls and idempotent "already linked" handling.
