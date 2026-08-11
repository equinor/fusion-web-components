# Role Config Schema

Config file for `froles create --file <path>`. All sections are optional — include only what you need to manage.

> **Canonical schema**: [`https://rolesv2.api.fusion.equinor.com/public/schemas/role-config.schema.json`](https://rolesv2.api.fusion.equinor.com/public/schemas/role-config.schema.json) — this is the live, authoritative schema. See also [USING_CREATE_COMMAND.md](https://github.com/equinor/fusion-core-services/blob/main/tooling/fusion-roles-cli/Fusion.Roles.Cli/USING_CREATE_COMMAND.md) and [sample-create-file.json](https://github.com/equinor/fusion-core-services/blob/main/tooling/fusion-roles-cli/Fusion.Roles.Cli/sample-create-file.json).

**Always add the `$schema` reference** for editor validation and autocompletion:

```json
{
  "$schema": "https://rolesv2.api.fusion.equinor.com/public/schemas/role-config.schema.json"
}
```

---

## Root object

```json
{
  "$schema": "string (recommended)",
  "scopeTypes": [ ScopeType ],
  "accessRoles": [ AccessRole ],
  "roles": [ Role ],
  "claimableRoles": [ ClaimableRole ],
  "bindings": [ Binding ],
  "roleAssignments": [ RoleAssignment ],
  "claimableRoleAssignments": [ ClaimableRoleAssignment ],
  "deleteRoleAssignments": [ DeleteRoleAssignmentRequest ]
}
```

All arrays are optional. Omit sections you don't manage.

---

## ScopeType

Defines a scope dimension used to constrain roles (e.g. `project`, `contract`).

```json
{
  "name": "string (required — unique key)",
  "description": "string (optional)"
}
```

**Example:**
```json
{ "name": "project", "description": "Project scope" }
```

---

## AccessRole

An API permission owned by a system. Access roles are the leaf permissions that roles aggregate.

```json
{
  "systemIdentifier": "string (required — owning system identifier)",
  "name": "string (required — unique within system)",
  "description": "string (optional)",
  "scopeTypeIdentifier": "string (optional — links to a scope type)"
}
```

**Unique key**: `systemIdentifier` + `name`

**Example:**
```json
{
  "systemIdentifier": "my-service",
  "name": "MyService.Project.Write",
  "description": "Write access to project resources",
  "scopeTypeIdentifier": "project"
}
```

---

## Role

A named role that groups access roles. Users are assigned roles, not access roles directly.

```json
{
  "name": "string (required — unique key)",
  "displayName": "string (optional)",
  "description": "string (optional)",
  "accessRoleMappings": [
    {
      "accessRoleIdentifier": "string (access role name — required)",
      "reason": "string (optional — explains why this mapping exists)"
    }
  ]
}
```

**Warning**: `accessRoleMappings` is **fully reconciled** — mappings absent from the config are removed. Only access roles from systems declared in the config file are managed.

**Example:**
```json
{
  "name": "project-editor",
  "displayName": "Project Editor",
  "description": "Can edit project resources",
  "accessRoleMappings": [
    {
      "accessRoleIdentifier": "MyService.Project.Write",
      "reason": "Editors need write access"
    }
  ]
}
```

---

## ClaimableRole

Same structure as `Role`. Users can self-service claim these roles.

```json
{
  "name": "string (required — unique key)",
  "displayName": "string (optional)",
  "description": "string (optional)",
  "accessRoleMappings": [ ... ]
}
```

---

## Binding

Links an Entra (Azure AD) group to roles or claimable roles, optionally scoped.

```json
{
  "identifier": "string (required — unique key)",
  "system": "string (required — owning system identifier)",
  "description": "string (optional)",
  "reason": "string (optional — explains binding purpose)",
  "type": "string (e.g. 'EntraGroup')",
  "sourceSystem": "string (e.g. 'Entra')",
  "version": "string (optional)",
  "binding": {
    "version": "string (optional)",
    "group": {
      "id": "GUID (Entra group object ID)",
      "name": "string (optional — display name only)"
    },
    "roles": [
      {
        "name": "string (role name)",
        "type": "string (optional)",
        "scope": {
          "scopeTypeIdentifier": "string",
          "isGlobal": "boolean (true for global scope)",
          "value": "string (scope value; null when isGlobal=true)"
        }
      }
    ],
    "claimableRoles": [
      {
        "name": "string (claimable role name)",
        "type": "string (optional)",
        "scope": { ... }
      }
    ]
  }
}
```

**Note**: The binding diff in dry-run output shows exactly which roles/groups are added or removed.

**Example — global role binding:**
```json
{
  "identifier": "admins-global-binding",
  "system": "my-service",
  "type": "EntraGroup",
  "sourceSystem": "Entra",
  "binding": {
    "group": { "id": "04a439f6-cfc2-430b-8345-77d5a0151ef7" },
    "roles": [
      {
        "name": "project-editor",
        "scope": { "isGlobal": true }
      }
    ]
  }
}
```

**Example — scoped role binding:**
```json
{
  "identifier": "project-alpha-editors",
  "system": "my-service",
  "type": "EntraGroup",
  "sourceSystem": "Entra",
  "binding": {
    "group": { "id": "04a439f6-cfc2-430b-8345-77d5a0151ef7" },
    "roles": [
      {
        "name": "project-editor",
        "scope": {
          "scopeTypeIdentifier": "project",
          "isGlobal": false,
          "value": "project-alpha"
        }
      }
    ]
  }
}
```

---

## RoleAssignment

A direct role assignment for a specific identity.

```json
{
  "roleIdentifier": "string (required — role name)",
  "accountIdentifier": "string (optional — email or UPN)",
  "source": "string (e.g. 'Entra')",
  "externalIdentifier": "string (object ID from source system)",
  "reason": "string (optional)",
  "type": "string (optional — e.g. 'Direct')",
  "scope": {
    "scopeTypeIdentifier": "string (optional)",
    "isGlobal": "boolean (optional)",
    "value": "string (scope value; null when isGlobal=true)"
  },
  "validFrom": "ISO 8601 datetime (optional)",
  "validTo": "ISO 8601 datetime (optional)",
  "tags": [ "string" ]
}
```

**Unique key**: `roleIdentifier` + `source` + `externalIdentifier`
**Behaviour**: Create if missing; skip if exists. No partial updates.

**Example:**
```json
{
  "roleIdentifier": "project-editor",
  "accountIdentifier": "user@equinor.com",
  "source": "Entra",
  "externalIdentifier": "12345678-1234-1234-1234-123456789012",
  "scope": {
    "scopeTypeIdentifier": "project",
    "isGlobal": false,
    "value": "project-alpha"
  }
}
```

---

## ClaimableRoleAssignment

Same structure as `RoleAssignment` but uses `claimableRoleIdentifier`:

```json
{
  "claimableRoleIdentifier": "string (required — claimable role name)",
  "accountIdentifier": "string (optional)",
  "source": "string",
  "externalIdentifier": "string",
  "scope": { ... },
  "validFrom": "ISO 8601 datetime (optional)",
  "validTo": "ISO 8601 datetime (optional)",
  "tags": [ "string" ]
}
```

---

## DeleteRoleAssignmentRequest

Used in `deleteRoleAssignments` to remove specific assignments by ID (ID obtained from export):

```json
{
  "roleIdentifier": "string (required — role name)",
  "assignmentId": "string (required — assignment ID from API)"
}
```

---

## Complete example

```json
{
  "$schema": "https://rolesv2.api.fusion.equinor.com/public/schemas/role-config.schema.json",
  "scopeTypes": [
    { "name": "project", "description": "Project scope" }
  ],
  "accessRoles": [
    {
      "systemIdentifier": "my-service",
      "name": "MyService.Project.Read",
      "description": "Read project resources",
      "scopeTypeIdentifier": "project"
    },
    {
      "systemIdentifier": "my-service",
      "name": "MyService.Project.Write",
      "description": "Write project resources",
      "scopeTypeIdentifier": "project"
    }
  ],
  "roles": [
    {
      "name": "project-viewer",
      "displayName": "Project Viewer",
      "accessRoleMappings": [
        { "accessRoleIdentifier": "MyService.Project.Read" }
      ]
    },
    {
      "name": "project-editor",
      "displayName": "Project Editor",
      "accessRoleMappings": [
        { "accessRoleIdentifier": "MyService.Project.Read" },
        { "accessRoleIdentifier": "MyService.Project.Write" }
      ]
    }
  ],
  "bindings": [
    {
      "identifier": "editors-entra-binding",
      "system": "my-service",
      "type": "EntraGroup",
      "sourceSystem": "Entra",
      "binding": {
        "group": { "id": "04a439f6-cfc2-430b-8345-77d5a0151ef7" },
        "roles": [
          {
            "name": "project-editor",
            "scope": { "isGlobal": true }
          }
        ]
      }
    }
  ]
}
```
