import { PropsWithChildren, useRef, useEffect, MutableRefObject } from 'react';

import {
  PersonListItemElement,
  PersonProviderElement,
  PersonAvailability,
  PersonResolver,
  PersonDetails,
  PersonPresence,
  PersonAccountType,
  PersonListItemElementProps,
} from '@equinor/fusion-wc-person';
import extractProps from './extract-props';

PersonListItemElement;
PersonProviderElement;

const mapDetails: Record<string, { lastUpdated: number; data: Promise<PersonDetails> }> = {};
const mapPresence: Record<string, { lastUpdated: number; data: Promise<PersonPresence> }> = {};

const mockPersonResolver: PersonResolver = {
  getDetails: async (azureId: string) => {
    if (!mapDetails[azureId]) {
      mapDetails[azureId] = {
        lastUpdated: Date.now(),
        data: new Promise((res) =>
          setTimeout(() => {
            res({
              azureId: azureId,
              name: 'Anders Emil Sommerfeldt (Bouvet ASA)',
              pictureSrc: 'https://i.imgur.com/GcZeeXX.jpeg',
              accountType: PersonAccountType.Employee,
              jobTitle: 'X-Bouvet ASA (PX)',
              department: 'FOIT CON PDP',
              mail: 'example@email.com',
              officeLocation: 'Stavanger',
            });
          }, 0)
        ),
      };
    }
    return mapDetails[azureId].data;
  },
  getPresence: async (azureId: string) => {
    if (!mapPresence[azureId]) {
      mapPresence[azureId] = {
        lastUpdated: Date.now(),
        data: new Promise((res) =>
          setTimeout(() => {
            res({
              azureId: azureId,
              availability: PersonAvailability.Available,
            });
          }, 0)
        ),
      };
    }
    return mapPresence[azureId].data;
  },
};

const usePersonProviderRef = (personResolver: PersonResolver): MutableRefObject<PersonProviderElement | null> => {
  const providerRef = useRef<PersonProviderElement>(null);

  useEffect(() => {
    if (providerRef?.current) {
      providerRef.current.setResolver(personResolver);

      return () => {
        providerRef.current?.removeResolver();
      };
    }
  }, [providerRef]);

  return providerRef;
};

export const PersonListItem = ({ children, ...props }: PropsWithChildren<PersonListItemElementProps>): JSX.Element => {
  const providerRef = usePersonProviderRef(mockPersonResolver);
  return (
    <fwc-person-provider ref={providerRef}>
      <fwc-person-list-item {...extractProps<PersonListItemElementProps>(props)}>{children}</fwc-person-list-item>
    </fwc-person-provider>
  );
};

export default PersonListItem;
