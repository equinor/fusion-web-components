import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  :host {
    --fwc-chip-base-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    --fwc-chip-fill-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
    --fwc-chip-ink-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    --fwc-chip-size: 1.5rem;
    --fwc-chip-font-size: 0.75rem;
    min-width: var(--fwc-chip-size);
    height: var(--fwc-chip-size);
    font-size: var(--fwc-chip-font-size);
    font-family: 'Equinor';
    color: var(--fwc-chip-ink-color);
    border-radius: var(--fwc-chip-font-size);
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    overflow: hidden;
    padding: 0 0.75em;
  }
  :host .fwc-chip__graphic {
    margin-right: 0.25em;
    font-size: 0.75em;
  }
  :host .fwc-chip__remove {
    margin-left: 0.25em;
    font-size: 0.75em;
  }
  :host .fwc-chip__remove:hover {
    cursor: pointer;
  }
  :host([variant='outlined']) {
    border: 1px solid var(--fwc-chip-base-color);
  }
  :host([variant='filled']) {
    background-color: var(--fwc-chip-fill-color);
  }
  :host([size='small']) {
    --fwc-chip-size: 1.25rem;
    --fwc-chip-font-size: 0.625rem;
  }
  :host([size='medium']) {
    --fwc-chip-size: 1.75rem;
    --fwc-chip-font-size: 0.875rem;
  }
  :host([size='large']) {
    --fwc-chip-size: 2.5rem;
    --fwc-chip-font-size: 1.25rem;
  }
  :host([color='primary'][variant='filled']) {
    --fwc-chip-ink-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    --fwc-chip-fill-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
  }
  :host([color='primary'][variant='outlined']) {
    --fwc-chip-ink-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    --fwc-chip-base-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
  }
  :host([color='primary'][clickable]:hover) {
    --fwc-chip-ink-color: ${unsafeCSS(theme.colors.interactive.primary__hover.getVariable('color'))};
  }
  :host([color='secondary'][variant='filled']) {
    --fwc-chip-ink-color: #fff;
    --fwc-chip-fill-color: ${unsafeCSS(theme.colors.interactive.secondary__resting.getVariable('color'))};
  }
  :host([color='secondary'][variant='outlined']) {
    --fwc-chip-ink-color: ${unsafeCSS(theme.colors.interactive.secondary__resting.getVariable('color'))};
    --fwc-chip-base-color: ${unsafeCSS(theme.colors.interactive.secondary__resting.getVariable('color'))};
  }
  :host([color='secondary'][clickable]:hover) {
    --fwc-chip-ink-color: ${unsafeCSS(theme.colors.interactive.secondary__link_hover.getVariable('color'))};
  }
  :host([color='success'][variant='filled']) {
    --fwc-chip-ink-color: #fff;
    --fwc-chip-fill-color: ${unsafeCSS(theme.colors.interactive.success__resting.getVariable('color'))};
  }
  :host([color='success'][variant='outlined']) {
    --fwc-chip-ink-color: ${unsafeCSS(theme.colors.interactive.success__resting.getVariable('color'))};
    --fwc-chip-base-color: ${unsafeCSS(theme.colors.interactive.success__resting.getVariable('color'))};
  }
  :host([color='success'][clickable]:hover) {
    --fwc-chip-ink-color: ${unsafeCSS(theme.colors.interactive.success__hover.getVariable('color'))};
  }
  :host([color='danger'][variant='filled']) {
    --fwc-chip-ink-color: #fff;
    --fwc-chip-fill-color: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
  }
  :host([color='danger'][variant='outlined']) {
    --fwc-chip-ink-color: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
    --fwc-chip-base-color: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
  }
  :host([color='danger'][clickable]:hover) {
    --fwc-chip-ink-color: ${unsafeCSS(theme.colors.interactive.danger__hover.getVariable('color'))};
  }
  :host([color='warning'][variant='filled']) {
    --fwc-chip-ink-color: #fff;
    --fwc-chip-fill-color: ${unsafeCSS(theme.colors.interactive.warning__resting.getVariable('color'))};
  }
  :host([color='warning'][variant='outlined']) {
    --fwc-chip-ink-color: ${unsafeCSS(theme.colors.interactive.warning__resting.getVariable('color'))};
    --fwc-chip-base-color: ${unsafeCSS(theme.colors.interactive.warning__resting.getVariable('color'))};
  }
  :host([color='warning'][clickable]:hover) {
    --fwc-chip-ink-color: ${unsafeCSS(theme.colors.interactive.warning__hover.getVariable('color'))};
  }
  :host([disabled]) {
    --fwc-chip-base-color: ${unsafeCSS(theme.colors.interactive.disabled__text.getVariable('color'))} !important;
    --fwc-chip-fill-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))} !important;
    --fwc-chip-ink-color: ${unsafeCSS(theme.colors.interactive.disabled__text.getVariable('color'))} !important;
  }
  :host([clickable]:not([disabled]):hover) {
    cursor: pointer;
  }
`;

export default style;
