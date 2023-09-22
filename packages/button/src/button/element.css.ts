import { css, unsafeCSS, type CSSResult } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

import { styles as mdcStyle } from '@material/mwc-button/styles.css';

const style: CSSResult = css`
  :host {
    --mdc-button-outline-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    --mdc-button-disabled-fill-color: ${unsafeCSS(theme.colors.interactive.disabled__fill.getVariable('color'))};
    --mdc-button-disabled-ink-color: ${unsafeCSS(theme.colors.interactive.disabled__text.getVariable('color'))};
    --mdc-button-disabled-outline-color: ${unsafeCSS(theme.colors.interactive.disabled__border.getVariable('color'))};
    --mdc-typography-button-text-transform: none;
  }
  :host([variant='contained'][color='primary']) .mdc-button {
    --mdc-theme-primary: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
  }
  :host([variant='contained'][color='secondary']) .mdc-button {
    --mdc-theme-primary: ${unsafeCSS(theme.colors.interactive.secondary__resting.getVariable('color'))};
  }
  :host([variant='contained'][color='danger']) .mdc-button {
    --mdc-theme-primary: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
  }
  :host([variant='outlined'][color='primary']) .mdc-button {
    --mdc-button-outline-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
  }
  :host([variant='outlined'][color='secondary']) .mdc-button {
    --mdc-button-outline-color: ${unsafeCSS(theme.colors.interactive.secondary__resting.getVariable('color'))};
  }
  :host([variant='outlined'][color='danger']) .mdc-button {
    --mdc-button-outline-color: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
    --mdc-theme-primary: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
  }
  :host([variant='ghost'][color='primary']) .mdc-button {
    --mdc-button-outline-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
  }
  :host([variant='ghost'][color='secondary']) .mdc-button {
    --mdc-button-outline-color: ${unsafeCSS(theme.colors.interactive.secondary__resting.getVariable('color'))};
  }
  :host([variant='ghost'][color='danger']) .mdc-button {
    --mdc-button-outline-color: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
    --mdc-theme-primary: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
  }
  .leading-icon ::slotted(*),
  .trailing-icon ::slotted(*) {
    display: initial;
  }
  .leading-icon fwc-icon.mdc-button__icon,
  .leading-icon ::slotted(fwc-icon),
  .trailing-icon fwc-icon.mdc-button__icon,
  .trailing-icon ::slotted(fwc-icon) {
    display: inline-flex;
  }
`;

export const styles = [mdcStyle, style];

export default styles;
