import { fusionElement } from '@equinor/fusion-wc-core';
import { AvatarElement, AvatarElementProps } from './element';
export * from './element';

export const tag = 'fwc-avatar';

@fusionElement(tag)
export default class _ extends AvatarElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: AvatarElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<React.PropsWithChildren<AvatarElementProps>, AvatarElement>;
    }
  }
}
