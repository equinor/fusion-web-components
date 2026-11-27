import { type CSSResult, css } from 'lit';

const style: CSSResult = css`
  :host {
    display: block;
  }
  svg {
    height: 100%;
    width: 100%;
    fill: var(--eds-color-bg-neutral-fill-muted-default);
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
