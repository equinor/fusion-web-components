# Changelog

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
