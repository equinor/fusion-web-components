import { fusionElement } from '@equinor/fusion-wc-core';
import { SkeletonCardElement, SkeletonCardElementProps } from './element';
export * from './element';

export const tag = 'fwc-skeleton-card';

@fusionElement(tag)
export default class _ extends SkeletonCardElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: SkeletonCardElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<SkeletonCardElementProps & React.HTMLAttributes<SkeletonCardElement>>,
        SkeletonCardElement
      >;
    }
  }
}
