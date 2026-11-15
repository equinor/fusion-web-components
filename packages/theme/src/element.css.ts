import { css, unsafeCSS, type CSSResult } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

const style: CSSResult = css`
  :host {
    color: var(--eds-color-text-neutral-strong);
  }

  ::slotted(*) {
    --fwc-ripple-color: var(--eds-color-text-neutral-strong);
    --fwc-ripple-hover-opacity: 0.1;
    --fwc-theme-background: var(--eds-color-bg-neutral-surface);
    --fwc-theme-primary: var(--eds-color-bg-accent-fill-emphasis-default);
    --fwc-theme-error: var(--eds-color-text-danger-subtle);
    --fwc-theme-on-primary: var(--eds-color-text-accent-strong-on-emphasis);
    --fwc-theme-on-secondary: var(--eds-color-text-accent-strong-on-emphasis);
    --fwc-theme-on-surface: var(--eds-color-text-neutral-subtle);
    --fwc-theme-secondary: var(--eds-color-bg-accent-fill-emphasis-default);
    --fwc-theme-surface: var(--eds-color-bg-neutral-canvas);
    --fwc-typography-font-family: ${unsafeCSS(theme.typography.paragraph.body_long.getVariable('fontFamily'))},
      sans-serif;

    --mdc-ripple-color: var(--fwc-ripple-color);
    --mdc-ripple-hover-opacity: var(--fwc-ripple-hover-opacity);
    --mdc-theme-background: var(--fwc-theme-background);
    --mdc-theme-primary: var(--fwc-theme-primary);
    --mdc-theme-error: var(--fwc-theme-error);
    --mdc-theme-on-primary: var(--fwc-theme-on-primary);
    --mdc-theme-on-secondary: var(--fwc-theme-on-secondary);
    --mdc-theme-on-surface: var(--fwc-theme-on-surface);
    --mdc-theme-secondary: var(--fwc-theme-secondary);
    --mdc-theme-surface: var(--fwc-theme-surface);
    --mdc-typography-font-family: var(--fwc-typography-font-family);
    font-family: var(--fwc-typography-font-family);
  }
`;

export default style;
