import { PersonInfo, PersonItemSize } from '../../types';

export type TableCellData = PersonInfo;

export interface PersonTableCellElementProps<T extends TableCellData = TableCellData> {
  /** @deprecated Use resolveId instead. */
  azureId?: string;
  /** @deprecated Use resolveId instead. */
  upn?: string;
  dataSource?: TableCellData;
  resolveId?: string;
  size?: PersonItemSize;
  showAvatar: boolean;
  heading: (person: T) => string | undefined;
  subHeading?: (person: T) => string | undefined;
}
