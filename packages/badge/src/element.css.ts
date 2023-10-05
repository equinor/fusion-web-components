import { css, unsafeCSS, type CSSResult } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

const styleColor: CSSResult = css`
  :host {
    --fwc-badge-background: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
  }
  :host(:not([border])) {
    --fwc-badge-ink-color: ${unsafeCSS(theme.colors.text.static_icons__primary_white.getVariable('color'))};
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
`;

export const styleSize: CSSResult = css`
  :host([size='x-small']) {
    font-size: 0.375rem;
  }
  :host([size='small']) {
    font-size: 1rem;
  }
  :host,
  :host([size='medium']) {
    font-size: 1.5rem;
  }
  :host([size='large']) {
    font-size: 2rem;
  }
`;

export const stylePosition: CSSResult = css`
  :host([position='top-left']) #container {
    offset-distance: 0%;
  }
  :host([position='top-right']) #container {
    offset-distance: 25%;
  }
  :host([position='bottom-left']) #container {
    offset-distance: 75%;
    transform: rotate(180deg);
  }
  :host([position='bottom-right']) #container {
    offset-distance: 50%;
    transform: rotate(-90deg);
  }
  :host([position='top-left'][circular]) #container {
    offset-distance: 87.5%;
    transform: rotate(45deg);
  }
  :host([position='top-right'][circular]) #container {
    offset-distance: 12.5%;
    transform: rotate(-45deg);
  }
  :host([position='bottom-left'][circular]) #container {
    offset-distance: 62.5%;
    transform: rotate(135deg);
  }
  :host([position='bottom-right'][circular]) #container {
    offset-distance: 37.5%;
    transform: rotate(-135deg);
  }
`;

export const style: CSSResult = css`
  :host {
    --fwc-badge-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    --fwc-badge-size: 1.5rem;
    --fwc-badge-font-size: 0.75rem;
    --fwc-badge-icon-size: 0.685rem;
    position: absolute;
    display: contents;
    z-index: 1;
  }

  :host,
  #container {
    border-radius: 50%;
    box-sizing: border-box;
    width: 1em;
    height: 1em;
  }

  #container {
    background-color: var(--fwc-badge-color);
    display: inline-flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    overflow: hidden;
    color: var(--fwc-badge-ink-color);
    offset-path: border-box;
    offset-anchor: center;
  }
  fwc-ripple {
    z-index: 5;
  }

  ::slotted(*) {
    display: inline-flex;
    font-size: 0.7em;
  }

  ::slotted(fwc-icon),
  ::slotted(svg) {
    font-size: 0.45em;
  }

  slot[name='icon'] {
    font-size: 0.5em;
    display: inline-flex;
  }

  slot[name='value'] {
    display: inline-flex;
    font-size: 0.7em;
  }

  :host([clickable]:not([disabled]):hover) {
    cursor: pointer;
  }
`;

export default [styleColor, styleSize, stylePosition, style];
