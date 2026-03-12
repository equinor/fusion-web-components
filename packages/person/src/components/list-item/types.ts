import type { PersonInfo, PersonItemSize } from '../../types';
import type { PersonBaseElementProps } from '../base';

export type ListItemData = PersonInfo;

export interface PersonListItemElementProps extends PersonBaseElementProps {
  size?: PersonItemSize;
}
