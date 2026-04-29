# Follow-up questions

Use these when required inputs are missing or ambiguous while creating a new skill or materially modernizing an existing one.

## 1. Decide whether this should be a skill

- Is this a net-new skill, an update to an existing skill, or better handled as docs, templates, or scripts without adding a skill?
- What recurring workflow, domain knowledge, or repeated preference would the skill capture?
- What would be lost if this stayed as a one-off prompt instead of a reusable skill?

## 2. Name and placement

- What is the base skill name in kebab-case (without the default `custom-` prefix)?
- Does this repository use a naming prefix, namespace, or catalog convention that should override the default `custom-<base-skill-name>` naming?
- What is the final skill name after applying any local naming convention or the default `custom-` prefix?
- Where should it live in this repository's skill or catalog layout?
- If this is an update, which existing skill directory is the source of truth?

## 3. Skill type and composition

- Is this a capability skill or a workflow / encoded-preference skill?
- Should it be standalone, an orchestrator, or a subordinate?
- If subordinate, which orchestrator should invoke it?
- If orchestrator, which companion skills or responsibilities should it coordinate?

## 4. Discovery cues

- What exact phrases should activate this skill?
- Which nouns, file types, repository terms, or task keywords should appear in the description?
- What should explicitly not trigger this skill?
- What would a false positive look like for this skill?

## 5. Outputs and structure

- Which files should be created or updated by default (`SKILL.md`, `references/`, `assets/`, optional `agents/`, optional `scripts/`)?
- What should stay in `SKILL.md`, and what should move to `references/` or `assets/`?
- Do you want examples inline in `SKILL.md` or stored in `references/`?
- Would a small helper-agent set improve scoping, review, or trigger tuning, or would that be overkill?
- Does deterministic automation justify a `scripts/` directory, or is documentation enough?

## 6. Runtime and compatibility

- Which tools or MCP servers are required versus merely suggested?
- Are there network, package, runtime, or product-surface constraints that belong in `compatibility`?
- Should the skill document client-specific tool naming or execution expectations?
- Does this repository enforce ownership, lifecycle, release, or validation rules that should stay in repo-local instructions instead of the shipped skill package?

## 7. Safety and approvals

- Which actions must never happen automatically?
- Which commands or mutations require explicit user confirmation before execution?
- Are there privacy, compliance, or operational constraints beyond the default guardrails?

## 8. Evaluation scenarios

- Give three representative user requests this skill must handle well.
- For each scenario, what should the agent produce or decide?
- What common mistake, omission, or unsafe behavior should the skill prevent?

## 9. Answer quality signals

Good answers are:
- specific enough to write a concrete description,
- explicit about anti-triggers and safety,
- realistic about required tools and runtime assumptions.

Red flags:
- vague names such as `helper` or `utils`,
- descriptions that say only what the skill does but not when to use it,
- adding `agents/` with no clear scoping, review, or tuning job,
- adding `scripts/` with no deterministic need,
- no realistic evaluation scenarios.

