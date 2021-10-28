import { IconName } from '@equinor/fusion-wc-icon';

export { IconName } from '@equinor/fusion-wc-icon';

export enum BadgeSize {
  XSmall = 'x-small',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum BadgePosition {
  TopLeft = 'top-left',
  TopRight = 'top-right',
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
}

export enum BadgeColor {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  Disabled = 'disabled',
}

export type BadgeElementProps = {
  size?: BadgeSize;
  position?: BadgePosition;
  color?: BadgeColor;
  value?: string;
  icon?: IconName;
  circular?: boolean;
  tooltip?: string;
  clickable?: boolean;
  disabled?: boolean;
};
