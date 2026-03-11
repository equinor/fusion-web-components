import type { PersonItemSize } from '../../types';
import type { PersonDetails } from '../../types';
import type { PersonBaseElementProps } from '../base';

export type CardData = PersonDetails;

export interface PersonCardElementProps extends PersonBaseElementProps {
  size?: PersonItemSize;
  shadow?: boolean;
}
