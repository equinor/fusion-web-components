import { PersonItemSize } from '../types';
import { PersonControllerHostAttributes } from './task';
import { PersonDetails, RequiredAndOptionalPick } from '../types';

export type ListItemData = RequiredAndOptionalPick<PersonDetails, 'name' | 'accountType', 'department' | 'pictureSrc'>;

export type PersonListItemElementProps = PersonControllerHostAttributes & {
  size?: PersonItemSize;
};
