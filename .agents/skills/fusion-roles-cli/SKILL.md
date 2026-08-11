---
name: fusion-roles-cli
description: 'Deploy and manage Fusion Roles V2 configuration using the fusion-roles-cli (froles). USE FOR: deploy role config from a JSON file, create roles/bindings/assignments, export current role state, inspect role assignments. DO NOT USE FOR: database provisioning, application code changes, Azure AD group management outside role bindings, or Roles V1 management.'
license: MIT
compatibility: >
  Requires froles installed as a .NET global tool from the Fusion-Public NuGet feed.
  Requires Azure CLI login (az login) or explicit token via -t flag.
metadata:
  version: "0.0.1"
  status: active
  owner: "@equinor/fusion-core"
  tags:
    - fusion
    - roles
    - cli
    - rbac
    - role-config
    - devops
---

# Fusion Roles CLI

## When to use

Use when Fusion Roles V2 resources (roles, bindings, assignments, scope types) need to be created or updated from a config file, or when existing role state needs to be inspected or exported.

Typical triggers:
- "Deploy the roles config for my service"
- "Create roles from this JSON file"
- "Export the current role config for fusion-myservice"
- "What does a roles config file look like?"
- "Add a binding for this Entra group"
- "Check what roles are assigned to this account"
- "Dry-run the role deployment"

## When not to use

- Database provisioning — use `fusion-infra-cli`
- Managing Azure AD groups themselves — use the Azure portal or Graph API
- Roles V1 (legacy system) — this tool targets Roles V2 only
- Application code changes

## Prerequisites

Install `froles` as a .NET global tool:

```bash
dotnet tool install --global \
  --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" \
  Fusion.Roles.Cli
```

Update to latest:

```bash
froles --update
```

Auth uses `DefaultAzureCredential` automatically (picks up `az login` session). Pass `-t <token>` to override.

## Core workflow — deploy a role config

### 1. Create the config file

The config file is a JSON file declaring all role resources for your system. Always include the `$schema` reference — it enables editor validation and autocompletion.

Minimal example (`roles-config.json`):

```json
{
  "$schema": "https://rolesv2.api.fusion.equinor.com/public/schemas/role-config.schema.json",
  "accessRoles": [
    {
      "systemIdentifier": "my-service",
      "name": "MyService.Project.Read",
      "description": "Read access to project resources"
    }
  ],
  "roles": [
    {
      "name": "project-viewer",
      "displayName": "Project Viewer",
      "accessRoleMappings": [
        { "accessRoleIdentifier": "MyService.Project.Read" }
      ]
    }
  ]
}
```

See [references/role-config-schema.md](references/role-config-schema.md) for the full schema with all resource types and field definitions.

### 2. Dry-run to verify changes

Always dry-run before deploying to catch unexpected changes:

```bash
froles create -e ci --file roles-config.json --dry-run
```

The dry-run shows exactly what will be created, patched, or left unchanged — including binding diffs showing added/removed roles.

### 3. Deploy

```bash
# CI
froles create -e ci --file roles-config.json

# QA
froles create -e fqa --file roles-config.json

# Production
froles create -e fprd --file roles-config.json
```

`create` is **idempotent** — safe to run repeatedly. Resources are matched on natural keys; only changed fields are patched.

### 4. Export current state (optional)

To export the current configuration for a system (useful for initial onboarding or auditing):

```bash
froles export my-service -e ci -o current-state.json
```

The export file can be modified and fed back into `create`.

## Reconciliation behaviour

The `create` command reconciles each resource type against its natural key:

| Resource | Natural key | Behaviour |
|----------|------------|-----------|
| Scope types | `name` | Create if missing; patch `description` if changed |
| Access roles | `systemIdentifier` + `name` | Create if missing; patch if changed |
| Roles / claimable roles | `name` | Create if missing; patch if changed; access role mappings fully reconciled |
| Bindings | `identifier` | Patch all fields; diff shows role/group additions and removals |
| Role assignments | `roleIdentifier` + `source` + `externalIdentifier` | Create if missing; skip if exists |

**Important**: Access role mappings on roles/claimable roles are **fully reconciled** — mappings absent from the config are removed. Only access roles belonging to systems declared in the config file are managed.

## Environments

| Key | Purpose |
|-----|---------|
| `ci` | Continuous integration |
| `fqa` | QA / pre-production |
| `fprd` | Production |
| `tr` | Training environment |

## Full reference

For complete command and flag reference, run:
```bash
froles --help
froles create --help
```

Or see the source documentation:
- [README.md](https://github.com/equinor/fusion-core-services/blob/main/tooling/fusion-roles-cli/Fusion.Roles.Cli/README.md)
- [USING_CREATE_COMMAND.md](https://github.com/equinor/fusion-core-services/blob/main/tooling/fusion-roles-cli/Fusion.Roles.Cli/USING_CREATE_COMMAND.md)
- [Source: tooling/fusion-roles-cli](https://github.com/equinor/fusion-core-services/tree/main/tooling/fusion-roles-cli)

## Safety

- Always dry-run before deploying to production
- Access role mapping reconciliation removes unmapped roles — review the dry-run output carefully
- Never store tokens in config files; always use `-t <token>` from a secret variable in pipelines
- `delete role-assignments` is destructive — confirm with user and dry-run first
