import { PropsWithChildren, useRef, useEffect, MutableRefObject } from 'react';

import {
  PersonCardElement,
  PersonProviderElement,
  PersonCardElementProps,
  PersonAvailability,
  PersonResolver,
  PersonDetails,
  PersonPresence,
  PersonAccountType,
} from '@equinor/fusion-wc-person';
import extractProps from './extract-props';
PersonCardElement;
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
              accountType: PersonAccountType.JointVentureAffiliate,
              jobTitle: 'X-Bouvet ASA (PX)',
              department: 'FOIT CON PDP',
              mail: 'example@email.com',
              officeLocation: 'Stavanger',
              mobilePhone: '+47 999999999',
              manager: {
                azureId: '1234-1324-1235',
                name: 'Lagertha Kristensen',
                department: 'Leader Techn Mgmt',
                pictureSrc:
                  'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/814.jpg',
                accountType: PersonAccountType.Employee,
              },
              positions: [
                {
                  id: '123-123',
                  name: 'Developer Frontend',
                  project: {
                    id: '1234-1234',
                    name: 'Fusion',
                  },
                },
                {
                  id: '234-234',
                  name: 'Developer Frontend',
                  project: {
                    id: '2345-2345',
                    name: 'Fusion org v2',
                  },
                },
              ],
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

export const PersonCard = ({ children, ...props }: PropsWithChildren<PersonCardElementProps>): JSX.Element => {
  const providerRef = usePersonProviderRef(mockPersonResolver);
  return (
    <fwc-person-provider ref={providerRef}>
      <fwc-person-card {...extractProps<PersonCardElementProps>(props)}>{children}</fwc-person-card>
    </fwc-person-provider>
  );
};

export default PersonCard;
