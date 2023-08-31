import { PersonItemSize } from '../types';
import { PersonControllerHostAttributes } from './task';

export type PersonCardElementProps = PersonControllerHostAttributes & {
  size?: PersonItemSize;
};
