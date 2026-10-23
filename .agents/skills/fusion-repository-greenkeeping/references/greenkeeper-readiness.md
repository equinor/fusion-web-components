# Greenkeeper readiness report

Agent-run, read-only check: is repository ready to enrol in Fusion Greenkeeper?
One report (one issue), not finding stream. Objective checks; every verdict cites evidence.
Change nothing; publish only after confirmation. Checklist source: "Getting ready" in
[discussion 2519](https://github.com/equinor/fusion-core-tasks/discussions/2519)
(starting proposal; adjust with pilot experience).

## Verdicts

One per check:

- **ready**: evidence shows pass.
- **not ready**: evidence shows fail, or required item verifiably absent.
- **unverified**: check could not run (no access, tool missing, no data). Never passing.

Overall **ready** only when all five ready. Else **not ready**; count not-ready and unverified checks.

## Rules

- Read-only: no writes, installs, builds, test runs, workflow dispatch, issue/PR or label
  changes. CI evidence only; never substitute local build.
- Read commands only (`git`, `gh ... list/view/api` GET, registry metadata reads).
  Command fails or access denied: unverified; record command and error.
- Record every command. Never print tokens or secret values.
- Default branch: `gh repo view --json defaultBranchRef --jq .defaultBranchRef.name`;
  fallback `git symbolic-ref refs/remotes/origin/HEAD`. Unknown: all CI checks unverified.

## Checks

Run in order; order ranks fix priority.

### 1. Default branch builds and tests pass in CI

1. Find build/test workflows by purpose, not filename: read both `.github/workflows/*.yml` and
   `.github/workflows/*.yaml`, or list them with
   `gh api repos/<owner>/<repo>/actions/workflows --jq '.workflows[] | "\(.path) \(.state)"'`.
   Keep active workflows with build/test steps triggered by default-branch push or schedule.
   None: **not ready** (Greenkeeper cannot validate).
2. Per workflow (`<file>` = file name, either extension):
   `gh run list --workflow <file> --branch <default> --status completed --limit 1 --json conclusion,url,headSha,createdAt`.
3. Any latest conclusion not `success` (`failure`, `cancelled`, `timed_out`, ...):
   **not ready**; link run URL. All `success`: **ready**; link each run, note `headSha`
   and whether it matches default-branch HEAD.
4. Command fails, Actions disabled or no completed run: **unverified**.

### 2. Agent instructions exist and are current

Reuse [Copilot readiness check](copilot-readiness.md) inventory and instruction checks; don't duplicate.

- **not ready**: no `.github/copilot-instructions.md` or `AGENTS.md`; or broken path/link,
  missing command, unmatched `applyTo` or conflicting directives (misleads unattended runs).
- `CODEMAP.md` optional; present: listed paths must exist, else **not ready**. Use
  `fusion-general-greenkeeping` CODEMAP lane when installed; else check paths directly.
- **ready**: instructions present, no such findings. Info-level size/duplication listed, not blocking.
- Copilot environment (setup steps) findings: list separately; don't affect verdict.

### 3. Fusion skill packages installed with APM and current

1. `apm.yml` declares `equinor/fusion-skills` dependency and `apm.lock.yaml` committed.
   Either missing: **not ready**; remedy [APM sync](sync-workflows.md).
2. Latest release: `gh api repos/equinor/fusion-skills/releases/latest --jq .tag_name`;
   compare each fusion-skills `resolved_ref` in `apm.lock.yaml`.
3. All at latest: **ready**. Any behind: **not ready**; list locked vs latest, open sync PR
   (`gh pr list --state open --search "chore(apm): sync dependencies in:title" --json url`),
   and `apm.yml` range excluding latest major.
4. Release lookup denied/fails: **unverified** (repository internal).

### 4. Known large migrations done or recorded as deferred

Known migration = major-version gap on declared Fusion-owned dependency:
`@equinor/fusion-framework*`, `@equinor/fusion-react-*`, `@equinor/eds-*` (npm),
`Fusion.*` / `Equinor.Fusion.*` (NuGet); plus migration named in open dependency-bot major PR.

1. Compare declared range with registry latest (`npm view <pkg> version`; NuGet
   `https://api.nuget.org/v3-flatcontainer/<id>/index.json`). Major behind = migration.
2. Deferred = open issue, ADR or repository instruction naming migration as deliberately deferred; link it.
3. No gaps or all deferred: **ready**. Unrecorded gap: **not ready**; remedy: migrate
   (`fusion-app-greenkeeping` for apps) or record deferral.
4. Registry unreachable or private feed denied: **unverified** for that package.

Don't judge migration difficulty or compatibility.

### 5. Repository has an owner who will review

Use `fusion-general-greenkeeping` ownership lane when installed; it respects documented
local conventions. Else:

1. Ownership recorded: CODEOWNERS (`.github/`, root or `docs/`) with rule covering all files
   (`*`), or ownership convention the repository documents (e.g. `docs/ownership.md`).
   Neither: **not ready**.
2. CODEOWNERS used: `gh api repos/<owner>/<repo>/codeowners/errors --jq '.errors | length'`
   must be `0`; errors: **not ready**, quote them. Request fails: **unverified**.
3. Ask maintainer to confirm named owner reviews Greenkeeper issues/PRs.
   Confirmed: **ready**, record who. Not asked or declined: **unverified**.

## Enrol (only when ready)

Config format pends pilot design
([equinor/fusion-core-tasks#2539](https://github.com/equinor/fusion-core-tasks/issues/2539));
never invent file name or schema. Report:

1. Opt in per enrolment guidance in equinor/fusion-core-tasks#2539.
2. Start type `apm` only, output `issue`, weekly, small open-item limit.
3. Add `frontend`, `backend` or `general` one at a time once `apm` trusted.
4. Switch type to pull requests only after its issues consistently accepted.
5. Pause or opt out any time; close proposal (with reason) to stop it.

Not ready: list fixes in check order instead; re-run after fixing.

## Report

Fill [readiness report template](../assets/greenkeeper-readiness-report.md.hbs) per
[fill rules](../assets/partials/agent-content/README.md); show in chat first. Publish as issue
only after maintainer confirms the shown report. Publish request made before report shown is
intent, not confirmation; can't ask (non-interactive): stop, state issue not created. Publish
refused or failed: report error, never retry via another command or API. Issue follows
`SKILL.md` greenkeeping marker rules; title `☘️ Greenkeeper readiness: ready` or
`☘️ Greenkeeper readiness: not ready`.
Finish: confirm `git status --porcelain` unchanged from start.
