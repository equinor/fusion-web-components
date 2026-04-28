/**
 * Fusion Bookmarks API — TypeScript model definitions
 *
 * Source of truth: Fusion.Services.Bookmarks/Controllers/
 * No published NuGet API-model package — models are service-internal.
 *
 * All property names use camelCase to match JSON serialization.
 */

// ---------------------------------------------------------------------------
// Enums (serialized as strings)
// ---------------------------------------------------------------------------

export type FusionAccountType =
  | "Employee"
  | "Consultant"
  | "External"
  | "Local"
  | "Unknown"
  | "Application";

export type AccountClassification =
  | "Unclassified"
  | "Internal"
  | "External";

// ---------------------------------------------------------------------------
// Response models
// ---------------------------------------------------------------------------

/** Returned by GET /persons/me/bookmarks (v1) and GET /bookmarks/{id} (v1). */
export interface ApiBookmark {
  id: string;
  name: string;
  description: string | null;
  isShared: boolean;
  payload: unknown | null;
  appKey: string;
  context: ApiFusionContext | null;
  createdBy: ApiPerson;
  updatedBy: ApiPerson | null;
  created: string;
  updated: string | null;
  sourceSystem: ApiSourceSystem | null;
  isFavourite: boolean | null;
}

/** Same as ApiBookmark but without payload. */
export interface ApiBookmarkV2 {
  id: string;
  name: string;
  description: string | null;
  isShared: boolean;
  appKey: string;
  context: ApiFusionContext | null;
  createdBy: ApiPerson;
  updatedBy: ApiPerson | null;
  created: string;
  updated: string | null;
  sourceSystem: ApiSourceSystem | null;
  isFavourite: boolean | null;
}

/** Returned by GET /bookmarks/{id}/apply. */
export interface ApiBookmarkPayload {
  id: string;
  payload: unknown;
  context: ApiFusionContext | null;
}

export interface ApiSourceSystem {
  /** @maxLength 50 — Required when source system is provided. */
  identifier: string;
  /** @maxLength 100 */
  name: string | null;
  /** @maxLength 100 */
  subSystem: string | null;
}

export interface ApiFusionContext {
  id: string;
  name: string;
  type: string;
}

export interface ApiPerson {
  azureUniqueId: string | null;
  mail: string | null;
  name: string;
  phoneNumber: string | null;
  jobTitle: string | null;
  accountType: FusionAccountType;
  accountClassification: AccountClassification | null;
}

// ---------------------------------------------------------------------------
// Request models
// ---------------------------------------------------------------------------

/**
 * POST /bookmarks — create a bookmark.
 *
 * Validation (FluentValidation):
 * @property name — Required, valid name format
 * @property appKey — Required, valid app key format
 * @property description — Valid format when present
 * @property contextId — Valid Fusion context when present
 * @property payload — Required, must not be null
 * @property sourceSystem.identifier — Required, max 50, no script tags
 * @property sourceSystem.name — Max 100, no script tags
 * @property sourceSystem.subSystem — Max 100, no script tags
 */
export interface CreateBookmarkRequest {
  name: string;
  appKey: string;
  description?: string | null;
  contextId?: string | null;
  payload: unknown;
  isShared?: boolean;
  sourceSystem?: ApiSourceSystem | null;
}

/**
 * PATCH /bookmarks/{id} — update bookmark fields.
 * Only properties present in the payload are applied.
 */
export interface PatchBookmarkRequest {
  name?: string;
  appKey?: string;
  description?: string | null;
  contextId?: string | null;
  payload?: unknown;
  isShared?: boolean;
  sourceSystem?: ApiSourceSystem | null;
}

/**
 * POST /persons/me/bookmarks/favourites — add a bookmark favourite for the current user.
 */
export interface AddFavouriteRequest {
  bookmarkId: string;
}
