# GitHub MCP server reference

GitHub MCP setup and readiness. Server: https://github.com/github/github-mcp-server

## MCP readiness check

1. Try `mcp_github::search_issues` with lightweight query in target repo
2. Succeeds → MCP ready
3. Fails → run install-assist

## Install assist (VS Code)

1. Ensure VS Code supports remote MCP
2. Add to MCP config:

```json
{
  "servers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    }
  }
}
```

3. Open Copilot Chat Agent mode, complete OAuth if prompted
4. Re-run readiness probe

No remote MCP available: use local server setup from GitHub MCP server README.
