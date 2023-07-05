import { PropsWithChildren } from 'react';

import { PersonCardElement, PersonProviderElement, PersonCardElementProps } from '@equinor/fusion-wc-person';
import extractProps from './extract-props';
PersonCardElement;
PersonProviderElement;

export const PersonCard = ({ children, ...props }: PropsWithChildren<PersonCardElementProps>): JSX.Element => {
  return <fwc-person-card {...extractProps<PersonCardElementProps>(props)}>{children}</fwc-person-card>;
};

export default PersonCard;
