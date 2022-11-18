import { PropsWithChildren } from 'react';

import extractProps from './extract-props';

import { IconButtonElement, IconButtonElementProps } from '@equinor/fusion-wc-icon-button';
IconButtonElement;

export const IconButton = ({ children, ...props }: PropsWithChildren<IconButtonElementProps>): JSX.Element => (
  <fwc-icon-button {...extractProps<IconButtonElementProps>(props)}>{children}</fwc-icon-button>
);

export default IconButton;
