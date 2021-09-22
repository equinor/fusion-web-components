export enum Availability {
  Available = 'Available',
  AvailableIdle = 'AvailableIdle',
  Away = 'Away',
  BeRightBack = 'BeRightBack',
  Busy = 'Busy',
  BusyIdle = 'BusyIdle',
  DoNotDisturb = 'DoNotDisturb',
  Offline = 'Offline',
}

export type PersonPresence = {
  id: string;
  availability: Availability;
};

export type PersonDetails = {
  azureUniqueId: string;
  name?: string;
  accountType?: AccountType;
  pictureUrl?: string;
};

export type PersonPicture = {
  src: string;
};

export interface PersonResolver {
  getPresenceAsync?: (azureId: string) => Promise<PersonPresence>;
  getDetailsAsync?: (azureId: string) => Promise<PersonDetails>;
  getPictureAsync?: (azureId: string) => Promise<PersonPicture>;
}

export enum AccountType {
  Employee = 'Employee',
  ExternalHire = 'External hire',
  XExternal = 'X-External',
  JointVentureAffiliate = 'Joint venture/Affiliate',
}
