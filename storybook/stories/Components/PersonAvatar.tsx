import { PropsWithChildren, useRef, useEffect } from 'react';

import extractProps from './extract-props';

import { PersonAvatarElement, PersonProviderElement, PersonAvatarElementProps } from '@equinor/fusion-wc-person';
PersonAvatarElement;
PersonProviderElement;

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
