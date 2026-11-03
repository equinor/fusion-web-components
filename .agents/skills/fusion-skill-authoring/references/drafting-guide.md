# Drafting guide

## Instructions

### Step 4 — Classify the skill and choose the smallest valid structure

Decide skill type:
- `capability uplift`: packages domain knowledge, tools, or reference material
- `workflow / encoded preference`: packages sequencing, review gates, style rules, or mutation order

Decide composition:
- `standalone`: no coordinating skill required
- `orchestrator`: routes to companion skills, owns shared gates
- `subordinate`: runs only under its orchestrator — document that dependency

Choose minimum folder structure:
- `SKILL.md` always
- `references/` for long guidance, examples, tables, or platform-specific details
- `assets/` for templates, checklists, sample outputs, and static files
- `agents/` for specialized helper roles when runtime supports skill-local agents
- `scripts/` only when deterministic automation materially improves safety or reliability

Keep references one level deep. Don't create nested chains that force partial reads.

### Step 5 — Draft the minimum viable `SKILL.md`

Write the smallest useful main document first:
- concise frontmatter with strong discovery cues
- `When to use` and `When not to use`
- `Required inputs`
- `Instructions`
- `Expected output`
- `Safety & constraints`

Keep under 300 lines. Different runtimes have different context limits — files over 300 lines risk degradation on smaller runtimes and trigger CI warnings. Files over 500 lines fail CI. Move overflow to `references/` early.

Prefer concise, specific instructions over background explanation. Assume the agent is capable; only add context it won't reliably infer.

Set degree of freedom intentionally:
- high freedom for context-dependent analysis or review
- medium freedom when a preferred pattern exists but adaptation is expected
- low freedom when workflow is fragile, safety-critical, or sequence-sensitive

Include at least one concrete example in `SKILL.md` or link to one in `references/` (show a good example and what to avoid when style matters). Give one default approach with an escape hatch instead of a menu of options, use one term per concept, and keep time-sensitive notes out of the main flow (use an "Old patterns" section). See `references/skill-authoring-platform-references.md` for content and runtime details.

### Step 6 — Add supporting files only when they reduce ambiguity

Move long or specialized content out of `SKILL.md`:
- `references/` for deep guidance, large examples, API/platform notes, or long checklists
- `assets/` for templates and reusable artifacts
- `agents/` for helper set when runtime supports skill-local agents and workflow benefits from scoped second opinion
- `scripts/` for deterministic operations that should be executed instead of regenerated

If you add scripts:
- document dependencies and side effects,
- validate inputs and fail with actionable errors,
- keep network access explicit and justified,
- never use remote-code execution patterns.

If runtime ignores bundled helper agents, follow the same roles inline.

If skill depends on MCP, declare in `metadata.mcp` and name tools by server and tool (clients expose different tool ids for the same tool).

## Examples

- User: "Create a skill for drafting incident retrospectives."
   - Result: create a new workflow-oriented skill in the target catalog, define at least three retrospective authoring scenarios, scaffold `SKILL.md`, and add `assets/` only if templates are needed.
- User: "Improve the activation cues and structure of `fusion-skill-authoring`."
   - Result: update the existing skill, refresh supporting references/assets, and run the target repository's validation flow.
- User: "Add a new CLI flag to the application."
  - Result: do not use this skill because the request is product-code work, not skill authoring.
