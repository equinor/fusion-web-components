import { fusionElement } from '@equinor/fusion-wc-core';
import { SkeletonElement } from './element';
import { SkeletonElementProps } from './types';

export * from './element';
export * from './types';

export const tag = 'fwc-skeleton';

@fusionElement(tag)
export default class _ extends SkeletonElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: SkeletonElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<SkeletonElementProps & React.HTMLAttributes<SkeletonElement>>,
        SkeletonElement
      >;
    }
  }
}
