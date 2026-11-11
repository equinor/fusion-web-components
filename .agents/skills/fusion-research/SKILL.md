---
name: fusion-research
description: 'Routes Fusion research and returns only source-backed evidence. USE FOR: Framework APIs and hooks, EDS components and props, skill catalog scope and relationships, Fusion platform docs, backend service implementation. DO NOT USE FOR: implementing code, installing or editing skills (use fusion-skills), MCP setup or troubleshooting (use fusion-mcp), or inventing behavior.'
license: MIT
compatibility: Works best with Fusion MCP. Dispatches to `agents/framework.agent.md` for `mcp_fusion_search_framework`, `agents/eds.agent.md` for `mcp_fusion_search_eds`, `agents/skills.agent.md` for `mcp_fusion_search_skills`, `agents/docs.agent.md` for `mcp_fusion_search_docs`, and `agents/backend-code.agent.md` for `mcp_fusion_search_backend_code`. If MCP is unavailable, state that clearly rather than guessing.
metadata:
  version: "0.4.4"
  status: experimental
  owner: "@equinor/fusion-core"
  tags:
    - fusion
    - research
    - mcp
    - evidence
    - framework
    - eds
    - skills
    - docs
    - backend
    - csharp
    - services
    - platform-guidance
  mcp:
    suggested:
      - mcp_fusion_search_framework
      - mcp_fusion_search_eds
      - mcp_fusion_search_docs
      - mcp_fusion_search_skills
      - mcp_fusion_search_backend_code
      - mcp_fusion_skills
---

# Fusion Research

## When to use

Source-backed answers about Fusion Framework hooks/packages, EDS props/tokens,
skill scope/relationships, platform guidance or backend implementation.
Examples: research a hook with supporting source, compare skill boundaries,
find onboarding guidance, or verify a service implementation.

## When not to use

Do not use this skill for:
- implementing code changes — use `fusion-developer-app` or the relevant dev skill; if the research is for a specific app you are actively building, use `fusion-developer-app` first — it will call this skill when needed
- finding, installing, updating, or removing skills — use `fusion-skills`; use this skill only to understand a skill's scope, relationships, or catalog fit — not to discover what to install
- creating or editing skill files — use `fusion-skill-authoring` for authoring-time research
- Fusion MCP installation or troubleshooting — use `fusion-mcp`; once MCP is running, return here for research
- pure conceptual Fusion questions with no specific artifact name (hook, component, package, token, or platform topic) — ask the user for a concrete artifact reference or platform topic first

## Required inputs

Research question with concrete artifact (hook, component, package, token or
skill) or platform topic. Ask for that reference when absent; infer domain
from question before selecting instructions.

## Safety & constraints

- Never invent hooks, EDS props, skill entries, platform guidance or service behavior.
- Never claim evidence exists when MCP is unavailable or results are weak.
  State unavailable MCP clearly; use only fallback sources allowed by selected
  agent. Skills catalog fallback preserves search, reasoning tool, then local
  `SKILL.md` or GitHub-backed evidence order.
- No code changes or repository/MCP mutations during research.
- Capture source path and supporting excerpt before each claim; distinguish
  confirmed facts from inference. State agent and source for every answer part.
- Start with `top: 3` to `top: 5`; allow one refinement pass per agent,
  then state uncertainty rather than refining indefinitely.
- Keep domain evidence separate: platform docs do not prove Framework/EDS/backend
  implementation; extracted docs may need local verification. Selected agents
  define lane-specific evidence and fallback limits.

## Instructions

### Step 0 — Sharpen scope (optional)

When question lacks a specific artifact or needs clarification, read only
selected domain's follow-up file; ask relevant unanswered questions:
- Framework: [assets/framework.follow-up.md](assets/framework.follow-up.md)
- EDS: [assets/eds.follow-up.md](assets/eds.follow-up.md)
- Skills catalog: [assets/skills.follow-up.md](assets/skills.follow-up.md)
- Docs: [assets/docs.follow-up.md](assets/docs.follow-up.md)

Skip when question already names a specific artifact. Attribution, uncertainty
and fallback limits are mandatory, not user-toggleable follow-up choices.

### Step 1 — Classify the research question

| Domain | Indicators | Agent |
| --- | --- | --- |
| **Framework** | Fusion Framework hooks, packages, modules, TypeScript APIs, cookbook examples | [`agents/framework.agent.md`](agents/framework.agent.md) |
| **EDS** | EDS component props, usage examples, accessibility, design tokens | [`agents/eds.agent.md`](agents/eds.agent.md) |
| **Skills** | Skill catalog lookup, scope boundaries, companion/orchestrator relationships | [`agents/skills.agent.md`](agents/skills.agent.md) |
| **Docs** | Fusion platform concepts, onboarding, platform operations, governance, non-implementation guidance | [`agents/docs.agent.md`](agents/docs.agent.md) |
| **Backend Code** | C# service implementations, interfaces, CQRS patterns, authorization, validation, cross-service APIs | [`agents/backend-code.agent.md`](agents/backend-code.agent.md) |

For multi-domain questions, answer each domain separately with its agent in sequence.

### Step 2 — Dispatch to the correct agent

Read and apply only selected `agents/*.agent.md` from table as Markdown
instructions. Invoke through a supported skill-local agent adapter when
available; otherwise apply inline. Do not preload other domains.

When constructing queries for selected domain, read its guide for lanes,
examples and evidence fields, following agent's fallback order:
- Framework: [references/framework.query.md](references/framework.query.md)
- EDS: [references/eds.query.md](references/eds.query.md)
- Skills: [references/skills.query.md](references/skills.query.md)
- Docs: [references/docs.query.md](references/docs.query.md)
- Backend Code: [references/backend-code.query.md](references/backend-code.query.md)

### Step 3 — Return the source-backed answer

For every completed answer, read slot header in
[assets/source-backed-answer-template.md.hbs](assets/source-backed-answer-template.md.hbs).
Fill named slots with Markdown, repeat `#each` items, drop template comments.

## Expected output

Template-filled answer naming domain and agent, one to three source-backed
evidence bullets, confirmed facts versus inference, remaining assumptions or
uncertainty, and next verification step.
