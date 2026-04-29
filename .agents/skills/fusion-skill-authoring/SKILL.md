---
name: fusion-skill-authoring
description: 'Creates or modernizes repository skills with clear activation cues, purposeful support files, and practical review loops. USE FOR: creating a new skill, tightening an existing skill, improving discovery wording, and structuring references/assets/optional helper agents when they genuinely add value. DO NOT USE FOR: product-code changes, routine copy edits outside skills/, or documentation that should not become an installable skill.'
license: MIT
compatibility: Works best in repositories that can inspect their local skill catalog and run catalog-specific validation commands. Optional helper agents are most useful in Anthropic-compatible runtimes or other clients that support skill-local agents/subagents.
metadata:
   version: "0.3.3"
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

Use this skill when you need to create a new skill under `skills/`, or when an existing skill needs a material authoring refresh instead of a small copy edit.

Typical triggers:
- "Create a skill for ..."
- "Scaffold `skills/<name>/SKILL.md`"
- "Turn this workflow into a reusable skill"
- "Improve this skill's metadata and activation cues"
- "Make this skill easier for agents to discover and follow"
- "Set up references/assets/helper agents for a skill"

Implicit triggers:
- A recurring task keeps requiring the same instructions, context, or safety boundaries
- An existing skill is valid but too vague, too long, poorly routed, or missing structure
- The user wants a reusable workflow package rather than a one-off prompt

## When not to use

Do not use this skill for:
- Editing product or application code outside `skills/`
- Tiny typo-only skill edits that do not need authoring workflow help
- Requests better solved as docs, templates, or scripts without creating an installable skill
- Large unrelated repository refactors
- Destructive commands or hidden network automation

## Required inputs

If required inputs are missing, ask concise targeted questions first.
Use `assets/follow-up-questions.md` as the default question bank.

### Mandatory

Collect before drafting:
- Whether this is a new skill, an update to an existing skill, or not a skill at all
- Target repository path and intended final skill directory
- Base skill name in kebab-case before any prefix or namespace
- Final skill name in kebab-case; default to `custom-<base-skill-name>` unless the target repository has a different naming convention
- One-sentence purpose for the skill and the user outcome it should unlock
- Concrete activation cues: trigger phrases, domain keywords, and anti-triggers
- Expected output: which files, commands, or decisions the skill should produce
- Safety boundaries and approval requirements

### Conditional

Collect when relevant:
- Naming prefix, namespace, or catalog convention if the target repository uses one
- Skill category: capability uplift or workflow / encoded preference
- Composition: standalone, orchestrator, or subordinate
- Repository-specific ownership, lifecycle, or release policy if the target catalog enforces one
- Orchestrator relationship: `metadata.orchestrator` for subordinates, `metadata.skills` for orchestrators
- Target status (`active`, `experimental`, `deprecated`, `archived`) when the target catalog tracks lifecycle state
- `compatibility` text when the skill has real environment constraints
- MCP requirements (`metadata.mcp.required` / `metadata.mcp.suggested`) when the skill depends on specific servers
- Whether a small `agents/` helper set would sharpen scoping, review, or trigger tuning
- Whether deterministic automation justifies a `scripts/` directory

### Optional

Capture if useful:
- `metadata.sponsor` as backup accountability if the target catalog uses backup ownership
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

1. Check current coverage first:
   - Inspect the existing skill catalog first, using repository tooling, directory layout, or catalog docs already available in the target environment
   - If an existing skill already covers the request, recommend reuse or update instead of creating a duplicate
   - If a skill almost matches, recommend improving that skill or opening an issue rather than creating a one-off clone
2. Stop and do not scaffold a new skill if the request is better handled as:
   - plain repository documentation,
   - a template/checklist with no reusable agent behavior,
   - a standalone script with no skill-routing value, or
   - a tiny copy edit to an existing skill

### Step 2 — Define representative requests before drafting

Capture at least three representative requests before writing long instructions:
- the user request or trigger phrase,
- the behavior the skill should produce,
- the mistake or gap the skill must prevent.

Use these requests as the acceptance criteria for the final skill. If you cannot define realistic requests, the scope is probably underspecified or not reusable enough to become a skill.

### Step 3 — Classify the skill and choose the smallest valid structure

Decide the skill type up front:
- `capability uplift`: packages domain knowledge, tools, or reference material the agent does not already have
- `workflow / encoded preference`: packages sequencing, review gates, style rules, or mutation order the user wants repeated consistently

Decide the composition model:
- `standalone`: no coordinating skill required
- `orchestrator`: routes to companion skills and owns shared gates
- `subordinate`: runs only under its orchestrator and should document that dependency clearly

Choose the minimum folder structure that supports the task:
- `SKILL.md` always
- `references/` for long guidance, examples, tables, or platform-specific details
- `assets/` for templates, checklists, sample outputs, and static files
- `agents/` for a small number of specialized helper roles when the runtime supports skill-local agents and a second pass materially improves scoping, review, or trigger quality
- `scripts/` only when deterministic automation materially improves safety or reliability

Keep references one level deep from `SKILL.md`. Do not create nested reference chains that force partial reads.

### Step 4 — Draft the minimum viable `SKILL.md`

Write the smallest useful main document first:
- concise frontmatter with strong discovery cues
- `When to use` and `When not to use`
- `Required inputs`
- `Instructions`
- `Expected output`
- `Safety & constraints`

Keep the draft under 300 lines. Different agent runtimes have different context window limits — SKILL.md files over 300 lines risk degradation on smaller-window runtimes and trigger CI warnings. Files over 500 lines fail CI. Move overflow to `references/` early rather than trimming later.

Prefer concise, specific instructions over background explanation. Assume the agent is already capable and only add context it would not reliably infer.

Set the degree of freedom intentionally:
- high freedom for context-dependent analysis or review work
- medium freedom when a preferred pattern exists but adaptation is expected
- low freedom when the workflow is fragile, safety-critical, or sequence-sensitive

Include at least one concrete example in `SKILL.md` or link directly to one in `references/`.

### Step 5 — Add supporting files only when they reduce ambiguity

Move long or specialized content out of `SKILL.md` when it improves clarity:
- use `references/` for deep guidance, large examples, API/platform notes, or long checklists
- use `assets/` for templates and reusable artifacts the skill should point at directly
- use `agents/` for a small helper set when the runtime supports skill-local agents or subagents and the workflow benefits from a scoped second opinion
- use `scripts/` only for deterministic operations that should be executed instead of regenerated

If you add scripts:
- document dependencies and side effects,
- validate inputs and fail with actionable errors,
- keep network access explicit and justified,
- never use remote-code execution patterns such as download-and-run.

If the runtime ignores bundled helper agents, follow the same roles inline instead of skipping the evaluation step.

If the skill depends on MCP, declare the requirement in `metadata.mcp` and document client-specific tool naming expectations in the skill content instead of assuming all runtimes behave the same way.

### Step 6 — Validate discovery, structure, and local policy

Run the validation supported by the target environment after authoring changes:

- inventory or schema validation for the skill catalog, if available
- repository or catalog policy checks for naming, ownership, lifecycle, or composition metadata
- script, GraphQL, lint, or test validation when the skill touches those surfaces

If the environment has no dedicated skill tooling:

- read `SKILL.md` and every directly referenced file end-to-end
- verify that each representative request would trigger the skill for the right reason
- verify that every referenced file path and workflow assumption still makes sense in the target repository

Use the representative requests from Step 2 to review the final result:
- Does the description trigger on the right requests and avoid obvious false positives?
- Can the agent locate all directly referenced files without chasing nested links?
- Are outputs, approval gates, and safety constraints explicit?

If subagents are available, use the bundled role files when they help:
- `agents/scoper.md` before drafting to decide create vs update vs not-a-skill and to choose the smallest useful structure
- `agents/devils-advocate.md` during scoping and drafting to surface key concerns (moderate mode), or before drafting for a full structured interview when the user asks to be grilled or when the orchestrator detects significant ambiguity (interrogator mode)
- `agents/reviewer.md` after drafting to review discovery, structure, safety, and validation evidence like a strict maintainer
- `agents/trigger-tuner.md` when the main risk is weak activation cues or when choosing between two description variants

After the portable package is correct, apply any repository-specific release or versioning rules from repo-local instructions or equivalent catalog policy.

### Step 7 — Report what changed and what still needs input

Return the authoring result as an explicit contract:
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

This skill borrows Anthropic `skill-creator`'s pattern of bundling a small `agents/` helper set, but narrows the roles to Fusion-specific scoping, review, and trigger tuning.

- `agents/scoper.md` — decide whether the request should become a new skill, an update, or not a skill at all; choose the smallest folder structure that still solves the problem
- `agents/reviewer.md` — review a drafted skill package against discovery, structure, safety, and validation expectations
- `agents/trigger-tuner.md` — sharpen description wording and compare activation-cue variants against realistic prompts
- `agents/devils-advocate.md` — always-on quality collaborator that raises key concerns during authoring (moderate mode) and runs a full structured interview when explicitly asked or when the orchestrator flags significant ambiguity (interrogator mode)

If a runtime offers no subagents, keep the same review loop inline and do not skip the agent-shaped reasoning just because the packaging is ignored.

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
- Skill classification: new/update/not-a-skill, capability vs workflow, and standalone/orchestrator/subordinate when relevant
- Final activation cues and anti-triggers used in the description
- Chosen folder structure and rationale
- At least three representative requests used as acceptance criteria
- Which optional helper agents were used, if any
- Validation commands run, pass/fail status, and interpretation
- Any repository-specific overlays applied after the portable draft
- Any follow-up actions, unresolved questions, or recommended issue links

See `references/skill-template-baseline.md` for the default folder structure and `SKILL.md` baseline template.

## Validation

See `references/validation-signals.md` for success signals, common failure signals, and recovery steps.

## Skill Readiness Checklist

Use `assets/skill-readiness-checklist.md` as the final-quality checklist for skill changes. Repository-specific PR requirements belong in repository instructions, not in the installable skill asset.

## Safety & constraints

Never:
- Request or expose secrets or credentials
- Run destructive commands without explicit user confirmation
- Invent validation results or evaluation evidence
- Modify unrelated files outside the requested scope
- Add hidden network access, remote-code execution patterns, or unsafe script guidance

Always:
- Keep `SKILL.md` concise and move overflow to direct references
- Make the discovery contract explicit in the description
- Prefer deterministic validation loops over hand-wavy advice
- Keep helper agents tightly scoped and ensure the core workflow still works when the runtime does not invoke them
- Respect the target catalog's naming, ownership, lifecycle, and release policy instead of hard-coding one repository's defaults
