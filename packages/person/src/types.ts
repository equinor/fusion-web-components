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
  azureId: string;
  name?: string;
  pictureSrc?: string;
  department?: string;
  accountType?: PersonAccountType;
};

export type PersonDetails = {
  azureId: string;
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
};

export type PersonPicture = {
  src: string;
};

export enum PersonAccountType {
  Employee = 'Employee',
  ExternalHire = 'External hire',
  XExternal = 'X-External',
  JointVentureAffiliate = 'Joint venture/Affiliate',
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
