import { AvatarSize } from '@equinor/fusion-wc-avatar';
import { PersonControllerHostAttributes } from './task';

export type PersonAvatarElementProps = PersonControllerHostAttributes & {
  size?: AvatarSize;
  clickable?: boolean;
  disabled?: boolean;
};
