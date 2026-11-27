import { css, type CSSResult } from 'lit';

export const styleColors: CSSResult = css`
  :host([color='primary'][variant='filled']) {
    --fwc-chip-ink-color: var(--eds-color-text-accent-subtle);
    --fwc-chip-ink-hover-color: var(--eds-color-text-accent-subtle);
    --fwc-chip-fill-color: var(--eds-color-bg-neutral-canvas);
    --fwc-chip-fill-hover-color: var(--eds-color-bg-neutral-fill-muted-default);
  }
  :host([color='primary'][variant='outlined']) {
    --fwc-chip-ink-color: var(--eds-color-text-accent-subtle);
    --fwc-chip-ink-hover-color: var(--eds-color-bg-accent-fill-emphasis-hover);
    --fwc-chip-border-color: var(--eds-color-border-accent-strong);
    --fwc-chip-border-hover-color: var(--eds-color-border-accent-strong);
  }
  :host([color='secondary'][variant='filled']) {
    --fwc-chip-ink-color: var(--eds-color-text-neutral-strong-on-emphasis);
    --fwc-chip-ink-hover-color: var(--eds-color-text-neutral-strong-on-emphasis);
    --fwc-chip-fill-color: var(--eds-color-bg-neutral-fill-emphasis-default);
    --fwc-chip-fill-hover-color: var(--eds-color-bg-neutral-fill-emphasis-hover);
  }
  :host([color='secondary'][variant='outlined']) {
    --fwc-chip-ink-color: var(--eds-color-text-neutral-strong);
    --fwc-chip-ink-hover-color: var(--eds-color-text-neutral-strong);
    --fwc-chip-border-color: var(--eds-color-border-neutral-strong);
    --fwc-chip-border-hover-color: var(--eds-color-border-neutral-strong);
  }
  :host([color='success'][variant='filled']) {
    --fwc-chip-ink-color: var(--eds-color-text-success-strong-on-emphasis);
    --fwc-chip-ink-hover-color: var(--eds-color-text-success-strong-on-emphasis);
    --fwc-chip-fill-color: var(--eds-color-bg-success-fill-emphasis-default);
    --fwc-chip-border-hover-color: var(--eds-color-border-success-strong);
  }
  :host([color='success'][variant='outlined']) {
    --fwc-chip-ink-color: var(--eds-color-text-success-subtle);
    --fwc-chip-ink-hover-color: var(--eds-color-bg-success-fill-emphasis-hover);
    --fwc-chip-border-color: var(--eds-color-border-success-strong);
    --fwc-chip-border-hover-color: var(--eds-color-border-success-strong);
  }
  :host([color='danger'][variant='filled']) {
    --fwc-chip-ink-color: var(--eds-color-text-danger-strong-on-emphasis);
    --fwc-chip-ink-hover-color: var(--eds-color-text-danger-strong-on-emphasis);
    --fwc-chip-fill-color: var(--eds-color-bg-danger-fill-emphasis-default);
    --fwc-chip-fill-hover-color: var(--eds-color-bg-danger-fill-emphasis-hover);
  }
  :host([color='danger'][variant='outlined']) {
    --fwc-chip-ink-color: var(--eds-color-text-danger-subtle);
    --fwc-chip-ink-hover-color: var(--eds-color-bg-danger-fill-emphasis-hover);
    --fwc-chip-border-color: var(--eds-color-border-danger-strong);
    --fwc-chip-border-hover-color: var(--eds-color-border-danger-strong);
  }
  :host([color='warning'][variant='filled']) {
    --fwc-chip-ink-color: var(--eds-color-text-warning-strong-on-emphasis);
    --fwc-chip-ink-hover-color: var(--eds-color-text-warning-strong-on-emphasis);
    --fwc-chip-fill-color: var(--eds-color-bg-warning-fill-emphasis-default);
    --fwc-chip-fill-hover-color: var(--eds-color-bg-warning-fill-emphasis-hover);
  }
  :host([color='warning'][variant='outlined']) {
    --fwc-chip-ink-color: var(--eds-color-text-warning-subtle);
    --fwc-chip-ink-hover-color: var(--eds-color-bg-warning-fill-emphasis-hover);
    --fwc-chip-border-color: var(--eds-color-border-warning-strong);
    --fwc-chip-border-hover-color: var(--eds-color-border-warning-strong);
  }
  :host([disabled][variant='filled']) {
    --fwc-chip-fill-color: var(--eds-color-bg-neutral-canvas) !important;
    --fwc-chip-ink-color: var(--eds-color-text-disabled) !important;
  }
  :host([disabled][variant='outlined']) {
    --fwc-chip-border-color: var(--eds-color-border-disabled) !important;
    --fwc-chip-ink-color: var(--eds-color-text-disabled) !important;
  }
`;

export const styleSizes: CSSResult = css`
  :host([size='small']) {
    --fwc-chip-size: 1.25rem;
    --fwc-chip-font-size: 0.625rem;
  }
  :host([size='medium']) {
    --fwc-chip-size: 1.75rem;
    --fwc-chip-font-size: 0.875rem;
  }
  :host([size='large']) {
    --fwc-chip-size: 2.5rem;
    --fwc-chip-font-size: 1.25rem;
  }
`;

export const style: CSSResult = css`
  :host {
    display: contents;
  }
  :host #root {
    min-width: var(--fwc-chip-size);
    height: var(--fwc-chip-size);
    font-size: var(--fwc-chip-font-size);
    border-radius: var(--fwc-chip-font-size);
    position: relative;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 0 0.5em;
    gap: 0.25em;
  }
  #root,
  #graphic,
  #remove {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  :host([variant='filled']) #root {
    background-color: var(--fwc-chip-fill-color);
    color: var(--fwc-chip-ink-color);
  }
  :host([clickable][variant='filled']:not([disabled]):hover) #root {
    background-color: var(--fwc-chip-fill-hover-color);
    color: var(--fwc-chip-ink-hover-color);
  }
  :host([variant='outlined']) #root {
    border: 1px solid var(--fwc-chip-border-color);
    color: var(--fwc-chip-ink-color);
  }
  :host([clickable][variant='outlined']:not([disabled]):hover) #root {
    border: 1px solid var(--fwc-chip-border-hover-color);
    color: var(--fwc-chip-ink-hover-color);
  }
  :host([clickable]:not([disabled]):hover) #root {
    cursor: pointer;
  }
  fwc-icon,
  ::slotted(wc-icon) {
    font-size: 0.75em;
  }
  #remove {
    cursor: pointer;
  }
  #remove:hover {
    color: var(--fwc-chip-ink-hover-color);
  }
`;

export default [styleColors, styleSizes, style];
