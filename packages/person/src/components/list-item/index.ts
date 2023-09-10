import { fusionElement } from '@equinor/fusion-wc-core';
import { PersonListItemElement } from './element';
import { PersonListItemElementProps } from './types';

export * from './element';
export * from './types';

export { AvatarSize } from '@equinor/fusion-wc-avatar';

export const tag = 'fwc-person-list-item';

@fusionElement(tag)
export default class _ extends PersonListItemElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: PersonListItemElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<PersonListItemElementProps & React.HTMLAttributes<PersonListItemElement>>,
        PersonListItemElement
      >;
    }
  }
}
