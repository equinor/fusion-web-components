import { PersonInfo, PersonItemSize } from '../../types';
import { PersonBaseElementProps } from '../base';

export type TableCellData = PersonInfo;

export interface PersonTableCellElementProps<T extends TableCellData = TableCellData>
  extends PersonBaseElementProps {
  size?: PersonItemSize;
  showAvatar: boolean;
  heading: (person: T) => string | undefined;
  subHeading?: (person: T) => string | undefined;
}
