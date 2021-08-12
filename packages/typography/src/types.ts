import type { TypographyTokens } from '@equinor/eds-tokens';

export interface TypographyProps {
  bold?: boolean;
  color?: TypographyColor;
  italic?: boolean;
  lines?: number;
  link?: boolean;
  variant?: TypographyVariant;
}

export type TypographyVariant =
  | keyof TypographyTokens['heading']
  | keyof TypographyTokens['paragraph']
  | keyof TypographyTokens['navigation']
  | keyof TypographyTokens['input']
  | keyof TypographyTokens['ui']
  | keyof TypographyTokens['table'];

export type TypographyColor = 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'disabled';
