import type { PersonItemSize } from '../../types';
import type { PersonDetails } from '../../types';

export type CardData = PersonDetails;

export type PersonCardElementProps = {
  azureId?: string;
  upn?: string;
  dataSource?: CardData;
  resolveIds?: string[];
  size?: PersonItemSize;
  customColor?: string;
  shadow?: boolean;
};
