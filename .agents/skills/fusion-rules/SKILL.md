---
name: fusion-rules
description: 'Entrypoint for AI coding assistant rule authoring across GitHub Copilot, Cursor, and Claude Code. USE FOR: setting up rules, reviewing existing rules, scaffolding instruction files, or asking which editor format to use. DO NOT USE FOR: authoring skills (SKILL.md), agent definitions (.agent.md), or CI enforcement of rule files.'
license: MIT
metadata:
  version: "0.1.0"
  status: active
  owner: "@equinor/fusion-core"
  role: orchestrator
  orchestrator: ".system/fusion-rule-author"
  skills:
    - agents/copilot.agent.md
    - agents/cursor.agent.md
    - agents/claude-code.agent.md
  tags:
    - copilot
    - cursor
    - claude-code
    - rules
    - instructions
    - developer-experience
    - onboarding
    - entrypoint
---

# Fusion Rules

Gateway for AI coding assistant rule authoring. Detects the target editor and routes to the right agent.

## Routing

| Intent | Agent |
|--------|-------|
| Set up GitHub Copilot instructions / rules | `agents/copilot.agent.md` |
| Set up Cursor project rules | `agents/cursor.agent.md` |
| Set up Claude Code rules / CLAUDE.md | `agents/claude-code.agent.md` |
| Set up rules for all editors / mixed team | Run all three agents sequentially |
| Review or improve existing rules | Route to the agent matching the file format |

## Intent detection

Detect the target editor from the request. Look for:

- **Copilot** — mentions "copilot", "copilot-instructions", ".github/instructions", "applyTo"
- **Cursor** — mentions "cursor", ".cursor/rules", "mdc", "alwaysApply", "globs"
- **Claude Code** — mentions "claude", "CLAUDE.md", ".claude/rules", "paths"
- **All / unknown** — mentions "rules", "instructions", "set up AI rules", or doesn't specify an editor

Route directly based on detected intent. If no editor is specified, run all three agents.

## Loading behavior

Load ONLY the routed agent file. Each agent carries the full workflow and references `.system/fusion-rule-author/` assets and templates on demand. Do not preload all agents.

## Multi-editor workflow

When targeting multiple editors:

1. Run the first agent's scan and interview (Steps 1–3) in full
2. Pass the scan summary and interview answers as context to the remaining agents — they skip Steps 1–3 and start at Step 4 (Classify)
3. Each agent drafts, reviews, and writes files for its own editor format
4. Generate parallel files with equivalent content — no duplication within a single editor

## What this skill does NOT do

- Author skills (`SKILL.md`) — use `fusion-skill-authoring`
- Author agent definitions (`.agent.md`) — separate concern
- Write CI checks for rule validation — out of scope
- Migrate entire legacy codebases — incremental adoption only

## Safety

- No secrets or credentials in rule files
- No overwrites without showing diff and getting approval
- No invented conventions — only document what the developer confirms
- Show drafts before writing any files
