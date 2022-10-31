import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  :host {
    font-family: ${unsafeCSS(theme.typography.paragraph.body_long.getVariable('fontFamily'))};
    font-size: calc(
      ${unsafeCSS(theme.typography.paragraph.body_long.getVariable('fontSize'))} * var(--content-resize, 1)
    );
  }
  :host([size='x-small']) {
    --content-resize: 0.8;
  }
  :host([size='small']) {
    --content-resize: 0.9;
  }
  :host([size='medium']) {
    --content-resize: 1;
  }
  :host([size='large']) {
    --content-resize: 1.2;
  }
  header {
    font-size: calc(${unsafeCSS(theme.typography.heading.h3.getVariable('fontSize'))} * var(--content-resize, 1));
    font-weight: 500;
  }
  a {
    color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
  }
  a:hover {
    color: ${unsafeCSS(theme.colors.interactive.primary__hover.getVariable('color'))};
  }
  .fwc-status-icon__icon {
    border-radius: 50%;
    color: #fff;
    font-size: calc(0.7rem * var(--content-resize, 1));
    background-color: ${unsafeCSS(theme.colors.interactive.disabled__border.getVariable('color'))};
  }
  .fwc-status-icon__success {
    background-color: ${unsafeCSS(theme.colors.interactive.success__resting.getVariable('color'))};
  }
  .fwc-status-icon__warning {
    background-color: ${unsafeCSS(theme.colors.interactive.warning__resting.getVariable('color'))};
  }
  .fwc-status-icon__danger {
    background-color: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
  }
  .fwc-person-badge__employee {
    --fwc-badge-color: ${unsafeCSS(theme.colors.infographic.substitute__purple_berry.getVariable('color'))};
  }
  .fwc-person-badge__consultant {
    --fwc-badge-color: ${unsafeCSS(theme.colors.infographic.primary__energy_red_100.getVariable('color'))};
  }
  .fwc-person-badge__external {
    --fwc-badge-color: ${unsafeCSS(theme.colors.infographic.substitute__pink_salmon.getVariable('color'))};
  }
  .fwc-person-section {
    display: flex;
    column-gap: ${unsafeCSS(theme.spacing.comfortable.medium.getVariable('padding'))};
  }
  .fwc-person-status {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: ${unsafeCSS(theme.spacing.comfortable.medium.getVariable('padding'))};
  }
  .fwc-person-status__heading,
  .fwc-person-status__profession,
  .fwc-person-status__info {
    display: flex;
    flex-direction: column;
    row-gap: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
  }
  .fwc-person-status__row {
    display: flex;
    align-items: center;
    column-gap: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
  }
  .fwc-person-status__badge {
  }
  .fwc-person-status__icon {
    position: relative;
  }
`;

export default style;
