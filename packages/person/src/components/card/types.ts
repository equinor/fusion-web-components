import { PersonItemSize } from '../../types';
import { PersonDetailControllerHostAttributes } from '../../tasks/person-detail-task';
import { PersonDetails } from '../../types';

export type CardData = PersonDetails;

export type PersonCardElementProps = PersonDetailControllerHostAttributes & {
  size?: PersonItemSize;
};
