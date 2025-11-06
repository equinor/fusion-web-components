import { css, unsafeCSS, type CSSResult } from "lit";
import { styles as theme } from '@equinor/fusion-web-theme';

export const peopleViewerStyle: CSSResult = css`
  #pills {
    display: flex;
    flex-flow: row wrap;
    gap: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
  }
`;
