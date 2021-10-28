import { fusionElement } from '@equinor/fusion-wc-core';
import { SkeletonWrapperElement } from './element';
import { SkeletonWrapperElementProps } from './types';

export * from './element';
export * from './types';

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
