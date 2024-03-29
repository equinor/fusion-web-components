import { fusionElement } from '@equinor/fusion-wc-core';
import { ListItemElement } from './element';
export * from './element';
export { IconName } from '@equinor/fusion-wc-icon';

export const tag = 'fwc-list-item';

@fusionElement(tag)
export default class _ extends ListItemElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: ListItemElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<React.PropsWithChildren<React.HTMLAttributes<ListItemElement>>, ListItemElement>;
    }
  }
}
