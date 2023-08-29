import { PropsWithChildren } from 'react';
import extractProps from './extract-props';
import { PersonSearchElement, PersonSearchElementProps } from '@equinor/fusion-wc-person';
PersonSearchElement;

export const PersonCard = (props: PropsWithChildren<PersonSearchElementProps>): JSX.Element => {
  return <fwc-person-search {...extractProps<PersonSearchElementProps>(props)}></fwc-person-search>;
};

export default PersonCard;
