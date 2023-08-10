import { css } from 'lit';

export const style = css`
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
`;

export default style;
