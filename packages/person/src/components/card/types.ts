import { PersonItemSize } from '../../types';
import { PersonDetails } from '../../types';

export type CardData = PersonDetails;

export type PersonCardElementProps = {
  azureId?: string;
  upn?: string;
  dataSource?: CardData;
  resolveId?: string;
  size?: PersonItemSize;
  customColor?: string;
  shadow?: boolean;
};
