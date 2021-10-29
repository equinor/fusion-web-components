import { css } from 'lit';

export const style = css`
  :host(:not([disabled])) .fwc-person-avatar__employee {
    --fwc-avatar-base-color: #771fdd;
    --fwc-avatar-ink-color: #fff;
  }
  :host(:not([disabled])) .fwc-person-avatar__external-hire {
    --fwc-avatar-base-color: #243746;
    --fwc-avatar-ink-color: #fff;
  }
  :host(:not([disabled])) .fwc-person-avatar__x-external {
    --fwc-avatar-base-color: #ff1243;
    --fwc-avatar-ink-color: #fff;
  }
  :host(:not([disabled])) .fwc-person-avatar__joint-venture-affiliate {
    --fwc-avatar-base-color: #ff93ee;
    --fwc-avatar-ink-color: #fff;
  }
`;

export default style;
