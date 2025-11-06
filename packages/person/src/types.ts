export type AzureIdOrUpnObj = { azureId?: string; upn: string } | { azureId: string; upn?: string };

export type PersonPresence = {
  azureId: string;
  availability: PersonAvailability[keyof PersonAvailability];
};

export type Position = {
  id: string;
  name: string;
  project: {
    id: string;
    name: string;
  };
};

export type Manager = {
  azureUniqueId: string;
  name?: string;
  pictureSrc?: string;
  department?: string;
  accountType?: PersonAccountType[keyof PersonAccountType];
};

export type PersonInfo = {
  azureId: string;
  name?: string;
  jobTitle?: string;
  department?: string;
  mail?: string;
  upn?: string;
  mobilePhone?: string;
  accountType?: PersonAccountType[keyof PersonAccountType];
  officeLocation?: string;
  managerAzureUniqueId?: string;
  accountClassification?: AccountClassification;
  isExpired?: boolean;
  avatarUrl?: string;
  avatarColor?: string;
  applicationId?: string;
  applicationName?: string;
  servicePrincipalType?: ServicePrincipalType;
  employeeNumber?: string;
};

export type PersonDetails = PersonInfo & {
  positions?: Position[];
  manager?: Manager;
};

export type PersonSearchResult = Array<PersonInfo>;

export type RequiredAndOptionalPick<T, R extends keyof T, O extends keyof Omit<T, R>> = Required<Pick<T, R>> &
  Pick<T, O>;

export type PersonPicture = {
  src: string;
};

export enum PersonAccountType {
  Employee = 'Employee',
  Consultant = 'Consultant',
  Enterprise = 'Enterprise',
  External = 'External',
  ExternalHire = 'External Hire',
}

export type AccountClassification = 'Internal' | 'External';

export enum PersonAvailability {
  Available = 'Available',
  AvailableIdle = 'AvailableIdle',
  Away = 'Away',
  BeRightBack = 'BeRightBack',
  Busy = 'Busy',
  BusyIdle = 'BusyIdle',
  DoNotDisturb = 'DoNotDisturb',
  Offline = 'Offline',
  Pending = 'Pending',
  Error = 'Error',
}

export type PersonItemSize = 'small' | 'medium' | 'large';

export type PersonSuggestResultAccountType = 'Person' | 'SystemAccount' | 'Unknown';

export type ServicePrincipalType = 'Application' | 'ManagedIdentity' | 'ServicePrincipal' | 'Unknown';

export type PersonSuggestResultPersonAccountType = 'Employee' | 'Consultant' | 'Enterprise' | 'EnterpriseExternal' | 'External' | 'Local' | 'TemporaryEmployee' | 'Unknown';

export type PersonSuggestResult = {
  azureUniqueId: string;
  name?: string;
  accountType: PersonSuggestResultAccountType;
  person?: {
    accountType?: PersonSuggestResultPersonAccountType;
    jobTitle?: string;
    department?: string;
    fullDepartment?: string;
    employeeNumber?: string;
    managerAzureUniqueId?: string;
    mail?: string;
    upn?: string;
    mobilePhone?: string;
  };
  application?: {
    applicationId?: string;
    applicationName?: string;
    servicePrincipalType?: ServicePrincipalType;
  };
  avatarColor: string;
  avatarUrl: string;
  isExpired: boolean;
};

export type PersonSuggestResults = {
  totalCount: number;
  count: number;
  value: PersonSuggestResult[];
};

export type PersonResolveResult = {
  success: boolean;
  statusCode: number;
  errorMessage: string | null;
  identifier: string;
  account: PersonSuggestResult | null;
}

export type PersonResolveResults = PersonResolveResult[];
