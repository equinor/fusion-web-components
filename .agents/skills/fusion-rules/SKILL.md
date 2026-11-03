---
name: fusion-rules
description: 'Routes user-facing AI rule authoring and review for GitHub Copilot, Cursor and Claude Code. USE FOR: setting up repository instructions, path-scoped files, mixed-editor rules, choosing editor formats. DO NOT USE FOR: skills (SKILL.md; use fusion-skill-authoring), agent definitions (.agent.md), or rule-validation CI.'
license: MIT
metadata:
  version: "0.2.1"
  status: active
  owner: "@equinor/fusion-core"
  role: orchestrator
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

Gateway for AI rule authoring. Detect editor; read and apply matching agent instructions inline if native adapter unavailable.

Input: repo context. Output: reviewed editor-native files and change summary.

## Safety

- No secrets or credentials in rule files
- Repository security policy takes precedence; preserve existing content, never replace silently
- No overwrites without showing diff and getting approval
- No invented conventions — only document what the developer confirms
- Show drafts before writing any files

## Routing

| Intent | Agent |
|--------|-------|
| Set up GitHub Copilot instructions / rules | `agents/copilot.agent.md` |
| Set up Cursor project rules | `agents/cursor.agent.md` |
| Set up Claude Code rules / CLAUDE.md | `agents/claude-code.agent.md` |
| Set up rules for all editors / mixed team | Run all three agents sequentially |
| Review or improve existing rules | Route to the agent matching the file format |

## Intent detection

Detect target editor from the request:

- **Copilot** — "copilot", "copilot-instructions", ".github/instructions", "applyTo"
- **Cursor** — "cursor", ".cursor/rules", "mdc", "alwaysApply", "globs"
- **Claude Code** — "claude", "CLAUDE.md", ".claude/rules", "paths"
- **All / unknown** — "rules", "instructions", "set up AI rules", or no editor specified

Route directly on detected intent. No editor specified → run all three agents.

## Loading behavior

Read only routed agent; never preload all agents. On routed workflow, read `references/workflow.md` for Steps 1–7 (scan, interview, classify, draft, review, write).

- When interview leaves gaps, read `assets/creation-follow-up.md` for per-rule questions.
- When classifying frontmatter, read `assets/frontmatter-scenarios.md` for selected editor scenarios.
- When drafting/reviewing, read selected editor sections of `references/examples.md` and `assets/quality-checklist.md` for examples and required checks.
- Before drafting Copilot root/scoped rules, read `assets/copilot-instructions-template.md.hbs` / `assets/scoped-rule-template.md.hbs`; Cursor: `assets/cursor-rule-template.md.hbs`; Claude Code: `assets/claude-rule-template.md.hbs`. Read slot headers; fill native-format output manually.

## Multi-editor workflow

For multiple editors:

1. Run first agent's scan/interview (Steps 1–3) fully
2. Pass scan summary + interview answers to remaining agents; skip Steps 1–3, start Step 4 (Classify)
3. Each agent drafts/reviews/writes its editor format
4. Generate equivalent parallel content; no duplication within one editor

## What this skill does NOT do

- Author skills (`SKILL.md`) — use `fusion-skill-authoring`
- Author agent definitions (`.agent.md`) — separate concern
- Write CI checks for rule validation — out of scope
- Migrate entire legacy codebases — incremental adoption only
