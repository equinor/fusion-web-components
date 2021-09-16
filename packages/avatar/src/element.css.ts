import { css, unsafeCSS } from 'lit-element';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  :host {
    position: relative;
    display: inline-block;
    --fwc-avatar-color: #fff;
    --fwc-avatar-background-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
  }
  :host .circle {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    color: var(--fwc-avatar-color);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--fwc-avatar-background-color);
    font-family: Equinor;
    font-weight: 400;
  }
  :host .picture {
    width: 100%;
    height: 100%;
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
  :host([size='small'][src]) .circle {
    border-style: solid;
    border-width: 0.2rem;
    width: calc(100% - 0.4rem);
    height: calc(100% - 0.4rem);
  }
  :host([size='medium'][src]) .circle {
    border-style: solid;
    border-width: 0.25rem;
    width: calc(100% - 0.5rem);
    height: calc(100% - 0.5rem);
  }
  :host([size='large'][src]) .circle {
    border-style: solid;
    border-width: 0.3rem;
    width: calc(100% - 0.6rem);
    height: calc(100% - 0.6rem);
  }
  :host([clickable]:hover) .circle {
    cursor: pointer;
    opacity: 0.7;
  }
`;

export default style;
