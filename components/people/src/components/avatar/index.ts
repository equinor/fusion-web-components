import { fusionElement } from '@equinor/fusion-wc-core';
import { PeopleAvatarElement } from './element';
import { PeopleAvatarElementProps } from './types';

export * from './element';
export * from './types';

export const tag = 'fwc-people-avatar';

@fusionElement(tag)
export default class _ extends PeopleAvatarElement { }

declare global {
  interface HTMLElementTagNameMap {
    [tag]: PeopleAvatarElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<PeopleAvatarElementProps & React.HTMLAttributes<PeopleAvatarElement>>,
        PeopleAvatarElement
      >;
    }
  }
}
