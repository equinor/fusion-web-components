import { PropsWithChildren } from 'react';

import extractProps from './extract-props';

import { AvatarElement, AvatarElementProps } from '@equinor/fusion-wc-avatar';
AvatarElement;

export const Avatar = ({ children, ...props }: PropsWithChildren<AvatarElementProps>): JSX.Element => (
  <fwc-avatar {...extractProps<AvatarElementProps>(props)}>
    {children}
    <span slot="tooltip">This is a test!</span>
  </fwc-avatar>
);

export default Avatar;
