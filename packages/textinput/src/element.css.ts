import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  :host {
    --mdc-text-field-idle-line-color: ${unsafeCSS(theme.colors.text.static_icons__tertiary.getVariable('color'))};
    --mdc-text-field-hover-line-color: ${unsafeCSS(theme.colors.text.static_icons__tertiary.getVariable('color'))};
    --mdc-text-field-disabled-line-color: transparent;
    --mdc-text-field-outlined-idle-border-color: ${unsafeCSS(
      theme.colors.text.static_icons__tertiary.getVariable('color')
    )};
    --mdc-text-field-outlined-hover-border-color: ${unsafeCSS(
      theme.colors.text.static_icons__tertiary.getVariable('color')
    )};
    --mdc-text-field-outlined-disabled-border-color: ${unsafeCSS(
      theme.colors.text.static_icons__tertiary.getVariable('color')
    )};
    --mdc-text-field-fill-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
    --mdc-text-field-disabled-fill-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
    --mdc-text-field-ink-color: ${unsafeCSS(theme.colors.text.static_icons__default.getVariable('color'))};
    --mdc-text-field-label-ink-color: ${unsafeCSS(theme.colors.text.static_icons__tertiary.getVariable('color'))};
    --mdc-text-field-disabled-ink-color: ${unsafeCSS(theme.colors.interactive.disabled__text.getVariable('color'))};
  }
`;

export default style;
