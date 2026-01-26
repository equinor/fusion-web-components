import { AvatarElementProps } from '@equinor/fusion-wc-avatar';
import type { PersonInfoControllerHostAttributes } from '../../tasks/person-info-task';
import type { PersonAvatarShowCardOnType } from './element';

export type { PersonInfo as AvatarData } from '../../types';

export type PersonAvatarElementProps = PersonInfoControllerHostAttributes & {
  size?: AvatarElementProps['size'];
  showFloatingOn?: PersonAvatarShowCardOnType;
  clickable?: boolean;
  disabled?: boolean;
  pictureSrc?: string;
  trigger?: PersonAvatarShowCardOnType;
  showLetter?: boolean;
  customColor?: string;
};
