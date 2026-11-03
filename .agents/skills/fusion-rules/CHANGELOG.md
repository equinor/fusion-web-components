# Changelog

## 0.2.1 - 2026-11-01

### patch

- [#394](https://github.com/equinor/fusion-skills/pull/394) [`6269c56`](https://github.com/equinor/fusion-skills/commit/6269c56b7fd11d504467a9fd13a92d7bb5c4b317) - Point the Copilot, Cursor and Claude Code agents to the section names that `assets/frontmatter-scenarios.md` actually uses, instead of scenario labels it no longer has.


  resolves equinor/fusion-core-tasks#2679

- [#395](https://github.com/equinor/fusion-skills/pull/395) [`41ebc0f`](https://github.com/equinor/fusion-skills/commit/41ebc0fcdd462e138d299bd9a784e65f900b40bb) - Clarify read-and-apply agent routing and direct conditional resources after the workflow restructuring. Keep editor scenarios, equivalent outputs and draft/approval gates intact.


  resolves equinor/fusion-core-tasks#2686

## 0.2.0 - 2026-11-01

### minor

- [#375](https://github.com/equinor/fusion-skills/pull/375) [`b193b19`](https://github.com/equinor/fusion-skills/commit/b193b193ede77b10df765f9a95c21db782880129) - Fold the rule-authoring workflow, templates and references into `fusion-rules`


  - Move Steps 1–7 to `references/workflow.md`, and the editor templates, checklists and examples to `assets/` and `references/`
  - Point the Copilot, Cursor and Claude Code agents at paths inside the skill, so installed copies no longer need `.system/fusion-rule-author/`
  - Keep `SKILL.md` a short router that names when to read `references/workflow.md`; drop `metadata.orchestrator`

  resolves equinor/fusion-core-tasks#2674
  fixes equinor/fusion-skills#360
  resolves equinor/fusion-core-tasks#2670

## 0.1.3 - 2026-11-01

### patch

- [#363](https://github.com/equinor/fusion-skills/pull/363) [`f34c0d9`](https://github.com/equinor/fusion-skills/commit/f34c0d9dc7de15e59ec643407914e98ad8288245) - Shorten editor-rule discovery wording and strengthen user-facing setup, review, mixed-editor and format-selection triggers. Keep skill, agent-definition and CI exclusions.


  refs equinor/fusion-core-tasks#2670

## 0.1.2 - 2026-10-18

### patch

- [#291](https://github.com/equinor/fusion-skills/pull/291) [`31a05b2`](https://github.com/equinor/fusion-skills/commit/31a05b2a8705e40801dc8373dc3d072991cb5aad) - Point editor agents at the renamed `.md.hbs` rule starters.


  resolves equinor/fusion-core-tasks#2445

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
