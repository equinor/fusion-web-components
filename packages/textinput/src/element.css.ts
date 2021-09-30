import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';
import { styles as mdcStyle } from '@material/mwc-textfield/mwc-textfield.css';

export const attributes = css`
  :host {
    --fwc-text-field-base-color: ${unsafeCSS(theme.colors.text.static_icons__tertiary.getVariable('color'))};
    --fwc-text-field-fill-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
    --fwc-text-field-ink-color: ${unsafeCSS(theme.colors.text.static_icons__default.getVariable('color'))};
    --fwc-text-field-disabled-ink-color: ${unsafeCSS(theme.colors.text.static_icons__default.getVariable('color'))};
  }
`;

export const mdcOverride = css`
  :host {
    --mdc-text-field-idle-line-color: var(--fwc-text-field-base-color);
    --mdc-text-field-hover-line-color: var(--fwc-text-field-base-color);
    --mdc-text-field-disabled-line-color: transparent;
    --mdc-text-field-outlined-idle-border-color: var(--fwc-text-field-base-color);
    --mdc-text-field-outlined-hover-border-color: var(--fwc-text-field-base-color);
    --mdc-text-field-outlined-disabled-border-color: var(--fwc-text-field-base-color);
    --mdc-text-field-fill-color: var(--fwc-text-field-fill-color);
    --mdc-text-field-disabled-fill-color: var(--fwc-text-field-fill-color);
    --mdc-text-field-ink-color: var(--fwc-text-field-ink-color);
    --mdc-text-field-label-ink-color: var(--fwc-text-field-base-color);
    --mdc-text-field-disabled-ink-color: var(--fwc-text-field-disabled-ink-color);
  }
`;

export const styles = [mdcStyle, mdcOverride, attributes];

export default styles;
