import { fusionElement } from '@equinor/fusion-wc-core';
import { ListElement, ListElementProps } from './element';
export * from './element';
export { IconName } from '@equinor/fusion-wc-icon';

export const listTag = 'fwc-list';

@fusionElement(listTag)
export default class _ extends ListElement {}

declare global {
  interface HTMLElementTagNameMap {
    [listTag]: ListElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [listTag]: React.DetailedHTMLProps<
        React.PropsWithChildren<ListElementProps & React.HTMLAttributes<ListElement>>,
        ListElement
      >;
    }
  }
}
