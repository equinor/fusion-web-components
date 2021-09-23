import { fusionElement } from '@equinor/fusion-wc-core';
import { CheckListItemElement } from './element';
import { ListItemElementProps } from '../list-item';
export * from './element';
export { IconName } from '@equinor/fusion-wc-icon';

const tag = 'fwc-check-list-item';

@fusionElement(tag)
export default class _ extends CheckListItemElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: CheckListItemElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<ListItemElementProps & React.HTMLAttributes<CheckListItemElement>>,
        CheckListItemElement
      >;
    }
  }
}
