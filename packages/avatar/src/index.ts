import { fusionElement } from '@equinor/fusion-wc-core';
import { AvatarElement } from './element';
import { AvatarElementProps } from './types';

export * from './element';
export * from './types';

export const tag = 'fwc-avatar';

@fusionElement(tag)
export default class _ extends AvatarElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: AvatarElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<AvatarElementProps & React.HTMLAttributes<AvatarElement>>,
        AvatarElement
      >;
    }
  }
}
