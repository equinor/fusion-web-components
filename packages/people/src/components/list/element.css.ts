import { css, type CSSResult } from 'lit';

export const listStyle: CSSResult = css`
  :host {
    display: block;
  }
  #root {
    position: relative;
    background-color: var(--eds-color-bg-neutral-surface);
    border: 1px solid var(--eds-color-border-neutral-subtle);
    border-radius: 2px;
    opacity: 0;
    pointer-events: none;
    box-shadow: var(--eds-elevation-low);
    overflow: hidden;

    &.active {
      opacity: 1;
      pointer-events: auto;
    }
  }
  #list {
    overflow-y: auto;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  #search-meta {
    /* Render search options as an attached footer bar below the scrollable results. */
    background-color: var(--eds-color-bg-neutral-canvas);
    border-top: 1px solid var(--eds-color-border-neutral-subtle);
    color: var(--eds-color-text-neutral-subtle);
    font-size: 0.75em;
    padding: 0.4em 1em;
    line-height: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5em;

    p {
      margin: 0;
    }

    label {
      display: flex;
      align-items: center;
      gap: 0.25em;
      font-size: 0.95em;
    }
  }
`;
