/**
 * Fusion RolesV2 API — TypeScript model definitions
 *
 * Source of truth: Fusion.Services.RolesV2/Controllers/ViewModels/ and Controllers/RequestModels/
 * No published NuGet API-model package — models are service-internal.
 *
 * All property names use camelCase to match JSON serialization.
 */

// ---------------------------------------------------------------------------
// Response models — Roles
// ---------------------------------------------------------------------------

export interface ApiRole {
  id: string;
  name: string;
  displayName: string;
  description: string;
  accessRoleMappings: ApiAccessRoleMapping[] | null;
  createdBy: ApiAccount;
  createdDate: string;
  updatedBy: ApiAccount | null;
  updatedDate: string | null;
}

export interface ApiSimpleRole {
  id: string;
  name: string;
  displayName: string;
  description: string;
}

export interface ApiClaimableRole {
  id: string;
  name: string;
  displayName: string;
  description: string;
  accessRoleMappings: ApiClaimableAccessRoleMapping[] | null;
  createdBy: ApiAccount;
  createdDate: string;
  updatedBy: ApiAccount | null;
  updatedDate: string | null;
}

export interface ApiSimpleClaimableRole {
  id: string;
  name: string;
  displayName: string;
  description: string;
  accessRoleMappings: ApiClaimableAccessRoleMapping[] | null;
}

// ---------------------------------------------------------------------------
// Response models — Role assignments
// ---------------------------------------------------------------------------

export interface ApiRoleAssignment {
  id: string;
  assignedTo: ApiAccount;
  role: ApiSimpleRole;
  source: string | null;
  externalIdentifier: string | null;
  reason: string;
  validFrom: string | null;
  validTo: string | null;
  scope: ApiRoleScope | null;
  tags: string[];
}

export interface ApiSimpleRoleAssignment {
  id: string;
  role: ApiSimpleRole;
}

export interface ApiAccountRoleAssignment {
  id: string;
  assignedTo: ApiAccount;
  role: ApiSimpleRole;
  source: string | null;
  externalIdentifier: string | null;
  reason: string;
  validFrom: string | null;
  validTo: string | null;
  scope: ApiRoleScope | null;
  tags: string[];
  createdBy: ApiAccount;
  createdDate: string;
}

// ---------------------------------------------------------------------------
// Response models — Claimable role assignments
// ---------------------------------------------------------------------------

export interface ApiClaimableRoleAssignment {
  id: string;
  assignedTo: ApiAccount;
  claimableRole: ApiSimpleClaimableRole;
  source: string | null;
  externalIdentifier: string | null;
  reason: string;
  validFrom: string | null;
  validTo: string | null;
  isActive: boolean;
  activeTo: string | null;
  scope: ApiClaimableRoleScope | null;
  tags: string[];
}

export interface ApiSimpleClaimableRoleAssignment {
  id: string;
  claimableRole: ApiSimpleClaimableRole;
}

export interface ApiAccountClaimableRoleAssignment {
  id: string;
  assignedTo: ApiAccount;
  claimableRole: ApiSimpleClaimableRole;
  source: string | null;
  externalIdentifier: string | null;
  reason: string;
  validFrom: string | null;
  validTo: string | null;
  isActive: boolean;
  activeTo: string | null;
  scope: ApiClaimableRoleScope | null;
  tags: string[];
  createdBy: ApiAccount;
  createdDate: string;
}

// ---------------------------------------------------------------------------
// Response models — Access roles
// ---------------------------------------------------------------------------

export interface ApiAccessRole {
  id: string;
  name: string;
  description: string;
  scopeType: ApiScopeType | null;
}

export interface ApiExtendedAccessRole {
  id: string;
  name: string;
  description: string;
  scopeType: ApiScopeType | null;
  system: ApiSimpleSystem;
}

export interface ApiAccountAccessRole {
  id: string;
  name: string;
  description: string;
  scopeType: ApiScopeType | null;
  system: ApiSimpleSystem;
}

// ---------------------------------------------------------------------------
// Response models — Access role assignments
// ---------------------------------------------------------------------------

export interface ApiAccessRoleAssignment {
  id: string;
  assignedTo: ApiAccount;
  reason: string;
  source: string;
  externalIdentifier: string;
  type: string;
  scope: ApiScope | null;
  validFrom: string | null;
  validTo: string | null;
  isActive: boolean;
  tags: string[];
  accessRole: ApiAccessRole;
  roleAssignment: ApiSimpleRoleAssignment | null;
  claimableRoleAssignment: ApiSimpleClaimableRoleAssignment | null;
}

export interface ApiAccountAccessRoleAssignment {
  id: string;
  assignedTo: ApiAccount;
  accessRole: ApiAccountAccessRole | null;
  type: string;
  reason: string;
  source: string;
  externalIdentifier: string;
  scope: ApiScope | null;
  validFrom: string | null;
  validTo: string | null;
  isActive: boolean;
  tags: string[];
  roleAssignment: ApiSimpleRoleAssignment | null;
  claimableRoleAssignment: ApiSimpleClaimableRoleAssignment | null;
}

export interface ApiAccountActiveAccessRoleAssignment {
  systemName: string;
  accessRoleName: string;
  assignmentType: string;
  scope: ApiScopeValues | null;
}

// ---------------------------------------------------------------------------
// Response models — Activations
// ---------------------------------------------------------------------------

export interface ApiAccountRoleAssignmentActivation {
  id: string;
  activationDate: string;
  activeToDate: string;
  reason: string;
  activatedBy: ApiAccount;
}

export interface ApiClaimableRoleAssignmentActivation {
  id: string;
  activationDate: string;
  activeToDate: string;
  reason: string;
  activatedBy: ApiAccount;
}

export interface ApiExtendedClaimableRoleAssignmentActivation {
  id: string;
  claimableRoleAssignment: ApiSimpleClaimableRoleAssignment;
  activationDate: string;
  activeToDate: string;
  reason: string;
  activatedBy: ApiAccount;
}

// ---------------------------------------------------------------------------
// Response models — Supporting
// ---------------------------------------------------------------------------

export interface ApiAccount {
  azureUniqueId: string | null;
  mail: string | null;
  displayName: string;
  upn: string | null;
  accountType: string;
  accountClassification: string | null;
}

export interface ApiOwner {
  account: ApiAccount;
  reason: string;
}

export interface ApiScope {
  type: string | null;
  isGlobal: boolean;
  value: string | null;
}

export interface ApiScopeValues {
  type: string | null;
  isGlobal: boolean;
  values: string[] | null;
}

export interface ApiRoleScope {
  isGlobal: boolean;
  value: string | null;
}

export interface ApiClaimableRoleScope {
  isGlobal: boolean;
  value: string | null;
}

export interface ApiScopeType {
  id: string;
  name: string;
  description: string | null;
}

export interface ApiSystem {
  id: string;
  name: string;
  description: string;
  owners: ApiOwner[];
}

export interface ApiSimpleSystem {
  id: string;
  name: string;
}

export interface ApiAccessRoleMapping {
  accessRole: ApiAccessRole;
  reason: string;
}

export interface ApiClaimableAccessRoleMapping {
  accessRole: ApiAccessRole;
  reason: string;
}

export interface ApiRoleBindingConfiguration {
  id: string;
  version: string;
  identifier: string;
  description: string;
  reason: string;
  system: string;
  type: string;
  sourceSystem: string;
  isDeleted: boolean;
  binding: EntraGroupBinding;
}

export interface EntraGroupBinding {
  groupId: string;
  groupDisplayName: string | null;
}

export interface ApiRoleBindingConfigurationStatus {
  id: string;
  identifier: string;
  status: string;
  errorMessage: string | null;
  createdDate: string;
  updatedDate: string | null;
}

// ---------------------------------------------------------------------------
// Request models — Roles
// ---------------------------------------------------------------------------

/**
 * POST /roles — create a role.
 *
 * Validation:
 * @property name — Required, max 200, URL-safe, validated by BeValidRoleName()
 * @property displayName — Max 200
 * @property description — Max 500
 * @property accessRoleMappings — Required, not empty
 */
export interface CreateRoleRequest {
  /** @maxLength 200 — must be URL-safe */
  name: string;
  /** @maxLength 200 */
  displayName: string;
  /** @maxLength 500 */
  description: string;
  accessRoleMappings: AccessRoleMappingRequest[];
}

/**
 * PATCH /roles/{roleIdentifier} — update role fields.
 * Only properties present in the payload are applied.
 */
export interface UpdateRoleRequest {
  /** @maxLength 200 */
  displayName?: string | null;
  /** @maxLength 500 */
  description?: string | null;
}

/**
 * POST /claimable-roles — create a claimable role.
 *
 * Validation: same constraints as CreateRoleRequest.
 */
export interface CreateClaimableRoleRequest {
  /** @maxLength 200 — must be URL-safe */
  name: string;
  /** @maxLength 200 */
  displayName: string;
  /** @maxLength 500 */
  description: string;
  accessRoleMappings: AccessRoleMappingRequest[];
}

/**
 * PATCH /claimable-roles/{claimableRoleIdentifier}.
 * Patch-based update.
 */
export interface UpdateClaimableRoleRequest {
  /** @maxLength 200 — must be URL-safe */
  name?: string | null;
  /** @maxLength 200 */
  displayName?: string | null;
  /** @maxLength 500 */
  description?: string | null;
  accessRoleMappings?: AccessRoleMappingRequest[] | null;
}

// ---------------------------------------------------------------------------
// Request models — Access roles
// ---------------------------------------------------------------------------

/**
 * POST /systems/{systemIdentifier}/access-roles — create an access role.
 *
 * Validation:
 * @property name — Required, max 200, URL-safe, validated by BeValidAccessRoleIdentifier()
 * @property description — Max 500
 */
export interface CreateAccessRoleRequest {
  /** @maxLength 200 — must be URL-safe */
  name: string;
  /** @maxLength 500 */
  description: string;
  scopeTypeIdentifier?: ScopeTypeIdentifierRequest | null;
}

/**
 * PATCH /systems/{systemIdentifier}/access-roles/{accessRoleIdentifier}.
 */
export interface UpdateAccessRoleRequest {
  /** @maxLength 500 */
  description?: string | null;
}

// ---------------------------------------------------------------------------
// Request models — Systems & scope types
// ---------------------------------------------------------------------------

/**
 * POST /systems — register a new system.
 *
 * Validation:
 * @property name — Required, max 200, URL-safe, validated by BeValidSystemIdentifier()
 * @property description — Max 500
 * @property owners — Each owner validated (account + reason)
 */
export interface RegisterSystemRequest {
  /** @maxLength 200 — must be URL-safe */
  name: string;
  /** @maxLength 500 */
  description: string;
  owners: OwnerInfoRequest[];
}

/**
 * PATCH /systems/{systemIdentifier}.
 */
export interface UpdateSystemRequest {
  /** @maxLength 500 */
  description?: string | null;
  owners?: OwnerInfoRequest[] | null;
}

/**
 * PATCH /scope-types/{scopeTypeIdentifier}.
 * Only properties present in the payload are applied.
 */
export interface UpdateScopeRequest {
  /** @maxLength 500 */
  description?: string | null;
}

/**
 * POST /scope-types.
 *
 * Validation:
 * @property name — Required, max 200, URL-safe
 * @property description — Max 500
 */
export interface CreateScopeTypeRequest {
  /** @maxLength 200 — must be URL-safe */
  name: string;
  /** @maxLength 500 */
  description: string;
}

// ---------------------------------------------------------------------------
// Request models — Role assignments
// ---------------------------------------------------------------------------

/**
 * POST /roles/{roleIdentifier}/assignments — assign a role.
 *
 * Validation:
 * @property accountIdentifier — Required
 * @property reason — Required, max 500
 * @property source — Optional, max 250
 * @property externalIdentifier — Optional, max 250
 * @property scope — Validated by BeValidRoleScope()
 * @property tags — Each tag max 50
 * @property validTo must be after validFrom
 */
export interface AssignRoleRequest {
  accountIdentifier: string;
  /** @maxLength 500 */
  reason: string;
  /** @maxLength 250 */
  source?: string | null;
  /** @maxLength 250 */
  externalIdentifier?: string | null;
  scope?: RequestRoleScope | null;
  validFrom?: string | null;
  validTo?: string | null;
  /** Each tag max 50 chars */
  tags?: string[] | null;
}

/**
 * PATCH /roles/{roleIdentifier}/assignments/{roleAssignmentId}.
 */
export interface UpdateRoleAssignmentRequest {
  /** Must be in the future or null. */
  validTo?: string | null;
}

/**
 * DELETE batch — delete up to 100 role assignments.
 */
export interface DeleteRoleAssignmentsRequest {
  /** 1–100 assignment IDs. */
  roleAssignmentIds: string[];
}

// ---------------------------------------------------------------------------
// Request models — Access role assignments
// ---------------------------------------------------------------------------

/**
 * POST /systems/{systemIdentifier}/access-roles/{accessRoleIdentifier}/assignments.
 *
 * Validation:
 * @property accountIdentifier — Required
 * @property reason — Required, max 500
 * @property source — Max 250
 * @property externalIdentifier — Max 250
 * @property type — Required, max 50, validated by BeValidType()
 * @property scope — Validated by BeValidScopedType()
 * @property tags — Each tag max 50
 */
export interface AssignAccessRoleRequest {
  accountIdentifier: string;
  /** @maxLength 500 */
  reason: string;
  /** @maxLength 250 */
  source: string;
  /** @maxLength 250 */
  externalIdentifier: string;
  /** @maxLength 50 */
  type: string;
  scope?: ScopeRequest | null;
  validFrom?: string | null;
  validTo?: string | null;
  /** Each tag max 50 chars */
  tags?: string[] | null;
}

/**
 * PATCH access-role assignment.
 */
export interface UpdateAccessRoleAssignmentRequest {
  /** Must be in the future or null. */
  validTo?: string | null;
}

/**
 * POST /access-role-assignments/{id}/activate.
 *
 * Validation:
 * @property reason — Required, max 500
 * @property activeToDate — Must be in the future or null
 */
export interface ActivateAssignedAccessRoleRequest {
  activeToDate?: string | null;
  /** @maxLength 500 */
  reason: string;
}

// ---------------------------------------------------------------------------
// Request models — Claimable role assignments
// ---------------------------------------------------------------------------

/**
 * POST /claimable-roles/{claimableRoleIdentifier}/assignments.
 * Same validation pattern as AssignRoleRequest.
 */
export interface AssignClaimableRoleRequest {
  accountIdentifier: string;
  /** @maxLength 500 */
  reason: string;
  /** @maxLength 250 */
  source?: string | null;
  /** @maxLength 250 */
  externalIdentifier?: string | null;
  scope?: RequestClaimableRoleScope | null;
  validFrom?: string | null;
  validTo?: string | null;
  /** Each tag max 50 chars */
  tags?: string[] | null;
}

/**
 * PATCH claimable-role assignment.
 */
export interface UpdateClaimableRoleAssignmentRequest {
  validTo?: string | null;
  activeTo?: string | null;
  reason?: string | null;
}

/**
 * POST /accounts/{accountIdentifier}/claimable-role-assignments/{claimableRoleAssignmentId}/activate.
 */
export interface ActivateAssignedRoleRequest {
  activeToDate?: string | null;
  /** @maxLength 500 */
  reason: string;
}

// ---------------------------------------------------------------------------
// Request models — Role binding configurations
// ---------------------------------------------------------------------------

/**
 * POST /role-binding-configurations.
 *
 * Validation:
 * @property version — Required, validated by BeValidVersion(), max 50
 * @property identifier — Required, min 3, max 100
 * @property system — Max 500
 * @property description — Max 500
 * @property reason — Max 500
 * @property type — Validated by BeValidRoleBindingConfigurationType()
 * @property binding — Validated by BeValidEntraGroupBinding()
 */
export interface CreateRoleBindingConfigurationRequest {
  /** @maxLength 50 */
  version: string;
  /** @minLength 3  @maxLength 100 */
  identifier: string;
  /** @maxLength 500 */
  system: string;
  /** @maxLength 500 */
  description: string;
  /** @maxLength 500 */
  reason: string;
  type: string;
  sourceSystem: string;
  binding: EntraGroupBindingRequest;
}

/**
 * PATCH /role-binding-configurations/{id}.
 */
export interface UpdateRoleBindingConfigurationRequest {
  /** @maxLength 500 */
  description?: string | null;
  /** @maxLength 500 */
  reason?: string | null;
  binding?: EntraGroupBindingRequest | null;
}

/**
 * PATCH /role-binding-configurations/{id}/status.
 */
export interface UpdateRoleBindingConfigurationStatusRequest {
  status?: string | null;
  errorMessage?: string | null;
}

// ---------------------------------------------------------------------------
// Request sub-models
// ---------------------------------------------------------------------------

export interface AccessRoleMappingRequest {
  accessRoleIdentifier: AccessRoleIdentifierRequest;
  /** @maxLength 500 */
  reason: string;
}

/**
 * POST /roles/{roleIdentifier}/access-roles — attach an access role mapping to a role.
 */
export interface AddRoleAccessRoleRequest {
  accessRoleIdentifier: AccessRoleIdentifierRequest;
  /** @maxLength 500 */
  reason: string;
}

/**
 * POST /claimable-roles/{claimableRoleIdentifier}/access-roles — attach an access role mapping to a claimable role.
 */
export interface AddClaimableRoleAccessRoleRequest {
  accessRoleIdentifier: AccessRoleIdentifierRequest;
  /** @maxLength 500 */
  reason: string;
}

export interface AccessRoleIdentifierRequest {
  systemName: string;
  accessRoleName: string;
}

export interface ScopeTypeIdentifierRequest {
  systemName: string;
  scopeTypeName: string;
}

/**
 * Role scope for regular role assignments.
 * Either value or isGlobal=true must be set.
 */
export interface RequestRoleScope {
  isGlobal?: boolean | null;
  value?: string | null;
}

/**
 * Role scope for claimable role assignments.
 * Either value or isGlobal=true must be set.
 */
export interface RequestClaimableRoleScope {
  isGlobal?: boolean | null;
  value?: string | null;
}

/**
 * Access-role assignment scope.
 * Validated by MustBeValidScopedType().
 */
export interface ScopeRequest {
  type?: string | null;
  isGlobal?: boolean | null;
  value?: string | null;
}

export interface OwnerInfoRequest {
  accountIdentifier: string;
  /** @maxLength 500 */
  reason: string;
}

export interface EntraGroupBindingRequest {
  groupId: string;
  groupDisplayName?: string | null;
}
