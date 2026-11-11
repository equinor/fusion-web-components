# Changelog

## 0.0.4 - 2026-11-01

### patch

- [#388](https://github.com/equinor/fusion-skills/pull/388) [`28d6873`](https://github.com/equinor/fusion-skills/commit/28d6873433fdda973ef1680adb5fa1777b4b79dc) - Load selected documentation standards and defer writer examples; tighten mandatory package roles without changing council, retry or mutation gates.


  resolves equinor/fusion-core-tasks#2685

## 0.0.3 - 2026-11-01

### patch

- [#363](https://github.com/equinor/fusion-skills/pull/363) [`f34c0d9`](https://github.com/equinor/fusion-skills/commit/f34c0d9dc7de15e59ec643407914e98ad8288245) - Shorten the package documentation description while keeping TypeScript public-export TSDoc, retrieval-friendly READMEs, single-package and monorepo passes, review and independent commits, and documentation-only boundaries.


  resolves equinor/fusion-core-tasks#2669

## 0.0.2 - 2026-05-07

### patch

- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md and references.


  - Drop articles, filler, hedging from SKILL.md activation body
  - Compress batch-strategy, readme-template, tsdoc-checklist references

## 0.0.1 - 2026-04-22

### patch

- [#141](https://github.com/equinor/fusion-skills/pull/141) [`e84644f`](https://github.com/equinor/fusion-skills/commit/e84644f868bc8f879823d71b1121e2c5d9844438) - Add new experimental skill for systematic TSDoc and README documentation across TypeScript monorepo packages


  - Orchestrator-based workflow: discover packages, generate TSDoc, rewrite READMEs, review, commit
  - Three agent modes: orchestrator (batch planning), documenter (per-package writing), reviewer (review council)
  - Repo-aware standards discovery with built-in defaults fallback
  - Review council validates intent extraction, code comprehension, user-facing quality, and retrieval fitness
  - Token budget guidance and batch strategy for large monorepo sweeps

  resolves equinor/fusion-core-tasks#702
