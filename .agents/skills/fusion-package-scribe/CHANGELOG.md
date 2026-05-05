# Changelog

## 0.0.1 - 2026-04-22

### patch

- [#141](https://github.com/equinor/fusion-skills/pull/141) [`e84644f`](https://github.com/equinor/fusion-skills/commit/e84644f868bc8f879823d71b1121e2c5d9844438) - Add new experimental skill for systematic TSDoc and README documentation across TypeScript monorepo packages


  - Orchestrator-based workflow: discover packages, generate TSDoc, rewrite READMEs, review, commit
  - Three agent modes: orchestrator (batch planning), documenter (per-package writing), reviewer (review council)
  - Repo-aware standards discovery with built-in defaults fallback
  - Review council validates intent extraction, code comprehension, user-facing quality, and retrieval fitness
  - Token budget guidance and batch strategy for large monorepo sweeps

  resolves equinor/fusion-core-tasks#702

