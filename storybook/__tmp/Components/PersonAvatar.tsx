import { PropsWithChildren, useRef, useEffect, MutableRefObject } from 'react';

import extractProps from './extract-props';

import {
  PersonAvatarElement,
  PersonProviderElement,
  PersonAvatarElementProps,
  PersonResolver,
} from '@equinor/fusion-wc-person';
PersonAvatarElement;
PersonProviderElement;

import { mockPersonResolver } from './__mocks__/people.mock';

const usePersonProviderRef = (personResolver: PersonResolver): MutableRefObject<PersonProviderElement | null> => {
  const providerRef = useRef<PersonProviderElement>(null);

  useEffect(() => {
    if (providerRef?.current) {
      providerRef.current.resolver = personResolver;
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
