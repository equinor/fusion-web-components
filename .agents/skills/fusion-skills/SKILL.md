---
name: fusion-skills
description: 'Entrypoint for Fusion skill lifecycle operations. USE FOR: finding, installing, updating, syncing or greenkeeping skills; creating or authoring a skill; reporting a skill bug; self-evaluating greenkeeping runs and deduplicating skill feedback in editors or agent runtimes. DO NOT USE FOR: repository workflows (use fusion-repository-greenkeeping), resolving GitHub issues, reviewing PRs, planning task breakdowns or authoring unrelated issues — use their dedicated Fusion skills.'
license: MIT
compatibility: Assumes Fusion MCP is available (`mcp_fusion_skills`). Falls back to `references/skill-catalog.md` and promotes Fusion MCP when unavailable.
metadata:
  version: "0.2.1"
  status: active
  owner: "@equinor/fusion-core"
  role: orchestrator
  skills:
    - agents/discovery.agent.md
    - agents/greenkeeper.agent.md
    - agents/author.agent.md
    - agents/warden.agent.md
    - fusion-agent-content
  tags:
    - fusion
    - skills
    - discovery
    - install
    - sync
    - authoring
    - mcp
    - greenkeeping
    - triage
    - entrypoint
  mcp:
    suggested:
      - mcp_fusion_skills
---

# Fusion Skills

Failure bug draft: `assets/issue-templates/skill-workflow-failure-bug.md.hbs`.
Before filling, read its `.hbs` slot header,
`assets/partials/agent-content/README.md`, and every named partial.
Fill bug-report templates by hand.

Skill lifecycle entrypoint. Resolve intent, engage the right agent.

## Loading behavior

Load ONLY the routed agent file. References are loaded on-demand by the agent when it needs them (e.g., `skill-catalog.md` only on MCP failure). Do not preload all agents or all references.

Unattended runs: `references/service-mode-contract.md` defines how a skill runs under a service task (given inputs, allowed actions, stop rules, proposals, fingerprints). Load it only when a skill receives a service task or an author makes a skill service-ready.

## MCP tools

This skill uses `mcp_fusion_skills` — the Fusion MCP tool that handles both skill discovery and lifecycle operations:
- **Discovery** (`intent: query`): semantic search over the skills index by description or task.
- **Inventory** (`intent: inventory`): list installed skills.
- **Lifecycle** (`intent: install | update | remove`): advisory commands for managing skills.

## Routing

| Intent | Agent |
|--------|-------|
| Find or discover the right skill; list installed skills | `agents/discovery.agent.md` |
| Install, update, remove or check skills; route skill-update automation | `agents/greenkeeper.agent.md` |
| Create, author, or improve a skill | `agents/author.agent.md` |
| Inspect a skill for quality issues, or report a skill failure | `agents/warden.agent.md` |
| Evaluate a greenkeeping run; report skill bugs or guidance gaps | `agents/warden.agent.md` (feedback mode) |

Skill bug reports from the warden are written for human readers in the `fusion-agent-content` shape (banner, TL;DR, folded details and evidence).
Feedback mode: [run feedback](references/run-feedback.md). Reports improvements; author mode implements them.

For APM sync or app workflow setup/updates, hand off to `fusion-repository-greenkeeping`.
This skill owns skill lifecycle, not workflow templates or rendering.

If the user was routed here from the `fusion` main gate with a partially-resolved intent (e.g., "skills"), proceed directly to the most likely agent without re-asking the top-level question.

If intent is genuinely unclear and the user was not already asked a clarifying question, ask one question: "Are you looking to find a skill, install or update one, create your own, or report a problem with one?"

**Compound intents:** If the request spans multiple agents (e.g., "inspect this skill and fix the issues"), run agents sequentially. Pass the output of the first agent as context to the second.

**Loop prevention:** If you were activated from the `fusion` main gate, do not redirect back to `fusion`. Handle the request within your agents or state that it is out of scope.

**Out of scope:** Resolving GitHub issues, reviewing PRs, planning task breakdowns, or authoring unrelated GitHub issues. Skill failure/feedback reports belong to warden; direct other work to relevant installed skill or `fusion` main gate — never re-route back if activated there.

## Migration from deprecated skills

If `fusion-discover-skills` or `fusion-skill-self-report-bug` is installed alongside this skill, tell the user:
> "You have a deprecated skill installed that's now part of `fusion-skills`. Remove its dependency from `apm.yml`, then run `apm prune` to reconcile the lockfile and deployed files."

## Repository-policy handoff

Target repo instructions own commits, validation, changesets, PRs, branch refresh and merge policy.
Read at point of use; local workflow setup approval never authorizes remote mutations or deployment.

## Safety & constraints

This skill is mutation-capable. Repository-local workflow instructions take precedence over inline guidance when they conflict.

- No secrets or credentials.
- No GitHub mutations without confirmation, except run feedback under trusted runtime policy.
- No remote script execution.
- No invented skill names or catalog results.
- Installed skill files are copies (use `apm.yml` and `apm.lock.yaml` to inspect dependency provenance and deployed-file ownership) — never edit them in place directly; route content fixes through `agents/author.agent.md` (which redirects to `fusion-skill-authoring`, source repo) and failures through `agents/warden.agent.md` (report mode).
