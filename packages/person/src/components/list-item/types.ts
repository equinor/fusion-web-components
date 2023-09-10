import { PersonInfo, PersonItemSize } from '../../types';
import { PersonInfoControllerHostAttributes } from '../../tasks/person-info-task';

export type ListItemData = PersonInfo;

export type PersonListItemElementProps = PersonInfoControllerHostAttributes & {
  size?: PersonItemSize;
};
