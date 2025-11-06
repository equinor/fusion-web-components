import { css, unsafeCSS, type CSSResult } from "lit";
import { styles as theme } from '@equinor/fusion-web-theme';

export const pillStyle: CSSResult = css`
  :host {
    display: inline-block;
  }
  
  #person-pill {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 0.5rem;
    height: 30px;
    border-radius: calc(var(--fwc-avatar-size, 3.5rem) * 0.5);
    background-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
    border: 1px solid transparent;

    &:hover, &:focus-within {
      border-color: ${unsafeCSS(theme.colors.interactive.disabled__border.getVariable('color'))};
    }
  }

  #person-pill-name {
    max-width: 140px;
  }
    
  #person-pill-name p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0;
    font-size: 0.75rem;
    
    &:first-child {
      font-weight: ${unsafeCSS(theme.typography.paragraph.body_short_bold.getVariable('fontWeight'))};
    }
  }

  #subtitle-expired {
    color: ${unsafeCSS(theme.colors.interactive.danger__text.getVariable('color'))};
  }

  #person-pill-delete button {
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
