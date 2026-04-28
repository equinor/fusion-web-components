# fusion-help-cli Reference

## Installation

```powershell
# Install from Fusion Public feed
dotnet tool install --global --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" Fusion.Help.Cli

# Update (uninstall + reinstall)
dotnet tool uninstall --global Fusion.Help.Cli
dotnet tool install --global --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" Fusion.Help.Cli
```

## Authentication

The CLI uses `DefaultAzureCredential` from the Microsoft Identity SDK. The simplest method is Azure CLI:

```powershell
az login
```

For CI/CD pipelines, use a service principal:

```powershell
az login --service-principal -u <app-id> -p <client-secret> --tenant 3aa4a235-b6e2-48d5-9195-7fcf05b459b0
```

Alternatively, pass a JWT token directly via the `--token` flag.

## Commands

### `fhelp article sync`

Syncs article markdown files to the Fusion Help API.

```
fhelp article sync -f <config-file> -r <articles-root> -e <environment> [-t <token>] [--no-validation] [-v]
```

| Flag | Required | Description |
|------|----------|-------------|
| `-f`, `--file` | Yes | Path to the articles JSON config file |
| `-r`, `--root` | Yes | Root folder containing `.md` article files and `images/` |
| `-e`, `--env` | Yes | Fusion environment: `ci`, `fqa`, `tr`, `fprd` |
| `-t`, `--token` | No | Override the access token |
| `--no-validation` | No | Skip source system validation (can overwrite UI content) |
| `-v`, `--verbose` | No | Enable verbose/information-level logging |

**Behavior:**
1. Reads the config JSON and iterates each article entry
2. Looks for `{root}/{slug}.md` — skips if file not found
3. Scans markdown for image references, uploads any local images to the Help assets API
4. Rewrites image paths to the Fusion CDN (`/help-proxy/assets/resources/images/{slug}/processed.webp`)
5. Checks if the article already exists on the server (by slug)
6. Creates (POST) if new, patches (PATCH) if changed, skips if unchanged
7. Validates `sourceSystem` matches — refuses to overwrite UI-created articles unless `--no-validation` is set

### `fhelp releasenotes sync`

Syncs release note markdown files to the Fusion Help API.

```
fhelp releasenotes sync -f <config-file> -r <release-notes-root> -e <environment> [-t <token>] [--no-validation] [-v]
```

Flags and behavior are identical to `article sync`, but uses the `releaseNotes` array in the config and includes a `publishedDate` field.

### `fhelp faq sync`

Syncs FAQs from an Excel file. This is a temporary solution for multi-app FAQs.

```
fhelp faq sync -f <excel-file> -e <environment> [-r <faq-root>] [-p <slug-prefix>] [-t <token>] [--no-validation] [-v]
```

| Flag | Required | Description |
|------|----------|-------------|
| `-f`, `--file` | Yes | Path to the Excel file with FAQ data |
| `-e`, `--env` | Yes | Fusion environment |
| `-r`, `--root` | No | Root folder for optional markdown body overrides (looks for `faq-{identifier}.md`) |
| `-p`, `--prefix` | No | Prefix for generated FAQ slugs |

> **Note:** FAQ sync requires APP ACCESS via internal API functions — not available to all users.

## Environments

| Environment | Purpose | URL pattern |
|-------------|---------|-------------|
| `ci` | Continuous integration / development testing | `https://help.ci.api.fusion-dev.net` |
| `fqa` | QA / acceptance testing | `https://help.fqa.api.fusion-dev.net` |
| `tr` | Infrastructure testing (rarely used for docs) | `https://help.tr.api.fusion-dev.net` |
| `fprd` | Production | `https://help.fprd.api.fusion-dev.net` |

**Promotion order:** `ci` → `fqa` → `fprd`

## Source system

The CLI stamps all content with `sourceSystem: "Fusion.Help.Cli"`. Content created via the Fusion Help Admin UI has a different source system (`fusion-help-admin`). The CLI will not overwrite content from a different source system unless `--no-validation` is used.

## Image handling

- Images must be **PNG** format
- Place images in an `images/` subfolder under the article/release-notes root
- Reference them in markdown with standard syntax: `![Alt text](images/screenshot.png)`
- The CLI hashes each image and creates a unique slug (`img-{article-slug}-{hash}`)
- Images are only uploaded if they don't already exist (based on the hash slug)
- After upload, markdown paths are rewritten to `/help-proxy/assets/resources/images/{slug}/processed.webp`

## Slug naming conventions

Slugs must be globally unique across all apps. Recommended pattern:

```
{app-prefix}-{topic}
```

Examples:
- `fra-getting-started`
- `my-app-new-features`
- `my-app-v2-release`
