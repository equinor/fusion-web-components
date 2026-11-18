import { css, unsafeCSS, type CSSResult } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

const style: CSSResult = css`
  :host {
    --fwc-list-item-vertical-padding: var(--fwc-list-item-vertical-padding, 0);
    --fwc-list-item-interactive-color: var(--eds-color-bg-accent-fill-emphasis-hover);
    --fwc-list-item-background: var(--eds-color-bg-neutral-surface);
    --fwc-list-item-background-hover: var(--eds-color-bg-accent-fill-emphasis-default);
    --fwc-list-item-ink-color: var(--eds-color-text-neutral-strong);
    --fwc-list-item-secondary-ink-color: var(--eds-color-text-neutral-subtle);
    --fwc-list-item-meta-color: var(--eds-color-text-neutral-subtle);
    --fwc-list-item-font-size: ${unsafeCSS(theme.typography.paragraph.body_short.getVariable('fontSize'))};
    --fwc-list-item-font-weight: ${unsafeCSS(theme.typography.paragraph.body_short.getVariable('fontWeight'))};
    --fwc-list-item-secondary-font-size: ${unsafeCSS(theme.typography.paragraph.caption.getVariable('fontSize'))};
    --mdc-ripple-color: var(--fwc-list-item-interactive-color);
  }
  :host {
    padding-top: var(--fwc-list-item-vertical-padding);
    padding-bottom: var(--fwc-list-item-vertical-padding);
    background-color: var(--fwc-list-item-background);
  }

  :host([twoline]) {
    height: 3rem;
  }

  #content {
    flex: 1;
    color: var(--fwc-list-item-ink-color);
    font-size: var(--fwc-list-item-font-size);
    font-weight: var(--fwc-list-item-font-weight);
    overflow: hidden;
  }
  #primary-text {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    line-height: normal;
    display: block;
  }
  #secondary-text {
    color: var(--fwc-list-item-secondary-ink-color);
    font-size: var(--fwc-list-item-secondary-font-size);
  }
  #meta {
    margin-left: auto;
    color: var(--fwc-list-item-meta-color);
    font-size: 0.875rem;
  }
  #graphic {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--fwc-list-item-graphic-width, auto);
  }
  slot[name='graphic']::slotted(*) {
    font-size: 1rem;
  }

  :host([graphic='icon']) #graphic {
    font-size: 1rem;
    margin-right: 0.625rem;
  }
  :host([graphic='avatar']) #graphic {
    width: 2rem;
    height: 2rem;
    margin-right: 0.625rem;
  }
  :host([graphic='medium']) #graphic {
    width: 2rem;
    height: 2rem;
    margin-right: 0.625rem;
  }
  :host([graphic='large']) #graphic {
    max-width: 5rem;
    height: 100%;
    margin-right: 0.625rem;
  }
`;

export default style;
