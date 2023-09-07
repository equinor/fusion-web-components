import { PersonItemSize } from '../types';
import { PersonControllerHostAttributes } from './task';

export type PersonListItemElementProps = PersonControllerHostAttributes & {
  size?: PersonItemSize;
};
