import { css, unsafeCSS, type CSSResult } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const pickerStyle: CSSResult = css`
  #person-picker {
    position: relative;
    background: var(--eds-color-bg-input);
    width: 100%;
    padding: 2px;
    border: none;
    box-sizing: border-box;
    box-shadow: inset 0px -1px 0px 0px var(--eds-color-border-neutral-medium);
    outline: none;

    $.list {
      display: flex;
      flex-direction: column;
      gap: var(--fwc-spacing-medium, 0.5rem);
    }

    &:focus-within {
      box-shadow: none;
      outline: 2px solid var(--eds-color-border-accent-strong);
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
        color: var(--eds-color-text-danger-subtle);
      }
    }
  }
`;
