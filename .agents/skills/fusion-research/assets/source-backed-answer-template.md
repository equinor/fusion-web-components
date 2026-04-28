# Source-Backed Answer Template

Use this structure when returning a Fusion research answer.

## Scope

- Domain: framework / EDS / skills / redirected
- Agent used: `agents/framework.agent.md` / `agents/eds.agent.md` / `agents/skills.agent.md`
- Refinement used: yes / no

## Answer

- Give the shortest answer that is actually supported by the evidence.

## Evidence

- Source: `<metadata.source or skill name or SKILL.md path>`
  - Why it matters: `<what this source confirms>`
  - Excerpt: `<the minimal excerpt or paraphrase needed>`
- Source: `<optional second source>`
  - Why it matters: `<optional second angle>`
  - Excerpt: `<the minimal excerpt or paraphrase needed>`

## Assumptions or uncertainty

- State what is confirmed.
- State what is inferred.
- If results stayed weak after one refinement pass, say that explicitly.

## Next step

- If still in scope: name the next symbol, component, token, or skill to verify.
- If out of scope: redirect to `fusion-app-react-dev` (implementation), `fusion-discover-skills` (lifecycle), `fusion-skill-authoring` (create/edit), or `fusion-mcp` (MCP setup).