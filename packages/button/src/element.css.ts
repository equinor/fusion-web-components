import { css, unsafeCSS } from 'lit-element';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  :host {
    --mdc-button-outline-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    --mdc-button-disabled-fill-color: ${unsafeCSS(theme.colors.interactive.disabled__fill.getVariable('color'))};
    --mdc-button-disabled-ink-color: ${unsafeCSS(theme.colors.interactive.disabled__text.getVariable('color'))};
    --mdc-button-disabled-outline-color: ${unsafeCSS(theme.colors.interactive.disabled__border.getVariable('color'))};
    --mdc-typography-button-text-transform: none;
  }
  .leading-icon fwc-icon,
  .trailing-icon fwc-icon,
  ::slotted(fwc-icon) {
    font-size: 20px;
  }
  .mdc-button.mdc-button--unelevated.fwc-button--primary:not(:disabled) {
    background-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
  }
  .mdc-button.mdc-button--unelevated.fwc-button--secondary:not(:disabled) {
    background-color: ${unsafeCSS(theme.colors.interactive.secondary__resting.getVariable('color'))};
  }
  .mdc-button.mdc-button--unelevated.fwc-button--danger:not(:disabled) {
    background-color: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
  }
  .mdc-button.mdc-button--outlined.fwc-button--primary:not(:disabled) {
    border-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
  }
  .mdc-button.mdc-button--outlined.fwc-button--secondary:not(:disabled) {
    border-color: ${unsafeCSS(theme.colors.interactive.secondary__resting.getVariable('color'))};
    color: ${unsafeCSS(theme.colors.interactive.secondary__resting.getVariable('color'))};
  }
  .mdc-button.mdc-button--outlined.fwc-button--danger:not(:disabled) {
    border-color: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
    color: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
  }
  .mdc-button.fwc-button--ghost.fwc-button--primary:not(:disabled) {
    color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
  }
  .mdc-button.fwc-button--ghost.fwc-button--secondary:not(:disabled) {
    color: ${unsafeCSS(theme.colors.interactive.secondary__resting.getVariable('color'))};
  }
  .mdc-button.fwc-button--ghost.fwc-button--danger:not(:disabled) {
    color: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
  }
`;

export default style;
