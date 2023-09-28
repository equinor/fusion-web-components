import { css, unsafeCSS, type CSSResult } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

const colorStyle: CSSResult = css`
  :host {
    --fwc-avatar-background: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
  }
  :host(:not([border])) {
    --fwc-avatar-ink-color: ${unsafeCSS(theme.colors.text.static_icons__primary_white.getVariable('color'))};
  }
  :host([color='primary']) {
    --fwc-avatar-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
  }
  :host([color='secondary']) {
    --fwc-avatar-color: ${unsafeCSS(theme.colors.interactive.secondary__resting.getVariable('color'))};
  }
  :host([color='success']) {
    --fwc-avatar-color: ${unsafeCSS(theme.colors.interactive.success__resting.getVariable('color'))};
  }
  :host([color='danger']) {
    --fwc-avatar-color: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
  }
  :host([color='warning']) {
    --fwc-avatar-color: ${unsafeCSS(theme.colors.interactive.warning__resting.getVariable('color'))};
  }
  :host([color='disabled']) {
    --fwc-avatar-color: ${unsafeCSS(theme.colors.interactive.disabled__text.getVariable('color'))};
  }
`;

const sizeStyle = css`
  :host {
    --fwc-avatar-size: 3.5rem;
  }
  :host([size='x-small']) {
    --fwc-avatar-size: 1.25rem;
  }
  :host([size='small']) {
    --fwc-avatar-size: 2rem;
  }
  :host([size='medium']) {
    --fwc-avatar-size: 3.5rem;
  }
  :host([size='large']) {
    --fwc-avatar-size: 5rem;
  }
`;

const style: CSSResult = css`
  :host {
    display: contents;
    font-size: calc(var(--fwc-avatar-size) * 0.5);
    color: var(--fwc-avatar-ink-color, var(--fwc-avatar-base-color));
    background-color: var(
      --fwc-avatar-color,
      ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))}
    );
  }

  :host,
  #root,
  #content {
    border-radius: 50%;
    width: var(--fwc-avatar-size);
    height: var(--fwc-avatar-size);
  }

  #root,
  #content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  #root {
    background-color: var(--fwc-avatar-base-color, inherit);
    position: relative;
    box-shadow: var(--fwc-avatar-elevation);
  }

  #content {
    overflow: hidden;
  }

  :host([border]) #content {
    background-color: var(--fwc-avatar-background);
    width: calc(var(--fwc-avatar-size) - calc(var(--fwc-avatar-size) * 0.1));
    height: calc(var(--fwc-avatar-size) - calc(var(--fwc-avatar-size) * 0.1));
  }

  #value {
    font-weight: 400;
  }
  #picture {
    height: 100%;
    width: 100%;
  }
  #badge {
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
  :host([disabled]) #content {
    opacity: 0.5;
  }
  fwc-ripple {
    z-index: 5;
  }

  :host([clickable]:hover) {
    cursor: pointer;
  }

  :host([elevated]) {
    --fwc-avatar-elevation: 2px 3px 5px 0 var(--fwc-avatar-shadow-color, rgba(0, 0, 0, 0.5));
  }
`;

export default [style, colorStyle, sizeStyle];
