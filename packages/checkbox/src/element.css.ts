import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  :host {
    --mdc-checkbox-ink-color: ${unsafeCSS(theme.colors.text.static_icons__primary_white.getVariable('color'))};
    --mdc-checkbox-unchecked-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    --mdc-checkbox-disabled-color: ${unsafeCSS(theme.colors.interactive.disabled__fill.getVariable('color'))};
  }
`;

export default style;
