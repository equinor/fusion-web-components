import { fusionElement } from '@equinor/fusion-wc-core';
import { PopoverElement, PopoverElementProps } from './element';

export * from './tooltip';
export * from './directives/popperjs';

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
