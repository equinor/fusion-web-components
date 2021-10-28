export enum DividerColor {
  Medium = 'medium',
  Light = 'light',
  Lighter = 'lighter',
}

export enum DividerSpacing {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum DividerVariant {
  Full = 'full',
  Middle = 'middle',
  List = 'list',
}

export enum DividerOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export type DividerElementProps = {
  color?: DividerColor;
  spacing?: DividerSpacing;
  variant?: DividerVariant;
  orientation?: DividerOrientation;
};
