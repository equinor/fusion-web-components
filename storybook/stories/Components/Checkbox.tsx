import extractProps from './extract-props';
import { CheckboxElement, CheckboxElementProps } from '@equinor/fusion-wc-checkbox';
CheckboxElement;

export const Checkbox = ({ ...props }: CheckboxElementProps): JSX.Element => (
  <fwc-checkbox {...extractProps<CheckboxElementProps>(props)} />
);

export default Checkbox;
