import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

console.log('theme.colors.interactive.primary__resting', theme.colors.interactive.primary__resting);

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
  .mdc-icon-button ::slotted(svg) {
    --mdc-icon-size: calc(24px * var(--content-resize, 1));
  }
  .mdc-icon-button ::slotted(*) {
    --mdc-icon-size: calc(28px * var(--content-resize, 1));
  }
  :host([color='primary']) .mdc-icon-button {
    --mdc-ripple-color: ${unsafeCSS(theme.colors.interactive.primary__resting.value.hex)};
    color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
  }
  :host([color='secondary']) .mdc-icon-button {
    --mdc-ripple-color: ${unsafeCSS(theme.colors.interactive.secondary__resting.getVariable('color'))};
    color: ${unsafeCSS(theme.colors.interactive.secondary__resting.getVariable('color'))};
  }
  :host([color='success']) .mdc-icon-button {
    --mdc-ripple-color: ${unsafeCSS(theme.colors.interactive.success__resting.getVariable('color'))};
    color: ${unsafeCSS(theme.colors.interactive.success__resting.getVariable('color'))};
  }
  :host([color='danger']) .mdc-icon-button {
    --mdc-ripple-color: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
    color: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
  }
  :host([color='warning']) .mdc-icon-button {
    --mdc-ripple-color: ${unsafeCSS(theme.colors.interactive.warning__resting.getVariable('color'))};
    color: ${unsafeCSS(theme.colors.interactive.warning__resting.getVariable('color'))};
  }
  :host([color='disabled']) .mdc-icon-button {
    --mdc-ripple-color: ${unsafeCSS(theme.colors.interactive.disabled__text.getVariable('color'))};
    color: ${unsafeCSS(theme.colors.interactive.disabled__text.getVariable('color'))};
  }
`;

export default style;
