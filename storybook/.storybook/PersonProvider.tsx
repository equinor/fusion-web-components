import React, { PropsWithChildren, useRef, useEffect, MutableRefObject } from 'react';

import { AvatarData } from '@equinor/fusion-wc-person/src/person-avatar/task';

import {
  PersonProviderElement,
  PersonResolver,
  PersonDetails,
  PersonQueryDetails,
  PersonAccountType,
  PersonAvailability,
} from '@equinor/fusion-wc-person';
PersonProviderElement;

const userDetails: PersonQueryDetails = [{
  azureUniqueId: '49132c24-6ea4-41fe-8221-112f314573f0',
  name: 'Albert Einstein (Bouvet ASA)',
  pictureSrc: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=025',
  accountType: PersonAccountType.Employee,
  jobTitle: 'X-Bouvet ASA (PX)',
  department: 'FOIT CON PDP',
  mail: 'abby@sience.com',
  officeLocation: 'Stavanger',
  mobilePhone: '+47 999999999',
  managerAzureUniqueId: '1234-1324-1235',
  manager: {
    azureUniqueId: '1234-1324-1235',
    name: 'Lagertha Lothbrok',
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
}];

const personSearchResult = (query : string): PersonQueryDetails => {
  const q = query.toLowerCase();
  return userDetails.filter((p) => 
    (p.name || '').toLowerCase().indexOf(q) > -1 ||
    (p.mobilePhone || '').indexOf(q) > -1 ||
    (p.mail || '').toLowerCase().indexOf(q) > -1
  );
};

const mockPersonResolver: PersonResolver = {
  getQuery: async (query: string) => {
    console.debug('PersonResolver::getQuery:', query);
    await new Promise((res) => setTimeout(res, 1000));
    return await Promise.resolve(personSearchResult(query));
  },
  getDetails: async (azureId: string) => {
    console.debug('PersonResolver::getDetails:', azureId);
    await new Promise((res) => setTimeout(res, 1000));
    return await Promise.resolve(userDetails[0]);
  },
  getImageByAzureId: async (azureId) => {
    console.debug('PersonResolver::getImageByAzureId:', azureId);
    await new Promise((res) => setTimeout(res, 3000));
    return await Promise.resolve({
      azureUniqueId: userDetails[0].azureUniqueId,
      name: userDetails[0].name,
      accountType: userDetails[0].accountType,
      pictureSrc: userDetails[0].pictureSrc
    }) as AvatarData;
  },
  getImageByUpn: async (azureId) => {
    console.debug('PersonResolver::getImageByUpn:', azureId);
    await new Promise((res) => setTimeout(res, 3000));
    return await Promise.resolve({
      azureUniqueId: userDetails[0].azureUniqueId,
      name: userDetails[0].name,
      accountType: userDetails[0].accountType,
      pictureSrc: userDetails[0].pictureSrc
    } as AvatarData);
  },
  getPresence: async (azureId: string) => {
    await new Promise((res) => setTimeout(res, 6000));
    return await Promise.resolve({
      azureId: azureId,
      availability: PersonAvailability.Available,
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
