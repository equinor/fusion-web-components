import { MutableRefObject, useEffect, useRef, PropsWithChildren } from 'react';
import extractProps from './extract-props';

import { mockPersonResolver } from './__mocks__/people.mock';

import {
  PersonSearchElement,
  PersonSearchElementProps,
  PersonProviderElement,
  PersonResolver,
} from '@equinor/fusion-wc-person';
PersonSearchElement;

const usePersonProviderRef = (personResolver: PersonResolver): MutableRefObject<PersonProviderElement | null> => {
  const providerRef = useRef<PersonProviderElement>(null);

  useEffect(() => {
    if (providerRef?.current) {
      providerRef.current.setResolver(personResolver);
    }
  }, [providerRef, personResolver]);

  return providerRef;
};

export const PersonSearch = ({ children, ...props }: PropsWithChildren<PersonSearchElementProps>): JSX.Element => {
  const providerRef = usePersonProviderRef(mockPersonResolver);
  const searchRef = useRef<PersonSearchElement>(null);

  useEffect(() => {
    for (const [name, value] of Object.entries(extractProps<PersonSearchElementProps>(props))) {
      if (searchRef.current) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        searchRef.current[name] = value;
        searchRef.current.addEventListener('select', () => console.log);
      }
    }
  }, []);

  return (
    <fwc-person-provider ref={providerRef}>
      <fwc-person-search ref={searchRef}>{children}</fwc-person-search>
    </fwc-person-provider>
  );
};

export default PersonSearch;
