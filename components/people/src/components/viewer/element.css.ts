import { css, unsafeCSS, type CSSResult } from "lit";
import { styles as theme } from '@equinor/fusion-web-theme';

export const peopleViewerStyle: CSSResult = css`
  :host {
    display: block;
    --fwc-view-mode-position: 30px;
    padding-top: var(--fwc-view-mode-position);
  }
  #root {
    position: relative;
  }
  #view-mode {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
    margin-bottom: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
    position: absolute;
    top: calc(var(--fwc-view-mode-position) * -1);
    right: 0;

    p {
      margin: 0;  
      font-size: ${unsafeCSS(theme.typography.paragraph.meta.getVariable('fontSize'))};
    }
  }
  #pills {
    display: flex;
    flex-flow: row wrap;
    gap: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
  }
  table {
    font-size: 0.75rem;
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border-radius: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  table th {
    font-weight: 600;
    font-size: 0.75rem;
    color: ${unsafeCSS(theme.colors.text.static_icons__secondary.getVariable('color'))};
    background-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
    padding: ${unsafeCSS(theme.spacing.comfortable.medium.getVariable('padding'))} ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
    text-align: left;
    border-bottom: 2px solid ${unsafeCSS(theme.colors.ui.background__medium.getVariable('color'))};
    position: sticky;
    top: 0;
    z-index: 1;
  }

  table td {
    padding: ${unsafeCSS(theme.spacing.comfortable.medium.getVariable('padding'))} ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
    border-bottom: 1px solid ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  table tbody tr {
    transition: background-color 0.15s ease;
  }

  table tbody tr:hover {
    background-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
  }

  table tbody tr:nth-child(even) {
    background-color: rgba(248, 249, 250, 0.5);
  }

  table tbody tr:nth-child(even):hover {
    background-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
  }

  /* Avatar and action columns */
  table tr .avatar, table tr .remove {
    width: 60px;
    text-align: center;
    padding: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
  }

  /* Responsive design */
  @media (max-width: 768px) {
    table th,
    table td {
      padding: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))} ${unsafeCSS(theme.spacing.comfortable.x_small.getVariable('padding'))};
    }

    table tr .avatar, table tr .remove {
      width: 50px;
    }
  }
`;
