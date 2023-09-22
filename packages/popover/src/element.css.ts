import { CSSResult, css } from 'lit';

const style: CSSResult = css`
  :host {
    display: inline-flex;
    user-select: none;
  }
  #popper {
    display: none;
  }
  #popper.show,
  :host(:hover) #popper.hover {
    display: flex;
  }
  #content {
    display: inline-flex;
  }
`;

export default style;
