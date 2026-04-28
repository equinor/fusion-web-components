/**
 * Fusion Contract Personnel API — TypeScript model definitions
 *
 * Source of truth: Fusion.Services.ContractPersonnel/Controllers/
 * No published NuGet API-model package — models are service-internal.
 *
 * Version scope: V2 where available (V1 ApiContract is obsolete; use ApiContractV2).
 * All property names use camelCase to match JSON serialization.
 */

// ---------------------------------------------------------------------------
// Enums (serialized as strings)
// ---------------------------------------------------------------------------

export type ApiDelegateClassification = "Unknown" | "Internal" | "External";

export type ApiAzureAccountStatus = "Available" | "Deleted";

export type ApiRequestState = "Created" | "ApprovedByCompany" | "RejectedByCompany";

export type ApiRequestCategory = "NewRequest" | "ChangeRequest";

export type ApiWorkflowState = "Running" | "Canceled" | "Error" | "Completed" | "Unknown";

export type ApiWorkflowStepState = "Pending" | "Approved" | "Rejected" | "Skipped" | "Unknown";

// ---------------------------------------------------------------------------
// Core response models
// ---------------------------------------------------------------------------

/** Contract (V2) — returned by GET /projects/{projectIdentifier}/contracts/{contractIdentifier}. */
export interface ApiContractV2 {
  id: string;
  name: string;
  contractNumber: string;
  projectMasters: ApiProjectMasterV2[];
  company: ApiCompany;
  startDate: string;
  endDate: string;
  /** Expandable — omitted when null. */
  equinorCompanyRepresentative: ApiPerson | null;
  /** Expandable — omitted when null. */
  equinorContractResponsible: ApiPerson | null;
  /** Expandable — omitted when null. */
  companyRepresentative: ApiPerson | null;
  /** Expandable — omitted when null. */
  contractResponsible: ApiPerson | null;
  /** Expandable — omitted when null. */
  personnel: ApiPersonnel[] | null;
  /** Expandable — omitted when null. */
  delegates: ApiDelegate[] | null;
}

export interface ApiPersonnel {
  id: string;
  contract: ApiContractReference;
  person: ApiPersonnelPerson;
  /** Omitted when null. */
  roleAssignments: ApiRoleAssignment[] | null;
  startDate: string;
  endDate: string;
  created: string;
  createdBy: ApiPerson;
  /** Omitted when null. */
  updated: string | null;
  /** Omitted when null. */
  updatedBy: ApiPerson | null;
}

export interface ApiPersonnelPerson extends ApiPerson {
  /** Account-deletion metadata; omitted when null. */
  deleteInfo: ApiPersonDeleteInfo | null;
}

export interface ApiDelegate {
  id: string;
  classification: ApiDelegateClassification;
  created: string;
  validTo: string;
  /** Omitted when null. */
  recertifiedDate: string | null;
  person: ApiPerson;
  createdBy: ApiPerson;
  /** Omitted when null. */
  recertifiedBy: ApiPerson | null;
  contract: ApiContractReference;
}

export interface ApiPersonnelRequest {
  id: string;
  state: ApiRequestState;
  category: ApiRequestCategory;
  /** Omitted when null. */
  description: string | null;
  startDate: string;
  endDate: string;
  person: ApiPerson;
  /** Omitted when null. */
  originalPersonnel: ApiPersonnel | null;
  created: string;
  /** Omitted when null. */
  updated: string | null;
  createdBy: ApiPerson;
  /** Omitted when null. */
  updatedBy: ApiPerson | null;
  contract: ApiContractReference;
  workflow: ApiWorkflow;
}

// ---------------------------------------------------------------------------
// Workflow
// ---------------------------------------------------------------------------

export interface ApiWorkflow {
  state: ApiWorkflowState;
  steps: ApiWorkflowStep[];
}

export interface ApiWorkflowStep {
  id: string;
  name: string;
  isCompleted: boolean;
  state: ApiWorkflowStepState;
  /** Omitted when null. */
  started: string | null;
  /** Omitted when null. */
  completed: string | null;
  /** Omitted when null. */
  dueDate: string | null;
  /** Omitted when null. */
  completedBy: ApiPerson | null;
  /** Omitted when null. */
  description: string | null;
  /** Omitted when null. */
  reason: string | null;
  /** Omitted when null. */
  previousStep: string | null;
  /** Omitted when null. */
  nextStep: string | null;
}

// ---------------------------------------------------------------------------
// Supporting models
// ---------------------------------------------------------------------------

export interface ApiPerson {
  azureUniquePersonId: string | null;
  mail: string | null;
  name: string;
  phone: string | null;
  upn: string | null;
  accountType: string | null;
  accountStatus: ApiAzureAccountStatus | null;
  preferredContactMail: string | null;
}

export interface ApiPersonDeleteInfo {
  deletedDate: string | null;
  duplicateAzureUniqueId: string | null;
  duplicateUpn: string | null;
}

export interface ApiCompany {
  id: string;
  name: string;
}

export interface ApiContractReference {
  id: string;
  name: string;
  contractNumber: string;
}

export interface ApiProjectMaster {
  id: string;
  name: string;
  isPrimary: boolean;
}

export interface ApiProjectMasterV2 {
  id: string;
  name: string;
  isPrimary: boolean;
}

export interface ApiContractProjectMaster {
  externalId: string;
  name: string;
  contract: ApiContractReferenceV2;
  isPrimary: boolean;
}

export interface ApiContractReferenceV2 {
  id: string;
  name: string;
  contractNumber: string;
}

export interface ApiRole {
  id: string;
  name: string;
}

export interface ApiAccessRole {
  id: string;
  name: string;
}

export interface ApiRoleAssignment {
  id: string;
  role: ApiRole;
}

export interface ApiPersonRoleAssignment {
  id: string;
  person: ApiPerson;
  role: ApiRole;
}

export interface ApiAffiliateSponsor {
  affiliate: ApiPerson;
  sponsor: ApiPerson;
  created: string;
}

export interface ApiAvailableContract {
  name: string;
  contractNumber: string;
  companyName: string;
  startDate: string;
  endDate: string;
}

export interface ApiProjectReference {
  id: string;
  name: string;
  /** Deprecated on the service side; may be omitted. */
  equinorTask?: ApiEquinorTask | null;
}

export interface ApiEquinorTask {
  id?: string | null;
  title?: string | null;
}

// ---------------------------------------------------------------------------
// Change log
// ---------------------------------------------------------------------------

export interface ApiChangeLog {
  id: string;
  projectMaster: ApiProjectMaster;
  contract: ApiChangeLogContract;
  performedBy: ApiChangeLogPerformedBy;
  performed: string;
  action: string;
  description: string | null;
  data: unknown | null;
  source: string;
}

export interface ApiChangeLogContract {
  id: string;
  number: string;
  name: string;
  contractor: string;
}

export interface ApiChangeLogPerformedBy {
  azureUniqueId: string;
  name: string;
  mail: string | null;
  upn: string | null;
}

// ---------------------------------------------------------------------------
// Recertification
// ---------------------------------------------------------------------------

export interface ApiRecertification {
  rowKey: string | null;
  timestamp: string | null;
  contractId: string | null;
  contractNumber: string | null;
  contractName: string | null;
  projectMasterId: string | null;
  projectMasterName: string | null;
  recertifiedByAzureUniqueId: string | null;
  recertifiedForAzureUniqueId: string | null;
  status: string;
  validToDate: string | null;
}

export interface ApiRecertificationError {
  rowKey: string | null;
  timestamp: string | null;
  contractId: string | null;
  contractName: string | null;
  contractNumber: string | null;
  errorMessage: string | null;
  projectMasterId: string | null;
  projectMasterName: string | null;
  status: string;
}

// ---------------------------------------------------------------------------
// Misc
// ---------------------------------------------------------------------------

export interface ApiValidCompany {
  id: string;
  name: string;
}

export interface ApiValidDomain {
  id: string;
  name: string;
}

export interface ApiDeletedAccountInfo extends ApiPerson {
  deleteInfo: ApiPersonDeleteInfo | null;
}

export interface ApiPeopleMigration {
  migrationId: string;
  fromAzureUniqueId: string;
  toAzureUniqueId: string;
}

// ---------------------------------------------------------------------------
// Request/reference models
// ---------------------------------------------------------------------------

export interface PersonReference {
  azureUniquePersonId?: string | null;
  mail?: string | null;
}

export interface PersonnelReference {
  id: string;
}

export interface AllocateContractRequest {
  /** @maxLength 50 */
  contractNumber: string;
  equinorCompanyRepresentative?: PersonReference | null;
  equinorContractResponsible?: PersonReference | null;
  companyRepresentative?: PersonReference | null;
  contractResponsible?: PersonReference | null;
}

export interface PatchContractRequest {
  equinorCompanyRepresentative?: PersonReference | null;
  equinorContractResponsible?: PersonReference | null;
  companyRepresentative?: PersonReference | null;
  contractResponsible?: PersonReference | null;
}

export interface CreatePersonnelRequestRequest {
  description?: string | null;
  startDate: string;
  endDate: string;
  person: PersonReference;
  originalPersonnel?: PersonnelReference | null;
}

export interface RejectPersonnelRequestRequest {
  reason: string;
}

export interface CreateDelegateRequest {
  person: PersonReference;
  validTo: string;
  classification: ApiDelegateClassification;
}

export interface PatchDelegateRequest {
  validTo: string;
}

export interface AssignRoleRequest {
  id: string;
}

export interface PatchPersonRequest {
  preferredContactMail?: string | null;
}

export interface CreateAffiliateSponsorsRequest {
  affiliateId: string;
  sponsorIdentifiers: string[];
}

export interface CreateValidCompanyRequest {
  /** @maxLength 250 */
  name: string;
}

export interface CreateValidDomainRequest {
  /** @maxLength 250 */
  name: string;
}
