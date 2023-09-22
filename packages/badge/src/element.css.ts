import { css, unsafeCSS, type CSSResult } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style: CSSResult = css`
  :host {
    --fwc-badge-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    --fwc-badge-size: 1.5rem;
    --fwc-badge-font-size: 0.75rem;
    --fwc-badge-icon-size: 0.685rem;
    position: absolute;
    z-index: 1;
  }
  :host .fwc-badge__container {
    background-color: var(--fwc-badge-color);
    min-width: var(--fwc-badge-size);
    height: var(--fwc-badge-size);
    font-size: var(--fwc-badge-font-size);
    border-radius: calc(var(--fwc-badge-size) / 2);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    place-content: center;
    overflow: hidden;
    color: #fff;
  }
  :host .fwc-avatar__ripple {
    z-index: 5;
  }
  :host .fwc-badge__icon {
    font-size: var(--fwc-badge-icon-size);
  }
  :host .fwc-badge__value {
    font-size: var(--fwc-badge-icon-size);
  }
  :host([size='small']) .fwc-badge__value {
    padding: 0 0.125rem;
  }
  :host([size='medium']) .fwc-badge__value {
    padding: 0 0.375rem;
  }
  :host([size='large']) .fwc-badge__value {
    padding: 0 0.5rem;
  }
  :host([size='x-small']) {
    --fwc-badge-size: 0.375rem;
  }
  :host([size='small']) {
    --fwc-badge-size: 1rem;
    --fwc-badge-font-size: 0.5rem;
    --fwc-badge-icon-size: 0.375rem;
  }
  :host([size='medium']) {
    --fwc-badge-size: 1.5rem;
    --fwc-badge-font-size: 0.75rem;
    --fwc-badge-icon-size: 0.625rem;
  }
  :host([size='large']) {
    --fwc-badge-size: 2rem;
    --fwc-badge-font-size: 1rem;
    --fwc-badge-icon-size: 0.875rem;
  }
  :host([position='top-left']) {
    transform: scale(1) translate(-50%, -50%);
    transform-origin: 0% 0%;
  }
  :host([position='top-left']:not([circular])) {
    top: 0;
    left: 0;
  }
  :host([position='top-left'][circular]) {
    top: 15%;
    left: 15%;
  }
  :host([position='top-right']) {
    transform: scale(1) translate(50%, -50%);
    transform-origin: 0% 100%;
  }
  :host([position='top-right']:not([circular])) {
    top: 0;
    right: 0;
  }
  :host([position='top-right'][circular]) {
    top: 15%;
    right: 15%;
  }
  :host([position='bottom-left']) {
    transform: scale(1) translate(-50%, 50%);
    transform-origin: 0% 100%;
  }
  :host([position='bottom-left']:not([circular])) {
    bottom: 0;
    left: 0;
  }
  :host([position='bottom-left'][circular]) {
    bottom: 15%;
    left: 15%;
  }
  :host([position='bottom-right']) {
    transform: scale(1) translate(50%, 50%);
    transform-origin: 100% 100%;
  }
  :host([position='bottom-right']:not([circular])) {
    bottom: 0;
    right: 0;
  }
  :host([position='bottom-right'][circular]) {
    bottom: 15%;
    right: 15%;
  }
  :host([color='primary']) {
    --fwc-badge-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
  }
  :host([color='secondary']) {
    --fwc-badge-color: ${unsafeCSS(theme.colors.interactive.secondary__resting.getVariable('color'))};
  }
  :host([color='success']) {
    --fwc-badge-color: ${unsafeCSS(theme.colors.interactive.success__resting.getVariable('color'))};
  }
  :host([color='danger']) {
    --fwc-badge-color: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
  }
  :host([color='warning']) {
    --fwc-badge-color: ${unsafeCSS(theme.colors.interactive.warning__resting.getVariable('color'))};
  }
  :host([color='disabled']) {
    --fwc-badge-color: ${unsafeCSS(theme.colors.interactive.disabled__text.getVariable('color'))};
  }
  :host([clickable]:not([disabled]):hover) {
    cursor: pointer;
  }
`;

export default style;
