import { AvatarElementProps } from '@equinor/fusion-wc-avatar';
import type { PersonInfoControllerHostAttributes } from '../../tasks/person-info-task';
import type { PersonAvatarShowCardOnType } from './element';
import type { PersonInfo } from '../../types';

export type AvatarData = Pick<PersonInfo, 'name' | 'accountType'>;

export type PersonAvatarElementProps = PersonInfoControllerHostAttributes & {
  size?: AvatarElementProps['size'];
  showFloatingOn?: PersonAvatarShowCardOnType;
  clickable?: boolean;
  disabled?: boolean;
};
