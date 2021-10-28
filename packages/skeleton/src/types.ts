import { IconName } from '@equinor/fusion-wc-icon';

export enum SkeletonVariant {
  Circle = 'circle',
  Rectangle = 'rectangle',
  Square = 'square',
  Text = 'text',
}

export enum SkeletonSize {
  XSmall = 'x-small',
  small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export type SkeletonElementProps = {
  size?: SkeletonSize;
  variant?: SkeletonVariant;
  inactive?: boolean;
  fluid?: boolean;
  icon?: IconName;
};
