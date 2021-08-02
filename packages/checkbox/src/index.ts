import { fusionElement } from '@equinor/fusion-wc-core';
import CheckboxElement, { CheckboxElementProps } from './element';

export const tag = 'fwc-checkbox';

@fusionElement(tag)
export default class _ extends CheckboxElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: CheckboxElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<CheckboxElementProps & React.HTMLAttributes<CheckboxElement>>,
        CheckboxElement
      >;
    }
  }
}
