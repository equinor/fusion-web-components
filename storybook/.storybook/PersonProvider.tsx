import React, { PropsWithChildren, useRef, useEffect, MutableRefObject } from 'react';

import {
  PersonProviderElement,
  PersonResolver,
  PersonSearchResult,
  PersonDetails,
} from '@equinor/fusion-wc-person';
PersonProviderElement;

const userDetails: PersonDetails = {
  azureUniqueId: '49132c24-6ea4-41fe-8221-112f314573f0',
  name: 'Anders Emil Sommerfeldt (Bouvet ASA)',
  pictureSrc: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=025',
  accountType: 'Employee',
  jobTitle: 'X-Bouvet ASA (PX)',
  department: 'FOIT CON PDP',
  mail: 'example@email.com',
  officeLocation: 'Stavanger',
  mobilePhone: '+47 999999999',
  manager: {
    azureUniqueId: '1234-1324-1235',
    name: 'Lagertha Kristensen',
    department: 'Leader Techn Mgmt',
    pictureSrc:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/814.jpg',
    accountType: "Employee",
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
};

const mockPersonResolver: PersonResolver = {
  getPerson: async (query: string) => {
    console.debug('Person Search query:', query);
    await new Promise((res) => setTimeout(res, 1000));
    return await Promise.resolve({
      count: 1,
      results: [
        {
          '@search.score': 59.123,
          document: userDetails,
        },
      ],
    });
  },
  getDetails: async (azureId: string) => {
    await new Promise((res) => setTimeout(res, 1000));
    return await Promise.resolve(userDetails);
  },
  getPresence: async (azureId: string) => {
    await new Promise((res) => setTimeout(res, 3000));
    return await Promise.resolve({
      id: azureId,
      availability: 'Available',
    });
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

export const PersonProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const providerRef = usePersonProviderRef(mockPersonResolver);
  return <fwc-person-provider ref={providerRef}>{children}</fwc-person-provider>;
};

export default PersonProvider;
