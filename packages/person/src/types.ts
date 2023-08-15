export type PersonPresence = {
  id: string;
  availability: PersonAvailabilities;
};
export type Position = {
  id: string;
  name: string;
  project: {
    id: string;
    name: string;
  };
};
export type PersonDetails = {
  azureUniqueId: string;
  name?: string;
  pictureSrc?: string;
  jobTitle?: string;
  department?: string;
  fullDepartment?: string;
  mail?: string;
  company?: string;
  mobilePhone?: string;
  accountType?: PersonAccountTypes;
  accountClassification?: string;
  officeLocation?: string;
  positions?: Position[];
  manager?: PersonDetails;
  upn?: string;
  equinorUserTypeV1?: string;
  isExpired?: boolean;
  isResourceOwner?: boolean;
  managerAzureId?: string;
};

export type PersonSearchResult = {
  '@search.score': number;
  document: PersonDetails;
};

export type PersonSearchResponse = {
  count: number;
  continuationToken?: string;
  results: PersonSearchResult[];
};

export type PersonPicture = {
  imageSrc?: string;
};

export type PersonAccountTypes = 'Employee' | 'External hire' | 'X-External' | 'Joint venture/Affiliate';

export declare enum PersonAccountType {
  Employee = 'Employee',
  Consultant = 'Consultant',
  Enterprise = 'Enterprise',
  External = 'External',
  ExternalHire = 'External Hire',
}
export type PersonAvailabilities =
  | 'Available'
  | 'AvailableIdle'
  | 'Away'
  | 'BeRightBack'
  | 'Busy'
  | 'BusyIdle'
  | 'DoNotDisturb'
  | 'Offline'
  | 'Pending'
  | 'Error';

export declare enum PersonAvailability {
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
