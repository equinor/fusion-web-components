import { css, unsafeCSS, type CSSResult } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style: CSSResult = css`
  :host .fwc-chip {
    min-width: var(--fwc-chip-size);
    height: var(--fwc-chip-size);
    font-size: var(--fwc-chip-font-size);
    font-family: 'Equinor';
    border-radius: var(--fwc-chip-font-size);
    position: relative;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    overflow: hidden;
    padding: 0 0.75em;
  }
  :host([variant='filled']) .fwc-chip {
    background-color: var(--fwc-chip-fill-color);
    color: var(--fwc-chip-ink-color);
  }
  :host([clickable][variant='filled']:not([disabled]):hover) .fwc-chip {
    background-color: var(--fwc-chip-fill-hover-color);
    color: var(--fwc-chip-ink-hover-color);
  }
  :host([variant='outlined']) .fwc-chip {
    border: 1px solid var(--fwc-chip-border-color);
    color: var(--fwc-chip-ink-color);
  }
  :host([clickable][variant='outlined']:not([disabled]):hover) .fwc-chip {
    border: 1px solid var(--fwc-chip-border-hover-color);
    color: var(--fwc-chip-ink-hover-color);
  }
  :host([clickable]:not([disabled]):hover) .fwc-chip {
    cursor: pointer;
  }
  :host .fwc-chip__graphic {
    margin-right: 0.5em;
    font-size: 0.75em;
  }
  :host .fwc-chip__remove {
    margin-left: 0.5em;
    font-size: 0.75em;
  }
  :host .fwc-chip__remove:hover {
    cursor: pointer;
    color: var(--fwc-chip-ink-hover-color);
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
    --fwc-chip-ink-hover-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    --fwc-chip-fill-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
    --fwc-chip-fill-hover-color: ${unsafeCSS(theme.colors.ui.background__medium.getVariable('color'))};
  }
  :host([color='primary'][variant='outlined']) {
    --fwc-chip-ink-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    --fwc-chip-ink-hover-color: ${unsafeCSS(theme.colors.interactive.primary__hover.getVariable('color'))};
    --fwc-chip-border-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    --fwc-chip-border-hover-color: ${unsafeCSS(theme.colors.interactive.primary__hover.getVariable('color'))};
  }
  :host([color='secondary'][variant='filled']) {
    --fwc-chip-ink-color: #fff;
    --fwc-chip-ink-hover-color: #fff;
    --fwc-chip-fill-color: ${unsafeCSS(theme.colors.interactive.secondary__resting.getVariable('color'))};
    --fwc-chip-fill-hover-color: ${unsafeCSS(theme.colors.interactive.secondary__link_hover.getVariable('color'))};
  }
  :host([color='secondary'][variant='outlined']) {
    --fwc-chip-ink-color: ${unsafeCSS(theme.colors.interactive.secondary__resting.getVariable('color'))};
    --fwc-chip-ink-hover-color: ${unsafeCSS(theme.colors.interactive.secondary__link_hover.getVariable('color'))};
    --fwc-chip-border-color: ${unsafeCSS(theme.colors.interactive.secondary__resting.getVariable('color'))};
    --fwc-chip-border-hover-color: ${unsafeCSS(theme.colors.interactive.secondary__link_hover.getVariable('color'))};
  }
  :host([color='success'][variant='filled']) {
    --fwc-chip-ink-color: #fff;
    --fwc-chip-ink-hover-color: #fff;
    --fwc-chip-fill-color: ${unsafeCSS(theme.colors.interactive.success__resting.getVariable('color'))};
    --fwc-chip-border-hover-color: ${unsafeCSS(theme.colors.interactive.success__hover.getVariable('color'))};
  }
  :host([color='success'][variant='outlined']) {
    --fwc-chip-ink-color: ${unsafeCSS(theme.colors.interactive.success__resting.getVariable('color'))};
    --fwc-chip-ink-hover-color: ${unsafeCSS(theme.colors.interactive.success__hover.getVariable('color'))};
    --fwc-chip-border-color: ${unsafeCSS(theme.colors.interactive.success__resting.getVariable('color'))};
    --fwc-chip-border-hover-color: ${unsafeCSS(theme.colors.interactive.success__hover.getVariable('color'))};
  }
  :host([color='danger'][variant='filled']) {
    --fwc-chip-ink-color: #fff;
    --fwc-chip-ink-hover-color: #fff;
    --fwc-chip-fill-color: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
    --fwc-chip-fill-hover-color: ${unsafeCSS(theme.colors.interactive.danger__hover.getVariable('color'))};
  }
  :host([color='danger'][variant='outlined']) {
    --fwc-chip-ink-color: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
    --fwc-chip-ink-hover-color: ${unsafeCSS(theme.colors.interactive.danger__hover.getVariable('color'))};
    --fwc-chip-border-color: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
    --fwc-chip-border-hover-color: ${unsafeCSS(theme.colors.interactive.danger__hover.getVariable('color'))};
  }
  :host([color='warning'][variant='filled']) {
    --fwc-chip-ink-color: #fff;
    --fwc-chip-ink-hover-color: #fff;
    --fwc-chip-fill-color: ${unsafeCSS(theme.colors.interactive.warning__resting.getVariable('color'))};
    --fwc-chip-fill-hover-color: ${unsafeCSS(theme.colors.interactive.warning__hover.getVariable('color'))};
  }
  :host([color='warning'][variant='outlined']) {
    --fwc-chip-ink-color: ${unsafeCSS(theme.colors.interactive.warning__resting.getVariable('color'))};
    --fwc-chip-ink-hover-color: ${unsafeCSS(theme.colors.interactive.warning__hover.getVariable('color'))};
    --fwc-chip-border-color: ${unsafeCSS(theme.colors.interactive.warning__resting.getVariable('color'))};
    --fwc-chip-border-hover-color: ${unsafeCSS(theme.colors.interactive.warning__hover.getVariable('color'))};
  }
  :host([disabled][variant='filled']) {
    --fwc-chip-fill-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))} !important;
    --fwc-chip-ink-color: ${unsafeCSS(theme.colors.interactive.disabled__text.getVariable('color'))} !important;
  }
  :host([disabled][variant='outlined']) {
    --fwc-chip-border-color: ${unsafeCSS(theme.colors.interactive.disabled__text.getVariable('color'))} !important;
    --fwc-chip-ink-color: ${unsafeCSS(theme.colors.interactive.disabled__text.getVariable('color'))} !important;
  }
`;

export default style;
