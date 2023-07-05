import { PropsWithChildren } from 'react';

import extractProps from './extract-props';

import { PersonAvatarElement, PersonAvatarElementProps } from '@equinor/fusion-wc-person';
PersonAvatarElement;

export const PersonAvatar = ({ children, ...props }: PropsWithChildren<PersonAvatarElementProps>): JSX.Element => {
  return <fwc-person-avatar {...extractProps<PersonAvatarElementProps>(props)}>{children}</fwc-person-avatar>;
};

export default PersonAvatar;
