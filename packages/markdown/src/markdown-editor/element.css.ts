import { css, type CSSResult } from 'lit';

export const style: CSSResult = css`
  :host {
    --editor-color-text: var(--eds-color-text-neutral-subtle);
    --editor-border-color: var(--eds-color-border-neutral-subtle);
    --editor-border-color-active: var(--eds-color-border-accent-strong);
    --editor-divider-color: var(--eds-color-border-neutral-subtle);
    --editor-button-disabled-color: var(--eds-color-text-disabled);
    --editor-button-hover-color: var(--eds-color-bg-accent-fill-emphasis-hover);
    --editor-button-hover-background: var(--eds-color-bg-accent-fill-muted-hover);
    --editor-button-active-color: var(--eds-color-text-neutral-strong);
    --editor-button-active-background: var(--eds-color-bg-accent-fill-muted-active);
    cursor: auto;
  }
  :host([menuSize='small']) {
    --content-resize: 0.8;
  }
  :host([menuSize='medium']) {
    --content-resize: 1;
  }
  :host([menuSize='large']) {
    --content-resize: 1.2;
  }
  .container {
    height: 100%;
    border: 1px solid var(--editor-border-color);
    border-radius: 4px;
    padding: 8px;
  }
  .focused {
    border: 1px solid var(--editor-border-color-active);
  }
  #editor {
    padding: 0.5rem;
    height: calc(100% - 3rem);
    display: grid;
  }

  #editor p {
    font-size: 16px;
    margin: 0.5rem 0;
  }

  #editor p:last-child {
    margin-bottom: 0;
  }

  #editor p:first-child {
    margin-top: 0;
  }

  .ProseMirror {
    color: var(--editor-color-text);
    padding: 0.5rem;
    white-space: pre-wrap;
    height: 100%;
    overflow: auto;
  }

  .ProseMirror > *:first-child {
    margin-top: 0;
  }

  .ProseMirror-focused {
    outline: none;
  }

  #menu {
    display: flex;
    background: none;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--editor-divider-color);
    color: var(--editor-color-text);
  }

  #menu .button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    margin-right: 5px;
    width: calc(34px * var(--content-resize, 1));
    background: none;
    border: none;
    color: var(--color-contrast);
    cursor: pointer;
    font-family: Equinor, sans-serif;
  }

  #menu .button:hover {
    color: var(--editor-button-hover-color);
    background: var(--editor-button-hover-background);
  }

  #menu .button.disabled {
    color: var(--editor-button-disabled-color);
    cursor: not-allowed;
  }

  #menu .button.active {
    color: var(--editor-button-active-color);
    background: var(--editor-button-active-background);
  }

  #menu .button {
    font-size: calc(18px * var(--content-resize, 1));
    font-weight: 600;
  }

  #menu .button.paragraph {
    font-weight: 600;
  }

  #menu .menu_icon {
    font-size: calc(16px * var(--content-resize, 1));
  }
`;

export default [style];
