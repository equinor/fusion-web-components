import { css, unsafeCSS } from 'lit-element';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  :host {
    position: relative;
    display: inline-block;
  }
  :host .circle {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    font-family: Equinor;
    font-weight: 400;
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
  :host([size='small'][position][src]) .circle {
    border-style: solid;
    border-width: 0.2rem;
    width: calc(100% - 0.4rem);
    height: calc(100% - 0.4rem);
  }
  :host([size='medium'][position][src]) .circle {
    border-style: solid;
    border-width: 0.25rem;
    width: calc(100% - 0.5rem);
    height: calc(100% - 0.5rem);
  }
  :host([size='large'][position][src]) .circle {
    border-style: solid;
    border-width: 0.3rem;
    width: calc(100% - 0.6rem);
    height: calc(100% - 0.6rem);
  }
  :host([position='Employee']) .circle {
    background-color: #771fdd;
    border-color: #771fdd;
  }
  :host([position='External hire']) .circle {
    background-color: #243746;
    border-color: #243746;
  }
  :host([position='X-External']) .circle {
    background-color: #ff1243;
    border-color: #ff1243;
  }
  :host([position='Joint venture/Affiliate']) .circle {
    background-color: #ff93ee;
    border-color: #ff93ee;
  }
  :host([clickable]:hover) .circle {
    cursor: pointer;
    opacity: 0.7;
  }
`;

export default style;
