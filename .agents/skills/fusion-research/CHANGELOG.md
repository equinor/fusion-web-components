# Changelog

## 0.3.0 - 2026-03-21

### minor

- [#110](https://github.com/equinor/fusion-skills/pull/110) [`859fd0c`](https://github.com/equinor/fusion-skills/commit/859fd0c466884178169e7c14fd29565ad6a0d156) - Add docs domain to fusion-research skill


  - Add `agents/docs.agent.md` routing platform documentation questions to `mcp_fusion_search_docs`
  - Add `assets/docs.follow-up.md` for pre-dispatch scope questions
  - Add `references/docs.query.md` with proven query lanes for docs retrieval
  - Update SKILL.md description, classification table, dispatch table, agents list, and assets list to cover the new Docs domain
  - Docs domain covers: Fusion platform concepts, onboarding, platform operations, and governance

  Resolves equinor/fusion-core-tasks#411

## 0.2.0 - 2026-03-21

### minor

- [#106](https://github.com/equinor/fusion-skills/pull/106) [`1f8a01d`](https://github.com/equinor/fusion-skills/commit/1f8a01ddcb5c9afe9119a1fcf1ded2c6980036d0) - Rename `fusion-research-framework` to `fusion-research` and expand into a multi-domain research orchestrator.


  - rename skill from `fusion-research-framework` to `fusion-research`
  - expand scope from framework-only to three research domains: Framework, EDS, and skill catalog
  - add `agents/framework.agent.md` — source-backed Fusion Framework API and cookbook research via `mcp_fusion_search_framework`
  - add `agents/eds.agent.md` — source-backed EDS component props, usage, accessibility, and design token research via `mcp_fusion_search_eds`
  - add `agents/skills.agent.md` — source-backed skill catalog lookup, scope boundary, and companion relationship research via `mcp_fusion_skills`
  - add `assets/framework.follow-up.md`, `assets/eds.follow-up.md`, `assets/skills.follow-up.md` — pre-dispatch scope-sharpening questions per domain
  - add `references/framework.query.md`, `references/eds.query.md`, `references/skills.query.md` — repeatable query patterns and evidence checklists per domain
  - update `assets/source-backed-answer-template.md` to cover all three domains
  - connect to `fusion-mcp` as next-step redirect when MCP is not yet running
  - tighten discovery contract: description, trigger phrases, and "When not to use" boundaries
  - apply council review fixes: remove erroneous `cookbook` lane reference from EDS agent, orphan follow-up assets linked from SKILL.md, `mcp_fusion_search_docs` added to suggested MCP list

  Resolves equinor/fusion-core-tasks#837
  Resolves equinor/fusion-core-tasks#838

### patch

- [#107](https://github.com/equinor/fusion-skills/pull/107) [`d75d8c6`](https://github.com/equinor/fusion-skills/commit/d75d8c60f15888fbe71340b53b2698f3361ac4c8) - Switch skills catalog agent to `mcp_fusion_search_skills` for source-backed retrieval.


  - update `agents/skills.agent.md` to use `mcp_fusion_search_skills` (semantic search over local skills index) instead of the advisory `mcp_fusion_skills`
  - update `mcp.suggested` list in metadata: replace `mcp_fusion_skills` with `mcp_fusion_search_skills`
  - update compatibility line and agent description to reflect the correct tool
  - update source labels in `references/skills.query.md` evidence checklist

  Resolves equinor/fusion-core-tasks#834

## 0.1.0 - 2026-03-20

### minor

- [#103](https://github.com/equinor/fusion-skills/pull/103) [`06b664d`](https://github.com/equinor/fusion-skills/commit/06b664d177a01a760738ae3d43f1670e665f81fe) - Add the `fusion-research-framework` skill under `skills/.system/` for source-backed Fusion Framework implementation lookup through MCP.


  - route framework research to the framework-focused MCP index
  - define repeatable search lanes for APIs, package docs, and cookbook examples
  - require source-path and excerpt evidence before finalizing answers
  - limit refinement to one pass and redirect out-of-scope requests cleanly

  resolves equinor/fusion-core-tasks#410
