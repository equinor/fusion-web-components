import { PropsWithChildren, useRef, useEffect, MutableRefObject } from 'react';

import extractProps from './extract-props';

import {
  PersonAvatarElement,
  PersonProviderElement,
  PersonAvatarElementProps,
  PersonAvailability,
  PersonAccountType,
  PersonResolver,
} from '@equinor/fusion-wc-person';
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
  const providerRef = usePersonProviderRef(mockPersonResolver);
  const avatarRef = useRef<PersonAvatarElement>(null);

  useEffect(() => {
    for (const [name, value] of Object.entries(extractProps<PersonAvatarElementProps>(props))) {
        if (avatarRef.current) {
            // @ts-ignore
            avatarRef.current[name] = value;
        }
    }
  }, []);

  return (
    <fwc-person-provider ref={providerRef}>
      <fwc-person-avatar ref={avatarRef}>{children}</fwc-person-avatar>
    </fwc-person-provider>
  );
};

export default PersonAvatar;
