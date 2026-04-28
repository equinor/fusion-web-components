/**
 * Fusion Service Messages API — TypeScript model definitions
 *
 * Source of truth: Fusion.Services.ServiceMessages/Controllers/ViewModels/
 * No published NuGet API-model package — models are service-internal.
 *
 * All property names use camelCase to match JSON serialization.
 */

// ---------------------------------------------------------------------------
// Response models
// ---------------------------------------------------------------------------

/** Returned by GET /service-messages and GET /service-messages/{id}. */
export interface ApiServiceMessage {
  id: string;
  type: string;
  title: string;
  content: string | null;
  scope: string;
  relevantApps: string[] | null;
  relevantPortals: string[] | null;
  visibility: ApiMessageVisibility | null;
  created: string;
  createdBy: ApiPersonRef;
  updated: string | null;
  updatedBy: ApiPersonRef | null;
  /** Computed — true when visibility window is currently active. */
  isCurrentlyActive: boolean;
}

export interface ApiMessageVisibility {
  appliesFrom: string | null;
  appliesTo: string | null;
  hidden: boolean;
  notifyUser: boolean;
  critical: boolean;
}

export interface ApiPersonRef {
  azureUniqueId: string;
  name: string;
  jobTitle: string | null;
  department: string | null;
  accountType: string;
  accountClassification: string | null;
  mail: string | null;
  upn: string;
}

/** Active messages returned by GET /service-messages/active. */
export interface ApiActiveServiceMessage {
  id: string;
  type: string;
  title: string;
  content: string | null;
  scope: string;
  notifyUser: boolean;
  critical: boolean;
  relevantApps: ApiAppRef[] | null;
  relevantPortals: ApiPortalRef[] | null;
  appliesFrom: string | null;
  appliesTo: string | null;
  timestamp: string;
  updated: string | null;
}

export interface ApiAppRef {
  key: string;
  name: string | null;
  shortName: string | null;
  exists: boolean;
}

export interface ApiPortalRef {
  identifier: string;
}

// ---------------------------------------------------------------------------
// Request models
// ---------------------------------------------------------------------------

/**
 * POST /service-messages — create a service message.
 *
 * Validation (FluentValidation):
 * @property title — Required, max 200 chars, no script tags
 * @property content — Max 2000 chars, no script tags
 * @property type — Required, must be a valid message type
 * @property scope — Required, must be a valid scope
 * @property relevantApps — Required when scope is "App", each item not empty
 * @property relevantPortals — Each item URL-safe when present
 */
export interface CreateServiceMessageRequest {
  /** @maxLength 200 */
  title: string;
  /** @maxLength 2000 */
  content?: string | null;
  type: string;
  scope: string;
  relevantApps?: string[] | null;
  relevantPortals?: string[] | null;
  visibility?: CreateMessageVisibilityRequest | null;
}

export interface CreateMessageVisibilityRequest {
  appliesFrom?: string | null;
  appliesTo?: string | null;
  hidden?: boolean;
  notifyUser?: boolean;
  critical?: boolean;
}

export interface UpdateServiceMessageVisibilityRequest {
  appliesFrom?: string | null;
  appliesTo?: string | null;
  hidden?: boolean;
  notifyUser?: boolean;
  critical?: boolean;
}

/**
 * PATCH /service-messages/{id} — update a service message.
 * Only properties present in the payload are applied.
 *
 * Validation:
 * @property title — Max 200, no script tags when present
 * @property scope — Must be valid scope when present
 * @property type — Must be valid message type when present
 * @property relevantApps — Each item not empty when present
 * @property relevantPortals — Each item URL-safe when present
 */
export interface UpdateServiceMessageRequest {
  /** @maxLength 200 */
  title?: string;
  /** @maxLength 2000 */
  content?: string | null;
  type?: string;
  scope?: string;
  relevantApps?: string[] | null;
  relevantPortals?: string[] | null;
  visibility?: UpdateServiceMessageVisibilityRequest | null;
}

/**
 * POST /apps/{appKey}/service-messages — create an app-scoped service message.
 */
export interface CreateServiceMessageForAppRequest {
  /** @maxLength 200 */
  title: string;
  /** @maxLength 2000 */
  content?: string | null;
  type: string;
  visibility?: CreateMessageVisibilityRequest | null;
}

/**
 * PATCH /apps/{appKey}/service-messages/{messageId} — patch an app-scoped service message.
 */
export interface UpdateServiceMessageForAppRequest {
  /** @maxLength 200 */
  title?: string;
  /** @maxLength 2000 */
  content?: string | null;
  type?: string;
  scope?: string;
  visibility?: UpdateServiceMessageVisibilityRequest | null;
}
