import { PropsWithChildren, useRef, useEffect, MutableRefObject } from 'react';

import {
  PersonListItemElement,
  PersonProviderElement,
  PersonResolver,
  PersonListItemElementProps,
} from '@equinor/fusion-wc-person';
import extractProps from './extract-props';
import { mockPersonResolver } from './__mocks__/people.mock';

PersonListItemElement;
PersonProviderElement;

const usePersonProviderRef = (personResolver: PersonResolver): MutableRefObject<PersonProviderElement | null> => {
  const providerRef = useRef<PersonProviderElement>(null);

  useEffect(() => {
    if (providerRef?.current) {
      providerRef.current.setResolver(personResolver);
    }
  }, [providerRef]);

  return providerRef;
};

export const PersonListItem = ({ children, ...props }: PropsWithChildren<PersonListItemElementProps>): JSX.Element => {
  const providerRef = usePersonProviderRef(mockPersonResolver);
  const listItemRef = useRef<PersonListItemElement>(null);

  useEffect(() => {
    for (const [name, value] of Object.entries(extractProps<PersonListItemElementProps>(props))) {
      if (listItemRef.current) {
        // @ts-ignore
        listItemRef.current[name] = value;
      }
    }
  }, []);

  return (
    <fwc-person-provider ref={providerRef}>
      <fwc-person-list-item ref={listItemRef}>{children}</fwc-person-list-item>
    </fwc-person-provider>
  );
};

export default PersonListItem;
