import { fusionElement } from '@equinor/fusion-wc-core';
import SelectElement, { SelectElementProps } from './element';
export * from './element';

export const tag = 'fwc-select';

@fusionElement(tag)
export default class _ extends SelectElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: SelectElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<SelectElementProps & React.HTMLAttributes<SelectElement>>,
        SelectElement
      >;
    }
  }
}
