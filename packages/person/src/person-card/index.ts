import { fusionElement } from '@equinor/fusion-wc-core';
import { PersonCardElement } from './element';
import { PersonCardElementProps } from './types';

export * from './element';
export * from './types';
export { AvatarSize } from '@equinor/fusion-wc-avatar';

const tag = 'fwc-person-card';

@fusionElement(tag)
export default class _ extends PersonCardElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: PersonCardElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<PersonCardElementProps & React.HTMLAttributes<PersonCardElement>>,
        PersonCardElement
      >;
    }
  }
}
