import { PersonInfo, PersonItemSize } from '../../types';
import { PersonBaseElementProps } from '../base';

export type ListItemData = PersonInfo;

export interface PersonListItemElementProps extends PersonBaseElementProps {
  size?: PersonItemSize;
}
