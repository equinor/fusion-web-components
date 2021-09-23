import { css } from 'lit';

export const style = css`
  :host(:not([disabled])[accountType='Employee']) fwc-avatar {
    --fwc-avatar-color: #771fdd;
    --fwc-avatar-font-color: #fff;
  }
  :host(:not([disabled])[accountType='External hire']) fwc-avatar {
    --fwc-avatar-color: #243746;
    --fwc-avatar-font-color: #fff;
  }
  :host(:not([disabled])[accountType='X-External']) fwc-avatar {
    --fwc-avatar-color: #ff1243;
    --fwc-avatar-font-color: #fff;
  }
  :host(:not([disabled])[accountType='Joint venture/Affiliate']) fwc-avatar {
    --fwc-avatar-color: #ff93ee;
    --fwc-avatar-font-color: #fff;
  }
`;

export default style;
