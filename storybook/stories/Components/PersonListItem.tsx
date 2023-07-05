import { PropsWithChildren } from 'react';

import { PersonListItemElement, PersonProviderElement, PersonListItemElementProps } from '@equinor/fusion-wc-person';
import extractProps from './extract-props';

PersonListItemElement;
PersonProviderElement;

export const PersonListItem = ({ children, ...props }: PropsWithChildren<PersonListItemElementProps>): JSX.Element => {
  return <fwc-person-list-item {...extractProps<PersonListItemElementProps>(props)}>{children}</fwc-person-list-item>;
};

export default PersonListItem;
