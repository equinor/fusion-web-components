import { css, type CSSResult } from 'lit';

export const layoutStyle: CSSResult = css`
  :host {
    display: block;
    height: calc(100vh - var(--header-height, 48px));
  }

  .layout {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 1fr);
    height: 100%;
    max-height: 100vh;
    min-height: 0;
    overflow: hidden;
  }
  
  .layout.with-sidebar {
    grid-template-columns: min-content 1fr;
  }

  .content,
  .sidebar {
    height: 100%;
    min-height: 0;
    min-width: 0;
    overflow: hidden;
  }

  slot[name="content"],
  slot[name="sidebar"] {
    display: block;
    height: 100%;
    min-height: 0;
  }

  slot[name="content"]::slotted(*) {
    height: 100%;
    min-height: 0;
  }

  slot[name="sidebar"]::slotted(*) {
    height: 100%;
    min-height: 0;
  }
`;
