---
name: fusion-repository-greenkeeping
description: 'Sets up and maintains reviewed repository workflows while preserving local configuration. USE FOR: APM sync automation, single-app Fusion deployment, Changesets app-monorepo releases, Copilot setup steps, Copilot readiness checks of setup and review instructions, read-only Greenkeeper enrolment readiness reports, workflow prerequisites, repeated setup, provenance-aware upgrades and customization conflicts. DO NOT USE FOR: skill discovery/install/update (use fusion-skills), general app maintenance (use fusion-app-greenkeeping), dependency PR reviews, backend/portal deployment, arbitrary CI generation or unattended rollout.'
license: MIT
compatibility: No runtime dependencies; agent fills templates by hand. Optional actionlint validates filled YAML. Consumer workflow prerequisites depend on selected template; no MCP or service authentication needed.
metadata:
  version: "0.2.1"
  status: experimental
  owner: "@equinor/fusion-core"
  tags:
    - repository-maintenance
    - greenkeeping
    - github-actions
    - workflows
    - apm
    - deployment
    - changesets
    - copilot
---

# Repository Workflow Greenkeeping

Own reviewed workflow assets and lifecycle; not skill management or deployment platform.
Start with [catalogue](references/common-workflows.md) and
[reviewed lifecycle](references/workflow-greenkeeping.md). Load only selected input guide.
Copilot readiness requests: run [readiness check](references/copilot-readiness.md) instead;
fill setup template only when check recommends it and maintainer agrees.
Greenkeeper enrolment readiness: run [readiness report](references/greenkeeper-readiness.md); read-only.

## When to use

- "Set up APM sync" / "keep our skills dependencies updated in CI" (public or private repo).
- "Add deployment workflow for this Fusion app" / "deploy apps released by Changesets".
- "Set up copilot-setup-steps" / "Copilot can't build or test this Node or .NET repo".
- "Check our Copilot instructions" / "why does Copilot review ignore our rules?"
- "Is this repo ready for the Greenkeeper?" / "what must we fix before enrolling?"
- "Is our workflow template current?" / "update deploy workflow, keep our changes".
- Repeat setup, provenance-aware updates, customization conflicts.

## When not to use

- Discover/install/update skills: `fusion-skills`.
- Broader app maintenance: `fusion-app-greenkeeping`; specific dependency PR: `fusion-dependency-review`.
- Backend/portal deployment, arbitrary CI generation, automatic fleet rollout or promotion.

## Required inputs

Establish target repo/app boundaries, inspect/setup/update intent, repository instructions,
existing workflows, immutable source pin and selected template's complete non-secret inputs.
Ask only for missing decisions. Default to advice; local implementation needs approved scope.
Collect secret/variable names and authorization evidence, never credential values.

## Instructions

1. Inspect workflows by purpose, not filename. Reuse existing release manager;
   missing, duplicate or ambiguous matches need explicit maintainer decision.
2. Choose [APM](references/sync-workflows.md), [single app](references/app-deployment.md)
   [Changesets monorepo](references/app-monorepo-deployment.md) or
   [Copilot setup](references/copilot-setup.md). Verify prerequisites;
   unavailable access/tooling is blocked/unverified, not a passing deployment check.
3. Fill selected template by hand per [fill rules](references/common-workflows.md#fill-rules)
   into new staging file. Stop on any slot value breaking its header rule; never
   sanitize or guess. No network, credential reads or installation.
4. Same source/version/inputs: propose no change. For updates, reproduce old source as
   data and compare original/installed/proposed. Preserve local edits; stop on conflicts
   or unknown provenance. Never execute fetched content or overwrite installed YAML.
5. Validate generated YAML, Actions expressions, permissions and shell syntax.
   Show complete workflow/sidecar diff, retained customizations and exact results.
   Apply only after approval; local approval does not authorize push, dispatch or deployment.
6. At completion or recoverable failure, run `fusion-skills` warden **feedback** mode on run
   evidence (attribution, dedupe, publishing). Never permits unattended workflow application.

## Expected output

Selected template/applicability, inspected workflow path, prerequisites/unknowns,
version/pin/inputs, **no change / blocked / candidate**, reviewable diff, retained
customizations, actual validation and requested approval. Distinguish filled,
applied, committed, published and executed.
Include toolchain feedback outcome and links, separate from validation outcome.

## Example

User: "Set up APM sync for this repo."
Agent: finds no workflow with APM update purpose; confirms committed `apm.yml`/lockfile;
detects consumer visibility and internal `equinor/fusion-skills` dependencies. Internal
`equinor` repo: fills reusable caller template with `apmTokenSecret`. Public repo: fills
standalone template with `dependencyTokenSecret`. Both name `APM_FUSION_SKILLS_TOKEN`;
parses and lints candidate. Shows diff; waits for approval.
Avoid: relying on `github.token` for internal dependencies, calling the internal reusable
workflow from a public repo, or reporting setup done after filling only. More cases: [worked examples](references/workflow-greenkeeping.md#worked-examples).

## Repository-policy handoff

Target repository owns validation, commits, changesets, PR templates and issue linkage.
Read its instructions at point of use; do not substitute this catalog's contributor rules.

**Greenkeeping marker.** Every issue/PR this skill creates: title starts `☘️ ` before local title
format (e.g. `☘️ ci: adopt APM sync workflow`); label `☘️ Fusion Greenkeep`. Missing label: ask before
`gh label create "☘️ Fusion Greenkeep" --color 2DA44E --description "Fusion greenkeeping"`; if declined,
publish without label and report. Repo-enforced title rule rejects prefix: keep label, follow rule, report conflict.
APM sync templates mark their own PRs; see [runtime contract](references/sync-workflows.md#runtime-contract).

## Safety & constraints

This skill is mutation-capable. Repository-local workflow instructions take precedence over inline guidance when they conflict.

- No secrets, fetched-code execution, hidden network calls or automatic workflow application.
- Invalid inputs/fill-check failures: show specific remedy; never generate success-shaped fallback.
- Unknown provenance/conflicts: block update and wait for reviewed adoption/resolution.
- No pushes, PR mutations, destructive changes, workflow dispatch or deployment without explicit confirmation.
- Feedback issues/comments need confirmation unless trusted runtime policy allows them.
- Template source verification/offline fixtures do not prove consumer authorization or live behavior.
