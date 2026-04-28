/**
 * Fusion Apps API — TypeScript model definitions
 *
 * Source of truth: Fusion.Services.Apps/Controllers/
 * No published NuGet API-model package — models are service-internal.
 *
 * All property names use camelCase to match JSON serialization.
 */

// ---------------------------------------------------------------------------
// Enums (serialized as strings)
// ---------------------------------------------------------------------------

export type ApiAppType = string;

export type ApiGovernanceDocumentType =
  | "AccessOverview"
  | "Goal"
  | "DataSource"
  | "PrivacyStatement"
  | "LRA";

export type ApiDataClassificationLevel = string;

// ---------------------------------------------------------------------------
// Core response models
// ---------------------------------------------------------------------------

/** Returned by GET /apps and GET /apps/{appKey}. */
export interface ApiApp {
  appKey: string;
  id: string;
  displayName: string;
  description: string | null;
  type: string;
  category: ApiAppCategory | null;
  visualization: ApiAppVisualization | null;
  contexts: ApiAppContext[] | null;
  keywords: string[] | null;
  admins: ApiAppAdmin[] | null;
  owners: ApiAppOwner[] | null;
  build: ApiAppVersion | null;
  classification: ApiDataClassification | null;
}

export interface ApiAppListItem extends ApiApp {}

export interface ApiPersonApp extends ApiApp {
  isPinned: boolean;
}

export interface ApiPersonAppListItem extends ApiPersonApp {}

export interface ApiAppVersion {
  version: string;
  entryPoint: string;
  tags: string[];
  tag: string | null;
  assetPath: string;
  configUrl: string;
  timestamp: string | null;
  commitSha: string | null;
  githubRepo: string | null;
  projectPage: string | null;
  annotations: Record<string, unknown>;
  uploadedBy: ApiAccount | null;
  uploadedDate: string;
}

export interface ApiAppCategory {
  id: string;
  name: string;
  displayName: string;
  color: string | null;
  defaultIcon: string | null;
  sortOrder: number | null;
}

export interface ApiAppTag {
  tagName: string | null;
  version: string | null;
}

export interface ApiAppTagHistory {
  tagName: string;
  version: string;
  buildId: string;
  created: string;
  replaced: string | null;
  isCurrent: boolean;
  createdBy: ApiAccount;
  deletedBy: ApiAccount | null;
}

export interface ApiAppAdmin {
  id: string;
  azureUniqueId: string | null;
  displayName: string | null;
  mail: string | null;
  upn: string | null;
  accountType: string | null;
  accountClassification: string | null;
  isExpired: boolean;
}

export interface ApiAppOwner {
  id: string;
  azureUniqueId: string | null;
  displayName: string | null;
  mail: string | null;
  upn: string | null;
  accountType: string | null;
  accountClassification: string | null;
  isExpired: boolean;
}

export interface ApiAppVisualization {
  color: string | null;
  icon: string | null;
  sortOrder: number;
}

export interface ApiAppContext {
  type: string;
  isCustom: boolean;
}

export interface ApiContextType {
  id: string;
  name: string;
  isCustom: boolean;
  description: string | null;
}

export interface ApiDataClassification {
  level: string;
  description: string | null;
  impact: string;
  reason: string | null;
  updatedAt: string;
  updatedBy: ApiAccount;
}

export interface ApiDataClassificationDefinition {
  name: string;
  description: string;
  impact: string;
}

// ---------------------------------------------------------------------------
// Pinned apps
// ---------------------------------------------------------------------------

export interface ApiPinnedApp {
  key: string;
  name: string;
  description: string;
  icon: string | null;
  accentColor: string | null;
  appCategory: ApiPinnedAppCategory | null;
}

export interface ApiPinnedAppCategory {
  id: string;
  displayName: string;
  color: string | null;
  icon: string | null;
}

// ---------------------------------------------------------------------------
// Governance models
// ---------------------------------------------------------------------------

export interface ApiGovernanceApp {
  appKey: string;
  displayName: string;
  classification: ApiDataClassification | null;
  businessOwnerOrgUnit: ApiBusinessOwnerOrgUnit | null;
  confirmation: ApiGovernanceConfirmation | null;
  documents: ApiGovernanceDocument[];
  businessOwners: ApiBusinessOwner[];
  projectCategories: ApiProjectCategory[];
  projectPhases: ApiProjectPhase[];
  technologyProduct: ApiTechnologyProduct | null;
  supportsAllProjectPhases: boolean;
  supportsAllProjectCategories: boolean;
  updatedAt: string | null;
  properties: Record<string, unknown> | null;
}

export interface ApiGovernanceAppListItem extends ApiGovernanceApp {}

export interface ApiGovernanceDocument {
  id: string;
  content: string;
  type: ApiGovernanceDocumentType;
  typeDisplayName: string;
  createdBy: ApiAccount;
  createdAt: string;
  updatedBy: ApiAccount | null;
  updatedAt: string | null;
}

export interface ApiGovernanceDocumentListItem extends ApiGovernanceDocument {}

export interface ApiGovernanceConfirmation {
  comment: string | null;
  confirmedAt: string;
  confirmedBy: ApiAccount;
}

export interface ApiBusinessOwner {
  role: string;
  roleDisplayName: string;
  createdAt: string;
  azureUniqueId: string;
  mail: string | null;
  upn: string | null;
  isExpired: boolean;
  reason: string | null;
}

export interface ApiBusinessOwnerOrgUnit {
  sapId: string;
  fullDepartment: string | null;
}

export interface ApiProjectPhase {
  id: string;
  externalId: string;
  createdAt: string;
  name: string | null;
  description: string | null;
}

export interface ApiProjectCategory {
  id: string;
  externalId: string;
  createdAt: string;
  name: string | null;
  description: string | null;
}

export interface ApiTechnologyProduct {
  id: string;
  name: string;
  description: string;
  businessSolutionOwner: ApiAccount;
  technologyProductManager: ApiAccount;
  createdAt: string;
  updatedAt: string | null;
}

// ---------------------------------------------------------------------------
// Widgets
// ---------------------------------------------------------------------------

export interface ApiWidget {
  id: string;
  widgetKey: string;
  description: string;
  admins: ApiWidgetAdmin[] | null;
  build: ApiWidgetVersion | null;
}

export interface ApiWidgetVersion {
  version: string;
  entryPoint: string;
  tag: string | null;
  assetPath: string | null;
  configUrl: string | null;
  timestamp: string | null;
  commitSha: string | null;
  githubRepo: string | null;
  annotations: Record<string, unknown>;
}

export interface ApiWidgetAdmin {
  id: string;
  azureUniqueId: string | null;
  displayName: string | null;
  mail: string | null;
  upn: string | null;
  accountType: string | null;
  accountClassification: string | null;
}

export interface ApiWidgetTag {
  tagName: string | null;
  version: string | null;
}

// ---------------------------------------------------------------------------
// Shared models
// ---------------------------------------------------------------------------

export interface ApiAccount {
  azureUniqueId: string;
  displayName: string;
  mail: string | null;
  upn: string | null;
  accountType: string;
  accountClassification: string | null;
  isExpired: boolean;
}

export interface ApiChangelog {
  id: string;
  commandName: string;
  timestamp: string;
  appKey: string | null;
  appVersionIdentifier: string | null;
  categoryName: string | null;
  activityId: string | null;
  actorUpn: string | null;
  actorAzureUniqueId: string | null;
  payload: Record<string, unknown> | null;
  azureAppId: string | null;
}

export interface ApiTaggedPerson {
  azureUniqueId: string;
  displayName: string;
  mail: string | null;
  upn: string | null;
  isPersonExpired: boolean;
  tagName: string;
}

export interface ApiEndpointConfig {
  url: string;
  scopes: string[];
}

export interface ApiAppVersionConfig {
  environment: Record<string, unknown>;
  endpoints: Record<string, ApiEndpointConfig>;
}

// ---------------------------------------------------------------------------
// Request models
// ---------------------------------------------------------------------------

/**
 * POST /apps — create a new app.
 *
 * Validation (FluentValidation):
 * @property appKey — Required, 3–50 chars, URL-safe (BeValidAppKey)
 * @property displayName — Required, 3–100 chars, no script tags
 * @property description — Optional, max 500 chars, no script tags
 * @property admins — Required, at least one valid account
 * @property owners — Each must be a valid account
 * @property keywords — Each max 50 chars
 */
export interface CreateAppRequest {
  /** @minLength 3  @maxLength 50 — must be URL-safe */
  appKey: string;
  /** @minLength 3  @maxLength 100 */
  displayName: string;
  /** @maxLength 500 */
  description?: string | null;
  type?: string;
  templateSource?: TemplateSourceRequest | null;
  category?: string | null;
  visualization?: ApiAppVisualization | null;
  contexts?: AppContextRequest[] | null;
  /** Each keyword max 50 chars */
  keywords?: string[] | null;
  admins: string[];
  owners?: string[] | null;
}

/**
 * PATCH /apps/{appKey} — update app fields.
 * Only properties present in the payload are applied.
 */
export interface PatchAppRequest {
  /** @maxLength 500 */
  description?: string | null;
  /** @minLength 3  @maxLength 100 */
  displayName?: string;
  type?: string;
  templateSource?: TemplateSourceRequest | null;
  keywords?: string[] | null;
  admins?: string[];
  owners?: string[] | null;
  visualization?: ApiAppVisualization | null;
  contexts?: AppContextRequest[] | null;
  category?: string | null;
}

/**
 * POST /apps/categories — create an app category.
 *
 * Validation:
 * @property name — Required, 3–50 chars (BeValidAppCategoryName)
 * @property displayName — Required, 3–100 chars
 * @property color — Max 20 chars
 */
export interface CreateAppCategoryRequest {
  /** @minLength 3  @maxLength 50 */
  name: string;
  /** @minLength 3  @maxLength 100 */
  displayName: string;
  /** @maxLength 20 */
  color?: string | null;
  defaultIcon?: string | null;
  sortOrder?: number | null;
}

/**
 * PATCH /apps/categories/{appCategoryIdentifier} — update an app category.
 * Only properties present in the payload are applied.
 */
export interface PatchCategoryRequest {
  /** @minLength 3  @maxLength 50 */
  displayName?: string | null;
  /** @maxLength 20 */
  color?: string | null;
  defaultIcon?: string | null;
  sortOrder?: number | null;
}

/**
 * POST /apps/{appKey}/tags/{tagName} — create an app tag.
 *
 * Validation:
 * @property version — Valid version format, max 250
 */
export interface CreateAppTagRequest {
  /** @maxLength 250 */
  version: string;
}

export interface CreatePinnedAppRequest {
  /** @maxLength 200 */
  appKey: string;
}

/**
 * POST /apps/context-types — create a context type.
 *
 * Validation:
 * @property name — Required, 2–50 chars, URL-safe
 * @property description — Required if isCustom, max 500
 */
export interface CreateContextTypeRequest {
  /** @minLength 2  @maxLength 50 */
  name: string;
  isCustom: boolean;
  /** @maxLength 500 */
  description?: string | null;
}

/**
 * PUT /apps/{appKey}/governance/classification — set classification.
 *
 * Validation:
 * @property level — Required, valid classification type
 * @property reason — Required if level is Confidential, max 255
 */
export interface DataClassificationRequest {
  level: string;
  /** @maxLength 255 */
  reason?: string | null;
}

export interface TemplateSourceRequest {
  appIdentifier: string;
  appVersionIdentifier: string;
}

export interface AppContextRequest {
  /** @maxLength 50 */
  type: string;
  /** @maxLength 500 */
  description?: string | null;
  isCustom?: boolean;
}

/**
 * PUT /apps/{appKey}/governance/technology-product.
 */
export interface CreateTechnologyProductRequest {
  /** @maxLength 100 */
  name: string;
  /** @maxLength 2000 */
  description: string;
  businessSolutionOwner: string;
  technicalProductManager: string;
}

/**
 * PUT /apps/{appKey}/governance/business-owners.
 */
export interface UpdateBusinessOwnerRequest {
  accountIdentifier: string;
  role: string;
  /** @maxLength 1000 */
  reason?: string | null;
}

/**
 * POST /apps/{appKey}/governance/documents.
 */
export interface AppGovernanceDocumentRequest {
  content?: string | null;
  type: ApiGovernanceDocumentType;
}

export interface PatchGovernanceDocumentRequest {
  content?: string | null;
}

export interface ConfirmGovernanceRequest {
  /** @maxLength 255 */
  comment?: string | null;
}

export interface CreatePersonAppTagRequest {
  tag?: string | null;
}

export interface CreateAppBuildConfigRequest {
  environment?: Record<string, unknown> | null;
  endpoints?: Record<string, ApiEndpointConfigRequest> | null;
}

export interface ApiEndpointConfigRequest {
  url: string;
  scopes?: string[] | null;
}

export interface PatchGovernanceAppRequest {
  businessOwners?: UpdateBusinessOwnerRequest[] | null;
  businessOwnerOrgUnit?: UpdateBusinessOwnerOrgUnitRequest | null;
  classification?: DataClassificationRequest | null;
  projectPhases?: UpdateProjectPhaseRequest[] | null;
  projectCategories?: UpdateProjectCategoryRequest[] | null;
  technologyProduct?: UpdateTechnologyProductForAppRequest | null;
  supportsAllProjectPhases?: boolean | null;
  supportsAllProjectCategories?: boolean | null;
  properties?: PropertiesCollection | null;
}

export interface UpdateBusinessOwnerOrgUnitRequest {
  sapId?: string | null;
}

export interface UpdateProjectPhaseRequest {
  externalId: string;
}

export interface UpdateProjectCategoryRequest {
  externalId: string;
}

export interface UpdateTechnologyProductForAppRequest {
  identifier?: string | null;
}

export interface PropertiesCollection {
  [key: string]: unknown;
}
