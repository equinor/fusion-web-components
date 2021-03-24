import { fusionElement } from '@equinor/fusion-wc-core';
import Element from './element';

export const tag = 'fwc-button';

@fusionElement(tag)
export default class _element extends Element {}
declare global {
  interface HTMLElementTagNameMap {
    [tag]: _element;
  }
}

export * from './element';
