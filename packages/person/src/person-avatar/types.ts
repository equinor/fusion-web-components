import { PersonElementProps } from '../person';
import { AvatarSize } from '@equinor/fusion-wc-avatar';

export type PersonAvatarElementProps = PersonElementProps & {
  size?: AvatarSize;
  clickable?: boolean;
  disabled?: boolean;
};
