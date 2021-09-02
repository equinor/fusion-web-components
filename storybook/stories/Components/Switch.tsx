import extractProps from './extract-props';

import { SwitchElement, SwitchElementProps } from '@equinor/fusion-wc-switch';
SwitchElement;

export const Switch = (props: SwitchElementProps): JSX.Element => (
  <fwc-switch {...extractProps<SwitchElementProps>(props)} />
);

export default Switch;
