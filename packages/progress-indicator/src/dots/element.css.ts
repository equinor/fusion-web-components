import { css, unsafeCSS, type CSSResult } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

const style: CSSResult = css`
  :host {
    display: flex;
    justify-content: center;
  }
  :host([color='primary']) {
    --fwc-dots-progress-color: ${unsafeCSS(theme.colors.infographic.primary__moss_green_100.getVariable('color'))};
  }
  :host([color='tertiary']) {
    --fwc-dots-progress-color: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
  }
  :host([color='neutral']) {
    --fwc-dots-progress-color: ${unsafeCSS(theme.colors.interactive.icon_on_interactive_colors.getVariable('color'))};
  }
`;

const sizeStyle = css`
  :host([size='small']) {
    --fwc-dots-progress-size: 32px;
  }
  :host([size='medium']) {
    --fwc-dots-progress-size: 48px;
  }
  :host([size='large']) {
    --fwc-dots-progress-size: 64px;
  }
`;

const graphicsStyles = css`
  svg {
    fill: var(--fwc-dots-progress-color, currentColor);
    height: var(calc(--fwc-dots-progress-size / 4), calc(1.2em / 4));
    width: var(--fwc-dots-progress-size, 1.2em);
  }

  circle:nth-child(1) {
    animation: opacity 1s ease infinite;
  }
  circle:nth-child(2) {
    animation: opacity 1s ease 0.2s infinite;
  }
  circle:nth-child(3) {
    animation: opacity 1s ease 0.4s infinite;
  }

  @keyframes opacity {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
`;

export default [style, sizeStyle, graphicsStyles];
