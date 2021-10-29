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

export const PersonAvatar = ({ children, ...props }: PropsWithChildren<PersonAvatarElementProps>): JSX.Element => {
  const providerRef = usePersonProviderRef(mockPersonResolver);

  return (
    <fwc-person-provider ref={providerRef}>
      <fwc-person-avatar {...extractProps<PersonAvatarElementProps>(props)}>{children}</fwc-person-avatar>
      <fwc-person-provider ref={providerRef}>
        <fwc-person-avatar {...extractProps<PersonAvatarElementProps>(props)}>{children}</fwc-person-avatar>
      </fwc-person-provider>
    </fwc-person-provider>
  );
};

export default PersonAvatar;
