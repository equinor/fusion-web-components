/**
 * Fusion Portal Config API — TypeScript model definitions
 *
 * Source of truth: Fusion.Services.PortalConfig/Controllers/ViewModels/
 * No published NuGet API-model package — models are service-internal.
 *
 * All property names use camelCase to match JSON serialization.
 */

// ---------------------------------------------------------------------------
// Response models — Portals
// ---------------------------------------------------------------------------

/** Returned by GET /portals/{id}. */
export interface ApiPortal {
  id: string;
  name: string;
  displayName: string;
  description: string;
  isDeleted: boolean | null;
  template: ApiPortalTemplate;
  category: ApiCategory | null;
  visualization: ApiVisualization | null;
  admins: ApiAccount[];
  build: ApiPortalConfigVersion | null;
}

/** Returned by GET /portals (list). */
export interface ApiPortalListItem {
  id: string;
  name: string;
  displayName: string;
  description: string;
  isDeleted: boolean | null;
  template: ApiPortalTemplate | null;
  category: ApiCategory | null;
  visualization: ApiVisualization | null;
  admins: ApiAccount[] | null;
}

export interface ApiPortalConfigVersion {
  version: string;
  tags: string[];
  templateEntry: string;
  schemaEntry: string;
  assetPath: string;
  configUrl: string;
  timestamp: string | null;
  commitSha: string | null;
  githubRepo: string | null;
  projectPage: string | null;
  annotations: Record<string, unknown>;
  uploadedDate: string;
  uploadedBy: ApiAccount;
  schema: Record<string, unknown> | null;
  config: Record<string, unknown> | null;
}

export interface ApiPortalTag {
  tagName: string | null;
  version: string | null;
}

export interface ApiPortalAppListItem {
  appKey: string;
}

export interface ApiPortalTemplateVersionListItem {
  version: string;
  build: ApiTemplateVersionListItem;
  isConfigured: boolean;
  config: ApiPortalConfigVersionListItem;
}

export interface ApiPortalConfigVersionListItem {
  tags: string[];
  lastModifiedDate: string;
}

// ---------------------------------------------------------------------------
// Response models — Templates
// ---------------------------------------------------------------------------

export interface ApiPortalTemplate {
  id: string;
  name: string;
  displayName: string;
  description: string;
  isDeleted: boolean | null;
}

/** Returned by GET /templates/{id}. */
export interface ApiTemplate {
  id: string;
  name: string;
  displayName: string;
  description: string;
  isDeleted: boolean | null;
  admins: ApiAccount[];
  tags: ApiTemplateTag[];
}

export interface ApiTemplateListItem {
  id: string;
  name: string | null;
  displayName: string | null;
  description: string | null;
  isDeleted: boolean | null;
  admins: ApiAccount[] | null;
  tags: ApiTemplateTag[] | null;
}

export interface ApiTemplateVersion {
  id: string;
  version: string;
  tags: string[];
  templateEntry: string;
  schemaEntry: string;
  assetPath: string;
  portalTemplateId: string;
  portalTemplateName: string;
  timestamp: string | null;
  commitSha: string | null;
  githubRepo: string | null;
  projectPage: string | null;
  annotations: Record<string, unknown>;
  uploadedDate: string;
  uploadedBy: ApiAccount | null;
}

export interface ApiTemplateVersionListItem {
  portalTemplateName: string;
  tags: string[];
  uploadedDate: string;
}

export interface ApiTemplateTag {
  tagName: string | null;
  version: string | null;
}

// ---------------------------------------------------------------------------
// Response models — Supporting
// ---------------------------------------------------------------------------

export interface ApiCategory {
  id: string;
  name: string;
  displayName: string;
}

export interface ApiAccount {
  azureUniqueId: string;
  displayName: string;
  mail: string | null;
  upn: string | null;
  accountType: string;
  accountClassification: string | null;
  isExpired: boolean;
}

export interface ApiVisualization {
  color: string | null;
  icon: string | null;
  sortOrder: number;
}

// ---------------------------------------------------------------------------
// Response models — Settings / CSP
// ---------------------------------------------------------------------------

export interface ApiGlobalSettings {
  contentSecurityPolicy: ApiContentSecurityPolicy;
}

export interface ApiContentSecurityPolicy {
  reportOnly: boolean;
  reportUrl: string;
  directives: ApiDirective[];
}

export interface ApiDirective {
  name: string;
  allowedSources: ApiAllowedSource[];
}

export interface ApiAllowedSource {
  source: string;
}

// ---------------------------------------------------------------------------
// Request models
// ---------------------------------------------------------------------------

/**
 * POST /portals — create a portal.
 *
 * Validation:
 * @property name — Required, 3–50 chars, URL-safe
 * @property displayName — Required
 * @property template — Required (valid template ID)
 * @property admins — At least one valid account
 */
export interface CreatePortalRequest {
  /** @minLength 3  @maxLength 50 — URL-safe */
  name: string;
  displayName: string;
  description?: string;
  template: string;
  category?: string | null;
  visualization?: ApiVisualization | null;
  admins: string[];
}

export interface PatchVisualizationRequest {
  color?: string | null;
  icon?: string | null;
  sortOrder?: number | null;
}

export interface PatchPortalRequest {
  description?: string | null;
  displayName?: string | null;
  template?: string | null;
  category?: string | null;
  visualization?: PatchVisualizationRequest | null;
  admins?: string[] | null;
}

export interface CreatePortalTemplateRequest {
  /** @minLength 3  @maxLength 50 — URL-safe */
  name: string;
  displayName: string;
  description?: string | null;
  admins: string[];
}

export interface PatchPortalTemplateRequest {
  description?: string | null;
  displayName?: string | null;
  admins?: string[] | null;
}

export interface AddPortalAppRequest {
  /** @minLength 3  @maxLength 50 — must be a valid app key */
  appKey: string;
}

export interface CreatePortalTagRequest {
  /** @maxLength 250 */
  version: string;
}

export interface CreatePortalTemplateTagRequest {
  /** @maxLength 250 */
  version: string;
}

export interface CreateCategoryRequest {
  /** @minLength 3  @maxLength 50 */
  name: string;
  /** @minLength 3  @maxLength 100 */
  displayName: string;
}

export interface PatchCategoryRequest {
  /** @minLength 3  @maxLength 100 */
  displayName?: string | null;
}
