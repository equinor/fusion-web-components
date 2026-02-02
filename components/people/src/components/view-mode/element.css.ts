import { css, unsafeCSS, type CSSResult } from "lit";
import { styles as theme } from '@equinor/fusion-web-theme';

export const tableViewStyles: CSSResult = css`
  :host {
    display: block;
    --fwc-view-mode-position: 30px;
  }
  #view-mode {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
    margin-bottom: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};

    p {
      margin: 0;  
      font-size: ${unsafeCSS(theme.typography.paragraph.meta.getVariable('fontSize'))};
    }
  }
  #view-settings {
    position: absolute;
    top: var(--fwc-view-mode-position);
    right: 0;
    background: ${unsafeCSS(theme.colors.ui.background__default.getVariable('color'))};
    border: 1px solid ${unsafeCSS(theme.colors.ui.background__medium.getVariable('color'))};
    padding: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
    border-radius: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 10;
    display: none;

    &.open {
      display: block;
    }
  }
  .view-settings-options > label {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.25rem;
    margin: 0.5rem 0;

    input {
      margin: 0;
    }
    p {
      margin: 0;
    }
  }
`;
