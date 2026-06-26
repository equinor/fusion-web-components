import { css, type CSSResult } from 'lit';

export const pageStyle: CSSResult = css`
  :root {
    height: 100%;}
  .page {
    display: grid;
    grid-template-areas: 
      'header'
      'main'
      'footer';
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 1fr;
    height: 100%;
  }

  slot[name="header"] {
    grid-area: header;
  }

  main {
    grid-area: main;
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
