---
name: fusion-skill-authoring
description: 'Creates or modernizes repository skills with clear activation cues, purposeful support files, and practical review loops. USE FOR: creating a new skill, tightening an existing skill, improving discovery wording, and structuring references/assets/optional helper agents when they genuinely add value. DO NOT USE FOR: product-code changes, routine copy edits outside skills/, or documentation that should not become an installable skill.'
license: MIT
compatibility: Works best in repositories that can inspect their local skill catalog and run catalog-specific validation commands. Optional helper agents are most useful in Anthropic-compatible runtimes or other clients that support skill-local agents/subagents.
metadata:
   version: "0.3.4"
   status: active
   owner: "@equinor/fusion-core"
   tags:
      - skill-authoring
      - scaffolding
      - greenkeeping
   mcp:
      suggested:
         - github
---

# Create or Modernize Skills

## When to use

Activate when creating a new skill under `skills/`, or when an existing skill needs a material authoring refresh.

Typical triggers:
- "Create a skill for ..."
- "Scaffold `skills/<name>/SKILL.md`"
- "Turn this workflow into a reusable skill"
- "Improve this skill's metadata and activation cues"
- "Make this skill easier to discover"
- "Set up references/assets/helper agents for a skill"

Implicit triggers:
- Recurring task keeps requiring the same instructions or safety boundaries
- Existing skill is too vague, too long, poorly routed, or missing structure
- User wants a reusable workflow package, not a one-off prompt

## When not to use

- Editing product or application code outside `skills/`
- Tiny typo-only edits that don't need authoring workflow help
- Requests better solved as docs, templates, or scripts without an installable skill
- Large unrelated repo refactors
- Destructive commands or hidden network automation

## Required inputs

If required inputs are missing, ask concise targeted questions first.
Use `assets/follow-up-questions.md` as the default question bank.

### Mandatory

Collect before drafting:
- Whether this is a new skill, update, or not a skill at all
- Target repo path and intended skill directory
- Base skill name in kebab-case before any prefix/namespace
- Final skill name in kebab-case; default to `custom-<base-skill-name>` unless repo has different convention
- One-sentence purpose and user outcome
- Concrete activation cues: trigger phrases, domain keywords, anti-triggers
- Expected output: files, commands, or decisions the skill produces
- Safety boundaries and approval requirements

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

### Metadata and structure constraints

Validate before writing files:
- `name`: 1-64 characters, lowercase letters/numbers/hyphens only, must match the folder name, no leading/trailing hyphen, no consecutive hyphens, no XML tags, and no reserved words
- If the target repository has no prefix or namespace convention, default new skills to `custom-<base-skill-name>`
- `description`: non-empty, <= 1024 chars, third-person, no XML tags, states both what the skill does and when to use it
  - Prefer a single-quoted YAML string with inline `USE FOR:` and `DO NOT USE FOR:` cues
  - Example: `description: 'Drafts release notes from validated repository context. USE FOR: release summaries, changelog preparation. DO NOT USE FOR: publishing releases or editing product code.'`
- `metadata.version`: follow the target catalog's starting-version rule; if no local rule exists, `"0.0.0"` is a safe default for a new skill
- `metadata.owner`: include only when the target catalog requires explicit ownership; use a stable GitHub identity or equivalent team handle
- `metadata.status`: include only when the target catalog tracks lifecycle state; if used, keep it to `active`, `experimental`, `deprecated`, or `archived`
- `metadata.tags`: keep tags relevant, lowercase, and kebab-case
- `metadata`: use simple key/value metadata unless a relationship field explicitly needs a list or map
- `license`: optional top-level field
- `compatibility`: optional top-level field; only include it when the skill has real runtime, network, tool, or product constraints

Repository-specific prefix rules, ownership/lifecycle requirements, release policy, and validation commands belong in repo-local instructions or catalog docs, not in the portable skill package.

## Instructions

### Step 1 — Decide whether this should be a skill at all

1. Check existing catalog first:
   - If an existing skill covers the request, recommend reuse or update instead of a duplicate
   - If a skill almost matches, recommend improving it or opening an issue
2. Don't scaffold if the request is better handled as:
   - plain repository documentation,
   - a template/checklist with no reusable agent behavior,
   - a standalone script with no skill-routing value, or
   - a tiny copy edit to an existing skill

### Step 2 — Define representative requests before drafting

Capture at least three representative requests before writing long instructions:
- the user request or trigger phrase,
- the behavior the skill should produce,
- the mistake or gap the skill must prevent.

Use these as acceptance criteria. If you can't define realistic requests, the scope is underspecified or not reusable enough to become a skill.

### Step 3 — Classify the skill and choose the smallest valid structure

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

### Step 4 — Draft the minimum viable `SKILL.md`

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

Include at least one concrete example in `SKILL.md` or link to one in `references/`.

### Step 5 — Add supporting files only when they reduce ambiguity

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

If skill depends on MCP, declare in `metadata.mcp` and document client-specific tool naming in skill content.

### Step 6 — Validate discovery, structure, and local policy

Run validation supported by the target environment after authoring changes:

- inventory or schema validation for the skill catalog, if available
- repo or catalog policy checks for naming, ownership, lifecycle, or composition metadata
- script, GraphQL, lint, or test validation when skill touches those surfaces

If no dedicated skill tooling:

- read `SKILL.md` and every directly referenced file end-to-end
- verify each representative request would trigger the skill correctly
- verify every referenced file path and workflow assumption is valid

Use representative requests from Step 2 to review:
- Does the description trigger on the right requests and avoid false positives?
- Can the agent locate all directly referenced files without chasing nested links?
- Are outputs, approval gates, and safety constraints explicit?

If subagents are available:
- `agents/scoper.md` before drafting to decide create vs update vs not-a-skill
- `agents/devils-advocate.md` during scoping and drafting to surface key concerns, or full structured interview when user asks to be grilled or significant ambiguity detected
- `agents/reviewer.md` after drafting to review discovery, structure, safety, and validation evidence
- `agents/trigger-tuner.md` when the main risk is weak activation cues

After portable package is correct, apply any repository-specific release or versioning rules.

### Step 7 — Report what changed and what still needs input

Return authoring result as explicit contract:
- what was created or updated,
- how the skill was classified,
- which representative requests were used as acceptance criteria,
- which helper agents were used, if any,
- which validation commands ran and what they proved,
- any unresolved questions or recommended follow-up issues.

## Core behavior to preserve

- Reuse before creation
- Portable first, repository overlays second
- Representative requests before long-form wordsmithing
- Progressive disclosure instead of overloading `SKILL.md`
- Explicit safety and approval gates for risky actions
- Real validation evidence instead of assumed correctness

## Optional helper agents

Borrowed from Anthropic `skill-creator` pattern but narrowed to Fusion-specific scoping, review, and trigger tuning.

- `agents/scoper.md` — decide new skill vs update vs not a skill; choose smallest folder structure
- `agents/reviewer.md` — review drafted skill against discovery, structure, safety, and validation
- `agents/trigger-tuner.md` — sharpen description wording; compare activation-cue variants
- `agents/devils-advocate.md` — always-on quality collaborator; moderate mode during authoring, interrogator mode when asked or significant ambiguity detected

If runtime offers no subagents, keep the same review loop inline.

## Examples

- User: "Create a skill for drafting incident retrospectives."
   - Result: create a new workflow-oriented skill in the target catalog, define at least three retrospective authoring scenarios, scaffold `SKILL.md`, and add `assets/` only if templates are needed.
- User: "Improve the activation cues and structure of `fusion-skill-authoring`."
   - Result: update the existing skill, refresh supporting references/assets, and run the target repository's validation flow.
- User: "Add a new CLI flag to the application."
  - Result: do not use this skill because the request is product-code work, not skill authoring.

## Expected output

Return:
- Created or updated file paths
- Skill classification: new/update/not-a-skill, capability vs workflow, standalone/orchestrator/subordinate
- Final activation cues and anti-triggers used
- Chosen folder structure and rationale
- At least three representative requests used as acceptance criteria
- Which helper agents were used, if any
- Validation commands run, pass/fail status, and interpretation
- Repository-specific overlays applied after portable draft
- Follow-up actions, unresolved questions, or recommended issue links

See `references/skill-template-baseline.md` for default folder structure and baseline template.

## Validation

See `references/validation-signals.md` for success signals, failure signals, and recovery steps.

## Skill Readiness Checklist

Use `assets/skill-readiness-checklist.md` as final-quality checklist. Repository-specific PR requirements belong in repository instructions, not in the installable skill asset.

## Safety & constraints

Never:
- Request or expose secrets or credentials
- Run destructive commands without explicit user confirmation
- Invent validation results or evaluation evidence
- Modify unrelated files outside the requested scope
- Add hidden network access, remote-code execution, or unsafe script guidance

Always:
- Keep `SKILL.md` concise; move overflow to direct references
- Make the discovery contract explicit in the description
- Prefer deterministic validation loops over hand-wavy advice
- Keep helper agents tightly scoped; core workflow still works when runtime doesn't invoke them
- Respect target catalog's naming, ownership, lifecycle, and release policy
