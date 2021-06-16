import { css, unsafeCSS } from 'lit-element';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  :host {
    --mdc-radio-unchecked-color: ${unsafeCSS(theme.colors.interactive.primary__resting.value.hex)};
    --mdc-radio-disabled-color: ${unsafeCSS(theme.colors.interactive.disabled__fill.value.hex)};
  }
`;
