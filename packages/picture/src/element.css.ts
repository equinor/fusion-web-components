import { css } from 'lit-element';

export const style = css`
  :host {
    display: block;
  }
  svg {
    height: 100%;
    width: 100%;
    fill: rgba(0, 0, 0, 0.25);
  }
  picture,
  img {
    display: block;
  }
  picture {
    background-repeat: no-repeat;
    height: 100%;
  }
  img {
    visibility: hidden;
    height: 100%;
    width: 100%;
  }
`;

export default style;
