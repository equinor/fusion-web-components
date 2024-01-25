import { fusionElement } from '@equinor/fusion-wc-core';
import { ListElement, ListElementProps } from './element';
export * from './element';
export { IconName } from '@equinor/fusion-wc-icon';

export { CheckListItemElement, tag as checkListItemTag } from './check-list-item';
export { RadioListItemElement, tag as radioListItemTag } from './radio-list-item';
export { ListItemElement, tag as listItemTag } from './list-item';

export const tag = 'fwc-list';

@fusionElement(tag)
export default class _ extends ListElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: ListElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<ListElementProps & React.HTMLAttributes<ListElement>>,
        ListElement
      >;
    }
  }
}
