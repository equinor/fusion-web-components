import { css, unsafeCSS, type CSSResult } from 'lit';
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
    background: var(--eds-color-bg-neutral-canvas);
    border: 1px solid transparent;
    border-radius: calc(var(--fwc-avatar-size, 3.5rem) * 0.5);

    &:hover,
    &:focus-within {
      border-color: var(--eds-color-border-disabled);
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
    color: var(--eds-color-text-neutral-subtle);
    border: none;
    border-radius: 100%;
    line-height: 0;
    font-size: 0.75rem;

    &:hover,
    &:focus {
      background: var(--eds-color-bg-accent-fill-muted-hover);
    }

    &:active {
      background: var(--eds-color-bg-accent-fill-muted-active);
    }
  }
`;
