import { css, unsafeCSS } from 'lit-element';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  host: {
    --mdc-theme-secondary: ${unsafeCSS(theme.colors.interactive.primary__resting.value.hex)};
    --mdc-theme-on-surface: ${unsafeCSS(theme.colors.text.static_icons__primary_white.value.hex)};
  }
`;
