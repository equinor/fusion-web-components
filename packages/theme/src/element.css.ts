import { css, unsafeCSS, type CSSResult }  from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

const style: CSSResult = css`
  ::slotted(*) {
    --fwc-ripple-color: #000;
    --fwc-ripple-hover-opacity: 0.1;
    --fwc-theme-background: #fff;
    --fwc-theme-primary: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    --fwc-theme-error: ${unsafeCSS(theme.colors.interactive.danger__text.getVariable('color'))};
    --fwc-theme-on-primary: ${unsafeCSS(theme.colors.text.static_icons__primary_white.getVariable('color'))};
    --fwc-theme-on-secondary: ${unsafeCSS(theme.colors.text.static_icons__primary_white.getVariable('color'))};
    --fwc-theme-on-surface: ${unsafeCSS(theme.colors.text.static_icons__secondary.getVariable('color'))};
    --fwc-theme-secondary: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    --fwc-theme-surface: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
    --fwc-typography-font-family: ${unsafeCSS(theme.typography.paragraph.body_long.getVariable('fontFamily'))},
      sans-serif;

    --mdc-ripple-color: var(--fwc-ripple-color);
    --mdc-ripple-hover-opacity: var(--fwc-ripple-hover-opacity);
    --mdc-theme-background: var(--fwc-theme-background);
    --mdc-theme-primary: var(--fwc-theme-primary);
    --mdc-theme-error: var(--fwc-theme-error);
    --mdc-theme-on-primary: var(--fwc-theme-on-primary);
    --mdc-theme-on-secondary: var(--fwc-theme-on-secondary);
    --mdc-theme-on-surface: var(--fwc-theme-on-surface);
    --mdc-theme-secondary: var(--fwc-theme-secondary);
    --mdc-theme-surface: var(--fwc-theme-surface);
    --mdc-typography-font-family: var(--fwc-typography-font-family);
    font-family: var(--fwc-typography-font-family);
  }
`;

export default style;
