import { css, unsafeCSS, type CSSResult } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const listStyle: CSSResult = css`
  :host {
    display: block;
  }
  #root {
    position: relative;
    background-color: ${unsafeCSS(theme.colors.ui.background__default.getVariable('color'))};
    border: 1px solid ${unsafeCSS(theme.colors.ui.background__medium.getVariable('color'))};
    border-radius: 2px;
    opacity: 0;
    pointer-events: none;
    filter: drop-shadow(0 3px 3px rgba(55, 55, 55, 0.1));
    overflow: hidden;

    &.active {
      opacity: 1;
      pointer-events: auto;
    }
  }
  #list {
    overflow-y: auto;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  #search-meta {
    /* Render search options as an attached footer bar below the scrollable results. */
    background-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
    border-top: 1px solid ${unsafeCSS(theme.colors.ui.background__medium.getVariable('color'))};
    color: ${unsafeCSS(theme.colors.text.static_icons__tertiary.getVariable('color'))};
    font-size: 0.75em;
    padding: 0.4em 1em;
    line-height: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5em;

    p {
      margin: 0;
    }

    label {
      display: flex;
      align-items: center;
      gap: 0.25em;
      font-size: 0.95em;
    }
  }
`;
