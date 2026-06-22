import { css, unsafeCSS, type CSSResult } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const layoutStyle: CSSResult = css`
  .layout {
    display: grid;
    grid-template-columns: 1fr;
    height: 100%;
  }
  
  .layout.with-sidebar {
    grid-template-columns: min-content 1fr;
  }
  
  .content {
    border: 1px solid ${unsafeCSS(theme.colors.ui.background__warning.getVariable('color'))};
  }
  slot[name="content"] {
    display: block;
    height: 100%;
  }
  slot[name="content"]::slotted(*) {
    height: 100%;
  }

  .sidebar {
    border: 1px solid ${unsafeCSS(theme.colors.ui.background__info.getVariable('color'))};
  }
  slot[name="sidebar"] {
    display: block;
    height: 100%;
  }
  slot[name="sidebar"]::slotted(*) {
    height: 100%;
  }
`;
