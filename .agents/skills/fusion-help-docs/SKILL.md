---
name: fusion-help-docs
description: 'Guides app teams through authoring, structuring, and publishing help documentation (articles, release notes, FAQs) using the fusion-help-cli. USE FOR: write help articles, create release notes, set up help docs, publish documentation, sync articles, configure help config file, maintain app help content. DO NOT USE FOR: building the CLI itself, modifying Fusion.Services.Help internals, or non-documentation tasks.'
license: MIT
metadata:
  version: "0.0.1"
  status: active
  owner: "@equinor/fusion-core"
  tags:
    - help-documentation
    - fusion-help-cli
    - articles
    - release-notes
    - faq
---

# Fusion Help Documentation

Use this skill to help app teams author, structure, and publish help documentation (articles, release notes, FAQs) to the Fusion Help system using the `fhelp` CLI.

## When to use

- User wants to write a help article for their Fusion app
- User wants to create or update release notes
- User wants to set up the docs folder structure and config file for their app
- User needs help structuring markdown content for the help system
- User wants to publish/sync documentation to a Fusion environment
- User asks about FAQs or how to add FAQ entries
- User wants to set up a CI/CD pipeline to auto-publish help docs

## When not to use

- Modifying the `fusion-help-cli` source code itself (that lives in `tooling/fusion-help-cli/`)
- Changing the Fusion.Services.Help backend API
- General markdown editing unrelated to Fusion Help
- Non-documentation tasks

## Required inputs

Before creating documentation, collect:

| Input | Required | Description |
|-------|----------|-------------|
| **App key** | Yes | The Fusion app key (e.g. `my-app`, `resource-allocation-landingpage`). User must be admin for this app. |
| **Content type** | Yes | `articles`, `release-notes`, or `faqs` |
| **Docs root path** | Yes | Where the team stores their docs (e.g. `docs/help/`) |
| **Target environment** | For publish | `ci`, `fqa`, `tr`, or `fprd` |

If the user doesn't know their app key, point them to:
- **CI**: `https://fusion.ci.fusion-dev.net/apps/app-admin` 
- **Production**: `https://fusion.equinor.com/apps/app-admin`

Open the app and look for the "Admins" section — you must be listed as admin to publish articles.

## Instructions

### 1. Set up docs folder structure

Create the standard directory layout in the team's repository:

```
docs/
  help/
    articles/                    # Markdown article files
      images/                    # Article images (PNG format)
    release-notes/               # Markdown release note files
      images/                    # Release note images (PNG format)
    faqs/                        # Optional: markdown FAQ body overrides
    help-articles.json           # Article config
    help-release-notes.json      # Release notes config (if using release notes)
```

> The actual folder names and config file names are flexible — they just need to match what you pass to `fhelp`. The above is a recommended convention.

### 2. Create the article config file

The config file tells the CLI which articles to sync and their metadata. Create `help-articles.json`:

```jsonc
{
  "articles": [
    {
      "slug": "my-app-getting-started",        // Must match the .md filename (without extension)
      "title": "Getting Started",               // Display title in Fusion Help
      "appKey": "my-app",                       // Your Fusion app key
      "sortOrder": 1.0,                         // Controls display order (lower = first)
      "summary": "Learn how to get started.",   // Short description shown in article list
      "tags": ["getting-started", "onboarding"],// Searchable tags
      "relevantApps": []                        // Optional: other app keys where this shows
    }
  ]
}
```

#### Config field reference

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `slug` | Yes | string | Unique identifier. Must match a `{slug}.md` file in the articles root folder. Use kebab-case. |
| `title` | Yes | string | Human-readable title displayed in Fusion Help. |
| `appKey` | Yes | string | Fusion app key this article belongs to. You must be admin for this app. |
| `sortOrder` | No | number | Controls display order. Lower numbers appear first. Default varies. Use decimals (1.0, 1.1, 2.0) for flexible ordering. |
| `summary` | Yes | string | Short description shown in article listings. |
| `tags` | No | string[] | Searchable tags for categorization. |
| `relevantApps` | No | string[] | Additional app keys where this article should appear. |

### 3. Write article content

Create markdown files in the articles root folder. The filename (without `.md`) must match the `slug` in the config.

**Article writing guidelines:**

- Write in clear, concise language aimed at end-users of the Fusion app
- Use headings (`##`, `###`) to structure content — avoid `#` as the title comes from config
- Use images to illustrate UI workflows — place them in the `images/` subfolder
- Image references in markdown use standard syntax: `![Alt text](images/my-screenshot.png)`
- The CLI automatically uploads images and rewrites paths to the Fusion CDN
- **Images must be PNG format** — this is a current CLI limitation
- Keep articles focused on a single topic or workflow
- Link to related articles by mentioning their title (deep linking is handled by the platform)

**Example article** (`docs/help/articles/my-app-getting-started.md`):

```markdown
## Overview

This guide walks you through the basics of using My App.

## Prerequisites

Before you begin, make sure you have:
- Access to the Fusion portal
- The correct role assigned to your user

## Step 1: Navigate to the app

Open Fusion and search for "My App" in the app launcher.

![App launcher](images/app-launcher.png)

## Step 2: Create your first item

Click the **New** button in the toolbar to create your first item.

## Need help?

Contact the team on Teams or check the FAQ section.
```

### 4. Create the release notes config file (optional)

If the team publishes release notes, create `help-release-notes.json`:

```jsonc
{
  "releaseNotes": [
    {
      "slug": "my-app-v2-release",              // Must match the .md filename
      "title": "Version 2.0 Release",           // Display title
      "appKey": "my-app",                       // Your Fusion app key
      "publishedDate": "2026-03-14T00:00:00Z",  // Publication date (ISO 8601)
      "tags": ["release", "v2"],                // Searchable tags
      "relevantApps": []                        // Optional: other app keys
    }
  ]
}
```

#### Release notes config field reference

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `slug` | Yes | string | Unique identifier. Must match a `{slug}.md` file in the release notes root folder. |
| `title` | Yes | string | Release note title. |
| `appKey` | Yes | string | Fusion app key. You must be admin. |
| `publishedDate` | Yes | ISO 8601 date | When the release was published. |
| `tags` | No | string[] | Searchable tags. |
| `relevantApps` | No | string[] | Additional app keys. |

**Example release note** (`docs/help/release-notes/my-app-v2-release.md`):

```markdown
## What's new in Version 2.0

### New dashboard

We've completely redesigned the dashboard with new charts and filtering capabilities.

![New dashboard](images/new-dashboard.png)

### Performance improvements

- Page load times reduced by 40%
- Search results now appear in under 1 second

### Bug fixes

- Fixed an issue where filters would reset on navigation
- Corrected date formatting in the export feature
```

### 5. Install and authenticate the CLI

**Install from the Fusion Public feed:**

```powershell
dotnet tool install --global --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" Fusion.Help.Cli
```

**Update an existing installation:**

```powershell
dotnet tool uninstall --global Fusion.Help.Cli
dotnet tool install --global --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" Fusion.Help.Cli
```

**Authenticate via Azure CLI:**

```powershell
az login
```

The CLI uses `DefaultAzureCredentials` — it will pick up your `az login` session automatically.

### 6. Publish documentation

**Sync articles:**

```powershell
fhelp article sync -f docs/help/help-articles.json -r docs/help/articles -e ci -v
```

**Sync release notes:**

```powershell
fhelp releasenotes sync -f docs/help/help-release-notes.json -r docs/help/release-notes -e ci -v
```

**Command flags:**

| Flag | Description |
|------|-------------|
| `-f`, `--file` | Path to the JSON config file |
| `-r`, `--root` | Path to the folder containing markdown files |
| `-e`, `--env` | Target environment: `ci`, `fqa`, `tr`, `fprd` |
| `-t`, `--token` | Override the access token (optional) |
| `-v`, `--verbose` | Show detailed logging output |
| `--no-validation` | Skip source system check — **use with caution**, can overwrite UI-created content |

**Environment promotion order:** `ci` → `fqa` → `fprd` (skip `tr` unless testing infrastructure).

Always test in `ci` first before promoting to `fqa` and then `fprd`.

### 7. Set up CI/CD pipeline (recommended)

Automate documentation publishing in your Azure DevOps pipeline or GitHub Actions workflow.

**Azure DevOps pipeline example:**

```yaml
parameters:
  - name: environment
    type: string
    default: ci
    values: [ci, fqa, fprd]
  - name: azureSubscription
    type: string

steps:
  - checkout: self

  - script: |
      dotnet tool install --global --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" Fusion.Help.Cli
    displayName: "Install fusion help CLI"

  - task: AzureCLI@2
    displayName: "Sync help articles"
    inputs:
      azureSubscription: ${{ parameters.azureSubscription }}
      scriptType: pscore
      scriptLocation: inlineScript
      inlineScript: |
        fhelp article sync `
          -f ./docs/help/help-articles.json `
          -r ./docs/help/articles `
          -e "${{ parameters.environment }}" `
          -v

  - task: AzureCLI@2
    displayName: "Sync release notes"
    inputs:
      azureSubscription: ${{ parameters.azureSubscription }}
      scriptType: pscore
      scriptLocation: inlineScript
      inlineScript: |
        fhelp releasenotes sync `
          -f ./docs/help/help-release-notes.json `
          -r ./docs/help/release-notes `
          -e "${{ parameters.environment }}" `
          -v
```

**GitHub Actions example:**

```yaml
name: Sync Help Documentation

on:
  push:
    branches: [main]
    paths: ['docs/help/**']

jobs:
  sync-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup .NET
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: '8.0.x'

      - name: Install fusion help CLI
        run: |
          dotnet tool install --global \
            --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" \
            Fusion.Help.Cli

      - name: Azure Login
        uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZURE_CLIENT_ID }}
          tenant-id: '3aa4a235-b6e2-48d5-9195-7fcf05b459b0'
          subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}

      - name: Sync articles
        run: |
          fhelp article sync \
            -f ./docs/help/help-articles.json \
            -r ./docs/help/articles \
            -e ci -v
```

### 8. FAQs (supplementary)

FAQs use an Excel-based workflow and require app-level access. This is a temporary solution best suited for scenarios where FAQs span multiple apps.

```powershell
fhelp faq sync -f docs/help/faqs.xlsx -e ci -v
```

For most teams, managing FAQs through the Fusion Help Admin UI at `https://fusion.equinor.com/apps/fusion-help-admin` is simpler.

## Expected output

When this skill completes, the user should have:

- A `docs/help/` folder structure with articles root, images folder, and config file(s)
- One or more markdown article files with proper content
- A valid `help-articles.json` (and optionally `help-release-notes.json`)
- Knowledge of how to install, authenticate, and run `fhelp` to publish
- Optionally, a CI/CD pipeline snippet for automated publishing

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| `DefaultAzureCredential failed to retrieve a token` | Not authenticated | Run `az login` |
| `403 Forbidden` | Not an admin for the app key | Check admin list at the app admin page, or verify the `appKey` in your config |
| Article not created (skipped) | No matching `.md` file in root folder | Ensure filename matches slug exactly: `{slug}.md` |
| Source system mismatch warning | Article was created via UI, CLI won't overwrite | Use `--no-validation` carefully, or use a different slug |
| Images not uploading | Wrong format | Images must be **PNG** format |

## Safety & constraints

- **Never use `--no-validation` without understanding the consequences** — it can overwrite content that was manually created through the Fusion Help Admin UI
- Always test in `ci` before publishing to `fprd` (production)
- The `sourceSystem` is automatically set to `Fusion.Help.Cli` — articles created by the CLI and articles created via the UI have different source systems and won't conflict unless `--no-validation` is used
- Slugs must be globally unique across all apps — use an app-specific prefix (e.g. `my-app-getting-started`)
- Do not commit access tokens to source control — rely on `az login` or pipeline service principals
