import type { PersonAvatarShowCardOnType } from './element';
import { type PersonInfo as AvatarData } from '../../types';
import { PersonBaseElementProps } from '../base';

export type { AvatarData };

// export this when deprecating AvatarSizeEnum
// export type AvatarSize = 'x-small' | 'small' | 'medium' | 'large';

export interface PersonAvatarElementProps extends PersonBaseElementProps {
  size?: 'x-small' | 'small' | 'medium' | 'large';
  showFloatingOn?: PersonAvatarShowCardOnType;
  disabled?: boolean;
  trigger?: PersonAvatarShowCardOnType;
  /** @deprecated clickable is no longer in use. use trigger instead. */
  clickable?: boolean;
  /** @deprecated pictureSrc is no longer in use. */
  pictureSrc?: string;
  /** @deprecated showLetter is no longer in use. */
  showLetter?: boolean;
}
