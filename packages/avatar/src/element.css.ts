import { css, unsafeCSS } from 'lit-element';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  :host {
    position: relative;
    display: inline-block;
  }
  :host .circle {
    border-radius: 50%;
    overflow: hidden;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-style: solid;
    background-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
  }
  :host([size='small']) {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
    ${unsafeCSS(theme.typography.heading.h4.css)};
  }
  :host([size='medium']) {
    width: 3.5rem;
    height: 3.5rem;
    font-size: 2rem;
    ${unsafeCSS(theme.typography.heading.h1.css)};
    --border-width: 0.25rem;
  }
  :host([size='large']) {
    width: 5rem;
    height: 5rem;
    font-size: 3rem;
    ${unsafeCSS(theme.typography.heading.h1.css)};
    --border-width: 0.3rem;
  }
  :host([size='small']) .circle {
    border-width: 0.15rem;
  }
  :host([size='medium']) .circle {
    border-width: 0.2rem;
  }
  :host([size='large']) .circle {
    border-width: 0.3rem;
  }
  :host([position='Employee']) .circle {
    border-color: #771fdd;
  }
  :host([position='External hire']) .circle {
    border-color: #243746;
  }
  :host([position='X-External']) .circle {
    border-color: #ff1243;
  }
  :host([position='Joint venture/Affiliate']) .circle {
    border-color: #ff93ee;
  }
  :host([clickable]:hover) .circle {
    cursor: pointer;
    opacity: 0.7;
  }
`;

export default style;
