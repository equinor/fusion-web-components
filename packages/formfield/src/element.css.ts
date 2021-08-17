import { css, unsafeCSS } from 'lit-element';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  .mdc-label {
    ${unsafeCSS(theme.typography.input.label)};
  }
`;

export default style;
