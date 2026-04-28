# Sync Workflow Patterns

Canonical workflow YAML patterns for the `sync` agent mode.

Both workflows are reusable and hosted at `equinor/fusion-skills`.
Consumers call them with `uses:` and provide a schedule and optional `with:` inputs.

---

## 1. Skill Update Workflow

**Purpose:** Refresh installed skills when new versions are released. Creates one PR with all updated skill files and per-skill changelog notes. Also scans for deprecated/archived skills and creates replacement or removal PRs (installs successor when available).

**File path:** `.github/workflows/skills-update.yml`

### Minimal consumer pattern

```yaml
name: Upgrade Agent Skills
on:
  schedule:
    - cron: '0 8 * * 1'  # Weekly, Monday 8 AM UTC
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

jobs:
  upgrade:
    uses: equinor/fusion-skills/.github/workflows/skills-update.yml@main
```

### With optional inputs

```yaml
name: Upgrade Agent Skills
on:
  schedule:
    - cron: '0 8 * * 1'
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

jobs:
  upgrade:
    uses: equinor/fusion-skills/.github/workflows/skills-update.yml@main
    with:
      skip-deprecation-cleanup: false    # set true to disable deprecation scan
      draft-deprecation-prs: false       # set true for draft removal PRs
      skip-if-rejected-pr-exists: true   # respect previously-rejected PRs
      skip-successor-install: false      # set true to only remove (don't install replacement)
      skills-source: equinor/fusion-skills  # source repo for successor installs
```

### Available `with:` inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `skip-deprecation-cleanup` | boolean | `false` | Disable the deprecation scan and removal PRs |
| `draft-deprecation-prs` | boolean | `false` | Create deprecation removal PRs as drafts |
| `skip-if-rejected-pr-exists` | boolean | `true` | Skip re-proposing removal when a previous PR was closed without merge |
| `skip-successor-install` | boolean | `false` | Only remove deprecated skills — don't auto-install their successors |
| `skills-source` | string | `equinor/fusion-skills` | GitHub `owner/repo` used as source when installing successor skills |

### Required permissions

- `contents: write` — commit skill changes
- `pull-requests: write` — create and manage PRs

No secrets setup needed. The workflow uses `github.token` automatically.

---

## 2. Skill Discovery Workflow

**Purpose:** Detect newly released skills in the source catalog and create one PR per new skill for independent review and merge.

**File path:** `.github/workflows/skills-discovery.yml`

### Minimal consumer pattern

```yaml
name: Discover New Agent Skills
on:
  schedule:
    - cron: '0 8 * * 1-5'  # Weekdays 8 AM UTC
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

jobs:
  discover:
    uses: equinor/fusion-skills/.github/workflows/skills-discovery.yml@main
    with:
      source: equinor/fusion-skills
```

### With optional inputs

```yaml
name: Discover New Agent Skills
on:
  schedule:
    - cron: '0 8 * * 1-5'
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

jobs:
  discover:
    uses: equinor/fusion-skills/.github/workflows/skills-discovery.yml@main
    with:
      source: equinor/fusion-skills
      ignore-file: .github/skills-ignore.json
      draft-prs: false
      skip-if-rejected-pr-exists: true
```

### Available `with:` inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `source` | string | `equinor/fusion-skills` | Skills source repository for `npx skills add --list` |
| `ignore-file` | string | `.github/skills-ignore.json` | Path to the ignore list in the target repository |
| `draft-prs` | boolean | `false` | Create skill addition PRs as drafts |
| `skip-if-rejected-pr-exists` | boolean | `true` | Skip proposing a skill when a previous PR for that skill was closed without merge |

### Required permissions

- `contents: write` — create branches and commit skill files
- `pull-requests: write` — create and manage PRs

---

## 3. Skills Ignore List

**Purpose:** Exclude specific skills from the discovery workflow.

**File path:** `.github/skills-ignore.json`

```json
{
  "ignored": [
    "fusion-example-skill",
    "fusion-experimental-feature"
  ]
}
```

- Must be valid JSON
- Array values are skill names (not file paths)
- Used by the discovery workflow's `ignore-file` input
- Does not affect the update workflow (updates only affect already-installed skills)

---

## Schedule reference

| Preference | Cron |
|------------|------|
| Daily, 8 AM UTC | `0 8 * * *` |
| Weekdays, 8 AM UTC | `0 8 * * 1-5` |
| Weekly (Monday), 8 AM UTC | `0 8 * * 1` |
| On-demand only | omit `schedule:`, keep `workflow_dispatch:` |

---

## Pinning to a release tag

Replace `@main` with a specific tag to pin behavior and avoid unexpected breaking changes:

```yaml
uses: equinor/fusion-skills/.github/workflows/skills-update.yml@v1.2.3
```

Check `equinor/fusion-skills` releases for the latest stable tag.
