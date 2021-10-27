import { fusionElement } from '@equinor/fusion-wc-core';
import { SkeletonWrapperElement, SkeletonWrapperElementProps } from './element';
export * from './element';

export const tag = 'fwc-skeleton-wrapper';

@fusionElement(tag)
export default class _ extends SkeletonWrapperElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: SkeletonWrapperElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<SkeletonWrapperElementProps & React.HTMLAttributes<SkeletonWrapperElement>>,
        SkeletonWrapperElement
      >;
    }
  }
}
