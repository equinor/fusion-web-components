import { fusionElement } from '@equinor/fusion-wc-core';
import { TooltipElement, TooltipElementProps } from './element';

export * from './element';
export * from './directives';

export const tag = 'fwc-tooltip';

@fusionElement(tag)
export default class _ extends TooltipElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: TooltipElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<React.PropsWithChildren<TooltipElementProps>, TooltipElement>;
    }
  }
}
