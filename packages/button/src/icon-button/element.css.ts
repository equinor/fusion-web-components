import { css, unsafeCSS, type CSSResult } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

const style: CSSResult = css`
  :host {
    font-size: calc(
      ${unsafeCSS(theme.typography.paragraph.body_long.getVariable('fontSize'))} * var(--content-resize, 1)
    );
    --fwc-ripple-color: var(--eds-color-text-danger-subtle);
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
    --mdc-ripple-color: var(--eds-color-text-accent-subtle);
    color: var(--eds-color-text-accent-subtle);
  }
  :host([color='secondary']) .mdc-icon-button {
    --mdc-ripple-color: var(--eds-color-text-neutral-strong);
    color: var(--eds-color-text-neutral-strong);
  }
  :host([color='success']) .mdc-icon-button {
    --mdc-ripple-color: var(--eds-color-text-success-subtle);
    color: var(--eds-color-text-success-subtle);
  }
  :host([color='danger']) .mdc-icon-button {
    --mdc-ripple-color: var(--eds-color-text-danger-subtle);
    color: var(--eds-color-text-danger-subtle);
  }
  :host([color='warning']) .mdc-icon-button {
    --mdc-ripple-color: var(--eds-color-text-warning-subtle);
    color: var(--eds-color-text-warning-subtle);
  }
  :host([color='disabled']) .mdc-icon-button {
    --mdc-ripple-color: var(--eds-color-text-disabled);
    color: var(--eds-color-text-disabled);
  }
`;

export default style;
