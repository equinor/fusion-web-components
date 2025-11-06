import { css, unsafeCSS, type CSSResult } from "lit";
import { styles as theme } from '@equinor/fusion-web-theme';

export const searchStyle: CSSResult = css`
  :host {
    display: block;
    width: 225px;
    --search-input-height: 30px;
  }
  #input {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: none;
    outline: none;
    display: flex;
    width: 100%;
    height: var(--search-input-height);
    background: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
    border: 1px solid transparent;
    border-radius: calc(var(--fwc-avatar-size, 3.5rem) * 0.5);

    &:hover, &:focus-within {
      border-color: ${unsafeCSS(theme.colors.interactive.disabled__border.getVariable('color'))};
    }
  }

  input {
    flex: 1;
    font-family: ${unsafeCSS(theme.typography.paragraph.body_short.getVariable('fontFamily'))};
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.025em;
    padding: 0 5px 0 12px;
    background: transparent;
    border: none;
    outline: none;
  }
  
  #clear-button-container {
    position: relative;
    height: var(--search-input-height);
    width: var(--search-input-height);
  }
    
  #clear-button {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: none;
    outline: none;
    color: ${unsafeCSS(theme.colors.text.static_icons__secondary.getVariable('color'))};
    border: none;
    border-radius: 100%;
    line-height: 0;
    font-size: 0.75rem;

    &:hover, &:focus {
      background: ${unsafeCSS(theme.colors.interactive.primary__hover_alt.value.hex)};
    }
  
    &:active {
      background: ${unsafeCSS(theme.colors.interactive.primary__selected_highlight.getVariable('color'))};
    }
  }
`;
