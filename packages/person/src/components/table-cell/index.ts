import { fusionElement } from '@equinor/fusion-wc-core';
import { PersonTableCellElement } from './element';
import { PersonTableCellElementProps } from './types';

export * from './element';
export * from './types';

export const tag = 'fwc-person-table-cell';

@fusionElement(tag)
export default class _ extends PersonTableCellElement { }

declare global {
  interface HTMLElementTagNameMap {
    [tag]: PersonTableCellElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<PersonTableCellElementProps & React.HTMLAttributes<PersonTableCellElement>>,
        PersonTableCellElement
      >;
    }
  }
}
