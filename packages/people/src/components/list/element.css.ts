import { css, unsafeCSS, type CSSResult } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const listStyle: CSSResult = css`
  :host {
    display: block;
  }
  #root {
    position: relative;
  }
  #list {
    background-color: ${unsafeCSS(theme.colors.ui.background__default.getVariable('color'))};
    border: 1px solid ${unsafeCSS(theme.colors.ui.background__medium.getVariable('color'))};
    border-radius: 2px;
    opacity: 0;
    filter: drop-shadow(0 3px 3px rgba(55, 55, 55, 0.1));
    overflow-y: auto;

    &.active {
      opacity: 1;
    }
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  #search-meta {
    position: absolute;
    bottom: 0.4rem;
    right: 1.1rem;
    background-color: ${unsafeCSS(theme.colors.ui.background__default.getVariable('color'))};
    color: ${unsafeCSS(theme.colors.text.static_icons__tertiary.getVariable('color'))};
    font-size: 0.75em;
    padding: 0.5em 1.5em;
    line-height: 1;
    border-radius: 12px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 0.5em;

    label {
      display: flex;
      align-items: center;
      gap: 0.25em;
    }
  }
`;
