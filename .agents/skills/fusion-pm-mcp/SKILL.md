---
name: fusion-pm-mcp
description: 'Explains and configures hosted HTTP+OAuth Fusion PM MCP for GitHub project management. USE FOR: setup, verification, troubleshooting stale/rate-limited tools and setup bug drafts. DO NOT USE FOR: service development, issue authoring/triage (use fusion-issue-authoring), Framework/docs/EDS retrieval (use `fusion-mcp`) or exposing secrets.'
license: MIT
metadata:
  version: "0.1.5"
  status: experimental
  owner: "@equinor/fusion-core"
  tags:
    - fusion
    - mcp
    - github
    - project-management
    - setup
  mcp:
    suggested:
      - github
---

# Fusion PM MCP Setup Guide

## When to use

Explain, configure, verify or troubleshoot hosted project-management MCP, including stale/rate-limited GitHub issue/PR results.

## When not to use

- `fusion-pm-mcp` service development: use its repository guidance.
- Framework/docs/EDS/backend-code retrieval: use `fusion-mcp`.
- Issue authoring/triage or PR reviews: use `fusion-issue-authoring` or repo-specific review skills after tools work.
- Destructive environment changes without confirmation.

## Required inputs

Collect target client (VS Code primary) and whether caller has GitHub token available (`gh auth token` or PAT with `repo` scope). Ask availability only, never value; token is supplied per request, not stored in config. Clarify missing inputs before setup.

## Safety & constraints

This skill is mutation-capable. Repository-local workflow instructions take precedence over inline guidance when they conflict.

- Never request or expose secrets, GitHub tokens, PATs or Entra credentials.
- Never invent undocumented commands or claim setup succeeded without validation output.
- Tools that create, update, close, resolve, set, add, remove or upsert mutate GitHub or server index: explicit user confirmation required before use. Destructive environment changes also require confirmation.
- Prefer least-privilege, minimal-change hosted production setup: no Docker, local clone or env vars. No shared/service token; use caller's own per-request `X-GitHub-Token` identity/rate limit.
- Do not suggest local stdio/full Docker stack except for service contributors; link that repo's `CONTRIBUTING.md`, do not embed contributor setup.
- Prefer official docs and live `tools/list`; separate facts from assumptions. Bug flow produces draft, not publication authority.

## Instructions

1. Explain managed caching proxy over GitHub REST API: reads avoid repeated GitHub calls. Default cache TTL 300s; no cache-invalidation tool. When explaining tool areas, read `references/tool-inventory.md` for catalog; actual `tools/list` always wins over docs.
2. When configuring hosted HTTP+OAuth or explaining authentication, read `references/vscode-mcp-config.md` for exact manual config (no one-click install), server URL and two auth layers: Equinor Entra authenticates MCP connection; per-request `X-GitHub-Token` carries caller's GitHub PAT. Both must be valid; `401` may come from either layer.
3. Validate with observed output: `initialize` success, `tools/list` compared to actual returned names, then one non-destructive `tools/call` (e.g. `milestones` or `issue_get`) with non-empty result. Never assume fixed inventory or equate empty/failed response with success.
4. On unauthenticated/rate-limited calls, `401`, repeated sign-in or stale results, read `references/vscode-mcp-config.md` troubleshooting map and apply in order. Persistent `401`/sign-in after re-authentication is setup bug, not known transient issue. Stale results self-clear after TTL; do not invent invalidate-cache tool.
5. On setup failure or bug request, read `assets/bug-report-template.md.hbs` header, `assets/partials/agent-content/README.md` fill rules and named partials `assets/partials/agent-content/banner.hbs`, `assets/partials/agent-content/details.hbs`, `assets/partials/agent-content/references.hbs`. Fill by hand; no renderer ships. Default target `equinor/fusion-pm-mcp`; include repro, expected/actual, attempted troubleshooting, non-sensitive OS/VS Code details only. Never include GitHub/PAT/Entra values.
6. State uncertainty/private-repo assumptions explicitly; cite authoritative docs instead of guessing.

## Expected output

Short explanation, tailored hosted setup, observed validation checklist, symptom-mapped troubleshooting, conditional bug draft, and explicit assumptions/missing information.
