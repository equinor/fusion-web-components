/**
 * Fusion Mail API — TypeScript model definitions
 *
 * Source of truth: Fusion.Services.Mail/Controllers/
 * No published NuGet API-model package — models are service-internal.
 *
 * All property names use camelCase to match JSON serialization.
 */

// ---------------------------------------------------------------------------
// Enums (serialized as strings in JSON for request/response payloads)
// ---------------------------------------------------------------------------

/**
 * Mail delivery status.
 * Wire format uses the enum names because the request models apply StringEnumConverter.
 */
export type ApiMailStatus =
  | "Processing"
  | "Failed"
  | "PartiallySent"
  | "Sent"
  | "Blocked"
  | "Undelivered";

export const ApiMailStatusName = {
  Processing: "Processing",
  Failed: "Failed",
  PartiallySent: "PartiallySent",
  Sent: "Sent",
  Blocked: "Blocked",
  Undelivered: "Undelivered",
} as const;

// ---------------------------------------------------------------------------
// Response models
// ---------------------------------------------------------------------------

/** Returned by GET /mails/{id} and POST /mails. */
export interface ApiMail {
  id: string;
  subject: string;
  status: ApiMailStatus;
  fromDisplayName?: string | null;
  recipients: string[];
  body?: string | null;
}

/** Recipient delivery result (V3). */
export interface ApiMailV3 {
  recipient: string;
  succeeded: boolean;
  errorMessage: string | null;
}

export interface ApiMailTemplate {
  templateName: string;
  templateData?: ApiMailTemplateData[] | null;
}

export interface ApiMailTemplateData {
  fileName: string;
  fileContent: string;
}

export interface ApiUndeliveredMail {
  id: string;
  timestamp?: string | null;
  from?: string | null;
  recipients?: string[] | null;
  subject?: string | null;
  additionalInfo: ApiAdditionalInfo | null;
  body?: string | null;
  bodyPreview?: string | null;
  sentByApp?: ApiApplication | null;
  sentByPerson: ApiPerson;
}

export interface ApiWhitelist {
  expires: string;
  addedBy: ApiPerson;
  recipient: ApiPerson;
}

export interface ApiLog {
  mailId: string;
  sentByApp?: ApiApplication | null;
  recipients: string[];
  subject: string;
  status: ApiMailStatus;
  timestamp?: string | null;
}

export interface ApiApplication {
  applicationId: string;
}

export interface ApiAdditionalInfo {
  externalId?: string | null;
}

export interface ApiPerson {
  azureUniqueId?: string | null;
  email?: string | null;
}

// ---------------------------------------------------------------------------
// Request models
// ---------------------------------------------------------------------------

/**
 * POST /mails — create and queue a mail.
 *
 * Validation (FluentValidation):
 * @property recipients — Required, each must be a valid email address
 * @property subject — Required, not empty
 * @property body — Required, not empty
 * @property attachments — Total size max 3 MB (4,194,308 bytes base64)
 */
export interface NewMailRequest {
  recipients: string[];
  subject: string;
  body: string;
  fromDisplayName?: string | null;
  attachments?: MailAttachmentRequest[] | null;
}

/**
 * POST /mails/{id}/send — send a previously created mail.
 *
 * Validation:
 * @property messageId — Required, not empty GUID
 * @property senderAppId — Required, not empty GUID
 * @property senderAzureUniqueId — Required, not empty GUID
 */
export interface SendMailRequest {
  messageId: string;
  senderAppId: string;
  senderAzureUniqueId: string;
  recipients: string[];
  fromDisplayName?: string | null;
  subject: string;
  body: string;
}

/**
 * POST /management/send-mail (API v2).
 * Sends a previously created mail item.
 */
export interface SendMailRequestV2 {
  mailId: string;
  senderAppId: string;
  senderAzureUniqueId: string;
}

/**
 * POST /management/send-mail (API v3).
 * Sends a previously created mail item and returns per-recipient results.
 */
export interface SendMailRequestV3 {
  mailId: string;
  senderAppId: string;
  senderAzureUniqueId: string;
}

/**
 * POST /templates/{templateName}/mails — create and queue a mail from a named template.
 *
 * Validation: same recipient/subject rules as NewMailRequest.
 * @property mailBody.htmlContent — Required
 */
export interface NewTemplatedMailRequest {
  recipients: string[];
  subject: string;
  attachments?: MailAttachmentRequest[] | null;
  mailBody: MailBodyRequest;
}

/**
 * Email content template (positional record in C#).
 * @property htmlContent — Required
 */
export interface MailBodyRequest {
  htmlContent: string;
  htmlFooter?: string | null;
  headerTitle?: string | null;
}

/**
 * Mail attachment.
 *
 * Validation:
 * @property name — Required, max 255 chars
 * @property contentBytes — Required, base64-encoded, max ~4 MB
 */
export interface MailAttachmentRequest {
  /** @maxLength 255 */
  name: string;
  contentId?: string | null;
  contentType?: string | null;
  /** Base64-encoded file content. */
  contentBytes: string;
  isInline?: boolean | null;
  lastModifiedDateTime?: string | null;
  size?: number | null;
}

/**
 * PATCH /apps/{appId}/mails/{mailId} — update overall mail status.
 */
export interface UpdateMailStatusRequest {
  status: ApiMailStatus;
}

/**
 * PATCH /apps/{appId}/mails/{mailId}/recipients/{email} — update delivery status for a specific recipient.
 */
export interface UpdateMailDeliveryRequest {
  status: ApiMailStatus;
}

/**
 * POST /management/whitelist — whitelist a recipient.
 *
 * Validation:
 * @property person — Must resolve to a valid user (AzureUniqueId or Mail)
 * @property expiresIn — Optional, format "15d" (days)
 */
export interface WhitelistRequest {
  person: PersonReference;
  expiresIn?: string | null;
}

/**
 * Person lookup reference.
 * Either azureUniqueId or mail should be provided.
 */
export interface PersonReference {
  azureUniqueId?: string | null;
  mail?: string | null;
}
