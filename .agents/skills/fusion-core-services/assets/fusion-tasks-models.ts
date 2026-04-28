/**
 * Fusion Tasks API — TypeScript model definitions
 *
 * Source of truth: Fusion.Services.FusionTasks/Controllers/ViewModels/
 * No published NuGet API-model package — models are service-internal.
 *
 * All property names use camelCase to match JSON serialization.
 */

// ---------------------------------------------------------------------------
// Enums (serialized as strings)
// ---------------------------------------------------------------------------

export type ApiTaskMode = "ReadOnly" | "Interactive";

export type ApiTaskState = "New" | "Active" | "Closed" | "OnHold";

export type ApiTaskPriority = "Normal" | "High" | "Low";

export type ApiAssigneeType = "Person";

export type ApiMetadataValueType = "String" | "Number" | "Date" | "DateTimeOffset";

// ---------------------------------------------------------------------------
// Response models
// ---------------------------------------------------------------------------

/** Returned by GET /tasks/{taskId} and person-scoped collection routes such as GET /persons/me/tasks. */
export interface ApiFusionTask {
  id: string;
  title: string;
  category: string;
  externalId: string | null;
  body: ApiFusionTaskBody | null;
  taskMode: ApiTaskMode;
  state: ApiTaskState;
  priority: ApiTaskPriority;
  dueDate: string | null;
  url: string | null;
  assignedTo: ApiAssignee | null;
  sourceSystem: ApiSourceSystem | null;
  ownerApplication: ApiOwnerApplication | null;
  taskContexts: ApiFusionTaskContext[] | null;
  metadata: ApiMetadataValue[] | null;
  equinorTask: ApiEquinorTaskReference | null;
  context: ApiContextReference | null;
  createdBy: string;
  created: string;
  modifiedBy: string | null;
  modified: string | null;
}

export interface ApiFusionTaskBody {
  /** Content type identifier; max 300 chars. */
  type: string | null;
  /** JSON or serialized content payload. */
  payload: string | null;
}

export interface ApiAssignee {
  type: ApiAssigneeType;
  person: ApiPerson;
}

export interface ApiPerson {
  azureUniqueId: string;
  name: string | null;
  mail: string | null;
  department: string | null;
  jobTitle: string | null;
  officeLocation: string | null;
  mobilePhone: string | null;
  accountType: string | null;
  isAffiliateAccess: boolean;
}

export interface ApiSourceSystem {
  name: string | null;
  subSystem: string | null;
  identifier: string | null;
}

export interface ApiOwnerApplication {
  id: string | null;
  title: string | null;
}

export interface ApiContextReference {
  contextId: string;
  externalId: string;
  type: string;
}

export interface ApiEquinorTaskReference {
  equinorTaskId: string | null;
  projectMasterId: string | null;
}

export interface ApiFusionTaskContext {
  title: string | null;
  type: string | null;
  mainValue: string | null;
}

export interface ApiMetadataValue {
  type: ApiMetadataType | null;
  value: string | null;
  valueEntity: string | null;
}

export interface ApiMetadataType {
  internalName: string | null;
  displayName: string | null;
  valueType: ApiMetadataValueType;
}

export interface ApiProjectMaster {
  contextId: string;
  externalId: string | null;
  cvpId: string | null;
  documentManagementId: string | null;
  name: string | null;
}

// ---------------------------------------------------------------------------
// PIMS integration
// ---------------------------------------------------------------------------

/** Returned by GET /persons/{personIdentifier}/tasks/pims. */
export interface ApiPimsTask {
  id: string | null;
  title: string | null;
  category: string | null;
  url: string | null;
  taskTypeKey: string | null;
  createdDate: string | null;
  targetDate: string | null;
  deadlineDate: string | null;
  isOverdue: boolean;
  daysOverdue: number;
  daysUntilDue: number | null;
  domain: string | null;
  projectMaster: ApiProjectMaster | null;
  assignedTo: ApiAssignee | null;
}

/** Returned by deprecated GET /persons/{personIdentifier}/tasks/procosys routes. */
export interface ApiProCoSysTask {
  siteCode: string | null;
  projectIdentifier: string | null;
  projectDescription: string | null;
  todo: string | null;
  todoDescription: string | null;
  description: string | null;
  responsibilityType: string | null;
  dueDate: string | null;
  subCategory: string | null;
  id: string | null;
  title: string | null;
  category: string | null;
  url: string | null;
  assignedTo: ApiAssignee | null;
}

// ---------------------------------------------------------------------------
// Request models
// ---------------------------------------------------------------------------

/**
 * POST /tasks — create a new Fusion task.
 *
 * Validation (FluentValidation):
 * @property title — Required, max 250 chars, no script tags
 * @property externalId — Optional, max 50 chars
 * @property body.type — Optional, max 300 chars
 * @property sourceSystem.identifier — Required when sourceSystem provided, max 50, no script tags
 * @property sourceSystem.name — Optional, max 100, no script tags
 * @property sourceSystem.subSystem — Optional, max 100, no script tags
 * @property assignedTo.person — AzureUniqueId XOR Mail required
 * @property context — ContextId OR (ExternalId + Type) required
 * @property equinorTask — At least one of equinorTaskId or projectMasterId required
 */
export interface NewFusionTaskRequest {
  /** @maxLength 250 */
  title: string;
  /** @maxLength 50 */
  externalId?: string | null;
  body?: ApiFusionTaskBody | null;
  taskMode?: ApiTaskMode;
  state?: ApiTaskState;
  priority?: ApiTaskPriority;
  dueDate?: string | null;
  isHidden?: boolean;
  sourceSystem?: ApiSourceSystem | null;
  assignedTo?: AssigneeRequest | null;
  taskContexts?: ApiFusionTaskContext[] | null;
  metadata?: ApiMetadataValue[] | null;
  context?: ContextReferenceRequest | null;
  equinorTask?: EquinorTaskReferenceRequest | null;
}

/**
 * PATCH /tasks/{taskId} — selectively update a task.
 * Only properties present in the payload are applied.
 */
export interface PatchFusionTaskRequest {
  id: string;
  externalId?: string | null;
  title?: string;
  body?: ApiFusionTaskBody | null;
  taskMode?: ApiTaskMode;
  state?: ApiTaskState;
  priority?: ApiTaskPriority;
  dueDate?: string | null;
  isHidden?: boolean;
  sourceSystem?: ApiSourceSystem | null;
  assignedTo?: AssigneeRequest | null;
  taskContexts?: ApiFusionTaskContext[] | null;
  metadata?: ApiMetadataValue[] | null;
  context?: ContextReferenceRequest | null;
  equinorTask?: EquinorTaskReferenceRequest | null;
}

// ---------------------------------------------------------------------------
// Request sub-models
// ---------------------------------------------------------------------------

export interface AssigneeRequest {
  type: ApiAssigneeType;
  person: PersonReferenceRequest;
}

/**
 * Person lookup reference.
 * At least one of azureUniqueId or mail must be provided.
 */
export interface PersonReferenceRequest {
  azureUniqueId?: string | null;
  mail?: string | null;
}

/**
 * Context association reference.
 * Either contextId OR (externalId + type) must be provided.
 */
export interface ContextReferenceRequest {
  contextId?: string | null;
  externalId?: string | null;
  type?: string | null;
}

/**
 * Equinor task / project master link.
 * At least one of equinorTaskId or projectMasterId must be provided.
 */
export interface EquinorTaskReferenceRequest {
  equinorTaskId?: string | null;
  projectMasterId?: string | null;
}
