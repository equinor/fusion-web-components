import extractProps from './extract-props';

import { RadioElement, RadioElementProps } from '@equinor/fusion-wc-radio';
RadioElement;

export const Switch = (props: RadioElementProps): JSX.Element => (
  <fwc-radio {...extractProps<RadioElementProps>(props)} />
);

export default Switch;
