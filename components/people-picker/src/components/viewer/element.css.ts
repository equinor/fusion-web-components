import { css, unsafeCSS, type CSSResult } from "lit";
import { styles as theme } from '@equinor/fusion-web-theme';

export const peopleViewerStyle: CSSResult = css`
  :host {
    display: block;
  }
  #root {
    position: relative;
    padding: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
    border: 1px solid ${unsafeCSS(theme.colors.ui.background__medium.getVariable('color'))};
    border-radius: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
    margin-top: 1.8em;
  }
  #view-mode {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    margin-bottom: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
    position: absolute;
    top: -1.8em;
    right: 0;
  }
  #pills {
    display: flex;
    flex-flow: row wrap;
    gap: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
  }
  table {
    font-size: 0.75rem;
    width: 100%;
    border-collapse: collapse;
  }
  table th {
    font-weight: ${unsafeCSS(theme.typography.paragraph.body_short_bold.getVariable('fontWeight'))};
    padding: calc(${unsafeCSS(theme.spacing.comfortable.x_small.getVariable('padding'))} * 2) ${unsafeCSS(theme.spacing.comfortable.x_small.getVariable('padding'))};
  }
  table th, table td {
    text-align: left;
    border: 1px solid ${unsafeCSS(theme.colors.ui.background__medium.getVariable('color'))};
  }
  table td {
    padding: ${unsafeCSS(theme.spacing.comfortable.x_small.getVariable('padding'))};
  }
  tr th:first-child, tr td:first-child,
  tr th:last-child, tr td:last-child {
    width: 50px;
    text-align: center;
  }
`;
