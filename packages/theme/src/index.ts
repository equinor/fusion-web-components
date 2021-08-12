import { fusionElement } from '@equinor/fusion-wc-core';
import ThemeElement from './element';
export * from './element';

export const tag = 'fwc-theme';

declare global {
  interface HTMLElementTagNameMap {
    [tag]: ThemeElement;
  }
}

@fusionElement(tag)
export default class _ extends ThemeElement {}
