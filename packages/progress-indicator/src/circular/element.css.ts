import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  :host {
    display: flex;
    justify-content: center;
    color: var(
      --fwc-circular-progress-color,
      ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))}
    );
  }
  svg {
    fill: currentColor;
  }
  :host([color='primary']) .container {
    --mdc-theme-primary: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
  }
  :host([color='secondary']) .container {
    --mdc-theme-primary: ${unsafeCSS(theme.colors.interactive.secondary__resting.getVariable('color'))};
  }
`;

export default style;
