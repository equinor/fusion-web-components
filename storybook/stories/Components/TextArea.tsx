import extractProps from './extract-props';

import { TextAreaElement, TextAreaElementProps } from '@equinor/fusion-wc-textarea';
TextAreaElement;

export const TextArea = (props: TextAreaElementProps): JSX.Element => (
  <fwc-textarea {...extractProps<TextAreaElementProps>(props)} />
);

export default TextArea;
