import { css, unsafeCSS } from 'lit-element';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  :host {
    --mdc-text-area-outlined-idle-border-color: ${unsafeCSS(
      theme.colors.text.static_icons__tertiary.getVariable('color')
    )};
    --mdc-text-area-outlined-idle-border-color: ${unsafeCSS(
      theme.colors.text.static_icons__tertiary.getVariable('color')
    )};
    --mdc-text-area-outlined-hover-border-color: ${unsafeCSS(
      theme.colors.text.static_icons__tertiary.getVariable('color')
    )};
    --mdc-text-area-outlined-disabled-border-color: ${unsafeCSS(
      theme.colors.text.static_icons__tertiary.getVariable('color')
    )};
  }
`;

export default style;
