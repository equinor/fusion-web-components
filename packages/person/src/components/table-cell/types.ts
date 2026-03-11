import type { PersonInfo, PersonItemSize } from '../../types';
import type { PersonBaseElementProps } from '../base';

export type TableCellData = PersonInfo;

export interface PersonTableCellElementProps<T extends TableCellData = TableCellData>
  extends PersonBaseElementProps {
  size?: PersonItemSize;
  showAvatar: boolean;
  heading: (person: T) => string | undefined;
  subHeading?: (person: T) => string | undefined;
}
