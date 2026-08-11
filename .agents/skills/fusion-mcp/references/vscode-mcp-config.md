# VS Code MCP config quick reference (Fusion MCP)

Distilled setup reference based on the upstream Fusion MCP README.

## Prerequisites

- An Equinor Microsoft Entra account (your regular Equinor login)
- VS Code with GitHub Copilot

No Docker, no API keys, no local clone required.

## One-click install (recommended)

Click the link below to add Fusion MCP to your VS Code configuration:

**NonProd:** [Install Fusion MCP (NonProd)](vscode:mcp/install?%7B%22name%22%3A%22fusion-mcp-nonprod%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.test.api.fusion-dev.net%2Fmcp%22%2C%22oauth%22%3A%7B%22clientId%22%3A%22a0327fa6-975f-4ac6-a340-d173bf6b4658%22%7D%7D)

**Prod:** [Install Fusion MCP](vscode:mcp/install?%7B%22name%22%3A%22fusion-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.api.fusion.equinor.com%2Fmcp%22%2C%22oauth%22%3A%7B%22clientId%22%3A%22fe06d016-0e42-452e-a3d7-f08325037122%22%7D%7D)

## Manual setup

Open the VS Code Command Palette and run **MCP: Open User Configuration**, then add:

```json
{
  "servers": {
    "fusion-mcp": {
      "type": "http",
      "url": "https://mcp.api.fusion.equinor.com/mcp",
      "oauth": {
        "clientId": "fe06d016-0e42-452e-a3d7-f08325037122"
      }
    }
  }
}
```

Use `"url": "https://mcp.test.api.fusion-dev.net/mcp"` and `"clientId": "a0327fa6-975f-4ac6-a340-d173bf6b4658"` for NonProd instead. If you want both Prod and NonProd configured side-by-side, give the NonProd entry a distinct server name (e.g. `fusion-mcp-nonprod`) instead of reusing `fusion-mcp` — otherwise it overwrites your Prod entry.

## Authentication flow

1. First tool invocation: VS Code detects authentication required
2. VS Code prompts sign-in with Equinor Microsoft Entra account
3. After sign-in, tokens managed automatically — silent renewal when possible, interactive prompt when needed
4. Access controlled by your existing Fusion role assignments

## Verification checklist

- Run `initialize` and confirm a successful response.
- Run `tools/list` and confirm at least one tool is returned.
- Pick one non-destructive tool from the returned list and run `tools/call`.
- Pass criteria: response is non-empty (`content` or `structuredContent` contains data).
- Fail criteria: empty tool list or empty/failed tool response; treat as setup failure and apply troubleshooting below.

## Troubleshooting quick map

- Sign-in prompt not appearing: verify the `fusion-mcp` server entry is enabled in VS Code MCP settings and that you are signed in with an Equinor account.
- `401 Unauthorized`: re-authenticate via VS Code account settings; ensure your Equinor Entra account is active.
- `tools/list` returns empty: verify the `fusion-mcp` server entry is enabled in VS Code MCP settings and reload the MCP server.
- Partial tool behavior: check VS Code Output > Copilot for error details and restart the MCP server.

## Sources

- https://github.com/equinor/fusion-mcp/blob/main/README.md
