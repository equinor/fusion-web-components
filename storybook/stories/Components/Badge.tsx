import { PropsWithChildren } from 'react';

import extractProps from './extract-props';

import { BadgeElement, BadgeElementProps } from '@equinor/fusion-wc-badge';
BadgeElement;

type BadgeWrapperProps = {
  circular?: boolean;
};

export const BadgeWrapper = ({ circular, children }: PropsWithChildren<BadgeWrapperProps>): JSX.Element => (
  <div
    style={{
      width: '3.5rem',
      height: '3.5rem',
      backgroundColor: 'lightgray',
      position: 'relative',
      borderRadius: circular ? '50%' : 0,
      margin: '0.5rem',
    }}
  >
    {children}
  </div>
);

export const Badge = ({ children, ...props }: PropsWithChildren<BadgeElementProps>): JSX.Element => (
  <BadgeWrapper circular={props.circular}>
    <fwc-badge {...extractProps<BadgeElementProps>(props)}>{children}</fwc-badge>
  </BadgeWrapper>
);

export default Badge;
