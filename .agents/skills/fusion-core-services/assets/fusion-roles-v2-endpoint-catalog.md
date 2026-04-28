# RolesV2 API Endpoint Catalog

This catalog covers the verified public RolesV2 surface for roles, claimable roles, systems, access-role assignments, account views, scope types, and role-binding configurations. The subscription route is documented because it is public, but it is backend-only.

## Subscription endpoint
- `PUT /subscriptions/roles-v2` → backend subscription registration/update returning `ApiEventSubscriptionV1`
	Application-token only. Use for role-change event delivery, local projection syncing, or cache invalidation rather than UI workflows.

## Role endpoints
- `GET /roles` → `ApiPagedCollection<ApiRole>`
	OData: `Expand(accessRoleMappings)`, `Top`, `Skip`
- `POST /roles` → `CreateRoleRequest` → `ApiRole`
- `GET /roles/{roleIdentifier}` → `ApiRole`
- `PATCH /roles/{roleIdentifier}` → `UpdateRoleRequest` → `ApiRole`
- `DELETE /roles/{roleIdentifier}` → `204 NoContent`
- `POST /roles/{roleIdentifier}/access-roles` → `AddRoleAccessRoleRequest` → `ApiRole`
- `DELETE /roles/{roleIdentifier}/access-roles/{accessRoleIdentifier}` → `204 NoContent`

## Role-assignment endpoints
- `POST /roles/{roleIdentifier}/assignments` → `AssignRoleRequest` → `ApiRoleAssignment`
- `GET /roles/{roleIdentifier}/assignments` → `ApiPagedCollection<ApiRoleAssignment>`
	OData: `Filter(source, externalIdentifier, scopeValue)`, `Top`, `Skip`
- `GET /roles/{roleIdentifier}/assignments/{roleAssignmentId}` → `ApiRoleAssignment`
- `PATCH /roles/{roleIdentifier}/assignments/{roleAssignmentId}` → `UpdateRoleAssignmentRequest` → `ApiRoleAssignment`
- `DELETE /roles/{roleIdentifier}/assignments/{roleAssignmentId}` → `204 NoContent`
- `POST /roles/{roleIdentifier}/assignments/delete` → `DeleteRoleAssignmentsRequest` → `204 NoContent`

## Claimable-role endpoints
- `GET /claimable-roles` → `ApiPagedCollection<ApiClaimableRole>`
	OData: `Expand(accessRoleMappings)`, `Top`, `Skip`
- `POST /claimable-roles` → `CreateClaimableRoleRequest` → `ApiClaimableRole`
- `GET /claimable-roles/{claimableRoleIdentifier}` → `ApiClaimableRole`
- `PATCH /claimable-roles/{claimableRoleIdentifier}` → `UpdateClaimableRoleRequest` → `ApiClaimableRole`
- `DELETE /claimable-roles/{claimableRoleIdentifier}` → `204 NoContent`
- `POST /claimable-roles/{claimableRoleIdentifier}/access-roles` → `AddClaimableRoleAccessRoleRequest` → `ApiClaimableRole`
- `DELETE /claimable-roles/{claimableRoleIdentifier}/access-roles/{accessRoleIdentifier}` → `204 NoContent`

## Claimable-role assignment endpoints
- `POST /claimable-roles/{claimableRoleIdentifier}/assignments` → `AssignClaimableRoleRequest` → `ApiClaimableRoleAssignment`
- `GET /claimable-roles/{claimableRoleIdentifier}/assignments` → `ApiPagedCollection<ApiClaimableRoleAssignment>`
	OData: `Filter(source, externalIdentifier, scopeValue)`, `Top`, `Skip`
- `GET /claimable-roles/{claimableRoleIdentifier}/assignments/{claimableRoleAssignmentId}` → `ApiClaimableRoleAssignment`
- `PATCH /claimable-roles/{claimableRoleIdentifier}/assignments/{claimableRoleAssignmentId}` → `UpdateClaimableRoleAssignmentRequest` → `ApiClaimableRoleAssignment`
- `DELETE /claimable-roles/{claimableRoleIdentifier}/assignments/{claimableRoleAssignmentId}` → `204 NoContent`
- `GET /claimable-roles/{claimableRoleIdentifier}/assignments/{claimableRoleAssignmentId}/activations` → `ApiPagedCollection<ApiClaimableRoleAssignmentActivation>`
	OData: `Top`, `Skip`
- `GET /claimable-role-assignment-activations` → `ApiPagedCollection<ApiExtendedClaimableRoleAssignmentActivation>`

## Account-scoped endpoints
- `GET /accounts/{accountIdentifier}/role-assignments` → `ApiPagedCollection<ApiAccountRoleAssignment>`
- `GET /accounts/{accountIdentifier}/claimable-role-assignments` → `ApiPagedCollection<ApiAccountClaimableRoleAssignment>`
	OData: `Expand(accessRoleMappings)`
- `POST /accounts/{accountIdentifier}/claimable-role-assignments/{claimableRoleAssignmentId}/activate` → `ActivateAssignedRoleRequest` → `ApiClaimableRoleAssignmentActivation`
- `POST /accounts/{accountIdentifier}/claimable-role-assignments/{claimableRoleAssignmentId}/deactivate` → `ApiClaimableRoleAssignmentActivation`
- `GET /accounts/{accountIdentifier}/claimable-role-assignments/{claimableRoleAssignmentId}/activations/{claimableRoleAssignmentActivationId}` → `ApiClaimableRoleAssignmentActivation`
- `GET /accounts/{accountIdentifier}/access-role-assignments` → `ApiPagedCollection<ApiAccountAccessRoleAssignment>`
	OData: `Expand(roleAssignment, claimableRoleAssignment)`, `Filter(validFrom, scope.value, scope.type, source, externalIdentifier)`, `Top`, `Skip`
- `GET /accounts/{accountIdentifier}/active-access-role-assignments` → `ApiAccountActiveAccessRoleAssignment[]`
	OData: `Filter(systemName)`

## System endpoints
- `GET /systems` → `ApiPagedCollection<ApiSystem>`
	OData: `Top`, `Skip`
- `GET /systems/{systemIdentifier}` → `ApiSystem`
- `POST /systems` → `RegisterSystemRequest` → `ApiSystem`
- `PATCH /systems/{systemIdentifier}` → `UpdateSystemRequest` → `ApiSystem`
- `DELETE /systems/{systemIdentifier}` → `204 NoContent`

## System access-role endpoints
- `GET /systems/{systemIdentifier}/access-roles` → `ApiAccessRole[]`
- `POST /systems/{systemIdentifier}/access-roles` → `CreateAccessRoleRequest` → `ApiAccessRole`
- `GET /systems/{systemIdentifier}/access-roles/{accessRoleIdentifier}` → `ApiAccessRole`
- `PATCH /systems/{systemIdentifier}/access-roles/{accessRoleIdentifier}` → `UpdateAccessRoleRequest` → `ApiAccessRole`
- `DELETE /systems/{systemIdentifier}/access-roles/{accessRoleIdentifier}` → `204 NoContent`

## System access-role assignment endpoints
- `POST /systems/{systemIdentifier}/access-roles/{accessRoleIdentifier}/assignments` → `AssignAccessRoleRequest` → `ApiAccessRoleAssignment`
- `GET /systems/{systemIdentifier}/access-roles/{accessRoleIdentifier}/assignments` → `ApiPagedCollection<ApiAccessRoleAssignment>`
	OData: `Expand(roleAssignment, claimableRoleAssignment)`, `Filter(validFrom, scope.value, scope.type, source, externalIdentifier)`, `Top`, `Skip`
- `GET /systems/{systemIdentifier}/access-roles/{accessRoleIdentifier}/assignments/{accessRoleAssignmentId}` → `ApiAccessRoleAssignment`
	OData: `Expand(roleAssignment, claimableRoleAssignment)`
- `PATCH /systems/{systemIdentifier}/access-roles/{accessRoleIdentifier}/assignments/{accessRoleAssignmentId}` → `UpdateAccessRoleAssignmentRequest` → `ApiAccessRoleAssignment`
- `DELETE /systems/{systemIdentifier}/access-roles/{accessRoleIdentifier}/assignments/{accessRoleAssignmentId}` → `204 NoContent`

## Scope-type endpoints
- `GET /scope-types` → `ApiScopeType[]`
- `GET /scope-types/{scopeTypeIdentifier}` → `ApiScopeType`
- `POST /scope-types` → `CreateScopeTypeRequest` → `ApiScopeType`
- `PATCH /scope-types/{scopeTypeIdentifier}` → `UpdateScopeRequest` → `ApiScopeType`
- `DELETE /scope-types/{scopeTypeIdentifier}` → `204 NoContent`

## Role-binding-configuration endpoints
- `GET /role-binding-configurations` → `ApiPagedCollection<ApiRoleBindingConfiguration>`
	OData: `Top`, `Skip`; query: `includeDeleted`
- `POST /role-binding-configurations` → `CreateRoleBindingConfigurationRequest` → `ApiRoleBindingConfiguration`
- `GET /role-binding-configurations/{identifier}` → `ApiRoleBindingConfiguration`
- `PATCH /role-binding-configurations/{identifier}` → `UpdateRoleBindingConfigurationRequest` → `ApiRoleBindingConfiguration`
- `DELETE /role-binding-configurations/{identifier}` → `204 NoContent`
- `GET /role-binding-configurations/{identifier}/status` → `ApiRoleBindingConfigurationStatus`
- `PATCH /role-binding-configurations/{identifier}/status` → `UpdateRoleBindingConfigurationStatusRequest` → `ApiRoleBindingConfigurationStatus`

## Authorization notes
- Read routes require authenticated callers and often allow global viewers, system owners, or the current user on account-scoped resources.
- Write routes are typically limited to administrators, system owners, or specific elevated roles such as role/binding registration scopes.
- Assignment routes sometimes allow the assigned account to delete or inspect its own assignment, depending on endpoint semantics.

## Typical status codes
- `200 OK`
- `201 Created`
- `204 NoContent`
- `400 Bad Request`
- `401 Unauthorized`
- `403 Forbidden`
- `404 Not Found`
- `409 Conflict`

## Explicit exclusions
- Legacy Roles v1 semantics
