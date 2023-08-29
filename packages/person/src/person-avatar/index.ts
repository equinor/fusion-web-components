import { fusionElement } from '@equinor/fusion-wc-core';
import { PersonAvatarElement } from './element';
import { PersonAvatarElementProps } from './types';

export * from './element';
export * from './types';
export { AvatarSize } from '@equinor/fusion-wc-avatar';
export { AvatarData } from './task';

export const tag = 'fwc-person-avatar';

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
