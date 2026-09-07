# APM Sync Workflow Patterns

Reusable and copyable GitHub Actions patterns for keeping declared APM dependencies current.

## Preconditions

- The consumer repository has an `apm.yml` with explicit dependencies.
- `apm.lock.yaml` and APM-deployed agent files are committed.
- The workflow has permission to push a branch and open a pull request.

APM updates declared dependencies only. It does not discover or install undeclared
Fusion skills automatically.

## Reusable workflow

Use the workflow hosted by `equinor/fusion-skills`:

**File path:** `.github/workflows/apm-sync.yml`

```yaml
name: APM Sync

on:
  schedule:
    - cron: '0 8 * * 1' # Weekly, Monday 08:00 UTC
  workflow_dispatch:

jobs:
  sync:
    uses: equinor/fusion-skills/.github/workflows/apm-sync.yml@main
    permissions:
      contents: write
      pull-requests: write
```

Pin `@main` to a Fusion Skills release tag when workflow behavior must remain fixed.

## Standalone template

Use this when the repository should own the complete workflow:

```yaml
name: APM Sync

on:
  schedule:
    - cron: '0 8 * * 1' # Weekly, Monday 08:00 UTC
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
    steps:
      - name: Check out repository
        uses: actions/checkout@v4

      - name: Update APM dependencies
        uses: microsoft/apm-action@v1
        with:
          apm-version: '0.29.0'
          update: 'true'

      - name: Open pull request if changed
        uses: peter-evans/create-pull-request@v8
        with:
          branch: chore/apm-sync
          delete-branch: true
          commit-message: 'chore(apm): sync dependencies'
          title: 'chore(apm): sync dependencies'
          body: |
            Automated APM dependency sync.

            Review changes to `apm.yml`, `apm.lock.yaml`, and deployed agent files before merging.
```

`microsoft/apm-action@v1` update mode runs non-interactive `apm update --yes`.
It refreshes every dependency to the newest version allowed by its declared ref
and redeploys owned files. The PR action commits only when the working tree changed.

## Adding a newly selected skill

Discovery remains a review-time decision. After Fusion MCP or the static catalog
identifies a skill, add that exact dependency:

```bash
apm install equinor/fusion-skills/skills/<skill>#^1.6.1 --target copilot
```

Review and commit `apm.yml`, `apm.lock.yaml`, and the deployed agent files
together. Subsequent scheduled updates are handled by the workflow above.

## Schedule reference

| Preference | Cron |
|------------|------|
| Daily, 08:00 UTC | `0 8 * * *` |
| Weekdays, 08:00 UTC | `0 8 * * 1-5` |
| Weekly (Monday), 08:00 UTC | `0 8 * * 1` |
| On-demand only | omit `schedule:`, keep `workflow_dispatch:` |

## Safety notes

- Keep dependency ranges bounded and review lockfile changes before merging.
- Do not pass credentials on the command line or embed them in workflow YAML.
- Keep `contents: write` and `pull-requests: write` scoped to this job.
- Do not add `--force`; investigate collisions or security findings instead.
