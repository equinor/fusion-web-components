import { css, type CSSResult } from 'lit';

import { styles as mdcStyle } from '@material/mwc-button/styles.css';

const style: CSSResult = css`
  :host {
    --mdc-button-outline-color: var(--eds-color-border-accent-strong);
    --mdc-button-disabled-fill-color: var(--eds-color-bg-disabled);
    --mdc-button-disabled-ink-color: var(--eds-color-text-disabled);
    --mdc-button-disabled-outline-color: var(--eds-color-border-disabled);
    --mdc-typography-button-text-transform: none;
  }
  :host([variant='contained'][color='primary']) .mdc-button {
    --mdc-theme-primary: var(--eds-color-bg-accent-fill-emphasis-default);
  }
  :host([variant='contained'][color='secondary']) .mdc-button {
    --mdc-theme-primary: var(--eds-color-bg-neutral-fill-emphasis-default);
  }
  :host([variant='contained'][color='danger']) .mdc-button {
    --mdc-theme-primary: var(--eds-color-bg-danger-fill-emphasis-default);
  }
  :host([variant='outlined'][color='primary']) .mdc-button {
    --mdc-button-outline-color: var(--eds-color-border-accent-strong);
  }
  :host([variant='outlined'][color='secondary']) .mdc-button {
    --mdc-button-outline-color: var(--eds-color-border-neutral-strong);
  }
  :host([variant='outlined'][color='danger']) .mdc-button {
    --mdc-button-outline-color: var(--eds-color-border-danger-strong);
    --mdc-theme-primary: var(--eds-color-bg-danger-fill-emphasis-default);
  }
  :host([variant='ghost'][color='primary']) .mdc-button {
    --mdc-button-outline-color: var(--eds-color-border-accent-strong);
  }
  :host([variant='ghost'][color='secondary']) .mdc-button {
    --mdc-button-outline-color: var(--eds-color-border-neutral-strong);
  }
  :host([variant='ghost'][color='danger']) .mdc-button {
    --mdc-button-outline-color: var(--eds-color-border-danger-strong);
    --mdc-theme-primary: var(--eds-color-bg-danger-fill-emphasis-default);
  }
  .leading-icon ::slotted(*),
  .trailing-icon ::slotted(*) {
    display: initial;
  }
  .leading-icon fwc-icon.mdc-button__icon,
  .leading-icon ::slotted(fwc-icon),
  .trailing-icon fwc-icon.mdc-button__icon,
  .trailing-icon ::slotted(fwc-icon) {
    display: inline-flex;
  }
`;

export const styles = [mdcStyle, style];

export default styles;
