export enum AvatarSize {
  XSmall = 'x-small',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum AvatarColor {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  Disabled = 'disabled',
}

export type AvatarElementProps = {
  size?: AvatarSize;
  color?: AvatarColor;
  value?: string;
  src?: string;
  clickable?: boolean;
  border?: boolean;
  disabled?: boolean;
};
