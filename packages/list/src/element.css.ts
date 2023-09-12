import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  :host {
    --fwc-list-vertical-padding: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
    --fwc-list-side-padding: ${unsafeCSS(theme.spacing.comfortable.medium.getVariable('padding'))};
    --mdc-list-side-padding: var(--fwc-list-side-padding);
    --fwc-list-inset-margin: calc(4 * ${unsafeCSS(theme.spacing.comfortable.medium.getVariable('padding'))});
    --mdc-list-vertical-padding: var(--fwc-list-vertical-padding);
    --mdc-list-side-padding: var(--fwc-list-side-padding);
    --mdc-list-inset-margin: var(--fwc-list-inset-margin);
  }
`;

export default style;
