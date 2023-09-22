import { css, unsafeCSS, type CSSResult } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style: CSSResult = css`
  :host {
    --editor-color-text: ${unsafeCSS(theme.colors.text.static_icons__tertiary.getVariable('color'))};
    --editor-border-color: ${unsafeCSS(theme.colors.ui.background__medium.getVariable('color'))};
    --editor-border-color-active: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    --editor-divider-color: ${unsafeCSS(theme.colors.ui.background__medium.getVariable('color'))};
    --editor-button-disabled-color: ${unsafeCSS(theme.colors.interactive.disabled__text.getVariable('color'))};
    --editor-button-hover-color: ${unsafeCSS(theme.colors.interactive.primary__hover.getVariable('color'))};
    --editor-button-hover-background: ${unsafeCSS(theme.colors.interactive.primary__hover_alt.getVariable('color'))};
    --editor-button-active-color: ${unsafeCSS(theme.colors.text.static_icons__default.getVariable('color'))};
    --editor-button-active-background: ${unsafeCSS(
      theme.colors.interactive.primary__selected_highlight.getVariable('color'),
    )};
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
