import { type CSSResult, css } from 'lit';

const style: CSSResult = css`
  :host(:not([disabled])) fwc-avatar.employee {
    --fwc-avatar-color: #8c1159;
  }
  :host(:not([disabled])) fwc-avatar.consultant {
    --fwc-avatar-color: #eb0037;
  }
  :host(:not([disabled])) fwc-avatar.external {
    --fwc-avatar-color: #ff92a8;
  }
  :host(:not([disabled])) fwc-avatar.external-hire {
    --fwc-avatar-color: #000;
  }

  :host {
    display: inline-flex;
  }

  #root {
    position: relative;
    display: inline-flex;
  }

  #floating {
    position: absolute;
    width: max-content;
    top: 0;
    left: 0;
    z-index: 2;
  }
`;

export default style;
