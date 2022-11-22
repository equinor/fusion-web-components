import { fusionElement } from '@equinor/fusion-wc-core';
import { IconButtonToggleElement, IconButtonToggleElementProps } from './element';
export * from './element';
export const tag = 'fwc-icon-button-toggle';

@fusionElement(tag)
export default class _ extends IconButtonToggleElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: IconButtonToggleElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<React.PropsWithChildren<IconButtonToggleElementProps>, IconButtonToggleElement>;
    }
  }
}
