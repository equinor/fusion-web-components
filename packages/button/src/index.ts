import { fusionElement } from '@equinor/fusion-wc-core';
import ButtonElement, { ButtonElementProps } from './element';

export const tag = 'fwc-button';

@fusionElement(tag)
export default class _ extends ButtonElement {}
declare global {
  interface HTMLElementTagNameMap {
    [tag]: ButtonElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<React.PropsWithChildren<ButtonElementProps>, ButtonElement>;
    }
  }
}
