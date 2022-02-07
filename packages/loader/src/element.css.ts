import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  :host {
    display: flex;
    justify-content: center;
    color: var(--fwc-loader-color, ${unsafeCSS(theme.colors.logo.fill_positive.getVariable('color'))});
  }
  svg {
    fill: currentColor;
  }
  .container {
    display: inline-flex;
    flex-flow: column;
    align-items: center;
    gap: var(--fwc-loader-spacing, ${unsafeCSS(theme.spacing.comfortable.medium.getVariable('padding'))});
  }
  .title {
    ${unsafeCSS(theme.typography.heading.h2.css)};
    font-size: var(--fwc-loader-header-size, ${unsafeCSS(theme.typography.heading.h2.getVariable('fontSize'))});
  }
`;

export default style;
