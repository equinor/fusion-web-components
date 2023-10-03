import { fusionElement } from '@equinor/fusion-wc-core';
import { AvatarElement } from './element';

export * from './element';
export * from './static';

export type AvatarElementProps = Pick<
  AvatarElement,
  'size' | 'color' | 'value' | 'src' | 'clickable' | 'disabled' | 'elevated'
>;

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
