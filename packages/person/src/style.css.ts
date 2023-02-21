import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const personStyle = css`
  :host {
    font-family: ${unsafeCSS(theme.typography.paragraph.body_long.getVariable('fontFamily'))};
    font-size: calc(
      ${unsafeCSS(theme.typography.paragraph.body_short.getVariable('fontSize'))} * var(--content-resize, 1)
    );
    color: ${unsafeCSS(theme.typography.paragraph.body_short.getVariable('color'))};
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
    --fwc-avatar-base-color: ${unsafeCSS(theme.colors.infographic.substitute__purple_berry.getVariable('color'))};
    --fwc-avatar-ink-color: #fff;
  }
  .fwc-person-type__consultant {
    --fwc-avatar-base-color: ${unsafeCSS(theme.colors.infographic.primary__energy_red_100.getVariable('color'))};
    --fwc-avatar-ink-color: #fff;
  }
  .fwc-person-type__external {
    --fwc-avatar-base-color: ${unsafeCSS(theme.colors.infographic.substitute__pink_salmon.getVariable('color'))};
    --fwc-avatar-ink-color: #fff;
  }
`;

export default personStyle;
