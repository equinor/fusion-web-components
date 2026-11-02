---
name: fusion-repository-greenkeeping
description: 'Sets up, audits and maintains repository workflows and APM setup, preserving local edits. USE FOR: GitHub Actions audits, APM sync and health, Fusion app or Changesets deployment, Copilot setup and readiness, Dependabot config, Greenkeeper enrolment readiness, template upgrades and conflicts. DO NOT USE FOR: skill install/update (use fusion-skills), AI editor rules or instructions (use fusion-rules), app health (fusion-app-greenkeeping), dependency PRs, backend/portal deployment, arbitrary CI or unattended rollout.'
license: MIT
compatibility: No runtime dependencies; agent fills templates by hand. Optional actionlint validates filled YAML. Consumer workflow prerequisites depend on selected template; no MCP or service authentication needed.
metadata:
  version: "0.4.2"
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
    - dependabot
    - actions-security
    - ci-hygiene
---

# Repository Workflow Greenkeeping

Own reviewed workflows/lifecycle, not skill management or deployment platform. Route mode first.

## When to use

- APM sync/health; Fusion single-app/Changesets deployment; Copilot setup/readiness.
- Dependabot/pinned Actions, workflow security/runtime/runner audits.
- Greenkeeper enrolment readiness; repeat setup, template upgrades/customization conflicts.

## When not to use

- Discover/install/update skills: `fusion-skills`.
- Broader app maintenance: `fusion-app-greenkeeping`; dependency PR: `fusion-dependency-review`.
- Backend/portal deployment, arbitrary CI, automatic fleet rollout/promotion.
- Renovate configuration or dependency PR auto-merge.

## Required inputs

Repo/app boundary, intent, instructions, workflows, immutable source pin, complete non-secret
inputs. Ask missing decisions only. Default advice; local work needs approved scope.
Collect secret/variable names and authorization evidence, never values.

## Repository-policy handoff

Repo owns validation, commits, changesets, PR templates/linkage. Read instructions at use;
never substitute catalog policy.

**Greenkeeping marker.** Created issue/PR titles start `☘️ ` before local format
(e.g. `☘️ ci: adopt APM sync workflow`); label `☘️ Fusion Greenkeep`. Missing label:
ask before `gh label create "☘️ Fusion Greenkeep" --color 2DA44E --description "Fusion greenkeeping"`.
Declined: publish without label and report. Repo title rule rejects prefix: follow rule,
keep label, report conflict. For APM-generated PR markers, read
[runtime contract](references/sync-workflows.md#runtime-contract).

## Safety & constraints

This skill is mutation-capable. Repository-local workflow instructions take precedence over inline guidance when they conflict.

- No secrets, fetched-code execution, hidden network calls or automatic workflow application.
  Filling: no network, credential reads or installation.
- Audit: read-only; run `actionlint`, `zizmor` or `apm` only after approval of exact command.
- Readiness reports: no writes, installs, builds/tests or dispatch; CI evidence only.
  Show report before publication confirmation. Denied/failed publication: stop, no alternate API/retry.
- Invalid inputs/fill-check failures: stop with specific remedy, never sanitize, guess or generate fallback.
- Unknown provenance/conflicts: block update; wait for reviewed adoption/resolution. Preserve local edits.
- Apply candidate only after approval. Local approval never authorizes push, PR mutation,
  destructive change, dispatch or deployment; each needs explicit confirmation.
- Feedback issues/comments need confirmation unless trusted runtime policy allows them.
- Source verification/offline fixtures never prove consumer authorization or live behavior.

## Instructions

1. Route mode; read selected contract:

   | Mode | Read for procedure |
   | --- | --- |
   | Actions audit | [Actions audit](references/actions-hygiene.md) |
   | APM health audit | [APM health](references/apm-health.md) |
   | Copilot readiness | [readiness check](references/copilot-readiness.md); setup only if recommended and maintainer agrees |
   | Greenkeeper enrolment readiness | [readiness report](references/greenkeeper-readiness.md); also [Copilot checks](references/copilot-readiness.md) for instruction inventory |
   | Template setup/repeat/upgrade/adoption | [catalogue/fill rules](references/common-workflows.md) and [reviewed lifecycle](references/workflow-greenkeeping.md) |

   Audit: report first; edit only selected findings' files. Template-owned fixes use lifecycle.
2. Template work: match purpose, reuse release manager; missing/duplicate/ambiguous matches
   need maintainer decision. Read selected guide/asset header:

   | Template | Guide | Asset |
   | --- | --- | --- |
   | APM | [inputs/visibility](references/sync-workflows.md) | [standalone](assets/workflows/apm-sync.yml.hbs) or [reusable](assets/workflows/apm-sync-reusable.yml.hbs) |
   | Single app | [inputs](references/app-deployment.md) | [template](assets/workflows/app-deploy.yml.hbs) |
   | Changesets monorepo | [inputs](references/app-monorepo-deployment.md); [shared action/prerequisites](references/app-deployment.md#shared-action) | [template](assets/workflows/app-monorepo-deploy.yml.hbs) |
   | Copilot setup | [inputs](references/copilot-setup.md) | [template](assets/workflows/copilot-setup-steps.yml.hbs) |
   | Dependabot | [inputs](references/dependabot.md) | [template](assets/config/dependabot.yml.hbs) |

   Verify prerequisites; missing access/tools stay blocked/unverified. After SHA pinning,
   check bots; absent: offer Dependabot; existing: report, never overwrite.
3. Fill by hand per [fill rules](references/common-workflows.md#fill-rules) into new staging file.
   Same source/version/inputs: no change. Updates: reproduce old source as data, compare
   original/installed/proposed; preserve edits, block conflict/unknown provenance.
4. Validate YAML, Actions expressions, permissions/shell syntax. Show full workflow/sidecar
   diff, retained edits and exact results; seek application approval.
5. Completion/recoverable failure: run `fusion-skills` warden **feedback** mode for
   attribution/dedupe/publishing. Unavailable: report feedback blocked, not workflow authority.

## Expected output

Template/applicability/path, prerequisites/unknowns, version/pin/inputs,
**no change / blocked / candidate**, diff, retained edits, validation and approval ask.
Distinguish filled, applied, committed, published and executed.
Audit: scope (repo, commit/dirty, files read, date), respected conventions, findings with
stable ID, priority, class (`confirmed`/`suggestion`/`unknown`/respected convention),
evidence path:line, impact, smallest fix; admin/network unknowns; tools run or "not run".
Include feedback outcome/links separately from validation.

When filling readiness report, read [template](assets/greenkeeper-readiness-report.md.hbs),
[fill rules](assets/partials/agent-content/README.md) and named partials:
[banner](assets/partials/agent-content/banner.hbs), [TL;DR](assets/partials/agent-content/tldr.hbs),
[details](assets/partials/agent-content/details.hbs), [references](assets/partials/agent-content/references.hbs).

## Example

When explaining APM setup, read [example](references/workflow-example.md).
For repeat/adoption/conflict examples, read [worked examples](references/workflow-greenkeeping.md#worked-examples).
