---
name: fusion-skill-authoring
description: 'Creates or modernizes installable skills. USE FOR: new skills, SKILL.md structural refreshes, activation wording, references, assets and helper agents. DO NOT USE FOR: product code, copy edits outside skills/, or ordinary docs, templates and scripts without skill-routing value.'
license: MIT
compatibility: Works best in repositories that can inspect their local skill catalog and run catalog-specific validation commands. Optional helper agents are most useful in Anthropic-compatible runtimes or other clients that support skill-local agents/subagents.
metadata:
   version: "0.3.9"
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

Create skills under `skills/`, e.g. "Scaffold `skills/<name>/SKILL.md`"; refresh structure/discovery/support. Recurring workflows or safety boundaries may justify skills.

## When not to use

Product code outside `skills/`, tiny typos, ordinary docs/templates/scripts without skill-routing value, unrelated refactors, destructive commands or hidden network automation.

## Required inputs

Collect operation (new/update/not-a-skill), target repo/directory, base/final kebab-case names, purpose/outcome, triggers/domain keywords/anti-triggers, output files/commands/decisions, safety/approvals. Default name: `custom-<base-skill-name>` unless local convention differs.

- When inputs are missing/ambiguous, read `assets/follow-up-questions.md` for targeted questions.
- When naming, composition, ownership/lifecycle/release, runtime/MCP, helpers/scripts, sponsor/assets or related follow-up matters, read `references/authoring-inputs.md` for conditional intake.
- Before writing skill files, read `references/metadata-contract.md` and validate every field; preserve existing metadata except requested changes.

## Safety & constraints

Never request/expose secrets, invent validation/evidence, change unrelated files, or add hidden network access, remote-code execution or unsafe script guidance. Require explicit confirmation before destructive commands.

Before editing `SKILL.md`, `references/`, `assets/` or `agents/`, inspect `apm.yml` and `apm.lock.yaml` provenance/deployed-file ownership. External dependency means installed copy: do not edit in place. State `<source>` and overwrite risk from `apm install`/`apm update`; offer source-repo work or bug/improvement draft. Only override after explicit one-off consent accepting impermanence. No APM files, no matching ownership or current-repo source: proceed.

Portable first, local overlays second. Repository instructions/catalog docs own naming, ownership/lifecycle, release and validation policy. Keep core workflow usable without native helper adapters; required review still applies inline.

## Instructions

### Step 1 — Check for installed-copy provenance before editing

Apply provenance gate above before edits.

### Step 2 — Decide whether this should be a skill at all

Check catalog first. Reuse/update covering skills; improve almost-matches or propose an issue instead of duplicates. Do not scaffold ordinary docs, templates/checklists, standalone scripts or tiny edits without reusable skill behavior.

### Step 3 — Define representative requests before drafting

Define at least three realistic requests: trigger, expected behavior and mistake/gap to prevent. Use as acceptance criteria. Where possible, run without skill and record baseline gaps; write only guidance closing them. Without realistic requests, scope is underspecified.

During scoping/drafting, raise 2–3 concerns (scope, triggers, safety, dependencies, structure); resolve from evidence or recommend action without interview. Respect user opt-out. When scoping is complex, read and apply `agents/scoper.md`; when requested to stress-test or significant ambiguity remains, read and apply `agents/devils-advocate.md` for bounded interview. Moderate concern review remains core, not an optional helper dependency.

### Step 4 — Classify the skill and choose the smallest valid structure

Choose `capability uplift` or `workflow / encoded preference`; `standalone`, `orchestrator` or `subordinate`. Keep `SKILL.md`; earn `references/`, `assets/`, `agents/` and `scripts/` by need. No reference chains.

### Step 5 — Draft the minimum viable `SKILL.md`

When drafting/restructuring, read `references/drafting-guide.md` for type/composition definitions, folder decisions, freedom/style, examples and support rules. Keep activation, inputs, ordered steps, outputs and safety in entry; defer detail conditionally. Include concrete example inline or directly linked.

When platform/runtime details matter, read `references/skill-authoring-platform-references.md` for content/runtime guidance and local overlay conditions. When scaffolding needs a baseline, read `references/skill-template-baseline.md`; avoid unneeded folders.

### Step 6 — Add supporting files only when they reduce ambiguity

Add narrowly useful support; link directly with load condition/purpose. Helpers are read-and-apply Markdown instructions; apply roles inline without adapter. Scripts require deterministic need, dependencies/side effects, validated inputs/actionable errors and explicit network boundaries; never remote-code execution. MCP: declare `metadata.mcp`, name server and tool; client ids vary.

### Step 7 — Validate discovery, structure, and local policy

Run target-supported catalog inventory/schema, naming/ownership/lifecycle/composition and relevant script/GraphQL/lint/tests. Without dedicated tooling, read entry and every directly referenced file fully; verify requests, paths and assumptions.

Review requests for correct activation/anti-triggers, reachable files without chains, explicit outputs/approvals/safety. When headless runtime permits, run in fresh installed workspace, compare baseline and each target model, repeat requests and record actual files read/ignored. For complex post-draft review, read and apply `agents/reviewer.md`; when discovery wording is main risk, read and apply `agents/trigger-tuner.md`.

On validation failure, read `references/validation-signals.md` for recovery; revise/rerun until pass or report blocker. Always read `assets/skill-readiness-checklist.md` before completion. Apply local release/versioning overlays after portable package passes.

### Step 8 — Report what changed and what still needs input

Use output contract below.

## Expected output

Return paths; new/update/not-a-skill, type/composition; activation/anti-triggers; chosen structure/rationale; three requests and measured baseline/post-change results; helpers used; exact validation outcomes/meaning; local overlays; follow-ups, unresolved inputs and recommended issue links. Never imply unrun checks passed.
