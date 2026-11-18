import { css, type CSSResult } from 'lit';

export const listStyle: CSSResult = css`
  :host {
    display: block;
  }
  #root {
    position: relative;
  }
  #list {
    background-color: var(--eds-color-bg-neutral-surface);
    border: 1px solid var(--eds-color-border-neutral-subtle);
    border-radius: 2px;
    opacity: 0;
    box-shadow: var(--eds-elevation-low);
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
  #search-meta {
    position: absolute;
    bottom: 0.4rem;
    right: 1.4rem;
    background-color: var(--eds-color-bg-neutral-surface);
    color: var(--eds-color-text-neutral-subtle);
    font-size: 0.75em;
    padding: 0.2em 1em;
    line-height: 1;
    border-radius: 6px;
    box-shadow: var(--eds-elevation-low);
    display: flex;
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
