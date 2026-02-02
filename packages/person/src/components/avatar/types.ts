import type { PersonAvatarShowCardOnType } from './element';

import type { PersonInfo as AvatarData } from '../../types';
export type { PersonInfo as AvatarData } from '../../types';

export type AvatarSize = 'x-small' | 'small' | 'medium' | 'large';

export type PersonAvatarElementProps = {
  azureId?: string;
  upn?: string;
  dataSource?: AvatarData;
  resolveIds?: string[]; 
  size?: AvatarSize;
  showFloatingOn?: PersonAvatarShowCardOnType;
  clickable?: boolean;
  disabled?: boolean;
  pictureSrc?: string;
  trigger?: PersonAvatarShowCardOnType;
  showLetter?: boolean;
};
