import { PropsWithChildren } from 'react';

import extractProps from './extract-props';

import { TooltipElement, TooltipElementProps } from '@equinor/fusion-wc-popover';
TooltipElement;

export const Tooltip = ({ children, ...props }: PropsWithChildren<TooltipElementProps>): JSX.Element => (
  <fwc-tooltip {...extractProps<TooltipElementProps>(props)}>{children}</fwc-tooltip>
);

export default Tooltip;
