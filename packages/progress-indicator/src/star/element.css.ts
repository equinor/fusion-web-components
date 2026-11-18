import { css, unsafeCSS, type CSSResult } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

const style: CSSResult = css`
  :host {
    display: flex;
    justify-content: center;
    color: var(--fwc-star-progress-color, var(--eds-color-bg-danger-fill-emphasis-default));
  }
  svg {
    fill: currentColor;
  }
  .container {
    display: inline-flex;
    flex-flow: column;
    align-items: center;
    gap: var(--fwc-star-progress-spacing, ${unsafeCSS(theme.spacing.comfortable.medium.getVariable('padding'))});
  }
  .title {
    ${unsafeCSS(theme.typography.heading.h2.css)};
    color: var(--eds-color-text-neutral-strong);
    font-size: var(--fwc-star-progress-header-size, ${unsafeCSS(theme.typography.heading.h2.getVariable('fontSize'))});
  }
`;

export default style;
