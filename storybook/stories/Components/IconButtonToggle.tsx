import { PropsWithChildren } from 'react';

import extractProps from './extract-props';

import { IconButtonToggleElement, IconButtonToggleElementProps } from '@equinor/fusion-wc-icon-button-toggle';
IconButtonToggleElement;

export const IconButtonToggle = ({
  children,
  ...props
}: PropsWithChildren<IconButtonToggleElementProps>): JSX.Element => (
  <fwc-icon-button-toggle {...extractProps<IconButtonToggleElementProps>(props)}>{children}</fwc-icon-button-toggle>
);

export default IconButtonToggle;
