---
name: fusion-mcp
description: Explain what Fusion MCP is and guide users through setting it up when they need Fusion-aware MCP capabilities in Copilot workflows.
license: MIT
metadata:
  version: "1.0.1"
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

Use when a user asks:
- what Fusion MCP is
- what it can do
- how to install/configure it
- how to verify it is working
- how to troubleshoot a failing Fusion MCP setup

Typical triggers:
- "what is fusion mcp"
- "help me set up fusion mcp"
- "how do I use fusion mcp with copilot"

## When not to use

- Implementing product features unrelated to MCP setup
- Making destructive environment changes without user confirmation
- Assuming private repository details not visible
- Answering source-backed questions about Fusion Framework APIs, EDS components, or the skill catalog — once MCP is running, use `fusion-research` for that

## Required inputs

Collect before proposing setup steps:
- user environment (OS, editor/runtime)
- target client where MCP will run (VS Code is primary target)
- whether user's Equinor Entra account is available

If details are missing, ask concise follow-up questions first.

## Instructions

1. Explain what this MCP server provides:
   - Fusion-oriented MCP capabilities for retrieval and workflow support
   - hosted as a managed service — no local infrastructure required for most developers
   - retrieval tools: `search`, `search_framework`, `search_docs`, `search_eds`, `search_indexes`, `search_backend_code`
   - tool surface may evolve over time
2. Guide user to set up the **hosted production server** — the only recommended path:
   - no Docker, no API keys, no local clone needed
   - VS Code authenticates via Microsoft Entra (Equinor account)
   - use the one-click install link for prod (see `references/vscode-mcp-config.md`)
   - or manual config with `"type": "http"` and server URL (see `references/vscode-mcp-config.md`)
   - don't suggest local Docker, GHCR, or self-hosted alternatives unless user has explicit operational need
3. Describe the authentication flow:
   - on first tool invocation VS Code prompts sign in with Equinor Entra account
   - tokens managed automatically; silent renewal when possible, interactive prompt when needed
   - access controlled by existing Fusion role assignments
4. Provide a lightweight MCP smell test:
   - run `initialize` and confirm successful response
   - run `tools/list` and confirm at least one tool returned
   - run one non-destructive `tools/call` against an available tool
   - pass criteria: call response is non-empty (`content` or `structuredContent` contains data)
   - note: don't hard-code a fixed tool list; tool inventory can change between versions
5. Troubleshoot in documented order:
   - Entra sign-in prompt not appearing → verify `oauth.clientId` in config and that VS Code is signed in with an Equinor account
   - `401 Unauthorized` → re-authenticate via VS Code account settings; ensure Equinor Entra account is active
   - `tools/list` returns empty or tool call fails → verify MCP server entry is selected/enabled in VS Code and retry after reloading
   - partial tool behavior → check VS Code Output > Copilot for error details and restart the MCP server
7. When MCP setup fails or user asks to file a bug, produce a bug report draft from `assets/bug-report-template.md`.
   - default target repository: `equinor/fusion-mcp`
   - include concrete repro steps, expected vs actual behavior, and troubleshooting already attempted
   - include non-sensitive environment details (OS, VS Code version, MCP server URL, Entra account type)
   - never include secrets, tokens, or raw credential values
8. For uncertainty or repo-private constraints, state assumptions explicitly and link to authoritative docs instead of guessing.

## Expected output

Return:
- short explanation of Fusion MCP and when to use it
- hosted prod setup steps tailored to the user environment
- validation checklist: run `initialize` (expect success response), run `tools/list` (expect at least one tool), run one `tools/call` (expect non-empty `content` or `structuredContent`)
- troubleshooting steps mapped to observed error symptoms
- bug report draft (when setup fails/misbehaves or user requests) using `assets/bug-report-template.md` with default target `equinor/fusion-mcp`
- script snippets when user asks for copy/paste automation aids
- assumptions and missing information called out explicitly
- links to the exact upstream docs used

## References

- [references/README.md](references/README.md)
- [assets/bug-report-template.md](assets/bug-report-template.md)

## Safety & constraints

Never:
- request or expose secrets, tokens, or credentials
- invent setup commands that are not supported by project documentation
- claim setup succeeded without validation output
- run destructive commands without explicit user confirmation

Always:
- prefer official repository documentation as source of truth
- guide users to the hosted production server; do not suggest local Docker or self-hosted alternatives
- provide least-privilege, minimal-change setup guidance first
- separate confirmed facts from assumptions
