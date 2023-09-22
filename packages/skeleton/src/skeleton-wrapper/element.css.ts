import { css, unsafeCSS, type CSSResult } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

const style: CSSResult = css`
  :host {
    --fwc-skeleton-wrapper-spacing: ${unsafeCSS(theme.spacing.comfortable.medium.getVariable('padding'))};
    display: flex;
    gap: var(--fwc-skeleton-wrapper-spacing);
  }
  :host([direction='horizontal']) {
    flex-direction: row;
  }
  :host([direction='vertical']) {
    flex-direction: column;
  }
  :host([spacing='small']) {
    --fwc-skeleton-wrapper-spacing: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
  }
  :host([spacing='medium']) {
    --fwc-skeleton-wrapper-spacing: ${unsafeCSS(theme.spacing.comfortable.medium.getVariable('padding'))};
  }
  :host([spacing='large']) {
    --fwc-skeleton-wrapper-spacing: ${unsafeCSS(theme.spacing.comfortable.large.getVariable('padding'))};
  }
`;

export default style;
