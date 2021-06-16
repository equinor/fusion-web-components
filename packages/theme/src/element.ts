import { html, LitElement } from 'lit-element';
import { styles as theme } from '@equinor/fusion-web-theme';

export default class Element extends LitElement {
  protected createRenderRoot(): Element {
    return this;
  }

  render() {
    return html`<style>
      :root
        --mdc-theme-primary: ${theme.colors.interactive.primary__resting.value.hex};
        --mdc-theme-secondary: ${theme.colors.interactive.primary__resting.value.hex};
        --mdc-theme-surface: ${theme.colors.ui.background__light.value.hex};
        --mdc-theme-on-primary: ${theme.colors.text.static_icons__primary_white.value.hex};
        --mdc-theme-on-secondary: ${theme.colors.text.static_icons__primary_white.value.hex};
        --mdc-theme-on-surface: ${theme.colors.text.static_icons__secondary.value.hex};
        --mdc-theme-background: #ffffff;
        --mdc-ripple-color: ${theme.colors.interactive.primary__resting.value.hex};
        --mdc-typography-font-family: Equinor;
      }
    </style>`;
  }
}
