import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  :host {
    font-size: calc(
      ${unsafeCSS(theme.typography.paragraph.body_long.getVariable('fontSize'))} * var(--content-resize, 1)
    );
    --fwc-ripple-color: ${unsafeCSS(theme.colors.interactive.danger__resting.value.hex)};
  }
  :host([size='x-small']) .mdc-icon-button {
    --content-resize: 0.6;
  }
  :host([size='small']) .mdc-icon-button {
    --content-resize: 0.8;
  }
  :host([size='medium']) .mdc-icon-button {
    --content-resize: 1;
  }
  :host([size='large']) .mdc-icon-button {
    --content-resize: 1.2;
  }
  :host([size='x-large']) .mdc-icon-button {
    --content-resize: 1.4;
  }
  .mdc-icon-button {
    --mdc-icon-button-size: calc(48px * var(--content-resize, 1));
  }
  .mdc-icon-button__icon {
    font-size: calc(20px * var(--content-resize, 1));
  }
  .mdc-icon-button__icon slot {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mdc-icon-button ::slotted(svg) {
    --mdc-icon-size: calc(24px * var(--content-resize, 1));
  }
  .mdc-icon-button ::slotted(*) {
    --mdc-icon-size: calc(28px * var(--content-resize, 1));
  }
  :host([offColor='primary']) .mdc-icon-button {
    --mdc-ripple-color: ${unsafeCSS(theme.colors.interactive.primary__resting.value.hex)};
    color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
  }
  :host([offColor='secondary']) .mdc-icon-button {
    --mdc-ripple-color: ${unsafeCSS(theme.colors.interactive.secondary__resting.getVariable('color'))};
    color: ${unsafeCSS(theme.colors.interactive.secondary__resting.getVariable('color'))};
  }
  :host([offColor='success']) .mdc-icon-button {
    --mdc-ripple-color: ${unsafeCSS(theme.colors.interactive.success__resting.getVariable('color'))};
    color: ${unsafeCSS(theme.colors.interactive.success__resting.getVariable('color'))};
  }
  :host([offColor='danger']) .mdc-icon-button {
    --mdc-ripple-color: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
    color: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
  }
  :host([offColor='warning']) .mdc-icon-button {
    --mdc-ripple-color: ${unsafeCSS(theme.colors.interactive.warning__resting.getVariable('color'))};
    color: ${unsafeCSS(theme.colors.interactive.warning__resting.getVariable('color'))};
  }
  :host([offColor='disabled']) .mdc-icon-button {
    --mdc-ripple-color: ${unsafeCSS(theme.colors.interactive.disabled__text.getVariable('color'))};
    color: ${unsafeCSS(theme.colors.interactive.disabled__text.getVariable('color'))};
  }
  :host([onColor='primary']) .mdc-icon-button--on.mdc-icon-button {
    --mdc-ripple-color: ${unsafeCSS(theme.colors.interactive.primary__resting.value.hex)};
    color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
  }
  :host([onColor='secondary']) .mdc-icon-button--on.mdc-icon-button {
    --mdc-ripple-color: ${unsafeCSS(theme.colors.interactive.secondary__resting.value.hex)};
    color: ${unsafeCSS(theme.colors.interactive.secondary__resting.getVariable('color'))};
  }
  :host([onColor='success']) .mdc-icon-button--on.mdc-icon-button {
    --mdc-ripple-color: ${unsafeCSS(theme.colors.interactive.success__resting.getVariable('color'))};
    color: ${unsafeCSS(theme.colors.interactive.success__resting.getVariable('color'))};
  }
  :host([onColor='danger']) .mdc-icon-button--on.mdc-icon-button {
    --mdc-ripple-color: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
    color: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
  }
  :host([onColor='warning']) .mdc-icon-button--on.mdc-icon-button {
    --mdc-ripple-color: ${unsafeCSS(theme.colors.interactive.warning__resting.getVariable('color'))};
    color: ${unsafeCSS(theme.colors.interactive.warning__resting.getVariable('color'))};
  }
  :host([onColor='disabled']) .mdc-icon-button--on.mdc-icon-button {
    --mdc-ripple-color: ${unsafeCSS(theme.colors.interactive.disabled__text.getVariable('color'))};
    color: ${unsafeCSS(theme.colors.interactive.disabled__text.getVariable('color'))};
  }
`;

export default style;
