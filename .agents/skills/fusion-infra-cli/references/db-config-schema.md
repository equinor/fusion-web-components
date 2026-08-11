# Database Provisioning Config Schema

Config file for `finf database provision -f <file>`. All fields are optional unless noted.

> **Source of truth**: [`ProvisionDatabaseCommand.cs`](https://github.com/equinor/fusion-core-services/blob/main/tooling/fusion-infra-cli/Fusion.Infra.Cli/Commands/Database/ProvisionDatabaseCommand.cs) and the [infra-cli README](https://github.com/equinor/fusion-core-services/blob/main/tooling/fusion-infra-cli/Fusion.Infra.Cli/README.md). If this file conflicts with the source, the source wins.

## Root object

```json
{
  "name": "string",
  "environment": "ci | fqa | fprd | pr",
  "pullRequest": { ... },
  "sqlPermission": { ... },
  "accessControl": { ... },
  "configuration": { ... },
  "metadata": { "key": "string" },
  "annotations": { "key": "string" }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | App name; used to derive DB name. Can be overridden with `-an`. |
| `environment` | string | Target environment. Can be overridden with `-e`. |
| `pullRequest` | object | PR-specific config. Can be supplied via CLI flags instead. |
| `sqlPermission` | object | SQL owner/contributor definitions. Can be supplied via CLI flags instead. |
| `accessControl` | object | Access control group names. Can be supplied via CLI flags instead. |
| `configuration` | object | Advanced database name/provisioning mode config. |
| `metadata` | object | Custom key-value metadata. |
| `annotations` | object | Custom key-value annotations (merged with auto-detected pipeline annotations). |

---

## `pullRequest` object

```json
{
  "pullRequest": {
    "pullRequestNumber": "123",
    "gitHubRepository": "equinor/my-repo",
    "copyFromEnvironment": "ci"
  }
}
```

All three fields can alternatively be passed as CLI flags: `-pr`, `-ghr`, `-c`.

---

## `sqlPermission` object

```json
{
  "sqlPermission": {
    "owners": [
      {
        "objectId": "guid (optional)",
        "clientId": "guid (optional)",
        "displayName": "string (optional)"
      }
    ],
    "contributors": [
      {
        "objectId": "guid (optional)",
        "clientId": "guid (optional)",
        "displayName": "string (optional)"
      }
    ]
  }
}
```

- **owners**: Full SQL control (db_owner)
- **contributors**: Read/write access (db_datareader + db_datawriter)
- Provide either `objectId` (Azure AD object ID) or `clientId` (app registration client ID)
- Can also be set via `--sql-owner-client-id`, `--sql-contributor-client-id`, etc. CLI flags

---

## `accessControl` object

```json
{
  "accessControl": {
    "administratorGroupName": "string",
    "developerGroupName": "string"
  }
}
```

Members of the admin group are auto-approved for owner access; developer group for contributor access.

---

## `configuration` object

```json
{
  "configuration": {
    "databaseFullyQualifiedName": "sql-myservice-[environment]",
    "provisioningMode": "string"
  }
}
```

The `[environment]` placeholder in `databaseFullyQualifiedName` is substituted with the resolved environment name.

---

## Minimal working example

```json
{
  "name": "my-service",
  "environment": "ci"
}
```

Permission principals are then supplied via CLI flags:
```bash
finf database provision -f db-config.json \
  --sql-owner-client-id <app-client-id> \
  --sql-contributor-client-id <app-client-id> \
  -o response.json --verbose
```

---

## Full example with permissions in file

```json
{
  "name": "context",
  "environment": "fqa",
  "sqlPermission": {
    "owners": [
      { "clientId": "<app-registration-client-id>" }
    ],
    "contributors": [
      { "clientId": "<app-registration-client-id>" }
    ]
  },
  "accessControl": {
    "developerGroupName": "Fusion Core Developers"
  }
}
```
