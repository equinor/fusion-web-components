import { AvatarSize } from '@equinor/fusion-wc-avatar';
import { PersonControllerHostAttributes } from './task';
import { PersonAvatarShowCardOnType } from './element';
import { PersonDetails, RequiredAndOptionalPick } from '../types';

export type AvatarData = RequiredAndOptionalPick<PersonDetails, 'name' | 'pictureSrc', 'accountType'>;

export type PersonAvatarElementProps = PersonControllerHostAttributes & {
  size?: AvatarSize;
  showFloatingOn?: PersonAvatarShowCardOnType;
  clickable?: boolean;
  disabled?: boolean;
};
