import type { PersonAvatarShowCardOnType } from './element';
import { type PersonInfo as AvatarData } from '../../types';
import { PersonBaseElementProps } from '../base';

export type { AvatarData };

// export this when deprecating AvatarSizeEnum
// export type AvatarSize = 'x-small' | 'small' | 'medium' | 'large';

export interface PersonAvatarElementProps extends PersonBaseElementProps {
  size?: 'x-small' | 'small' | 'medium' | 'large';
  showFloatingOn?: PersonAvatarShowCardOnType;
  clickable?: boolean;
  disabled?: boolean;
  pictureSrc?: string;
  trigger?: PersonAvatarShowCardOnType;
  showLetter?: boolean;
}
