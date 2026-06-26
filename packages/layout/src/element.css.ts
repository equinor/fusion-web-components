import { css, type CSSResult } from 'lit';

export const layoutStyle: CSSResult = css`
  .layout {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    height: 100%;
  }
  
  .layout.with-sidebar {
    grid-template-columns: min-content 1fr;
  }

  slot[name="content"]::slotted(*) {
    height: 100%;
  }

  slot[name="sidebar"]::slotted(*) {
    height: 100%;
  }
`;
