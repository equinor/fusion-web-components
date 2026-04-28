---
name: fusion-skills
description: 'Entrypoint for all Fusion skill lifecycle operations. USE FOR: finding, installing, updating, syncing, or greenkeeping skills; setting up skill automation; creating or authoring a new skill; reporting a bug with a skill. DO NOT USE FOR: resolving GitHub issues, reviewing PRs, planning task breakdowns, or authoring GitHub issues — those are handled by other Fusion skills.'
license: MIT
compatibility: Assumes Fusion MCP is available (`mcp_fusion_skills`). Falls back to `references/skill-catalog.md` and promotes Fusion MCP when unavailable.
metadata:
  version: "0.0.0"
  status: active
  owner: "@equinor/fusion-core"
  role: orchestrator
  skills:
    - agents/discovery.agent.md
    - agents/greenkeeper.agent.md
    - agents/author.agent.md
    - agents/warden.agent.md
  tags:
    - fusion
    - skills
    - discovery
    - install
    - sync
    - authoring
    - mcp
    - workflow
    - automation
    - triage
    - entrypoint
  mcp:
    suggested:
      - mcp_fusion_skills
---

# Fusion Skills

Skill lifecycle entrypoint. Resolve intent, engage the right agent.

## Loading behavior

Load ONLY the routed agent file. References are loaded on-demand by the agent when it needs them (e.g., `skill-catalog.md` only on MCP failure, `sync-workflows.md` only in setup mode). Do not preload all agents or all references.

## MCP tools

This skill uses `mcp_fusion_skills` — the Fusion MCP tool that handles both skill discovery and lifecycle operations:
- **Discovery** (`intent: query`): semantic search over the skills index by description or task.
- **Inventory** (`intent: inventory`): list installed skills.
- **Lifecycle** (`intent: install | update | remove`): advisory commands for managing skills.

## Routing

| Intent | Agent |
|--------|-------|
| Find or discover the right skill; list installed skills | `agents/discovery.agent.md` |
| Install, update, remove, or check skills; set up automation | `agents/greenkeeper.agent.md` |
| Create, author, or improve a skill | `agents/author.agent.md` |
| Inspect a skill for quality issues, or report a skill failure | `agents/warden.agent.md` |

If the user was routed here from the `fusion` main gate with a partially-resolved intent (e.g., "skills"), proceed directly to the most likely agent without re-asking the top-level question.

If intent is genuinely unclear and the user was not already asked a clarifying question, ask one question: "Are you looking to find a skill, install or update one, create your own, or report a problem with one?"

**Compound intents:** If the request spans multiple agents (e.g., "inspect this skill and fix the issues"), run agents sequentially. Pass the output of the first agent as context to the second.

**Loop prevention:** If you were activated from the `fusion` main gate, do not redirect back to `fusion`. Handle the request within your agents or state that it is out of scope.

**Out of scope:** Resolving GitHub issues, reviewing PRs, planning task breakdowns, or authoring GitHub issues. Direct the user to the relevant installed skill or the `fusion` main gate — but never re-route back to `fusion` if you were activated from there.

## Migration from deprecated skills

If `fusion-discover-skills` or `fusion-skill-self-report-bug` is installed alongside this skill, tell the user:
> "You have a deprecated skill installed that's now part of `fusion-skills`. You can safely remove it: `npx -y skills remove <deprecated-skill-name>`"

## Safety

- No secrets or credentials.
- No GitHub mutations without confirmation.
- No remote script execution.
- No invented skill names or catalog results.

