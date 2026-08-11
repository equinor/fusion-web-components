---
name: fusion-pm-mcp
description: 'Explain what Fusion PM MCP is and guide setup of the hosted HTTP+OAuth server for its GitHub project-management retrieval tools. USE FOR: setting up or troubleshooting Fusion PM MCP, understanding its issue/PR/milestone tools, filing a setup bug. DO NOT USE FOR: implementing changes to the fusion-pm-mcp service itself, GitHub issue authoring/triage workflows, or general Fusion Framework/docs/EDS retrieval — use `fusion-mcp` for that.'
license: MIT
metadata:
  version: "0.1.0"
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

Use when a user asks:
- what Fusion PM MCP is
- how to install/configure it
- how to verify it is working
- how to troubleshoot a failing setup or stale/rate-limited results

Typical triggers:
- "what is fusion pm mcp"
- "help me set up fusion pm mcp"
- "how do I get GitHub issues/PRs into Copilot without hitting rate limits"

## When not to use

- Implementing or modifying the `fusion-pm-mcp` service source code — that belongs to the repository itself
- General Fusion Framework/docs/EDS/backend-code retrieval — use `fusion-mcp`
- Authoring, triaging, or reviewing GitHub issues/PRs — use `fusion-issue-authoring` or repo-specific review skills once the MCP tools are available
- Making destructive environment changes without user confirmation

## Required inputs

Collect before proposing setup steps:
- whether a GitHub token is available (`gh auth token`, or a PAT with `repo` scope) — supplied per-request, not stored in config
- target client (VS Code is primary)

If details are missing, ask concise follow-up questions first.

## Instructions

1. Explain what this MCP server provides:
   - a caching proxy over the GitHub REST API, exposed as MCP tools, so agents can read project data without hitting GitHub rate limits on every call
   - hosted as a managed service — no local infrastructure required for most users
   - tools (verify against `tools/list`, the server's actual source is the source of truth over any stale doc): `api_get_issue`, `api_get_parent_issue`, `api_get_child_issues`, `api_get_issue_comments`, `api_list_milestones`, `api_get_milestone`, `api_upsert_issue`, `api_close`, `api_get_metadata_schema`, `api_get_pull_request`, `api_get_pr_comments`, `api_get_pr_reviews`, `api_get_pr_review`, `api_get_review_comments`, `api_resolve_review_comment`
   - responses are cached (default TTL 300s); there is no cache-invalidation tool — stale results clear on their own after the TTL
2. Guide user to set up the **hosted production server** — the only recommended path:
   - no Docker, no local clone, no env vars to manage
   - VS Code authenticates the MCP connection via Microsoft Entra (Equinor account)
   - the caller also supplies their own GitHub token per request via the `X-GitHub-Token` header (each user keeps their own identity and rate limit — don't suggest a shared/service token)
   - use the manual config in `references/vscode-mcp-config.md` (no one-click install link is published for this server)
   - don't suggest local stdio or the full Docker dev stack — those exist only for contributors working on the `fusion-pm-mcp` service itself; point them to that repo's `CONTRIBUTING.md` instead of embedding setup steps here
3. Describe the authentication flow:
   - on first tool invocation VS Code prompts sign-in with the Equinor Entra account (controls access to the MCP server itself)
   - separately, the `X-GitHub-Token` header carries the caller's own GitHub PAT through to the API on every request
   - both must be valid; a 401 can come from either layer
4. Give a validation checklist:
   - run `initialize` and confirm a successful response
   - run `tools/list` and compare against the actual returned tool names — don't assume a fixed list, the surface has changed before
   - run one non-destructive `tools/call` (e.g. `api_list_milestones` or `api_get_issue`) and confirm a non-empty result
5. Troubleshoot in documented order:
   - Unauthenticated / hitting rate limits fast → no `X-GitHub-Token` header configured; unauthenticated calls are capped at 60 req/hr
   - `401` or repeated sign-in prompts → re-authenticate via VS Code (sign out/in, or reload the MCP server); if that doesn't resolve it, treat it as a setup bug rather than a known transient issue
   - Results look stale → there is no invalidate-cache tool; results self-clear after the cache TTL (a few minutes)
6. When setup fails or the user asks to file a bug, produce a bug report draft from `assets/bug-report-template.md`.
   - default target repository: `equinor/fusion-pm-mcp`
   - include concrete repro steps, expected vs actual behavior, and troubleshooting already attempted
   - include non-sensitive environment details only (OS, VS Code version)
   - never include GitHub tokens, PATs, or Entra credentials
7. For uncertainty or repo-private constraints, state assumptions explicitly and link to authoritative docs instead of guessing.

## Expected output

Return:
- short explanation of Fusion PM MCP and when to use it
- hosted setup steps tailored to the user's environment
- validation checklist: `initialize`, `tools/list` (compare against actual returned names), one `tools/call` (expect non-empty result)
- troubleshooting steps mapped to observed symptoms
- bug report draft (when setup fails/misbehaves or user requests) using `assets/bug-report-template.md` with default target `equinor/fusion-pm-mcp`
- assumptions and missing information called out explicitly

## References

- [references/vscode-mcp-config.md](references/vscode-mcp-config.md)
- [assets/bug-report-template.md](assets/bug-report-template.md)

## Safety & constraints

Never:
- request or expose GitHub tokens, PATs, or Entra credentials
- invent setup commands that are not supported by project documentation
- claim setup succeeded without validation output
- suggest a single shared GitHub token for hosted multi-user setups
- run destructive commands without explicit user confirmation

Always:
- prefer official repository documentation as source of truth
- guide users to the hosted production server; do not suggest local stdio or Docker setups unless the user is contributing to the service itself, then link to that repo's `CONTRIBUTING.md` instead of embedding setup steps
- recommend per-request `X-GitHub-Token` auth over shared tokens
- separate confirmed facts from assumptions
