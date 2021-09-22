import { fusionElement } from '@equinor/fusion-wc-core';
import { PersonAvatarElement, PersonAvatarElementProps } from './element';
export * from './element';

const tag = 'fwc-person-avatar';

@fusionElement(tag)
export default class _ extends PersonAvatarElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: PersonAvatarElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<PersonAvatarElementProps & React.HTMLAttributes<PersonAvatarElement>>,
        PersonAvatarElement
      >;
    }
  }
}
