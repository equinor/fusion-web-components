import { PersonInfo, PersonItemSize } from '../../types';

export type ListItemData = PersonInfo;

export type PersonListItemElementProps = {
  azureId?: string;
  upn?: string;
  dataSource?: ListItemData;
  resolveIds?: string[];
  size?: PersonItemSize;
};
