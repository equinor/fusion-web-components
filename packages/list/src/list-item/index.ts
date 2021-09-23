import { fusionElement } from '@equinor/fusion-wc-core';
import { ListItemElement, ListItemElementProps } from './element';
export * from './element';
export { IconName } from '@equinor/fusion-wc-icon';

const tag = 'fwc-list-item';

@fusionElement(tag)
export default class _ extends ListItemElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: ListItemElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<ListItemElementProps & React.HTMLAttributes<ListItemElement>>,
        ListItemElement
      >;
    }
  }
}
