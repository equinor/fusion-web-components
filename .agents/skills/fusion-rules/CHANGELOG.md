# Changelog

## 0.1.0 - 2026-03-21

### minor

- [#116](https://github.com/equinor/fusion-skills/pull/116) [`2037597`](https://github.com/equinor/fusion-skills/commit/20375978cba700b828b5c912e7159ef117ee2422) - Add fusion-rules gateway skill for AI coding assistant rule authoring


  Gateway entrypoint that detects the target editor (GitHub Copilot, Cursor, Claude Code) and routes to the matching agent for guided rule scaffolding.

  - `agents/copilot.agent.md` — GitHub Copilot instructions workflow
  - `agents/cursor.agent.md` — Cursor project rules workflow
  - `agents/claude-code.agent.md` — Claude Code rules workflow

