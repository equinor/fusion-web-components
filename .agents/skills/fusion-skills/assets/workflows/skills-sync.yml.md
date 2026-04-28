# Fusion Skills — Sync + Discover Workflow

Copy-pasteable combined workflow that keeps installed skills up to date and discovers new ones.

Save as `.github/workflows/fusion-skills-sync.yml` in your repository.

```yaml
name: Fusion Skills Sync

on:
  schedule:
    - cron: '0 8 * * 1'   # Weekly, Monday 8 AM UTC
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

jobs:
  upgrade:
    name: Upgrade installed skills
    uses: equinor/fusion-skills/.github/workflows/skills-update.yml@main

  discover:
    name: Discover new skills
    uses: equinor/fusion-skills/.github/workflows/skills-discovery.yml@main
    with:
      source: equinor/fusion-skills
```

## What this does

- **`upgrade`** — checks installed skills for new versions and creates a single PR with all updates.
- **`discover`** — scans the source catalog for newly released skills and creates one PR per new skill.

Both jobs run in parallel. No secrets needed — they use `github.token` automatically.

## Quick setup

```bash
mkdir -p .github/workflows
cp .agents/skills/fusion-skills/assets/workflows/skills-sync.yml.md /dev/stdout \
  | sed -n '/^```yaml$/,/^```$/p' | sed '1d;$d' \
  > .github/workflows/fusion-skills-sync.yml
git add .github/workflows/fusion-skills-sync.yml
git commit -m "ci: add Fusion skills sync + discover workflow"
git push
```

Or simply copy the YAML block above into `.github/workflows/fusion-skills-sync.yml`.
