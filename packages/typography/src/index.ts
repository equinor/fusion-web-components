import { fusionElement } from '@equinor/fusion-wc-core';
import TypographyElement from './element';

export { style } from './element.css';
export const tag = 'fwc-typography';

@fusionElement(tag)
export default class _ extends TypographyElement {}
declare global {
  interface HTMLElementTagNameMap {
    [tag]: TypographyElement;
  }
}
