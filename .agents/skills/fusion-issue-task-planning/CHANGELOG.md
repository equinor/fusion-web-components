# Changelog

## 0.1.5 - 2026-03-24

### patch

- [#126](https://github.com/equinor/fusion-skills/pull/126) [`1470bc8`](https://github.com/equinor/fusion-skills/commit/1470bc81e1b04e9727049f01742ea881579ad57b) - Add repository-policy handoff section for governance alignment


  - Add explicit "Repository-policy handoff" section that defers issue type, changeset, and PR rules to repo-local instructions

  Resolves equinor/fusion-core-tasks#581

## 0.1.4 - 2026-03-17

### patch

- [#85](https://github.com/equinor/fusion-skills/pull/85) [`c8ba3df`](https://github.com/equinor/fusion-skills/commit/c8ba3df924c5a712c835cdb9f4de44bac03b7ad4) - Make all GitHub-API-consuming skills more conservative with token usage.


  - `fusion-issue-authoring`: concrete session-cache flow for labels and assignee candidates; per-session budget table
  - `fusion-issue-solving`: expanded low-token strategy with session-cache references and budget awareness
  - `fusion-github-review-resolution`: token budget guidance for thread-heavy reviews; cache PR metadata once
  - `fusion-issue-task-planning`: session-cache delegation rules and batch-size warning for large task plans
  - `fusion-dependency-review`: explicit data-reuse rules across parallel advisor fan-out
  - `fusion-discover-skills`: tighter GraphQL budget and call-count cap for discovery sessions

  resolves equinor/fusion-core-tasks#797

## 0.1.3 - 2026-03-05

### patch

- [#55](https://github.com/equinor/fusion-skills/pull/55) [`2d346c8`](https://github.com/equinor/fusion-skills/commit/2d346c812b4927ed1fdf17c92d51856d1fdc09c3) - Add required ownership metadata (`metadata.owner`, `metadata.status`) to all skills. Owner is set to `@equinor/fusion-core` (repository default) and status is set according to skill lifecycle (`active` for production skills, `experimental` for early-stage skills). Sponsor metadata was considered but is not required for MVP.


  resolves equinor/fusion-core-tasks#474

## 0.1.2 - 2026-03-03

### patch

- [#42](https://github.com/equinor/fusion-skills/pull/42) [`947c0ab`](https://github.com/equinor/fusion-skills/commit/947c0ab73844f5eb13b80e7cb2f3e5ea8146ea59) - Shift publish/repair execution in `fusion-issue-task-planning` to delegated handling through `fusion-issue-authoring` (prefer sub-agent invocation), while keeping this skill focused on planning and draft generation.


  Clarifies that MCP-first mutation and GraphQL fallback behavior are enforced by the delegated authoring workflow.

  Removes local `fusion-issue-task-planning/assets/graphql/` fallback files and points fallback usage to `fusion-issue-authoring/assets/graphql/`.

  refs equinor/fusion-skills#40
  resolves equinor/fusion-core-tasks#446

## 0.1.1 - 2026-03-03

### patch

- [#40](https://github.com/equinor/fusion-skills/pull/40) [`cd68535`](https://github.com/equinor/fusion-skills/commit/cd685353575cca870a01e255cf1c13ccf6e55290) - Refine the experimental `fusion-issue-task-planning` workflow to be MCP-first for issue publishing and repair, clarify parent-linking as a separate sub-issue operation, and add reusable GraphQL fallback query/mutation files under `skills/.experimental/fusion-issue-task-planning/assets/graphql/`.


  resolves equinor/fusion-skills#39

## 0.1.0 - 2026-03-02

### minor

- [#37](https://github.com/equinor/fusion-skills/pull/37) [`54d03bc`](https://github.com/equinor/fusion-skills/commit/54d03bcc21bdf71c0f8aefa5f00c3ded7f22b3b9) - Add experimental `fusion-issue-task-planning` skill with user-story task planning workflow, explicit publish gates, provenance metadata, and reusable planning assets.


  References equinor/fusion-core-tasks#430.
