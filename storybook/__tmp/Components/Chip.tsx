import { PropsWithChildren } from 'react';

import extractProps from './extract-props';

import { ChipElement, ChipElementProps } from '@equinor/fusion-wc-chip';
ChipElement;

export const Chip = ({ children, ...props }: PropsWithChildren<ChipElementProps>): JSX.Element => (
  <fwc-chip {...extractProps<ChipElementProps>(props)}>{children}</fwc-chip>
);

export default Chip;
