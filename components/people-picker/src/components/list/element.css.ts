import { css, unsafeCSS, type CSSResult } from "lit";
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
  #total-count {
    position: absolute;
    bottom: 0.5rem;
    right: 2rem;
    font-size: 0.75em;
    color: ${unsafeCSS(theme.colors.text.static_icons__tertiary.getVariable('color'))};
  }
`;
