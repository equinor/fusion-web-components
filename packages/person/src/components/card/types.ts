import { PersonItemSize } from '../../types';
import { PersonDetails } from '../../types';

export type CardData = PersonDetails;

export interface PersonCardElementProps {
  /** @deprecated Use resolveId instead. */
  azureId?: string;
  /** @deprecated Use resolveId instead. */
  upn?: string;
  dataSource?: CardData;
  resolveId?: string;
  size?: PersonItemSize;
  customColor?: string;
  shadow?: boolean;
}
