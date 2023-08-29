export type PersonPresence = {
  azureId: string;
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

export type Manager = {
  azureUniqueId: string;
  name?: string;
  pictureSrc?: string;
  department?: string;
  accountType?: PersonAccountType;
};

export type PersonDetails = {
  azureUniqueId: string;
  name?: string;
  pictureSrc?: string;
  jobTitle?: string;
  department?: string;
  mail?: string;
  company?: string;
  mobilePhone?: string;
  accountType?: PersonAccountType;
  officeLocation?: string;
  positions?: Position[];
  manager?: Manager;
  managerAzureUniqueId?: string;
  isExpired?: boolean;
};

export type PersonQueryDetails = PersonDetails[];

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
