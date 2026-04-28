/**
 * Fusion Reports API — TypeScript model definitions
 *
 * Source of truth: Fusion.Services.Reports/Controllers/ViewModels/
 * No published NuGet API-model package — models are service-internal.
 *
 * All property names use camelCase to match JSON serialization.
 */

// ---------------------------------------------------------------------------
// Enums (serialized as strings)
// ---------------------------------------------------------------------------

export type ApiReportType = string;

export type ApiConfigType = string;

export type ApiEmbedType = string;

export type ApiPowerBITokenType = string;

export type ApiSecurityRequirementCheckType = string;

export type ApiRequirementType = string;

export type ApiGroupType = string;

export type ApiItemValidationType = "Error" | "Warning" | "Info";

// ---------------------------------------------------------------------------
// Core response models
// ---------------------------------------------------------------------------

/** Returned by GET /reports and GET /reports/{id}. */
export interface ApiReport {
  id: string;
  globalIdentifier: string | null;
  title: string;
  dateCreatedUtc: string;
  dateModifiedUtc: string | null;
  datePublishedUtc: string | null;
  ownedBy: ApiPerson | null;
  userTargetGroup: string | null;
  dataRefreshRate: string | null;
  dataSources: string | null;
  access: string | null;
  isPublished: boolean;
  isEmbedOnly: boolean;
  allowExternalUsers: boolean;
  allowOnlyEmployees: boolean;
  denyExtHire: boolean;
  securityRequirementCheck: ApiSecurityRequirementCheckType;
  securityRequirements: ApiSecurityRequirement[] | null;
  publishedBy: ApiPerson | null;
  apiEmbedConfig: ApiEmbedConfig | null;
  reportType: ApiReportType;
}

export interface ApiEmbedConfig {
  id: string;
  type: ApiConfigType;
  embedConfig: ApiDynamicEmbedConfig | null;
}

export interface ApiConfig {
  type: ApiConfigType;
}

export interface ApiDynamicEmbedConfig {
  name: string | null;
  generic: Record<string, unknown> | null;
}

export interface ApiDynamicPowerBiEmbedConfig {
  name: string | null;
  embedType: ApiEmbedType;
  embedUrl: string | null;
  tokenType: ApiPowerBITokenType;
  datasetId: string | null;
  dashboardId: string | null;
  groupId: string | null;
  reportId: string | null;
  tileId: string | null;
  rlsConfiguration: ApiRlsConfiguration | null;
}

export interface ApiPowerBIEmbedConfig {
  name: string | null;
  embedType: ApiEmbedType;
  embedUrl: string | null;
  tokenType: ApiPowerBITokenType;
  groupId: string | null;
  datasetId: string | null;
  dashboardId: string | null;
  reportId: string | null;
  tileId: string | null;
  rlsConfiguration: ApiRlsConfiguration | null;
}

export interface ApiRlsConfiguration {
  version: number;
  /** Computed from the config shape. */
  typeName: string | null;
  globalAccessRequirement: unknown | null;
  identity: unknown | null;
  roles: unknown[] | null;
}

export interface ApiSecurityRequirement {
  id: string | null;
  requirementType: ApiRequirementType;
  value: string | null;
}

// ---------------------------------------------------------------------------
// Person / Group
// ---------------------------------------------------------------------------

export interface ApiPerson {
  id: string;
  azureUniqueId: string | null;
  name: string | null;
  department: string | null;
  jobTitle: string | null;
  officeLocation: string | null;
  mail: string | null;
  mobilePhone: string | null;
  isAffiliateAccess: boolean;
  accountType: string | null;
}

export interface ApiGroup {
  id: string;
  displayName: string;
  description: string;
  type: ApiGroupType;
}

// ---------------------------------------------------------------------------
// Status / Health
// ---------------------------------------------------------------------------

export interface ApiReportStatus {
  reportId: string;
  title: string | null;
  hasRlsConfig: boolean;
  hasSecurityRequirements: boolean;
  hasPbiDependencyErrors: boolean;
  reportStatus: ApiFusionReportStatus | null;
  pbiStatus: ApiPbiStatus | null;
  pbiDataSet: unknown | null;
  pbiDataSetLastRefresh: unknown | null;
  pbiDataSetRefreshSchedule: unknown | null;
}

export interface ApiFusionReportStatus {
  health: string;
  message: string;
  timer: string;
}

export interface ApiPbiStatus {
  health: string;
  message: string | null;
}

// ---------------------------------------------------------------------------
// Access token
// ---------------------------------------------------------------------------

export interface ApiAccessToken {
  expirationUtc: string;
  token: string;
}

// ---------------------------------------------------------------------------
// Audit
// ---------------------------------------------------------------------------

export interface ApiAuditLog {
  reportTitle: string | null;
  /** Computed from users list. */
  distinctUsersCount: number | null;
  users: ApiAuditLogEntry[];
}

export interface ApiAuditLogEntry {
  requestCount: number | null;
  userEmail: string | null;
  requests: ApiAuditRequest[] | null;
}

export interface ApiAuditRequest {
  requestedDate: string;
  statusCode: string | null;
  message: string | null;
}

// ---------------------------------------------------------------------------
// Config validation
// ---------------------------------------------------------------------------

export interface ApiConfigValidation {
  items: ApiReportConfigItemValidation[];
  /** Computed — true when no Error items. */
  isValid: boolean;
}

export interface ApiReportConfigItemValidation {
  type: ApiItemValidationType;
  code: string;
  message: string;
}

// ---------------------------------------------------------------------------
// DataFlow (admin)
// ---------------------------------------------------------------------------

export interface ApiDataFlow {
  id: string;
  name: string;
  description: string;
  modelUrl: string;
  configuredBy: string;
  pbiStatus: ApiPbiStatus | null;
  clientId: string;
  clientSecretHash: string;
  transactions: ApiPbiDataFlowTransaction[] | null;
}

export interface ApiPbiDataFlowTransaction {
  id: string;
  refreshType: string;
  startTime: string | null;
  endTime: string | null;
  status: string;
}

// ---------------------------------------------------------------------------
// Request models
// ---------------------------------------------------------------------------

/**
 * POST /reports — create a report.
 *
 * Validation (FluentValidation):
 * @property title — Required, no script tags
 * @property ownedBy — Required
 * @property globalIdentifier — Optional, 3–50 chars, URL-safe
 * @property dataRefreshRate — No script tags when present
 * @property dataSources — No script tags when present
 * @property access — No script tags when present
 * @property userTargetGroup — No script tags when present
 */
export interface CreateReportRequest {
  title: string;
  ownedBy: string;
  /** @minLength 3  @maxLength 50 — URL-safe */
  globalIdentifier?: string | null;
  dataRefreshRate?: string | null;
  dataSources?: string | null;
  access?: string | null;
  userTargetGroup?: string | null;
  reportType?: ApiReportType;
}

/**
 * PUT /reports/{id}/config — update report embed configuration.
 *
 * Validation:
 * @property type — Required
 * @property tokenType — Required when type is Power BI
 * @property groupId — Required when type is Power BI
 * @property embedUrl — Must be an absolute URL, no script tags
 * @property name — No script tags when present
 */
export interface UpdateConfigRequest {
  name?: string | null;
  type: ApiConfigType;
  embedType?: ApiEmbedType;
  embedUrl?: string | null;
  tokenType?: ApiPowerBITokenType;
  groupId?: string | null;
  datasetId?: string | null;
  dashboardId?: string | null;
  reportId?: string | null;
  tileId?: string | null;
  rlsConfiguration?: ApiRlsConfiguration | null;
}

/**
 * PUT /reports/{id} — update report metadata and ACL-related settings.
 */
export interface UpdateReportRequest {
  title: string;
  ownedBy: ApiPerson;
  securityRequirementCheck?: ApiSecurityRequirementCheckType | null;
  securityRequirements?: ApiSecurityRequirement[] | null;
  userTargetGroup?: string | null;
  dataRefreshRate?: string | null;
  dataSources?: string | null;
  access?: string | null;
  allowExternalUsers: boolean;
  allowOnlyEmployees: boolean;
  denyExtHire: boolean;
  isEmbedOnly: boolean;
  globalIdentifier?: string | null;
}

/**
 * POST /reports/config/validate — validate report embed configuration before save.
 */
export interface ValidateConfigRequest {
  embedType?: ApiEmbedType | null;
  embedUrl?: string | null;
  tokenType?: ApiPowerBITokenType | null;
  groupId: string;
  reportId?: string | null;
  datasetId?: string | null;
  dashboardId?: string | null;
  tileId?: string | null;
  rlsConfiguration?: ApiRlsConfiguration | null;
}

/**
 * PUT /reports/{id}/config/generic — generic JSON config parsing result.
 */
export interface GenericConfig {
  isValid: boolean;
  config?: unknown;
  errorMessage?: string | null;
}

/**
 * PUT markdown-content endpoints under `/reports/{id}/.../content`.
 */
export interface UpdateMarkdownRequest {
  content?: string | null;
}
