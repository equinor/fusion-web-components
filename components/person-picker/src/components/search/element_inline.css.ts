import { css, unsafeCSS, type CSSResult } from "lit";
import { styles as theme } from '@equinor/fusion-web-theme';

export const searchStyle: CSSResult = css`
  :host {
    display: inline-block;
  }
  #input {
    background: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
    position: relative;
    height: 30px;
    border: none;
    outline: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid transparent;
    border-radius: calc(var(--fwc-avatar-size, 3.5rem) * 0.5);

    &:hover, &:focus-within {
      border-color: ${unsafeCSS(theme.colors.interactive.disabled__border.getVariable('color'))};
    }
  }

  input {
    font-family: ${unsafeCSS(theme.typography.paragraph.body_short.getVariable('fontFamily'))};
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.025em;
    padding: 5px 12px;
    background: transparent;
    border: none;
    outline: none;
  }
  
  #clear-button {
    --fusion-close-btn-padding: calc(${unsafeCSS(theme.typography.paragraph.body_short.getVariable('fontSize'))} * 0.4);
    background: none;
    outline: none;
    padding: var(--fusion-close-btn-padding);
    margin: var(--fusion-close-btn-margin);
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
