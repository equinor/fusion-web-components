import extractProps from './extract-props';

import { TextInputElement, TextInputElementProps } from '@equinor/fusion-wc-textinput';
TextInputElement;

export const TextInput = (props: TextInputElementProps): JSX.Element => (
  <fwc-textinput {...extractProps<TextInputElementProps>(props)} />
);

export default TextInput;
