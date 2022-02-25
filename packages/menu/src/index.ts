import { fusionElement } from '@equinor/fusion-wc-core';
import MenuElement, { MenuElementProps } from './element';
export * from './element';

export const tag = 'fwc-menu';

@fusionElement(tag)
export default class _ extends MenuElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: MenuElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<MenuElementProps & React.HTMLAttributes<MenuElement>>,
        MenuElement
      >;
    }
  }
}
