import { css, unsafeCSS, type CSSResult } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

const style: CSSResult = css`
  .mdc-label {
    ${unsafeCSS(theme.typography.input.label)};
  }
`;

export default style;
