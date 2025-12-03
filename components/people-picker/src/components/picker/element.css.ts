import { css, unsafeCSS, type CSSResult } from "lit";
import { styles as theme } from '@equinor/fusion-web-theme';

export const pickerStyle: CSSResult = css`
  :host {
    display: block;
  }

  #person-picker {
    display: flex;
    flex-direction: column;
    gap: var(--fwc-spacing-medium, 0.5rem);
    position: relative;
    background: white;
    width: 100%;
    padding: 2px;
    border: none;
    box-sizing: border-box;
    box-shadow: inset 0px -1px 0px 0px ${unsafeCSS(theme.colors.text.static_icons__tertiary.getVariable('color'))};
    outline: none;

    &:focus-within {
      box-shadow: none;
      outline: 2px solid ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    }
  }

  #picker {
    display: flex;
    width: 100%;
    flex-flow: row wrap;
    gap: 0.5rem;
  }
  
  #search-results {
    position: absolute;
    top: 105%;
    left: 0;
    width: 100%;
  }

  #error {
    color: var(--fwc-color-text-static_icons__primary_red, #c41212);
    font-size: var(--fwc-font-size-body_short, 0.875rem);
  }
`;
