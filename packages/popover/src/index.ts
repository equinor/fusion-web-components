import { fusionElement } from '@equinor/fusion-wc-core';
import { PopoverElement, PopoverElementProps } from './element';

export * from './element';
export * from './directories/popperjs';

export const tag = 'fwc-popover';

@fusionElement(tag)
export default class _ extends PopoverElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: PopoverElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<React.PropsWithChildren<PopoverElementProps>, PopoverElement>;
    }
  }
}
