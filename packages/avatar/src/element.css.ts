import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  :host {
    position: relative;
    display: inline-block;
    --fwc-avatar-font-color: #fff;
    --fwc-avatar-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
  }
  :host .fwc-avatar__container {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    color: var(--fwc-avatar-font-color);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--fwc-avatar-color);
  }
  :host([border]) .fwc-avatar__picture-container {
    width: calc(100% - 0.5rem);
    height: calc(100% - 0.5rem);
  }
  :host(:not([border])) .fwc-avatar__picture-container {
    width: 100%;
    height: 100%;
  }
  :host .fwc-avatar__picture-container {
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  :host .fwc-avatar__picture {
    width: 100%;
    height: 100%;
  }
  :host([disabled]) .fwc-avatar__picture {
    opacity: 0.7;
  }
  :host .fwc-avatar__value {
    display: contents;
    font-family: Equinor;
    font-weight: 400;
  }
  :host .fwc-avatar__ripple {
    z-index: 5;
  }
  :host([size='x-small']) {
    width: 1.25rem;
    height: 1.25rem;
    font-size: 0.625rem;
    line-height: 1.25rem;
  }
  :host([size='small']) {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
    line-height: 2rem;
  }
  :host([size='medium']) {
    width: 3.5rem;
    height: 3.5rem;
    font-size: 2rem;
    line-height: 3.5rem;
  }
  :host([size='large']) {
    width: 5rem;
    height: 5rem;
    font-size: 3rem;
    line-height: 5rem;
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
  :host([clickable]:hover) .fwc-avatar__container {
    cursor: pointer;
  }
`;

export default style;
