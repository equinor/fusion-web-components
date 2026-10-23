# Reviewed common workflow lifecycle

Load [catalogue](common-workflows.md), then only selected [APM](sync-workflows.md),
[single-app](app-deployment.md), [Changesets monorepo](app-monorepo-deployment.md) or
[Copilot setup](copilot-setup.md) guide. No automatic consumer rollout.

## Inspect before proposing

1. Read repo-local instructions and identify requested repository/app boundary.
   Stay in advice mode unless maintainer approves local setup/update scope.
2. Inspect every workflow by purpose, including reusable calls and renamed files.
   For APM look for `microsoft/apm-action`/APM updates or reusable sync calls; for
   apps look for Fusion publish action/CLI, Changesets release management and
   deployment environments; for Copilot look for `copilot-setup-steps.yml` and
   `copilot-code-review.yml`. Filename or provenance-comment matching alone does not
   prove ownership.
3. Report missing/ambiguous/duplicate matches. One existing matching purpose
   means compare that file, not create a second workflow under standard name.
4. Verify selected catalogue prerequisites locally. For APM inspect committed
   manifest/lock/managed files, branch/PR permissions, and consumer plus dependency
   visibility, which decide reusable call vs standalone template and whether a token
   is needed ([APM](sync-workflows.md#detect-visibility-first)).
   For single apps inspect app-root manifest/lock/CLI; for monorepos inspect root
   lock/CLI, Changesets scripts and explicit workspace mappings. Check Node/package
   manager, config opt-in, Fusion audience and target app/environment choices.
   Monorepo release events need GitHub App/PAT credential, not github.token fallback.
5. Ask maintainer to confirm secret/variable **names**, authorization and GitHub
   protections through approved administration channels. Never read/print their
   values. Unknown access is unverified, not a passing prerequisite.
6. Confirm immutable source commit/release pin and every raw input. Check installed
   skill provenance through APM metadata; do not edit installed skill copies.

Missing prerequisite blocks install with concrete remedy, e.g. commit app/workspace-root
lockfile, choose supported CLI, configure named secret, obtain app authorization
or install `actionlint` through repo policy. Do not install tools,
download/execute scripts or trigger a workflow just to hide a failed prerequisite.

## Initial setup

With no matching workflow and confirmed prerequisites:

1. Fill selected template per [fill rules](common-workflows.md#fill-rules) into new
   `.tmp/<id>.candidate.yml`. Never overwrite an earlier candidate unreviewed.
2. Prepare `.github/workflows/<id>.inputs.json` sidecar with complete raw inputs
   (for monorepo, `apps` array, not `appsJson` string); never credential values:

   ```json
   {
     "sourcePin": "<immutable-source-commit-or-release-tag>",
     "inputs": {}
   }
   ```

3. Check candidate: YAML parses, `actionlint` when available, intact Actions
   expressions, permissions, `bash -n` on shell steps, then target-repo required
   checks. Report unavailable tools; never claim lint ran when only YAML parsed.
4. Show candidate/sidecar diff and destination. Explain branch, auth and trigger
   choices, prerequisite limits and runtime effects.
5. Apply only after approval. Follow repo-local commit/PR policy; local setup
   approval does not permit pushes, Actions runs or deployments.

## Repeat setup and versioned updates

Read sidecar and YAML provenance together. Require recognized template ID/version,
valid immutable source pin and complete raw inputs. A header is a claim, not
proof that installed workflow equals generated source.

- Same source/version/inputs, already installed purpose: report no change.
  Preserve existing formatting, triggers, environments and local customizations.
  If maintainer asks to reconcile drift, use update comparison below; do not
  quietly reset local differences.
- New source/version or changed inputs: read original template at sidecar pin
  as **data**, reproduce original baseline with its original input contract,
  then fill proposed baseline with confirmed inputs. Read old template as text;
  never execute fetched content.
- If original source/schema cannot be reproduced safely, block automatic update.
  Obtain maintainer decision for manual comparison/adoption instead.
- Compare original baseline, installed file and proposed baseline. Local-only
  edits must survive. Inputs/sidecar changes also require review; do not silently
  change configured environment, identity names or branch.

For reproducible three-way text comparison using staged local files:

```bash
git merge-file -p .tmp/installed.yml .tmp/old-baseline.yml .tmp/new-baseline.yml > .tmp/merged-candidate.yml
```

Use a new candidate path. Exit `0` means text merge succeeded, **not** that workflow
is semantically safe. Positive conflict-count status means stop and show conflict
markers; negative/error status means comparison failed. Never apply conflicted
output. Even disjoint text edits can change semantics: validate merged YAML and
review trigger/environment/permission/auth interactions before approval.

Show old/new template version and pin, full local diff, retained customizations,
any decisions and actual validation results. Apply YAML and sidecar together only
after approval. No generated timestamps or normalization-only rewrites.

## Unknown provenance and conflicts

- Unversioned workflow, malformed/missing sidecar, unknown ID/version or unavailable
  old source: label **blocked automatic update**, not safe replacement.
- Inventory current customizations and compare against a newly filled reference
  only as evidence. Ask whether to adopt, retain manually or defer.
- Adoption needs explicit confirmation of mapping from existing purpose to template,
  preserved/discarded local choices, baseline/input provenance and complete diff.
  Do not manufacture an old source pin or claim a custom workflow was template-owned.
- Overlapping changes: show affected lines and options (keep local, take proposed,
  manual merge, defer). Wait for choice, validate resolved candidate, then seek
  application approval. Never reinterpret “update template” as “overwrite”.

## Worked examples

| Situation | Expected result |
| --- | --- |
| Public APM repo, no sync job | Fill local standalone YAML, not internal reusable call; record explicit dependency auth choice and reviewed source pin. |
| Internal `equinor` repo with Fusion skill dependencies, e.g. `fusion-core-apps` | Fill reusable caller template with `apmTokenSecret`; existing hand-written caller is unknown provenance, offer reviewed adoption. |
| Public repo with Fusion skill dependencies, e.g. `fusion-framework` | Standalone template with `dependencyTokenSecret`; confirm secret reaches public repo. |
| Existing sync with Fusion skill dependencies but no token | Finding: `github.token` cannot clone internal `equinor/fusion-skills`; set `apmTokenSecret` (reusable caller) or `dependencyTokenSecret` (standalone). |
| Same APM inputs/pin, workflow already present under another name | No duplicate or needless diff; inspect purpose, retain original path and corresponding sidecar. |
| App with verified CLI, app-root lock and protected `ci`/`fqa`/`fprd` GitHub environments | Fill manual-only OIDC workflow with confirmed ordered environment list; permissions/federation remain unverified until maintainer checks them. |
| Repository without Copilot setup, pnpm lockfile committed | Fill setup steps with exact Node/pnpm; after merge confirm workflow run passed; no secrets or extra tools added. |
| .NET service with seven solutions, `global.json`, no lock files | Fill .NET block with `global.json` pin, its directory as .NET working directory and each solution as restore target, no `--locked-mode`; add Node block only if a frontend exists. |
| Changesets app monorepo with configured release scripts | Reuse existing release manager or fill monorepo template; allowlist packages, require release-event credential, deploy released app through Fusion action. |
| Workflow copied from `apm/templates/apm-sync.yml` or custom deploy script | Unknown provenance: inventory local choices, offer reviewed adoption; never replace. |
| App upgrade changes runtime guard; local extra notification step | Reproduce old baseline, carry notification forward, validate merged candidate and show diff. |
| App local environment edits overlap template upgrade | Block, show competing environment choices and wait. No automatic promotion. |
| Missing APM secret/app lockfile, or missing old source pin | Give exact remedy; no setup-success message, fallback YAML or destructive replacement. |

Expected report: template/applicability, inspected workflow path, prerequisite
results, version/pin/inputs, **no change / blocked / candidate**, retained
customizations, reviewable diff, validation and requested approval. Distinguish
filled, applied, committed, published and executed; never collapse into “done”.
