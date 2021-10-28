export enum SkeletonSpacing {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum SkeletonDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export type SkeletonWrapperElementProps = {
  spacing?: SkeletonSpacing;
  direction?: SkeletonDirection;
};
