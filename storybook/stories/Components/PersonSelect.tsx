import { MutableRefObject, useEffect, useRef, PropsWithChildren } from 'react';
import extractProps from './extract-props';

import { mockPersonResolver } from './__mocks__/people.mock';

import {
  PersonSelectElement,
  PersonSelectElementProps,
  PersonProviderElement,
  PersonResolver,
} from '@equinor/fusion-wc-person';

PersonSelectElement;

const usePersonProviderRef = (personResolver: PersonResolver): MutableRefObject<PersonProviderElement | null> => {
  const providerRef = useRef<PersonProviderElement>(null);

  useEffect(() => {
    if (providerRef?.current) {
      providerRef.current.resolver = personResolver;
    }
  }, [providerRef, personResolver]);

  return providerRef;
};

export const PersonSearch = ({ children, ...props }: PropsWithChildren<PersonSelectElementProps>): JSX.Element => {
  const providerRef = usePersonProviderRef(mockPersonResolver);
  const searchRef = useRef<PersonSelectElement>(null);

  useEffect(() => {
    for (const [name, value] of Object.entries(extractProps<PersonSelectElementProps>(props))) {
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
      <fwc-person-select ref={searchRef}>{children}</fwc-person-select>
    </fwc-person-provider>
  );
};

export default PersonSearch;
