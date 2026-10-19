# Changelog

## 0.1.2 - 2026-10-18

### patch

- [#285](https://github.com/equinor/fusion-skills/pull/285) [`8fa30e1`](https://github.com/equinor/fusion-skills/commit/8fa30e119d3959c4691c5e099b15bc6724e7794e) - Migrate the PM MCP setup bug report to an agent-fillable `.md.hbs` template

  with shared provenance and folded sanitized logs. Update all template references.

  resolves equinor/fusion-core-tasks#2442

## 0.1.1 - 2026-10-18

### patch

- [#272](https://github.com/equinor/fusion-skills/pull/272) [`fa0eeae`](https://github.com/equinor/fusion-skills/commit/fa0eeae974265196f2980cacea346460ebfe23ab) - Align the tool inventory with the live Fusion PM MCP server


  - Replace the retired `api_*` tool names with the current tool names, grouped by issues, milestones, pull requests, discussions, and artifacts/reports.
  - Note that tools which create, update, close, resolve, set, add, remove, or upsert change GitHub state or the server's index, and need explicit user confirmation.
  - Update validation examples to `milestones` and `issue_get`.

  resolves equinor/fusion-skills#265

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
