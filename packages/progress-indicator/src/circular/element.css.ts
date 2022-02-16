import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  :host {
    display: inline-flex;
    justify-content: center;
  }

  :host([color='primary']) {
    --fwc-circular-progress-color: ${unsafeCSS(theme.colors.infographic.primary__moss_green_100.getVariable('color'))};
  }

  :host([color='neutral']) {
    --fwc-circular-progress-color: ${unsafeCSS(
      theme.colors.interactive.icon_on_interactive_colors.getVariable('color')
    )};
  }
`;

// TODOO @sstangeland add css host selectors for small medium .... see avatar size
const sizeStyle = css``;

const graphicStyles = css`
  svg {
    height: var(--fwc-circular-progress-size, 1.2em);
    width: var(--fwc-circular-progress-size, 1.2em);
    stroke: var(--fwc-circular-progress-color, currentColor);
  }

  .track {
    filter: opacity(13%);
  }

  .progress {
    transform-origin: center;
    animation: spin 1.3s linear infinite;
  }

  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export default [style, sizeStyle, graphicStyles];
