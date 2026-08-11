# Changelog

## 0.1.0 - 2026-07-03

### minor

- [#197](https://github.com/equinor/fusion-skills/pull/197) [`380c0a1`](https://github.com/equinor/fusion-skills/commit/380c0a18d417f1c8003b91eae127ec9d8b450622) Thanks [@alftore](https://github.com/alftore)! - Add fusion-pm-mcp skill for GitHub project-management MCP setup


  New experimental skill covering the `fusion-pm-mcp` server — a caching proxy
  over the GitHub REST API exposing issue/PR/milestone tools. Guides users
  through the hosted HTTP+OAuth setup (the recommended path for consumers),
  validation, and troubleshooting.

  Includes:
  - SKILL.md with hosted setup guidance, tool inventory, and troubleshooting
  - references/vscode-mcp-config.md with the hosted config snippet
  - assets/bug-report-template.md for filing setup failures against
    `equinor/fusion-pm-mcp`

