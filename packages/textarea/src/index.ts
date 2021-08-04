import { fusionElement } from '@equinor/fusion-wc-core';
import TextAreaElement, { TextAreaElementProps } from './element';

export { style } from './element.css';
export const tag = 'fwc-textarea';

@fusionElement(tag)
export default class _ extends TextAreaElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: TextAreaElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<TextAreaElementProps & React.HTMLAttributes<TextAreaElement>>,
        TextAreaElement
      >;
    }
  }
}
