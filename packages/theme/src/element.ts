import { html, LitElement, TemplateResult } from 'lit-element';
import { styles as theme } from '@equinor/fusion-web-theme';

export default class Element extends LitElement {
  protected createRenderRoot(): Element {
    return this;
  }

  render(): TemplateResult {
    return html` <link href="https://eds-static.equinor.com/font/equinor-font.css" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <style>
        :root {
          --mdc-ripple-color: ${theme.colors.interactive.primary__resting.value.hex};
          --mdc-theme-background: #ffffff;
          --mdc-theme-error: ${theme.colors.interactive.danger__text.value.hex};
          --mdc-theme-on-primary: ${theme.colors.text.static_icons__primary_white.value.hex};
          --mdc-theme-on-secondary: ${theme.colors.text.static_icons__primary_white.value.hex};
          --mdc-theme-on-surface: ${theme.colors.text.static_icons__secondary.value.hex};
          --mdc-theme-primary: ${theme.colors.interactive.primary__resting.value.hex};
          --mdc-theme-secondary: ${theme.colors.interactive.primary__resting.value.hex};
          --mdc-theme-surface: ${theme.colors.ui.background__light.value.hex};
          --mdc-typography-font-family: Equinor;
        }
      </style>`;
  }
}
