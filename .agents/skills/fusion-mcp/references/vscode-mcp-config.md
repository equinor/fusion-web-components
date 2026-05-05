# VS Code MCP config quick reference (Fusion MCP)

This guide is a distilled setup reference based on the upstream Fusion MCP README.
Use it when the user asks for a concrete VS Code MCP config example.

## Prerequisites

- An Equinor Microsoft Entra account (your regular Equinor login)
- VS Code with GitHub Copilot

No Docker, no API keys, no local clone required.

## One-click install (recommended)

Click the link below to add Fusion MCP to your VS Code configuration:

**[Install Fusion MCP (Prod)](vscode:mcp/install?%7B%22name%22%3A%22fusion-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.api.fusion.equinor.com%2Fmcp%22%7D)**

## Manual setup

Open the VS Code Command Palette and run **MCP: Open User Configuration**, then add:

```json
{
  "servers": {
    "fusion-mcp": {
      "type": "http",
      "url": "https://mcp.api.fusion.equinor.com/mcp"
    }
  }
}
```

## Authentication flow

1. On first tool invocation VS Code detects that the server requires authentication
2. VS Code prompts you to sign in with your Equinor Microsoft Entra account
3. After sign-in, tokens are managed automatically — silent renewal when possible, interactive prompt when needed
4. Access is controlled by your existing Fusion role assignments

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
