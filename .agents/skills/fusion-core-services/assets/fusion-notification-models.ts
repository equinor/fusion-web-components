/**
 * Fusion Notification API — TypeScript model definitions
 *
 * Source of truth: Fusion.Services.Notification/Controllers/ViewModels/
 * No published NuGet API-model package — models are service-internal.
 *
 * All property names use camelCase to match JSON serialization.
 */

// ---------------------------------------------------------------------------
// Enums (serialized as strings)
// ---------------------------------------------------------------------------

export type ApiEmailPriorityV1 = "Unknown" | "High" | "Default" | "Low";

// ---------------------------------------------------------------------------
// Response models
// ---------------------------------------------------------------------------

/** Returned by GET /persons/{personIdentifier}/notifications and GET /notifications/{id}. */
export interface ApiNotificationV1 {
  id: string;
  /** Omitted when null. */
  appKey: string | null;
  emailPriority: ApiEmailPriorityV1;
  /** Fallback HTML content; omitted when null. Populated via $expand=fallbackHtml. */
  fallbackHtml: string | null;
  targetAzureUniqueId: string;
  title: string;
  /** Adaptive Card JSON; omitted when null. */
  card: Record<string, unknown> | null;
  created: string;
  /** Populated via $expand=createdBy. Omitted when null. */
  createdBy: ApiPerson | null;
  /** Populated via $expand=createdByApplication. Omitted when null. */
  createdByApplication: ApiApplication | null;
  seenByUser: boolean;
  seen: string | null;
  sourceSystem: ApiSourceSystem | null;
}

export interface ApiNotificationSettings {
  email: boolean;
  delayInMinutes: number;
  appConfig: ApiAppNotificationSetting[];
}

export interface ApiAppNotificationSetting {
  appKey: string;
  displayName: string;
  description: string;
  enabled: boolean;
}

export interface ApiApplication {
  id: string;
  title: string;
}

export interface ApiPerson {
  id: string;
  name: string;
  jobTitle: string | null;
  mail: string | null;
  accountType: string;
}

export interface ApiSourceSystem {
  name: string | null;
  subSystem: string | null;
  identifier: string | null;
}

// ---------------------------------------------------------------------------
// Request models
// ---------------------------------------------------------------------------

/**
 * POST /persons/{id}/notifications — create a notification.
 *
 * Validation (FluentValidation):
 * @property title — Required, no script tags
 * @property description — Required when card is null, no script tags
 * @property card — Must be valid Adaptive Card JSON when present
 * @property appKey — When not empty, must resolve to a valid Fusion app
 * @property sourceSystem.identifier — Required when sourceSystem provided, max 50
 * @property sourceSystem.name — Max 100, no script tags
 * @property sourceSystem.subSystem — Max 100, no script tags
 */
export interface NewFusionNotificationRequestV1 {
  appKey?: string | null;
  emailPriority?: ApiEmailPriorityV1 | null;
  /** Fallback HTML for email rendering. No script tags. */
  fallbackHtml?: string | null;
  title: string;
  /** Required when card is null. No script tags. */
  description?: string | null;
  /** Adaptive Card JSON payload. */
  card?: Record<string, unknown> | null;
  sourceSystem?: ApiSourceSystem | null;
  /** Override the creator identity. */
  originalCreatorUniqueId?: string | null;
}

/**
 * PUT /persons/{id}/notifications/settings — update notification settings.
 */
export interface NotificationSettingsRequest {
  email: boolean;
  delayInMinutes: number;
  appConfig: AppNotificationSettingsRequest[];
}

/**
 * Per-app notification setting request.
 *
 * Validation:
 * @property appKey — Required, max 50
 */
export interface AppNotificationSettingsRequest {
  /** @maxLength 50 */
  appKey: string;
  enabled: boolean;
}

/**
 * PATCH /notifications/{id} — mark seen.
 *
 * Validation:
 * @property seenByUser — Required (must not be null)
 */
export interface PatchFusionNotificationRequestV1 {
  seenByUser: boolean;
}
