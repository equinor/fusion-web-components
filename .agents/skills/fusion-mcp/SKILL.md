---
name: fusion-mcp
description: Explain what Fusion MCP is and guide users through setting it up when they need Fusion-aware MCP capabilities in Copilot workflows.
license: MIT
metadata:
  version: "1.0.5"
  status: experimental
  owner: "@equinor/fusion-core"
  tags:
    - fusion
    - mcp
    - setup
  mcp:
    suggested:
      - github
---

# Fusion MCP Setup Guide

## When to use

Explain, configure, verify or troubleshoot Fusion retrieval MCP in Copilot/VS Code.

## When not to use

- Product features, unconfirmed destructive changes or assumptions about private repos.
- Fusion Framework/EDS/catalog domain research after setup: use `fusion-research`.
- GitHub project-management MCP setup: use `fusion-pm-mcp`; this server provides retrieval.

## Required inputs

Collect OS/editor/runtime, target client (VS Code primary), and Equinor Entra account availability. Ask concise questions if missing.

## Safety & constraints

- Never request or expose secrets, tokens or credentials.
- Never invent undocumented setup commands or claim success without validation output.
- Destructive changes require explicit user confirmation. Give least-privilege, minimal-change guidance first.
- Hosted production server is recommended path: no Docker, API keys or local clone. Do not suggest Docker/GHCR/self-hosted alternatives without explicit operational need.
- Prefer official repository documentation; separate facts from assumptions, including private-repo constraints.
- Bug flow is draft-first; producing draft does not authorize publication.

## Instructions

1. Explain managed Fusion retrieval/workflow support: `search`, `search_framework`, `search_docs`, `search_eds`, `search_indexes`, `search_backend_code`. Most developers need no local infrastructure; live inventory can evolve.
2. When configuring hosted server or explaining authentication, read `references/vscode-mcp-config.md` for production one-click install, manual `"type": "http"` config, exact URLs/OAuth IDs and Equinor Entra flow. VS Code handles tokens automatically; existing Fusion roles control access.
3. Verify with observed output: `initialize` success, `tools/list` at least one tool, then one non-destructive `tools/call` chosen from live list. Pass only with non-empty `content` or `structuredContent`; do not hard-code fixed inventory. Empty/failed response is setup failure, not success.
4. On missing sign-in, `401 Unauthorized`, empty/failing tools or partial behavior, read `references/vscode-mcp-config.md` troubleshooting map and apply in documented order. Do not hide failed validation.
5. When setup fails or user requests bug draft, read `assets/bug-report-template.md.hbs` slot header, `assets/partials/agent-content/README.md` fill rules, and named partials `assets/partials/agent-content/banner.hbs`, `assets/partials/agent-content/details.hbs`, `assets/partials/agent-content/references.hbs`. Fill by hand; no renderer ships. Target `equinor/fusion-mcp`; include repro, expected/actual, attempted troubleshooting and non-sensitive OS/VS Code/server URL/account type. Never include credential values.
6. When copy/paste JSON-RPC or scripted smoke-test snippets are requested, read `references/mcp-call-snippets.md` for payloads and expected response shapes. When upstream source links are needed, read `references/README.md`; cite exact docs used and state uncertainty rather than guessing.

## Expected output

Short explanation, tailored hosted-prod setup, observed validation checklist, symptom-mapped troubleshooting, conditional bug draft/snippets, explicit assumptions/missing information and exact upstream links.
