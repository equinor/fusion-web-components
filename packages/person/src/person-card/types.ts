import { PersonItemSize } from '../types';
import { PersonControllerHostAttributes } from './task';
import { PersonDetails, RequiredAndOptionalPick } from '../types';

export type CardData = RequiredAndOptionalPick<
  PersonDetails,
  'name' | 'pictureSrc',
  'department' | 'jobTitle' | 'accountType' | 'mail' | 'mobilePhone' | 'positions' | 'manager'
>;

export type PersonCardElementProps = PersonControllerHostAttributes & {
  size?: PersonItemSize;
};
