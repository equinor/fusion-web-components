import { css, type CSSResult } from 'lit';

export const headerStyle: CSSResult = css`
  header {
    position: relative;
    background-color: #f0f0f0;
    padding: 2ch;
    display: grid;
    grid-template-areas: 
      "breadcrumbs breadcrumbs"
      "title actions"
      "toolbar toolbar";
    grid-template-columns: 66% 1fr;
    align-items: center;
    grid-template-rows: auto auto auto;
  }

  header.collapsed {
    grid-template-areas:
      "title actions"
      "toolbar toolbar";
    grid-template-columns: 66% 1fr;
    grid-template-rows: auto auto;
  }
    
  header.collapsed slot[name="breadcrumbs"] {
    display: none;
  }

  slot[name="breadcrumbs"] {
    grid-area: breadcrumbs;
  }

  slot[name="title"] {
    grid-area: title;
  }

  slot[name="actions"] {
    grid-area: actions;
  }

  slot[name="toolbar"] {
    grid-area: toolbar;
  }
`;
