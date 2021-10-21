import { fusionElement } from '@equinor/fusion-wc-core';
import { PopperElement, PopperElementProps } from './element';

export * from './element';

export const tag = 'fwc-popper';

@fusionElement(tag)
export default class _ extends PopperElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: PopperElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<React.PropsWithChildren<PopperElementProps>, PopperElement>;
    }
  }
}
