import { CSSResult, css } from 'lit';

export const style: CSSResult = css`
  :host {
    display: inline-flex;
    height: 1.5em;
    width: 1.5em;
  }
  ::slotted(svg),
  svg {
    height: 100%;
    width: auto;
    fill: currentColor;
  }
`;

export default style;
