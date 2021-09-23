import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  :host {
    --mdc-list-vertical-padding: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
    --mdc-list-side-padding: ${unsafeCSS(theme.spacing.comfortable.medium.getVariable('padding'))};
  }
`;

export default style;
