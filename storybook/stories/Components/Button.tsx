import { PropsWithChildren } from 'react';

import extractProps from './extract-props';

import { ButtonElement, ButtonElementProps } from '@equinor/fusion-wc-button';
ButtonElement;

export const Button = ({ children, ...props }: PropsWithChildren<ButtonElementProps>): JSX.Element => (
  <fwc-button {...extractProps<ButtonElementProps>(props)}>{children}</fwc-button>
);

export default Button;
