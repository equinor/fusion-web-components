import { PropsWithChildren, useRef, useEffect } from 'react';

import extractProps from './extract-props';

import {
  PersonAvatarElement,
  PersonProviderElement,
  PersonAvatarElementProps,
  PersonAvailability,
  PersonAccountType,
  PersonResolver,
} from '@equinor/fusion-wc-person';
import { CardData } from '@equinor/fusion-wc-person/src/person-card/task';
import { ListItemData } from '@equinor/fusion-wc-person/src/person-list-item/task';
PersonAvatarElement;
PersonProviderElement;

const mockPersonResolver: PersonResolver = {
  getDetails: async (azureId: string) => {
    await new Promise((res) => setTimeout(res, 3000));
    return await Promise.resolve({
      azureId: azureId,
      name: 'Albert Einstein',
      pictureSrc: 'https://i.imgur.com/GcZeeXX.jpeg',
      accountType: PersonAccountType.Employee,
    });
  },
  getPresence: async (azureId: string) => {
    await new Promise((res) => setTimeout(res, 6000));
    return await Promise.resolve({
      azureId: azureId,
      availability: PersonAvailability.Available,
    });
  },
  getImageByAzureId: async (azureId: string) => {
    await new Promise((res) => setTimeout(res, 3000));
    return await Promise.resolve({
      azureId: azureId,
      name: 'Albert Einstein',
      pictureSrc: 'https://i.imgur.com/GcZeeXX.jpeg',
      accountType: PersonAccountType.Employee,
    });
  },
  getImageByUpn: async (_upn: string) => {
    await new Promise((res) => setTimeout(res, 3000));
    return await Promise.resolve({
      name: 'Albert Einstein',
      pictureSrc: 'https://i.imgur.com/GcZeeXX.jpeg',
      accountType: PersonAccountType.Employee,
    });
  },
  getCardDetailsByAzureId: async (azureId: string): Promise<CardData> => {
    await new Promise((res) => setTimeout(res, 3000));
    return await Promise.resolve({
        azureId: azureId,
        name: 'Anders Emil Sommerfeldt (Bouvet ASA)',
        pictureSrc: 'https://i.imgur.com/GcZeeXX.jpeg',
        accountType: PersonAccountType.Consultant,
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
            }, {
                id: '234-234',
                name: 'Developer Frontend',
                project: {
                    id: '2345-2345',
                    name: 'Fusion org v2',
                },
            },
        ],
    });
  },
  getCardDetailsByUpn: async (_upn: string): Promise<CardData> => {
    await new Promise((res) => setTimeout(res, 3000));
    return await Promise.resolve({
        name: 'Anders Emil Sommerfeldt (Bouvet ASA)',
        pictureSrc: 'https://i.imgur.com/GcZeeXX.jpeg',
        accountType: PersonAccountType.Consultant,
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
            }, {
                id: '234-234',
                name: 'Developer Frontend',
                project: {
                    id: '2345-2345',
                    name: 'Fusion org v2',
                },
            },
        ],
    });
  },
  getListItemDetailsByAzureId: async (azureId: string): Promise<ListItemData> => {
    await new Promise((res) => setTimeout(res, 3000));
    return await Promise.resolve({
        azureId,
        name: 'Anders Emil Sommerfeldt (Bouvet ASA)',
        pictureSrc: 'https://i.imgur.com/GcZeeXX.jpeg',
        accountType: PersonAccountType.Consultant,
        jobTitle: 'X-Bouvet ASA (PX)',
        department: 'FOIT CON PDP',
    });
  },
  getListItemDetailsByUpn: async (_upn: string): Promise<ListItemData> => {
    await new Promise((res) => setTimeout(res, 3000));
    return await Promise.resolve({
        name: 'Anders Emil Sommerfeldt (Bouvet ASA)',
        pictureSrc: 'https://i.imgur.com/GcZeeXX.jpeg',
        accountType: PersonAccountType.Consultant,
        jobTitle: 'X-Bouvet ASA (PX)',
        department: 'FOIT CON PDP',
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
  }, [providerRef, personResolver]);

  return providerRef;
};

export const PersonAvatar = ({ children, ...props }: PropsWithChildren<PersonAvatarElementProps>): JSX.Element => {
  const avatarRef = useRef<PersonAvatarElement>(null);

  useEffect(() => {
    for (const [name, value] of Object.entries(extractProps<PersonAvatarElementProps>(props))) {
      if (avatarRef.current) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        avatarRef.current[name] = value;
      }
    }
  }, []);

  return <fwc-person-avatar ref={avatarRef}>{children}</fwc-person-avatar>;
};

export default PersonAvatar;
