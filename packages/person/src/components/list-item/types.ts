import { PersonInfo, PersonItemSize } from '../../types';

export type ListItemData = PersonInfo;

export interface PersonListItemElementProps {
  /** @deprecated Use resolveId instead. */
  azureId?: string;
  /** @deprecated Use resolveId instead. */
  upn?: string;
  dataSource?: ListItemData;
  resolveId?: string;
  size?: PersonItemSize;
}
