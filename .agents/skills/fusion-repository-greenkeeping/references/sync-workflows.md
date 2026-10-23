# APM sync workflows

Keep declared APM dependencies current through one reviewable pull request.
APM updates declared dependencies only; it never discovers undeclared skills.

## Preconditions

- Committed `apm.yml` with explicit dependencies, `apm.lock.yaml` and APM-deployed files.
- Actions settings permit checkout, Microsoft APM action and PR creation; job grants
  `contents: write` and `pull-requests: write`.
- Consumer and dependency visibility detected (below).

## Detect visibility first

Pattern and token depend on two facts; check both before proposing YAML.

1. Consumer: `gh repo view --json owner,visibility --jq '"\(.owner.login) \(.visibility)"'`.
2. Each `apm.yml` dependency repository (`owner/repo` from string or `git:` entries):
   `gh api repos/<owner>/<repo> --jq .visibility`. Not found or forbidden: treat as
   non-public and report access unverified.

`github.token` reads only its own repository, whatever the consumer's visibility, so any
internal or private dependency needs a named token. `equinor/fusion-skills` is internal:
every Fusion skills consumer needs one. Its Actions access is organization level
(checked 2026-10-20), so only internal/private `equinor` repositories can call its
reusable workflow.

| Consumer | Dependencies | Pattern | Token |
| --- | --- | --- | --- |
| `equinor` internal/private | Any internal/private (Fusion skills) | Reusable caller template | `apmTokenSecret` required |
| `equinor` internal/private | All public | Reusable caller template | `""` |
| Public, or other organization | Any internal/private | Standalone template | `dependencyTokenSecret` required |
| Public, or other organization | All public | Standalone template | `""` |

Choose standalone template on an internal repository only when maintainer needs local
control or customization. Public repository logs are public: never echo token values.
For public consumers, confirm the secret's repository access includes this repository;
an organization secret limited to private repositories does not reach it. Prefer a
short-lived GitHub App installation token over a personal access token.

## Fill reusable caller template

[`apm-sync-reusable.yml.hbs`](../assets/workflows/apm-sync-reusable.yml.hbs) `1.0.0` calls
shared `equinor/fusion-skills/.github/workflows/apm-sync.yml`; sync logic updates centrally,
so the caller rarely changes. Destination `.github/workflows/apm-sync.yml`, sidecar
`.github/workflows/apm-sync.inputs.json`. Example `.tmp/apm-sync-reusable.raw.json`:

```json
{
  "schedule": "0 8 * * 1",
  "workflowSha": "66d8b129b717462ac9d937cc37eab1ba1471a77a",
  "workflowVersion": "main",
  "updateBranch": "",
  "apmVersion": "",
  "apmTokenSecret": "APM_FUSION_SKILLS_TOKEN"
}
```

Pin `workflowSha` to a full commit SHA, never a branch or tag: shared workflow gets
`contents: write` and the token. Use newest release commit whose shared workflow declares
`secrets.apm-token`; `v1.9.0` lacks it, so example pins `main` merge of #314 until a
release includes it. Bump the SHA through the reviewed lifecycle. Empty
`updateBranch`/`apmVersion` inherit shared defaults. Output has the shape of
`equinor/fusion-core-apps`' working caller, SHA-pinned. Fill per [fill rules](common-workflows.md#fill-rules)
into new `.tmp/apm-sync.candidate.yml`, then follow [reviewed lifecycle](workflow-greenkeeping.md).

## Fill standalone template

[`apm-sync.yml.hbs`](../assets/workflows/apm-sync.yml.hbs) `1.1.0`; agent fills per
[fill rules](common-workflows.md#fill-rules). Output uses public actions and runs
independently of this skill. Hosted runner supplies Python 3, Git and `gh`.

All four raw inputs are required strings, fixed at fill time; workflow has no dispatch
inputs, so every run uses the reviewed branch and APM version. Change them by refilling.

| Input | Constraint |
| --- | --- |
| `schedule` | Five numeric cron fields, weekday `0–6`; `""` means manual-only. Numeric lists, ranges and positive steps supported, no aliases/names. Review GitHub's minimum five-minute interval separately. |
| `updateBranch` | Literal valid Git branch, different from repository default. Job also rejects default branch at runtime. |
| `apmVersion` | Exact stable SemVer. Start with shared maintained CLI default `0.33.0`, then review upgrades explicitly. |
| `dependencyTokenSecret` | Actions secret **name**, never value. Required for any internal/private dependency (all Fusion skills). `""` selects `github.token`, valid only when every dependency is public. |

Example `.tmp/apm-sync.raw.json`:

```json
{
  "schedule": "0 8 * * 1",
  "updateBranch": "chore/apm-sync",
  "apmVersion": "0.33.0",
  "dependencyTokenSecret": "APM_FUSION_SKILLS_TOKEN"
}
```

Name an approved secret, e.g. `APM_FUSION_SKILLS_TOKEN` (as in `equinor/fusion-framework`),
provisioned through GitHub UI or approved identity tooling. Prefer a short-lived GitHub App
installation token over a personal access token. Identity needs read access to every
dependency plus organization/SSO approval. Missing named secret fails explicitly; a sync
using `github.token` with internal dependencies is a finding, not a working setup. Non-GitHub registries, alternate hosts and Azure DevOps auth unsupported.

Fill into new `.tmp/apm-sync.candidate.yml`, then follow
[reviewed lifecycle](workflow-greenkeeping.md) for checks,
`.github/workflows/apm-sync.inputs.json` sidecar and approval.

## Runtime contract

- `microsoft/apm-action` (SHA-pinned `v1.10.0`) runs non-interactive `apm update --yes` within manifest
  constraints, then redeploys owned files. Dependency token reaches only update step,
  as `github-token` and `GITHUB_APM_PAT`.
- Git and `gh` keep one persistent branch and reuse its open PR. Default-branch advances
  merge first; conflicts need manual resolution. No force-push or branch deletion.
- Discards lockfile-only changes: APM rewrites `resolved_at` on every update, while a real
  update also changes deployed files. Lockfile plus deployed-file changes are committed;
  unchanged runs create no commit, push or PR.
- Pushes and PR creation use repository `github.token`, not dependency secret. Branch
  protection or organization policy may block them; token-created pushes trigger no
  downstream push workflows.
- PR title starts `☘️ ` and PR carries label `☘️ Fusion Greenkeep` (standalone `1.1.0`+ and
  shared workflow). Job creates missing label, adds it to an already-open sync PR, and fails
  if label cannot be applied. Repos enforcing Conventional Commit PR titles need adaptation.
- Missing `apm.yml` fails before updates. Dependency access failures come from APM;
  check secret visibility, repository access and SSO approval, never print tokens.
- Signed-commit requirements, special branch rules, proxy runners and other lockfile
  formats need reviewed adaptation. No auto-merge or live permission proof.

Verified sources: [action inputs](https://github.com/microsoft/apm-action/blob/v1/action.yml),
[action runner](https://github.com/microsoft/apm-action/blob/v1/src/runner.ts),
[APM 0.33.0 token precedence](https://github.com/microsoft/apm/blob/v0.33.0/src/apm_cli/core/token_manager.py).

## Schedule reference

| Preference | `schedule` |
| --- | --- |
| Daily, 08:00 UTC | `0 8 * * *` |
| Weekdays, 08:00 UTC | `0 8 * * 1-5` |
| Weekly (Monday), 08:00 UTC | `0 8 * * 1` |
| Manual only | `""` |

Keep dependency ranges bounded and review lockfile changes before merge. Never pass
credentials on command line, embed them in YAML or add `--force`.
