/**
 * Fusion People API — TypeScript model definitions
 *
 * Source of truth: Fusion.Services.People.ApiModels (NuGet package, multi-target net8.0/net9.0/net10.0)
 * and Fusion.Services.People controller view-models.
 *
 * Version scope: V3/V4 are the primary target, but legacy V1/V2 DTOs are included for compatibility with still-exposed routes.
 * All property names use camelCase to match the JSON serialization output.
 */

// ---------------------------------------------------------------------------
// Enums (serialized as strings)
// ---------------------------------------------------------------------------

export type ApiProfileAccountType =
  | "Employee"
  | "Consultant"
  | "External"
  | "Local"
  | "Unknown"
  | "Application"
  | "Admin"
  | "System";

export type ApiAccountClassification =
  | "Unclassified"
  | "Internal"
  | "External";

export type ApiInvitationStatus =
  | "Accepted"
  | "Pending"
  | "NotSent";

export type ApiGraphPresenceAvailability =
  | "Available"
  | "AvailableIdle"
  | "Away"
  | "BeRightBack"
  | "Busy"
  | "BusyIdle"
  | "DoNotDisturb"
  | "Offline"
  | "PresenceUnknown";

export type ApiGraphPresenceActivity =
  | "Available"
  | "Away"
  | "BeRightBack"
  | "Busy"
  | "DoNotDisturb"
  | "InACall"
  | "InAConferenceCall"
  | "Inactive"
  | "InAMeeting"
  | "Offline"
  | "OffWork"
  | "OutOfOffice"
  | "PresenceUnknown"
  | "Presenting"
  | "UrgentInterruptionsOnly";

export type ApiRoleType =
  | "Global"
  | "Scoped"
  | "GlobalScoped";

export type ApiPeoplePickerAccountType =
  | "Unknown"
  | "Person"
  | "SystemAccount";

export type ApiCompanyAccountType =
  | "Unknown"
  | "Employee"
  | "Consultant"
  | "Intern"
  | "OnContract"
  | "Extern"
  | "AcceptingGuest"
  | "ExternalHire";

export type ApiServicePrincipalType =
  | "Unknown"
  | "Application"
  | "ManagedIdentity"
  | "ServicePrincipal";

// ---------------------------------------------------------------------------
// Core person model (V3)
// ---------------------------------------------------------------------------

/** Returned by GET /persons/{id} (API v1.0). Legacy, but still used by some endpoints. */
export interface ApiPersonV1 {
  fusionPersonId: string;
  azureUniqueId?: string | null;
  mail?: string | null;
  name: string;
  department?: string | null;
  fullDepartment?: string | null;
  mobilePhone?: string | null;
  officeLocation?: string | null;
  upn?: string | null;
  sapId?: string | null;
  employeeId?: string | null;
  employeeType?: string | null;
  orgUnitId?: string | null;
  isResourceOwner?: boolean | null;
  isExpired?: boolean | null;
  expiredDate?: string | null;
  isPrimaryAccount?: boolean | null;
  preferredContactMail?: string | null;
  accountType: ApiProfileAccountType;
  invitationStatus?: ApiInvitationStatus | null;
  accountClassification: ApiAccountClassification;
  managerAzureUniqueId?: string | null;
  linkedAccounts?: ApiProfileAccountLink[] | null;
}

/** Returned by GET /persons/{id} (API v2.0). Legacy alias of the V1-compatible shape. */
export interface ApiPersonV2 extends ApiPersonV1 {
}

/** Returned by GET /persons/{id} (API version 3.0). */
export interface ApiPersonV3 {
  azureUniqueId: string | null;
  name: string;
  mail: string | null;
  jobTitle: string | null;
  department: string | null;
  fullDepartment: string | null;
  mobilePhone: string | null;
  officeLocation: string | null;
  upn: string | null;
  sapId: string | null;
  employeeId: string | null;
  orgUnitId: string | null;
  isPrimaryAccount: boolean | null;
  preferredContactMail: string | null;
  isResourceOwner: boolean | null;
  isExpired: boolean | null;
  expiredDate: string | null;
  accountType: ApiProfileAccountType;
  company: ApiCompanyInfo | null;
  invitationStatus: ApiInvitationStatus | null;
  accountClassification: ApiAccountClassification;
  managerAzureUniqueId: string | null;
  linkedAccounts: ApiProfileAccountLink[] | null;
  /** Expandable — only populated when $expand=roles is requested. */
  roles: ApiPersonRole[] | null;
  /** Expandable — only populated when $expand=positions is requested. */
  positions: ApiPersonPosition[] | null;
  /** Expandable — only populated when $expand=contracts is requested. */
  contracts: ApiPersonContract[] | null;
  /** Expandable — only populated when $expand=manager is requested. */
  manager: ApiManager | null;
}

/** Main person DTO returned by GET /persons/{id} (API version 4.0). */
export interface ApiPersonV4 {
  azureUniqueId?: string | null;
  mail?: string | null;
  name: string;
  jobTitle?: string | null;
  department?: string | null;
  fullDepartment?: string | null;
  mobilePhone?: string | null;
  officeLocation?: string | null;
  upn?: string | null;
  /** Unique identifier in SAP. */
  sapId?: string | null;
  /** Employee ID, aligned with AD model. */
  employeeId?: string | null;
  employeeType?: string | null;
  /** Unique identifier for org unit in SAP. */
  orgUnitId?: string | null;
  isResourceOwner?: boolean | null;
  isExpired?: boolean | null;
  expiredDate?: string | null;
  isPrimaryAccount?: boolean | null;
  preferredContactMail?: string | null;
  accountType: ApiProfileAccountType;
  invitationStatus?: ApiInvitationStatus | null;
  accountClassification: ApiAccountClassification;
  managerAzureUniqueId?: string | null;
  /** List of companies associated with person's contracts. Only populated when $expand=companies is requested. */
  companies?: ApiCompanyInfoV4[] | null;
  /** Expandable — only populated when $expand=roles is requested. */
  roles?: ApiPersonRoleV4[] | null;
  /** Expandable — only populated when $expand=positions is requested. */
  positions?: ApiPersonPositionV4[] | null;
  /** Expandable — only populated when $expand=contracts is requested. */
  contracts?: ApiPersonContractV4[] | null;
  manager?: ApiManager | null;
  linkedAccounts?: ApiProfileAccountLink[] | null;
}

// ---------------------------------------------------------------------------
// Supporting person models
// ---------------------------------------------------------------------------

export interface ApiCompanyInfo {
  id: string;
  name: string;
}

export interface ApiCompanyInfoV4 {
  id: string;
  name?: string | null;
}

export interface ApiProfileAccountLink {
  azureUniqueId: string;
  mail: string | null;
  isPrimaryAccount: boolean | null;
  preferredContactMail: string | null;
  isExpired: boolean | null;
  upn: string | null;
}

export interface ApiManager {
  azureUniqueId: string;
  name: string;
  mail: string | null;
  department: string | null;
  fullDepartment: string | null;
  upn: string | null;
  jobTitle: string | null;
  accountType: ApiProfileAccountType;
  accountClassification: ApiAccountClassification;
}

export interface ApiProfileRef {
  azureUniqueId: string | null;
  name: string;
  mail: string | null;
  jobTitle: string | null;
  department: string | null;
  fullDepartment: string | null;
  mobilePhone: string | null;
  officeLocation: string | null;
  upn: string | null;
  accountType: ApiProfileAccountType;
  accountClassification: ApiAccountClassification;
}

export interface ApiPersonLink {
  targetAzureUniqueId: string;
  createdByAzureUniqueId: string;
  description: string | null;
  created: string;
  target: ApiProfileRef | null;
  createdBy: ApiProfileRef | null;
}

export interface ApiExtendedProfile {
  preferredContactMail: string | null;
  isPrimaryAccount: boolean | null;
}

// ---------------------------------------------------------------------------
// Roles
// ---------------------------------------------------------------------------

export interface ApiPersonRole {
  name: string;
  displayName: string | null;
  sourceSystem: string | null;
  /** "Global" | "Scoped" | "GlobalScoped" */
  type: ApiRoleType;
  isActive: boolean;
  activeToUtc: string | null;
  onDemandSupport: boolean;
  scope: ApiPersonRoleScope | null;
}

export interface ApiPersonRoleScope {
  type: string;
  value: string | null;
  valueType: string | null;
}

export interface ApiRoleDefinition {
  name: string;
  displayName: string | null;
  type: ApiRoleType;
  scopeType: string | null;
  description: string | null;
  onDemandSupport: boolean;
  sourceSystem: string | null;
}

// ---------------------------------------------------------------------------
// V4-specific role and position models
// ---------------------------------------------------------------------------

/** Role model in V4 — supports aggregated scopes. */
export interface ApiPersonRoleV4 {
  name: string;
  displayName: string;
  sourceSystem?: string | null;
  type: string; // "Global" | "Scoped" | "GlobalScoped"
  isActive: boolean;
  activeToUtc?: string | null;
  onDemandSupport: boolean;
  scopes?: ApiPersonRoleScopeV4[] | null;
}

/** Role scope aggregation in V4. */
export interface ApiPersonRoleScopeV4 {
  type: string;
  values?: string[] | null;
  valueType?: string | null;
}

// ---------------------------------------------------------------------------
// Positions & contracts
// ---------------------------------------------------------------------------

export interface ApiPersonPosition {
  positionId: string;
  positionExternalId: string | null;
  id: string;
  parentPositionId: string | null;
  taskOwnerIds: string[] | null;
  name: string | null;
  obs: string | null;
  basePosition: ApiPersonBasePosition;
  project: ApiPersonProject;
  isTaskOwner: boolean;
  appliesFrom: string | null;
  appliesTo: string | null;
  workload: number | null;
}

export interface ApiPersonBasePosition {
  id: string;
  name: string;
  type: string;
  discipline: string | null;
}

export interface ApiPersonProject {
  id: string;
  name: string;
  domainId: string | null;
  type: string;
}

export interface ApiPersonContract {
  id: string;
  name: string;
  contractNumber: string;
  companyId: string | null;
  companyName: string;
  project: ApiPersonProject;
  projectMaster: ApiProjectMaster;
  positions: ApiContractPosition[];
}

export interface ApiContractPosition {
  positionId: string;
  id: string;
  name: string;
  externalPositionId: string | null;
  obs: string | null;
  appliesFrom: string | null;
  appliesTo: string | null;
  workload: number | null;
  basePosition: ApiPersonBasePosition;
}

export interface ApiProjectMaster {
  id: string;
  name: string;
}

// ---------------------------------------------------------------------------
// V4-specific position and contract models
// ---------------------------------------------------------------------------

/** Position model in V4 (enhanced with additional metadata). */
export interface ApiPersonPositionV4 {
  positionId: string;
  positionExternalId?: string | null;
  id: string;
  parentPositionId?: string | null;
  taskOwnerIds?: string[] | null;
  name: string;
  obs?: string | null;
  type: string;
  basePosition: ApiPersonBasePositionV4;
  project?: ApiPersonProjectV4 | null;
  isTaskOwner: boolean;
  isProjectManagementTeam: boolean;
  appliesFrom?: string | null;
  appliesTo?: string | null;
  workload?: number | null;
}

/** Base position model in V4. */
export interface ApiPersonBasePositionV4 {
  id: string;
  name?: string | null;
  type?: string | null;
  discipline?: string | null;
}

/** Project reference in V4. */
export interface ApiPersonProjectV4 {
  id: string;
  name: string;
  domainId?: string | null;
  type: string;
}

/** Contract model in V4 (with aggregated positions). */
export interface ApiPersonContractV4 {
  id: string;
  name: string;
  contractNumber: string;
  companyId?: string | null;
  companyName?: string | null;
  project: ApiPersonProjectV4;
  projectMaster?: ApiProjectMaster | null;
  positions: ApiContractPositionV4[];
}

/** Contract position model in V4. */
export interface ApiContractPositionV4 {
  positionId: string;
  id: string;
  name: string;
  externalPositionId?: string | null;
  obs?: string | null;
  appliesFrom?: string | null;
  appliesTo?: string | null;
  workload?: number | null;
  basePosition: ApiPersonBasePositionV4;
}

// ---------------------------------------------------------------------------
// Presence
// ---------------------------------------------------------------------------

/** Returned by GET /persons/{id}/presence (V1). */
export interface ApiPresenceV1 {
  id: string;
  availability: ApiGraphPresenceAvailability;
  activity: ApiGraphPresenceActivity | null;
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

/** Returned by GET /persons (search, V2). */
export interface ApiPersonSearchResultV2 {
  azureUniqueId: string | null;
  mail: string | null;
  preferredContactMail: string | null;
  name: string;
  jobTitle: string | null;
  department: string | null;
  fullDepartment: string | null;
  mobilePhone: string | null;
  officeLocation: string | null;
  upn: string | null;
  employeeId: string | null;
  orgUnitId: string | null;
  isResourceOwner: boolean;
  accountType: ApiProfileAccountType;
  accountClassification: ApiAccountClassification;
}

/** Returned by GET /persons (search, V1). OBSOLETE - use V2. */
export interface ApiPersonSearchResultV1 {
  fusionPersonId?: string | null;
  azureUniquePersonId?: string | null;
  name: string;
  jobTitle?: string | null;
  department?: string | null;
  fullDepartment?: string | null;
  mail?: string | null;
  preferredContactMail?: string | null;
  company?: string | null;
  mobilePhone?: string | null;
  officeLocation?: string | null;
  userPrincipalName?: string | null;
  employeeId?: string | null;
  employeeType?: string | null;
  orgUnitId?: string | null;
  isResourceOwner: boolean;
  accountType?: string | null;
  accountClassification?: string | null;
  isFusionLocal: boolean;
  isAffiliateAccess: boolean;
}

// ---------------------------------------------------------------------------
// Group membership
// ---------------------------------------------------------------------------

export interface ApiGroupMembership {
  azureAdGroupId: string | null;
  isMember: boolean;
}

// ---------------------------------------------------------------------------
// Batch operations - Ensure/Create/Validate
// ---------------------------------------------------------------------------

/** Result from POST /persons/ensure (v2 and v3). Batch response for ensure operation. */
export interface ApiPersonValidationResultV2 {
  success: boolean;
  statusCode: number;
  message?: string | null;
  identifier: string;
  person?: ApiPersonV1 | null;
}

/** Result from POST /persons (v1). Batch response for create local persons operation. */
export interface ApiCreatePersonResult {
  person?: ApiPersonV1 | null;
  success: boolean;
  statusCode: number;
  message?: string | null;
  identifier: string;
  index: number;
}

// ---------------------------------------------------------------------------
// Request models for person operations
// ---------------------------------------------------------------------------

/** Request for POST /persons/ensure — ensure multiple persons exist in the database. */
export interface ValidatePersonsRequest {
  /**
   * List of identifiers (Azure Unique ID, mail, or UPN) to resolve/ensure.
   */
  personIdentifiers: string[];
}

/** Request for POST /persons — create local (non-AD) persons in the database. */
export interface CreatePersonsRequest {
  persons: NewPersonRequest[];
}

export interface NewPersonRequest {
  mail: string;
  name: string;
  jobTitle?: string | null;
  mobilePhone?: string | null;
  officeLocation?: string | null;
}

/** Request for POST /persons/{personId}/linked-accounts — link two person accounts. */
export interface AccountLinkRequest {
  /**
   * The identifier to link to (mail or Azure Unique ID).
   * Must resolve to an Azure AD account.
   * Maximum 100 characters.
   */
  identifier: string;
  /**
   * Optional description for the link (max 1000 characters, no scripts).
   */
  description?: string | null;
  /**
   * Optional — Allow overriding the creator (applications only).
   */
  createdByAzureUniqueId?: string | null;
}

// ---------------------------------------------------------------------------
// People Picker — Search & resolve persons and service principals
// ---------------------------------------------------------------------------

/** Request for searching persons and service principals. */
export interface PeoplePickerQueryRequest {
  /** Query string for searching (required). */
  queryString?: string;
  /** Optional filter by account type (e.g., "Person", "SystemAccount"). */
  types?: string[];
}

/** Request for resolving persons and service principals by identifiers. */
export interface ResolveProfilesRequest {
  /**
   * List of Azure Unique IDs, Email addresses, or User Principal Names (UPNs) to resolve.
   * Maximum 100 identifiers per request.
   */
  identifiers: string[];
}

/** Account found in people picker search results. */
export interface ApiPeoplePickerAccount {
  azureUniqueId: string;
  name: string;
  accountType: ApiPeoplePickerAccountType;
  accountLabel: string;
  /** Person details (when accountType is "Person"). */
  person?: ApiPeoplePickerPerson | null;
  /** Application details (when accountType is "SystemAccount" and it's an app). */
  application?: ApiPeoplePickerApplication | null;
  avatarColor: string;
  avatarUrl: string;
  isExpired: boolean;
}

/** Person details from people picker search results. */
export interface ApiPeoplePickerPerson {
  accountType: ApiCompanyAccountType;
  jobTitle?: string | null;
  department?: string | null;
  fullDepartment?: string | null;
  employeeNumber?: string | null;
  employeeType?: string | null;
  managerAzureUniqueId?: string | null;
  mail?: string | null;
  preferredMail?: string | null;
  upn?: string | null;
  mobilePhone?: string | null;
}

/** Application details from people picker search results. */
export interface ApiPeoplePickerApplication {
  applicationId: string;
  applicationName?: string | null;
  servicePrincipalType: ApiServicePrincipalType;
}

/** Resolved account result from people picker resolve endpoint. */
export interface ApiPeoplePickerProfile {
  success: boolean;
  statusCode: number;
  errorMessage?: string | null;
  identifier: string;
  account?: ApiPeoplePickerResolvedAccount | null;
}

/** Resolved account details (similar to ApiPeoplePickerAccount but for resolve endpoint). */
export interface ApiPeoplePickerResolvedAccount {
  azureUniqueId?: string | null;
  name: string;
  accountType: ApiPeoplePickerAccountType;
  accountLabel: string;
  /** Person details (when accountType is "Person"). */
  person?: ApiPeoplePickerResolvedPerson | null;
  /** Application details (when accountType is "SystemAccount" and it's an app). */
  application?: ApiPeoplePickerApplication | null;
  avatarColor: string;
  avatarUrl: string;
  isExpired: boolean;
}

/** Person details from people picker resolve endpoint (same as ApiPeoplePickerPerson). */
export interface ApiPeoplePickerResolvedPerson {
  accountType: ApiCompanyAccountType;
  jobTitle?: string | null;
  department?: string | null;
  fullDepartment?: string | null;
  employeeNumber?: string | null;
  employeeType?: string | null;
  managerAzureUniqueId?: string | null;
  mail?: string | null;
  preferredMail?: string | null;
  upn?: string | null;
  mobilePhone?: string | null;
}
