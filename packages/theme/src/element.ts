import { html, LitElement, TemplateResult } from 'lit-element';
import { styles as theme } from '@equinor/fusion-web-theme';
export default class ThemeElement extends LitElement {
  protected createRenderRoot(): Element {
    return this;
  }

  render(): TemplateResult {
    return html` <link href="https://eds-static.equinor.com/font/equinor-font.css" rel="stylesheet" />
      <style>
        :root {
          --mdc-ripple-color: #000;
          --mdc-ripple-hover-opacity: 0.1;
          --mdc-theme-background: #fff;
          --mdc-theme-error: ${theme.colors.interactive.danger__text.getVariable('color')};
          --mdc-theme-on-primary: ${theme.colors.text.static_icons__primary_white.getVariable('color')};
          --mdc-theme-on-secondary: ${theme.colors.text.static_icons__primary_white.getVariable('color')};
          --mdc-theme-on-surface: ${theme.colors.text.static_icons__secondary.getVariable('color')};
          --mdc-theme-primary: ${theme.colors.interactive.primary__resting.getVariable('color')};
          --mdc-theme-secondary: ${theme.colors.interactive.primary__resting.getVariable('color')};
          --mdc-theme-surface: ${theme.colors.ui.background__light.getVariable('color')};
          --mdc-typography-font-family: Equinor;
        }
      </style>`;
  }
}
