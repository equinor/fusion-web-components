import { fusionElement } from '@equinor/fusion-wc-core';
import { ListItemElement, ListItemElementProps } from './element';
export * from './element';
export { IconName } from '@equinor/fusion-wc-icon';

export const listItemTag = 'fwc-list-item';

@fusionElement(listItemTag)
export default class _ extends ListItemElement {}

declare global {
  interface HTMLElementTagNameMap {
    [listItemTag]: ListItemElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [listItemTag]: React.DetailedHTMLProps<
        React.PropsWithChildren<ListItemElementProps & React.HTMLAttributes<ListItemElement>>,
        ListItemElement
      >;
    }
  }
}
