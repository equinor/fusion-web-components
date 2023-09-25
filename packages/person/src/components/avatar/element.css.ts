import { type CSSResult, css } from 'lit';

const style: CSSResult = css`
  :host(:not([disabled])) .fwc-person-avatar__employee {
    --fwc-avatar-base-color: #8c1159;
    --fwc-avatar-ink-color: #fff;
  }
  :host(:not([disabled])) .fwc-person-avatar__consultant {
    --fwc-avatar-base-color: #eb0037;
    --fwc-avatar-ink-color: #fff;
  }
  :host(:not([disabled])) .fwc-person-avatar__external {
    --fwc-avatar-base-color: #ff92a8;
    --fwc-avatar-ink-color: #fff;
  }
  :host(:not([disabled])) .fwc-person-avatar__external-hire {
    --fwc-avatar-base-color: #000;
    --fwc-avatar-ink-color: #fff;
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
