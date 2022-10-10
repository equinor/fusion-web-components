import { AvatarSize } from '@equinor/fusion-wc-avatar';

export type PersonCardElementProps = {
  size?: AvatarSize;
};

export enum PersonCardAccountType {
  Employee = 'Employee',
  Consultant = 'Consultant',
  External = 'External',
}

export enum BadgeCardColor {
  affiliate = 'affiliate',
  consultant = 'consultant',
  employee = 'employee',
  externalHire = 'externalHire',
  default = 'default',
}
