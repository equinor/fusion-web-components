import { PropsWithChildren, useRef, useEffect } from 'react';

import { PersonListItemElement, PersonProviderElement, PersonListItemElementProps } from '@equinor/fusion-wc-person';
import extractProps from './extract-props';

PersonListItemElement;
PersonProviderElement;

export const PersonListItem = ({ children, ...props }: PropsWithChildren<PersonListItemElementProps>): JSX.Element => {
  const listItemRef = useRef<PersonListItemElement>(null);

  useEffect(() => {
    for (const [name, value] of Object.entries(extractProps<PersonListItemElementProps>(props))) {
      if (listItemRef.current) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        listItemRef.current[name] = value;
      }
    }
  }, []);

  return <fwc-person-list-item ref={listItemRef}>{children}</fwc-person-list-item>;
};

export default PersonListItem;
