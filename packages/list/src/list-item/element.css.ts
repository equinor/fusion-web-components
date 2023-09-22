import { css, unsafeCSS, type CSSResult } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

const style: CSSResult = css`
  :host {
    --fwc-list-item-vertical-padding: var(--fwc-list-item-vertical-padding, 0);
    --fwc-list-item-interactive-color: ${unsafeCSS(theme.colors.interactive.primary__hover.getVariable('color'))};
    --fwc-list-item-background: ${unsafeCSS(theme.colors.ui.background__default.getVariable('color'))};
    --fwc-list-item-background-hover: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    --fwc-list-item-ink-color: ${unsafeCSS(theme.typography.paragraph.body_short.getVariable('color'))};
    --fwc-list-item-secondary-ink-color: ${unsafeCSS(theme.typography.paragraph.caption.getVariable('color'))};
    --fwc-list-item-meta-color: ${unsafeCSS(theme.typography.paragraph.meta.getVariable('color'))};
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
  .fwc-list-item__text {
    flex: 1;
    color: var(--fwc-list-item-ink-color);
    font-size: var(--fwc-list-item-font-size);
    font-weight: var(--fwc-list-item-font-weight);
    overflow: hidden;
  }
  .fwc-list-item__primary-text {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    line-height: normal;
    display: block;
  }
  .fwc-list-item__secondary-text {
    color: var(--fwc-list-item-secondary-ink-color);
    font-size: var(--fwc-list-item-secondary-font-size);
  }
  .fwc-list-item__meta {
    margin-left: auto;
    color: var(--fwc-list-item-meta-color);
    font-size: 0.875rem;
  }
  .fwc-list-item__graphic {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  :host([graphic='icon']) .fwc-list-item__graphic {
    font-size: 1rem;
    margin-right: 0.625rem;
  }
  :host([graphic='avatar']) .fwc-list-item__graphic {
    width: 2rem;
    height: 2rem;
    margin-right: 0.625rem;
  }
  :host([graphic='medium']) .fwc-list-item__graphic {
    width: 2rem;
    height: 2rem;
    margin-right: 0.625rem;
  }
  :host([graphic='large']) .fwc-list-item__graphic {
    max-width: 5rem;
    height: 100%;
    margin-right: 0.625rem;
  }
`;

export default style;
