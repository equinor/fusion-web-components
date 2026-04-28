# Skill Catalog

Fallback reference used when Fusion MCP is unavailable. Maps intent to the skills that `fusion-skills` agents can route to, with install commands.

---

## fusion-skill-authoring

**Handles:** Creating or modernizing a Fusion skill — scaffolding SKILL.md, metadata, agents, references.

**Intent signals:**
- "create a new skill"
- "scaffold a skill for X"
- "turn this workflow into a skill"
- "improve this skill"
- "update this skill's metadata"

**One-liner:** Guides you through creating or updating a skill with correct metadata, activation cues, support files, and validation.

**Install:**
```bash
npx -y skills add equinor/fusion-skills fusion-skill-authoring
```

---

## fusion-mcp

**Handles:** Setting up Fusion MCP — explaining what it is and guiding installation.

**Intent signals:**
- "set up Fusion MCP"
- "what is Fusion MCP?"
- "how do I get MCP working with Copilot?"
- "install fusion mcp server"
- "configure MCP"

**One-liner:** Explains Fusion MCP and walks you through setup so Fusion-aware MCP tools work in your Copilot workflows.

**Install:**
```bash
npx -y skills add equinor/fusion-skills fusion-mcp
```

---

## Lifecycle intents (no install needed)

These intents are handled directly by `fusion-skills` agents without requiring a separate skill install:

| Intent | Handled by |
|--------|-----------|
| "find a skill", "what skill should I use for X?" | `discovery` agent |
| "what skills do I have installed", "list my skills" | `discovery` agent |
| "install / add a skill" | `greenkeeper` agent — install mode |
| "update / remove / uninstall a skill" | `greenkeeper` agent — install mode |
| "check my skills for updates", "refresh skills" | `greenkeeper` agent — check mode |
| "set up skill update automation" | `greenkeeper` agent — setup mode |
| "set up skill discovery workflow" | `greenkeeper` agent — setup mode |
| "create / author / improve a skill" | `author` agent — redirects to `fusion-skill-authoring` |
| "inspect a skill", "smell check", "audit this SKILL.md" | `warden` agent — inspect mode |
| "report a bug or failure with a skill" | `warden` agent — report mode |

**Out of scope for `fusion-skills`:** GitHub issue authoring, implementing issues, planning task breakdowns, reviewing PRs. Direct the user to the `fusion` main gate for those.

---

## When a skill is not in this catalog

If the user's intent does not match any entry above, activate `discovery.agent.md`. Do not invent skill names.
