import { PropsWithChildren, createRef, useEffect } from 'react';

import extractProps from './extract-props';

import {
  PersonAvatarElement,
  PersonProviderElement,
  PersonAvatarElementProps,
  Availability,
  AccountType,
  PersonResolver,
} from '@equinor/fusion-wc-person';
PersonAvatarElement;
PersonProviderElement;

const mockPersonResolver: PersonResolver = {
  getDetailsAsync: async (azureId: string) => {
    return await Promise.resolve({
      azureUniqueId: azureId,
      name: 'Ben Dover',
      accountType: AccountType.Employee,
    });
  },
  getPresenceAsync: async (azureId: string) => {
    return await Promise.resolve({
      id: azureId,
      availability: Availability.Available,
    });
  },
};

export const PersonAvatar = ({ children, ...props }: PropsWithChildren<PersonAvatarElementProps>): JSX.Element => {
  const providerRef = createRef<PersonProviderElement>();

  useEffect(() => {
    if (providerRef?.current) {
      providerRef.current.resolver = mockPersonResolver;
    }
  }, [providerRef]);

  return (
    <fwc-person-provider ref={providerRef}>
      <fwc-person-avatar {...extractProps<PersonAvatarElementProps>(props)}>{children}</fwc-person-avatar>
    </fwc-person-provider>
  );
};

export default PersonAvatar;
