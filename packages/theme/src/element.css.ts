import { css, unsafeCSS } from 'lit-element';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  ::slotted(*) {
    --mdc-ripple-color: #000;
    --mdc-ripple-hover-opacity: 0.1;
    --mdc-theme-background: #fff;
    --mdc-theme-error: ${unsafeCSS(theme.colors.interactive.danger__text.getVariable('color'))};
    --mdc-theme-on-primary: ${unsafeCSS(theme.colors.text.static_icons__primary_white.getVariable('color'))};
    --mdc-theme-on-secondary: ${unsafeCSS(theme.colors.text.static_icons__primary_white.getVariable('color'))};
    --mdc-theme-on-surface: ${unsafeCSS(theme.colors.text.static_icons__secondary.getVariable('color'))};
    --mdc-theme-primary: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    --mdc-theme-secondary: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    --mdc-theme-surface: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
    --mdc-typography-font-family: Equinor;
  }
`;

export default style;
