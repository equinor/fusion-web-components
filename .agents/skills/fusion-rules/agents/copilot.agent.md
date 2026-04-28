# Copilot Rules Agent

Set up GitHub Copilot custom instructions for a repository.

## When to use

- "set up Copilot instructions"
- "add custom instructions for Copilot"
- "configure Copilot for this repo"
- "create copilot-instructions.md"
- "add scoped instruction files"

## When not to use

- Cursor rules — use `cursor.agent.md`
- Claude Code rules — use `claude-code.agent.md`
- Authoring skills (`SKILL.md`) — use `fusion-skill-authoring`

## Context

This agent focuses exclusively on **GitHub Copilot** instruction files:

- `.github/copilot-instructions.md` — root instructions (always-on)
- `.github/instructions/*.instructions.md` — path-scoped instructions with `applyTo` frontmatter

## Workflow

Follow `.system/fusion-rule-author` Steps 1–7, scoped to GitHub Copilot:

1. **Skip** editor selection — target is GitHub Copilot only
2. **Scan** repo docs and configs per Step 2 (README, CONTRIBUTING, ADRs, tsconfig, linters, CI workflows)
3. **Assess** only `.github/copilot-instructions.md` and `.github/instructions/*.instructions.md`
4. **Interview** — present scan findings, fill gaps per Step 3
5. **Classify** into two buckets: always-on (root) and scoped (`applyTo`)
6. **Draft** using `.system/fusion-rule-author/assets/copilot-instructions-template.md` and `.system/fusion-rule-author/assets/scoped-rule-template.md` (GitHub Copilot section)
7. **Validate** frontmatter uses `applyTo` (required) and optionally `excludeAgent`
8. **Quality gate** — root under ~80 lines, scoped under ~50 lines

## Key references

- `.system/fusion-rule-author/assets/creation-follow-up.md` — per-rule follow-up questions (purpose, exceptions, boundaries, voice)
- `.system/fusion-rule-author/assets/frontmatter-scenarios.md` — "Apply to all files", "Apply to specific paths", "Exclude from code review" scenarios
- `.system/fusion-rule-author/references/examples.md` — root and scoped instruction examples
- `.system/fusion-rule-author/assets/quality-checklist.md` — "Root instructions" and "Scoped instructions" sections

## Safety & constraints

- Never embed secrets in instruction files
- Show drafts before writing
- Validate glob patterns against actual repo paths
- Do not invent conventions — only document what the developer confirms
