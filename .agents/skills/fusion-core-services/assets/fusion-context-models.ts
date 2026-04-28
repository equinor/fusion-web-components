/**
 * Fusion Context API — TypeScript model definitions
 *
 * Source of truth: Fusion.Services.Context/Controllers/ViewModels/
 * No published NuGet API-model package — models are service-internal.
 *
 * All property names use camelCase to match JSON serialization.
 */

// ---------------------------------------------------------------------------
// Response models
// ---------------------------------------------------------------------------

/** Returned by GET /contexts and GET /contexts/{id}. */
export interface ApiContextEntity {
  id: string;
  externalId: string;
  type: ApiContextType;
  value: Record<string, unknown> | null;
  title: string;
  source: string | null;
  isActive: boolean;
  isDeleted: boolean;
  created: string;
  updated: string | null;
}

export interface ApiContextType {
  id: string;
  isChildType: boolean;
  parentTypeIds: string[];
}

/** Returned by GET /contexts/types — includes JSON schema for the value shape. */
export interface ApiContextTypeDetails {
  id: string;
  isChildType: boolean;
  parentTypeIds: string[];
  /** JSON schema describing the expected context value structure. Omitted when null. */
  valueSchema: Record<string, unknown> | null;
}

/** Returned by GET /contexts/{id}/relations. */
export interface ApiRelatedContextEntity extends ApiContextEntity {
  relationSource: string | null;
  relationType: string | null;
}

/** Returned by GET /relations. */
export interface ApiContextEntityRef {
  type: string | null;
  source: string | null;
  targetId: string;
  parentId: string;
}

export interface ApiPersonIdentifier {
  uniqueId: string;
  mail: string | null;
}

// ---------------------------------------------------------------------------
// Request models
// ---------------------------------------------------------------------------

/**
 * POST /contexts — create a new context.
 *
 * Validation (FluentValidation):
 * @property type.id — Required, must be an existing context type
 * @property title — Required, max 200 chars, no script tags
 * @property externalId — Required, max 100 chars, no script tags
 * @property source — Optional, max 100 chars, no script tags
 */
export interface NewContextRequest {
  type: ApiContextType;
  value: Record<string, unknown>;
  /** @maxLength 200 */
  title: string;
  /** @maxLength 100 */
  source?: string | null;
  isActive: boolean;
  /** @maxLength 100 */
  externalId: string;
}

/**
 * PUT /contexts/{id} — replace a context.
 *
 * Validation (FluentValidation):
 * Same rules as NewContextRequest, plus:
 * @property id — Must match the route parameter
 */
export interface UpdateContextRequest {
  id: string;
  /** @maxLength 100 */
  externalId: string;
  type: ApiContextType;
  value: Record<string, unknown>;
  /** @maxLength 200 */
  title: string;
  /** @maxLength 100 */
  source?: string | null;
  isActive: boolean;
}

/**
 * PUT /contexts/{parentId}/relations/{targetId} — create or update a relation.
 *
 * Validation (FluentValidation):
 * @property source — Optional, max 100 chars, no script tags
 * @property type — Optional, max 150 chars, no script tags
 */
export interface ContextRelationRequest {
  /** @maxLength 100 */
  source?: string | null;
  /** @maxLength 150 */
  type?: string | null;
}
