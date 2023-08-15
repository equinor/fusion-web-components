import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const personStyle = css`
  :host {
    font-family: ${unsafeCSS(theme.typography.paragraph.body_short.getVariable('fontFamily'))};
    font-size: calc(
      ${unsafeCSS(theme.typography.paragraph.body_short.getVariable('fontSize'))} * var(--content-resize, 1)
    );
    color: ${unsafeCSS(theme.typography.paragraph.body_short.getVariable('color'))};
    line-height: ${unsafeCSS(theme.typography.paragraph.body_short.getVariable('lineHeight'))};
  }
  :host([size='x-small']) {
    --content-resize: 0.6;
  }
  :host([size='small']) {
    --content-resize: 0.8;
  }
  :host([size='medium']) {
    --content-resize: 1;
  }
  :host([size='large']) {
    --content-resize: 1.2;
  }
  a {
    color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
  }
  a:hover {
    color: ${unsafeCSS(theme.colors.interactive.primary__hover.getVariable('color'))};
  }
  .fwc-person-avatar-badge {
    z-index: 10;
    border: 1px solid #fff;
    border-radius: 50%;
  }
  .fwc-person-type__employee {
    --fwc-avatar-base-color: #8c1159;
    --fwc-avatar-ink-color: #fff;
  }
  .fwc-person-type__consultant {
    --fwc-avatar-base-color: #eb0037;
    --fwc-avatar-ink-color: #fff;
  }
  .fwc-person-type__external {
    --fwc-avatar-base-color: #ff92a8;
    --fwc-avatar-ink-color: #fff;
  }
  .fwc-person-type__external-hire {
    --fwc-avatar-base-color: #000;
    --fwc-avatar-ink-color: #fff;
  }
`;

export default personStyle;
