---
name: fusion-infra-cli
description: 'Provision and migrate Fusion databases using the fusion-infra-cli (finf). USE FOR: provision a database for a service, run SQL migrations, provision PR-specific ephemeral databases, check database state. DO NOT USE FOR: application code changes, service deployments, role management, or infrastructure other than databases.'
license: MIT
compatibility: >
  Requires finf installed as a .NET global tool from the Fusion-Public NuGet feed.
  Requires Azure CLI login (az login) or explicit token via -t flag.
metadata:
  version: "0.0.1"
  status: active
  owner: "@equinor/fusion-core"
  tags:
    - fusion
    - infra
    - database
    - cli
    - provisioning
    - migrations
    - devops
---

# Fusion Infra CLI

## When to use

Use when a Fusion service database needs to be provisioned or migrated — locally during development or inside CI/CD pipelines.

Typical triggers:
- "Provision the database for the context service"
- "Run migrations on the QA database"
- "Set up a PR database for this pull request"
- "What does the database provision config look like?"
- "The pipeline is failing on the database provision step"
- "Create a PR database that copies from CI"

## When not to use

- Application code or service changes — use the service repo
- Role or permission management — use `fusion-roles-cli`
- Infrastructure other than databases (networking, storage, etc.)
- Kubernetes or container management

## Prerequisites

Install `finf` as a .NET global tool:

```bash
dotnet tool install --global \
  --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" \
  Fusion.Infra.Cli
```

Update to latest:

```bash
dotnet tool update --global \
  --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" \
  Fusion.Infra.Cli
```

Auth uses `DefaultAzureCredential` automatically (picks up `az login` session). Pass `-t <token>` to override.

## Core workflow — provision a database

### 1. Create the provisioning config file

The config file defines the database resource. Minimal example (`db-config.json`):

```json
{
  "name": "my-service",
  "environment": "ci"
}
```

Full config with SQL permissions:

```json
{
  "name": "my-service",
  "environment": "fqa",
  "sqlPermission": {
    "owners": [
      { "clientId": "<app-registration-client-id>" }
    ],
    "contributors": [
      { "clientId": "<app-registration-client-id>" }
    ]
  }
}
```

See [references/db-config-schema.md](references/db-config-schema.md) for the full schema.

### 2. Run provisioning

**CI / non-production:**
```bash
finf database provision -f db-config.json -e ci \
  --sql-owner-client-id <client-id> \
  --sql-contributor-client-id <client-id> \
  -o response.json --verbose
```

**QA:**
```bash
finf database provision -f db-config.json -e fqa \
  --sql-owner-client-id <client-id> \
  --sql-contributor-client-id <client-id> \
  -o response.json --verbose
```

**Production** (add `--production` flag):
```bash
finf database provision -f db-config.json -e fprd \
  --production \
  --sql-owner-client-id <client-id> \
  --sql-contributor-client-id <client-id> \
  -o response.json --verbose
```

**Pull Request** (ephemeral database, copies from CI):
```bash
finf database provision -f db-config.json \
  -e pr -pr <pr-number> -ghr "equinor/my-repo" -c ci \
  --sql-owner-client-id <client-id> \
  --sql-contributor-client-id <client-id> \
  --timeout 500 -o response.json --verbose
```

### 3. Run migrations

After provisioning, apply SQL migrations:

```bash
# Non-production
finf database migrate -d sql-myservice-fqa -m migrations/ \
  -o migrations.json --verbose

# Production
finf database migrate -d sql-myservice-fprd -m migrations/ \
  --production -o migrations.json --verbose
```

The `-m` flag accepts a directory of `.sql` files or a single `.sql` file.

## Environments

| Key | Purpose |
|-----|---------|
| `ci` | Continuous integration |
| `fqa` | QA / pre-production |
| `fprd` | Production (requires `--production` flag) |
| `pr` | Pull request ephemeral (requires `-pr` and `-ghr`) |

## Full reference

For complete flag reference, run:
```bash
finf database provision --help
finf database migrate --help
```

Or see the source documentation:
- [README.md](https://github.com/equinor/fusion-core-services/blob/main/tooling/fusion-infra-cli/Fusion.Infra.Cli/README.md)
- [Source: tooling/fusion-infra-cli](https://github.com/equinor/fusion-core-services/tree/main/tooling/fusion-infra-cli)

## Safety

- Always use `--verbose` in pipelines to get diagnostic output
- Always save output with `-o response.json` so pipeline steps can reference the result
- The `--production` flag is an explicit guard — never omit it for `fprd` provisioning
- Never pass raw tokens in pipeline YAML — use secret variables and pass via `-t`
- `database delete` is irreversible for non-PR databases — confirm with user before running
