export type PersonPresence = {
  id: string;
  availability: PersonAvailability;
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
  accountType?: PersonAccountType;
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
  count: number;
  continuationToken?: string;
  results: Array<{
    '@search.score': number;
    document: PersonDetails;
  }>;
};
export type PersonPicture = {
  imageSrc?: string;
};
export declare enum PersonAccountType {
  Employee = 'Employee',
  ExternalHire = 'External hire',
  XExternal = 'X-External',
  JointVentureAffiliate = 'Joint venture/Affiliate',
}
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
