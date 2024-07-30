import { PersonInfo, PersonItemSize } from '../../types';
import { PersonInfoControllerHostAttributes } from '../../tasks/person-info-task';

export type TableCellData = PersonInfo;

export type PersonTableCellElementProps<T extends TableCellData = TableCellData> =
  PersonInfoControllerHostAttributes & {
    size?: PersonItemSize;
    showAvatar: boolean;
    heading: (person: T) => string | undefined;
    subHeading?: (person: T) => string | undefined;
  };
