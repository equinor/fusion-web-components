import { PropsWithChildren } from 'react';

import extractProps from './extract-props';

import { SkeletonElement, SkeletonElementProps } from '@equinor/fusion-wc-skeleton';
SkeletonElement;

export const Skeleton = ({ children, ...props }: PropsWithChildren<SkeletonElementProps>): JSX.Element => (
  <fwc-skeleton {...extractProps<SkeletonElementProps>(props)}>{children}</fwc-skeleton>
);

export default Skeleton;
