import { AvatarSize } from '@equinor/fusion-wc-avatar';
import { PersonControllerHostAttributes } from './task';
import { PersonAvatarShowCardOnType } from './element';

export type PersonAvatarElementProps = PersonControllerHostAttributes & {
  size?: AvatarSize;
  showFloatingOn?: PersonAvatarShowCardOnType;
  clickable?: boolean;
  disabled?: boolean;
};
