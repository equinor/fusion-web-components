# VS Code MCP config quick reference (Fusion PM MCP)

Distilled setup reference based on the upstream Fusion PM MCP README, with the tool inventory validated against the live server rather than assumed from published docs — see the Validation checklist below for how to confirm the current tool surface via `tools/list`.

## Prerequisites

- An Equinor Microsoft Entra account (your regular Equinor login)
- A GitHub personal access token with `repo` scope (or `gh auth token`) — supplied per request, not stored server-side
- VS Code with GitHub Copilot

No Docker, no local clone required.

## Manual setup

Open the VS Code Command Palette and run **MCP: Open User Configuration**, then add:

```json
{
  "servers": {
    "fusion-pm-mcp": {
      "type": "http",
      "url": "https://pm-mcp.api.fusion.equinor.com/mcp",
      "oauth": {
        "clientId": "fe06d016-0e42-452e-a3d7-f08325037122"
      },
      "headers": {
        "X-GitHub-Token": "${input:github_token}"
      }
    }
  },
  "inputs": [
    {
      "id": "github_token",
      "type": "promptString",
      "description": "GitHub personal access token (run 'gh auth token' to get one)",
      "password": true
    }
  ]
}
```

No one-click install link is published for this server — use the manual config above.

## Authentication flow

1. First tool invocation: VS Code detects authentication required and prompts sign-in with the Equinor Microsoft Entra account (this authenticates the MCP connection itself)
2. Separately, the `X-GitHub-Token` header carries the caller's own GitHub PAT through to the API on every request — prefer this per-user pattern over a single shared token
3. Both layers must be valid; a `401` can come from either one

## Validation checklist

- Run `initialize` and confirm a successful response.
- Run `tools/list` and compare against the actual returned names (see the tool inventory in the skill's `SKILL.md`). Don't assume a fixed list — this has drifted from published docs before; trust the live `tools/list` response over any doc, including this one and `SKILL.md`.
- Pick one non-destructive tool (e.g. `api_list_milestones` or `api_get_issue`) and confirm a non-empty result.

## Troubleshooting quick map

- Hitting GitHub rate limits fast → no `X-GitHub-Token` header configured; unauthenticated calls are capped at 60 req/hr.
- `401` or repeated sign-in prompts → re-authenticate via VS Code (sign out/in, or reload the MCP server).
- Stale results → there is no cache-invalidation tool; results self-clear after the cache TTL (a few minutes).

## Contributing to the service itself

Local stdio setup and the full Docker dev stack (API + Redis + nginx + Structurizr + Aspire) exist only for contributors working on `fusion-pm-mcp` itself — see that repo's [CONTRIBUTING.md](https://github.com/equinor/fusion-pm-mcp/blob/main/CONTRIBUTING.md) rather than using this skill for that workflow.

## Sources

- https://github.com/equinor/fusion-pm-mcp/blob/main/README.md
- https://github.com/equinor/fusion-pm-mcp/blob/main/CONTRIBUTING.md
