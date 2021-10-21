import { css } from 'lit';

export const style = css`
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
