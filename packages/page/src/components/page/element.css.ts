import { css, type CSSResult } from 'lit';

export const pageStyle: CSSResult = css`
  :host {
    display: block;
    height: 100%;
    min-height: 0;
  }

  .page {
    display: grid;
    grid-template-areas: 
      'header'
      'main'
      'footer';
    grid-template-rows: auto minmax(0, 1fr) auto;
    grid-template-columns: 1fr;
    height: 100%;
    min-height: 0;
    overflow: hidden;
  }

  slot[name="header"] {
    grid-area: header;
  }

  main {
    grid-area: main;
    min-height: 0;
    overflow: hidden;
    overflow-y: auto;
  }

  slot[name="main"]::slotted(:first-child) {
    min-height: 100%;
  }

  slot[name="footer"] {
    grid-area: footer;
  }
`;
