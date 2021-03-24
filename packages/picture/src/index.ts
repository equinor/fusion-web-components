import { fusionElement } from '@equinor/fusion-wc-core';
import { PictureElement, PictureElementProps } from './element';

export * from './element';
export * from './element.css';
export * from './events/picture-event';

export const tag = 'fwc-picture';

@fusionElement(tag)
export default class _ extends PictureElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: PictureElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<React.PropsWithChildren<PictureElementProps>, PictureElement>;
    }
  }
}
