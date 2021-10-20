import { fusionElement } from '@equinor/fusion-wc-core';
import { CheckListItemElement } from './element';
export * from './element';
export { IconName } from '@equinor/fusion-wc-icon';

export const tag = 'fwc-check-list-item';

@fusionElement(tag)
export default class _ extends CheckListItemElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: CheckListItemElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<React.HTMLAttributes<CheckListItemElement>>,
        CheckListItemElement
      >;
    }
  }
}
