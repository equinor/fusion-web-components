import { PersonInfo, PersonItemSize } from '../../types';

export type TableCellData = PersonInfo;

export type PersonTableCellElementProps<T extends TableCellData = TableCellData> = {
  azureId?: string;
  upn?: string;
  dataSource?: TableCellData;
  resolveId?: string;
  size?: PersonItemSize;
  showAvatar: boolean;
  heading: (person: T) => string | undefined;
  subHeading?: (person: T) => string | undefined;
};
