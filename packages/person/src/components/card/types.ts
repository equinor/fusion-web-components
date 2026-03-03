import { PersonItemSize } from '../../types';
import { PersonDetails } from '../../types';
import { PersonBaseElementProps } from '../base';

export type CardData = PersonDetails;

export interface PersonCardElementProps extends PersonBaseElementProps {
  size?: PersonItemSize;
  customColor?: string;
  shadow?: boolean;
}
