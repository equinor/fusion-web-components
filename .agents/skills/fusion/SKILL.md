---
name: fusion
description: 'Routes unclear cross-domain Fusion requests and gives missing-skill install guidance. USE FOR: choosing between skills, issues, PRs, reviews or maintenance; "where to start". DO NOT USE FOR: skill lifecycle (use fusion-skills), or tasks with a specific skill active.'
license: MIT
compatibility: Assumes Fusion MCP is available (`mcp_fusion_skills`). Falls back to inline install commands when unavailable.
metadata:
  version: "0.1.6"
  status: active
  owner: "@equinor/fusion-core"
  role: orchestrator
  tags:
    - fusion
    - entrypoint
    - gateway
    - orchestrator
    - triage
  mcp:
    suggested:
      - mcp_fusion_skills
---

# Fusion

Main gate. Identify intent, route to matching Fusion skill.

**Requires `fusion-skills`** for skill lifecycle operations. If `fusion-skills` is not installed, suggest: `apm install equinor/fusion-skills/skills/fusion-skills#^1.6.1 --target copilot`

## Safety

- No secrets or credentials.
- No GitHub mutations without confirmation.
- No remote script execution.
- No invented skill names.

## First-contact response

When asked "what can you do?" or greeting an exploratory newcomer, read `references/first-contact.md` for brief overview before clarifying.

## Routing

| Intent | Skill | Status |
|--------|-------|--------|
| Find, install, update, remove, sync, or greenkeep skills | `fusion-skills` | active |
| Create, author, or improve a skill | `fusion-skills` | active |
| Inspect a skill for quality issues or report a skill failure | `fusion-skills` | active |
| Create or update a GitHub issue | `fusion-issue-authoring` | active |
| Solve / implement a GitHub issue | `fusion-issue-solving` | experimental |
| Plan or break down an issue into sub-tasks | `fusion-issue-task-planning` | experimental |
| Address PR review comments | `fusion-github-review-resolution` | experimental |
| Review a dependency update PR | `fusion-dependency-review` | experimental |
| Greenkeep or incrementally improve a Fusion app repo; resume its maintenance plan | `fusion-app-greenkeeping` | experimental |
| Greenkeep a Fusion .NET service or backend-only repo; resume its maintenance plan | `fusion-service-greenkeeping` | experimental |
| Set up or maintain APM sync, single-app deployment, Changesets app or Copilot setup workflows; check Copilot readiness | `fusion-repository-greenkeeping` | experimental |
| Check general repo health: README/contributor docs, CODEMAP, ownership, config drift, dead references | `fusion-general-greenkeeping` | experimental |

## Loop prevention

Never route to yourself or back to incoming Fusion skill. Answer directly or state intent is out of scope.

## Workflow

1. Identify intent from request.
2. Call `mcp_fusion_skills` to confirm matching skill and installation.
   - **If MCP is unavailable:** use routing table as sole source of truth. Never invent skill names.
3. **If installed:** redirect user to invoke skill directly.
4. **If not installed but available (active or experimental):** name skill, give one-sentence purpose, experimental status and install command:
   ```
   apm install equinor/fusion-skills/skills/<skill-name>#^1.6.1 --target copilot
   ```
   For `fusion-app-greenkeeping`, `fusion-service-greenkeeping`, `fusion-repository-greenkeeping` or `fusion-general-greenkeeping`, use catalog path `skills/.experimental/<skill-name>`
   instead of `skills/<skill-name>`; available after release containing skill. App APM profile includes app greenkeeping; services profile includes service greenkeeping.
5. **If the skill is experimental:** add a note: "This skill is experimental and may change. Install at your own risk."
6. **If intent doesn't match any routing entry:** say so; suggest describing goal differently or `fusion-skills` discovery.
7. If intent remains unclear, ask one question:
   > "Are you looking to manage skills, create an issue, work on an issue, or review a PR?"
