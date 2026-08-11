# Changelog

## 0.1.1 - 2026-05-07

### patch

- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md.


  - Drop articles, filler, hedging from SKILL.md activation body

## 0.1.0 - 2026-03-21

### minor

- [#116](https://github.com/equinor/fusion-skills/pull/116) [`2037597`](https://github.com/equinor/fusion-skills/commit/20375978cba700b828b5c912e7159ef117ee2422) - Add fusion-rules gateway skill for AI coding assistant rule authoring


  Gateway entrypoint that detects the target editor (GitHub Copilot, Cursor, Claude Code) and routes to the matching agent for guided rule scaffolding.

  - `agents/copilot.agent.md` — GitHub Copilot instructions workflow
  - `agents/cursor.agent.md` — Cursor project rules workflow
  - `agents/claude-code.agent.md` — Claude Code rules workflow
