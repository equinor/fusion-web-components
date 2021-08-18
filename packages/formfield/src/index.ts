import { fusionElement } from '@equinor/fusion-wc-core';
import { FormfieldElement, FormfieldElementProps } from './element';
export * from './element';

export const tag = 'fwc-formfield';

@fusionElement(tag)
export default class _ extends FormfieldElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: FormfieldElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<FormfieldElementProps & React.HTMLAttributes<FormfieldElementProps>>,
        FormfieldElement
      >;
    }
  }
}
