import { type CSSResult, css } from 'lit';

const style: CSSResult = css`
  :host(:not([disabled])) fwc-avatar.employee-color {
    --fwc-avatar-color: #bebebe;
    --fwc-avatar-border-size: 0;
  }
  :host(:not([disabled])) fwc-avatar.consultant-color {
    --fwc-avatar-color: #eb0037;
  }
  :host(:not([disabled])) fwc-avatar.external-color {
    --fwc-avatar-color: #ff92a8;
  }
  :host(:not([disabled])) fwc-avatar.external-hire-color {
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

  #application-badge {
    color: #ffffff;
    position: absolute;
    right: -0.25em;
    bottom: 0;
    font-size: 0.5em;
    border-radius: 100%;
    padding: 0.1em;
    display: flex;
    justify-content: center;
`;

export default style;
