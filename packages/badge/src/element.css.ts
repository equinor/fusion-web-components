import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  :host {
    --fwc-badge-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    --fwc-badge-size: 1.5rem;
    --fwc-badge-font-size: 0.75rem;
    background-color: var(--fwc-badge-color);
    min-width: var(--fwc-badge-size);
    height: var(--fwc-badge-size);
    font-size: var(--fwc-badge-font-size);
    border-radius: var(--fwc-badge-font-size);
    position: absolute;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    overflow: hidden;
    color: #fff;
    z-index: 1;
  }
  :host([size='x-small']:not([icon])) {
    padding: 0 0.15rem;
  }
  :host([size='small']:not([icon])) {
    padding: 0 0.2rem;
  }
  :host([size='medium']:not([icon])) {
    padding: 0 0.35rem;
  }
  :host([size='large']:not([icon])) {
    padding: 0 0.5rem;
  }
  :host([size='x-small']) {
    --fwc-badge-size: 0.75rem;
    --fwc-badge-font-size: 0.375rem;
  }
  :host([size='small']) {
    --fwc-badge-size: 1rem;
    --fwc-badge-font-size: 0.5rem;
  }
  :host([size='medium']) {
    --fwc-badge-size: 1.5rem;
    --fwc-badge-font-size: 0.75rem;
  }
  :host([size='large']) {
    --fwc-badge-size: 2rem;
    --fwc-badge-font-size: 1rem;
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
  :host([color='primary'][clickable]:hover) {
    --fwc-badge-color: ${unsafeCSS(theme.colors.interactive.primary__hover.getVariable('color'))};
  }
  :host([color='secondary']) {
    --fwc-badge-color: ${unsafeCSS(theme.colors.interactive.secondary__resting.getVariable('color'))};
  }
  :host([color='secondary'][clickable]:hover) {
    --fwc-badge-color: ${unsafeCSS(theme.colors.interactive.secondary__link_hover.getVariable('color'))};
  }
  :host([color='success']) {
    --fwc-badge-color: ${unsafeCSS(theme.colors.interactive.success__resting.getVariable('color'))};
  }
  :host([color='success'][clickable]:hover) {
    --fwc-badge-color: ${unsafeCSS(theme.colors.interactive.success__hover.getVariable('color'))};
  }
  :host([color='danger']) {
    --fwc-badge-color: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
  }
  :host([color='danger'][clickable]:hover) {
    --fwc-badge-color: ${unsafeCSS(theme.colors.interactive.danger__hover.getVariable('color'))};
  }
  :host([color='warning']) {
    --fwc-badge-color: ${unsafeCSS(theme.colors.interactive.warning__resting.getVariable('color'))};
  }
  :host([color='warning'][clickable]:hover) {
    --fwc-badge-color: ${unsafeCSS(theme.colors.interactive.warning__hover.getVariable('color'))};
  }
  :host([disabled]) {
    --fwc-badge-color: ${unsafeCSS(theme.colors.interactive.disabled__text.getVariable('color'))} !important;
  }
  :host([clickable]:not([disabled]):hover) {
    cursor: pointer;
  }
`;

export default style;
