import { fusionElement } from '@equinor/fusion-wc-core';
import { CheckListItemElement } from './element';
import { ListItemElementProps } from '../list-item';
export * from './element';
export { IconName } from '@equinor/fusion-wc-icon';

export const checkListItemTag = 'fwc-check-list-item';

@fusionElement(checkListItemTag)
export default class _ extends CheckListItemElement {}

declare global {
  interface HTMLElementTagNameMap {
    [checkListItemTag]: CheckListItemElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [checkListItemTag]: React.DetailedHTMLProps<
        React.PropsWithChildren<ListItemElementProps & React.HTMLAttributes<CheckListItemElement>>,
        CheckListItemElement
      >;
    }
  }
}
