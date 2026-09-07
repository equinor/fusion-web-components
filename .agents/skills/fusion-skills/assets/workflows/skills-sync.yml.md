# Fusion Skills - APM Sync Workflow

Copy-pasteable workflow that keeps declared APM dependencies current through a reviewable pull request.

Save as `.github/workflows/apm-sync.yml` in your repository.

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

## What this does

- Runs `microsoft/apm-action` in update mode.
- Refreshes dependencies within constraints declared in `apm.yml`.
- Updates `apm.lock.yaml` and redeploys APM-managed context.
- Opens or updates one pull request when files change.

## Quick setup

```bash
mkdir -p .github/workflows
cp .agents/skills/fusion-skills/assets/workflows/skills-sync.yml.md /dev/stdout \
  | sed -n '/^```yaml$/,/^```$/p' | sed '1d;$d' \
  > .github/workflows/apm-sync.yml
git add .github/workflows/apm-sync.yml
git commit -m "ci: add APM sync workflow"
git push
```

Or copy the YAML block above into `.github/workflows/apm-sync.yml`.

APM updates declared dependencies only. Add newly selected skills explicitly with:

```bash
apm install equinor/fusion-skills/skills/<skill>#^1.6.1 --target copilot
```
