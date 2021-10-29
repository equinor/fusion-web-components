export type PersonPresence = {
  azureId: string;
  availability: PersonAvailability;
};

export type PersonDetails = {
  azureId: string;
  name?: string;
  accountType?: PersonAccountType;
  pictureSrc?: string;
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
}
