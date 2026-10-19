# Changelog

## 0.1.1 - 2026-10-18

### patch

- [#291](https://github.com/equinor/fusion-skills/pull/291) [`31a05b2`](https://github.com/equinor/fusion-skills/commit/31a05b2a8705e40801dc8373dc3d072991cb5aad) - Convert reader cards and review prompts to `.md.hbs` with declared slots while preserving source-blind review boundaries.


  refs equinor/fusion-core-tasks#2450

## 0.1.0 - 2026-10-18

### minor

- [#267](https://github.com/equinor/fusion-skills/pull/267) [`61368e8`](https://github.com/equinor/fusion-skills/commit/61368e87f0c882c267c365278f124a9b0a8a63fd) - Add an experimental skill that aligns agent-written content with its readers


  - Finds who will read an issue, story, PR description, release note, ADR, or report from the repository's templates, labels, owners, and links, and picks an appropriate number of representative readers by role: as few as cover everyone who must understand or act.
  - Reviews the draft as each reader, inline or with one isolated subagent per reader, and aligns it: the TL;DR serves whoever must act, gaps become open questions instead of invented facts, and material for secondary readers is folded.
  - Records the readers considered in the draft's folded references, and hands over to `fusion-agent-content` for final shaping.
