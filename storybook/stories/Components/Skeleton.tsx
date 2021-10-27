import { PropsWithChildren } from 'react';

import extractProps from './extract-props';

import { SkeletonElement, SkeletonElementProps } from '@equinor/fusion-wc-skeleton';
import { SkeletonWrapperElement, SkeletonWrapperElementProps } from '@equinor/fusion-wc-skeleton/lib/skeleton-wrapper';

SkeletonElement;
SkeletonWrapperElement;

export const Skeleton = ({ children, ...props }: PropsWithChildren<SkeletonElementProps>): JSX.Element => (
  <fwc-skeleton {...extractProps<SkeletonElementProps>(props)}>{children}</fwc-skeleton>
);

export const SkeletonWrapper = ({
  children,
  ...props
}: PropsWithChildren<SkeletonWrapperElementProps>): JSX.Element => (
  <fwc-skeleton-wrapper {...extractProps<SkeletonWrapperElementProps>(props)}>{children}</fwc-skeleton-wrapper>
);

export default Skeleton;
