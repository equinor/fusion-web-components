import { css, unsafeCSS, type CSSResult } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const pickerStyle: CSSResult = css`
  #person-picker {
    position: relative;
    background: white;
    width: 100%;
    padding: 2px;
    border: none;
    box-sizing: border-box;
    box-shadow: inset 0px -1px 0px 0px ${unsafeCSS(theme.colors.text.static_icons__tertiary.getVariable('color'))};
    outline: none;

    $.list {
      display: flex;
      flex-direction: column;
      gap: var(--fwc-spacing-medium, 0.5rem);
    }

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
    width: 100%;
    
    .list & {
      position: absolute;
      top: 105%;
      left: 0;
      z-index: 1000;
    }
    
    & > p {
      margin: 0.25rem 0;
      font-size: ${unsafeCSS(theme.typography.paragraph.meta.getVariable('fontSize'))};
      font-style: italic;

      &.error {
        color: ${unsafeCSS(theme.colors.interactive.danger__text.getVariable('color'))};
      }
    }
  }
`;
