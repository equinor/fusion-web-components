# Authoring inputs

## Required inputs

### Conditional

Collect when relevant:
- Naming prefix, namespace, or catalog convention
- Skill category: capability uplift or workflow/encoded preference
- Composition: standalone, orchestrator, or subordinate
- Repository-specific ownership, lifecycle, or release policy
- Orchestrator relationship: `metadata.orchestrator` for subordinates, `metadata.skills` for orchestrators
- Target status (`active`, `experimental`, `deprecated`, `archived`)
- `compatibility` text when skill has real environment constraints
- MCP requirements (`metadata.mcp.required` / `metadata.mcp.suggested`)
- Whether helper agents in `agents/` would sharpen scoping, review, or trigger tuning
- Whether deterministic automation justifies a `scripts/` directory

### Optional

Capture if useful:
- `metadata.sponsor` as backup accountability if catalog uses it
- Starter assets, checklists, examples, or templates
- Related issue follow-up if an almost-match exists and should be improved instead of duplicated
