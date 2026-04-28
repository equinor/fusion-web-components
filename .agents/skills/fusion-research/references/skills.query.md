# Skills Query Patterns

Use these repeatable query patterns when researching the Fusion skill catalog through MCP.

## Start with the intent that fits

| Intent | Query shape |
| --- | --- |
| Does a skill exist for this capability? | `<topic or workflow> skill` |
| What does a specific skill do? | `<skill-name> when to use scope` |
| Which skills work together? | `<skill-name> companion orchestrator related` |
| What is off-limits for a skill? | `<skill-name> when not to use do not use` |
| How do two skills differ? | `<skill-a> <skill-b> difference scope` |

## Proven examples

- Capability fit: `github pull request review skill`
- Scope: `fusion-skill-authoring when to use scope`
- Companion: `fusion-app-react-dev companion skills metadata`

## One refinement pass, then fallback

If the first pass is weak or ambiguous:

1. Add the exact skill name.
2. Try a narrower capability keyword.
3. Fall back to reading local `SKILL.md` files or GitHub-backed catalog content when MCP remains weak.
4. Stop after the fallback and report uncertainty if evidence is still insufficient.

## Evidence checklist

Before using a result in the final answer, capture:

- the skill name
- the source label (`mcp_fusion_search_skills`, `mcp_fusion_skills`, local `SKILL.md`, or GitHub-backed catalog)
- the excerpt that supports the claim
- any companion, orchestrator, or overlap metadata when the question involves relationships

Prefer a second source only when it adds missing context — scope boundaries, companion relationships, or usage guidance not in the first result.
