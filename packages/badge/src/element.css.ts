import { css, type CSSResult } from 'lit';

const styleColor: CSSResult = css`
  :host {
    --fwc-badge-background: var(--eds-color-bg-neutral-canvas);
  }
  :host(:not([border])) {
    --fwc-badge-ink-color: var(--eds-color-text-accent-strong-on-emphasis);
  }
  :host([color='primary']) {
    --fwc-badge-color: var(--eds-color-bg-accent-fill-emphasis-default);
  }
  :host([color='secondary']) {
    --fwc-badge-color: var(--eds-color-bg-neutral-fill-emphasis-default);
  }
  :host([color='success']) {
    --fwc-badge-color: var(--eds-color-bg-success-fill-emphasis-default);
  }
  :host([color='danger']) {
    --fwc-badge-color: var(--eds-color-bg-danger-fill-emphasis-default);
  }
  :host([color='warning']) {
    --fwc-badge-color: var(--eds-color-bg-warning-fill-emphasis-default);
  }
  :host([color='disabled']) {
    --fwc-badge-color: var(--eds-color-bg-disabled);
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
    --fwc-badge-color: var(--eds-color-bg-accent-fill-emphasis-default);
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
