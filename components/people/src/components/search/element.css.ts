import { css, unsafeCSS, type CSSResult } from "lit";
import { styles as theme } from '@equinor/fusion-web-theme';

export const searchStyle: CSSResult = css`
  :host {
    display: block;
  }
  #input {
    background: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
    position: relative;
    height: 36px;
    width: 100%;
    border: none;
    box-sizing: border-box;
    box-shadow: inset 0px -1px 0px 0px ${unsafeCSS(theme.colors.text.static_icons__tertiary.getVariable('color'))};
    outline: none;
    display: flex;
    flex-direction: row;
    align-items: center;

    &:focus-within {
      box-shadow: none;
      outline: 2px solid ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    }
  }

  input {
    width: 100%;
    font-family: ${unsafeCSS(theme.typography.paragraph.body_short.getVariable('fontFamily'))};
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.025em;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 6px 8px;
    background: transparent;
    border: none;
    outline: none;
  }
  
  button {
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 1rem;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 5px;
    color: ${unsafeCSS(theme.colors.text.static_icons__tertiary.getVariable('color'))};
    
    &:hover, &:focus {
      background: ${unsafeCSS(theme.colors.interactive.focus.getVariable('color'))};
      color: ${unsafeCSS(theme.colors.text.static_icons__primary_white.getVariable('color'))};
    }
  }
`;
