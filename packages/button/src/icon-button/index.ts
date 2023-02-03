import { fusionElement } from '@equinor/fusion-wc-core';
import { IconButtonElement, IconButtonElementProps } from './element';
export * from './element';
export const tag = 'fwc-icon-button';

@fusionElement(tag)
export default class _ extends IconButtonElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: IconButtonElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<React.PropsWithChildren<IconButtonElementProps>, IconButtonElement>;
    }
  }
}
