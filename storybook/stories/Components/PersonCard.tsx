import { PropsWithChildren, useRef, useEffect, MutableRefObject } from 'react';

import {
  PersonCardElement,
  PersonProviderElement,
  PersonCardElementProps,
  PersonResolver,
} from '@equinor/fusion-wc-person';
import extractProps from './extract-props';
import { mockPersonResolver } from './__mocks__/people.mock';
PersonCardElement;
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

export const PersonCard = ({ children, ...props }: PropsWithChildren<PersonCardElementProps>): JSX.Element => {
  const providerRef = usePersonProviderRef(mockPersonResolver);
  const cardRef = useRef<PersonCardElement>(null);

  useEffect(() => {
    for (const [name, value] of Object.entries(extractProps<PersonCardElementProps>(props))) {
      if (cardRef.current) {
        // @ts-ignore
        cardRef.current[name] = value;
      }
    }
  }, []);

  return (
    <fwc-person-provider ref={providerRef}>
      <fwc-person-card ref={cardRef}>{children}</fwc-person-card>
    </fwc-person-provider>
  );
};

export default PersonCard;
