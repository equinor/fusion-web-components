import { css, unsafeCSS } from 'lit-element';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  :host {
    --mdc-button-outline-color: ${unsafeCSS(theme.colors.interactive.primary__resting.value.hex)};
    --mdc-button-disabled-fill-color: ${unsafeCSS(theme.colors.interactive.disabled__fill.value.hex)};
    --mdc-button-disabled-ink-color: ${unsafeCSS(theme.colors.interactive.disabled__text.value.hex)};
    --mdc-button-disabled-outline-color: ${unsafeCSS(theme.colors.interactive.disabled__border.value.hex)};
  }
`;

export default style;
