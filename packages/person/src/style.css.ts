import { css, unsafeCSS, type CSSResult } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const personStyle: CSSResult = css`
  :host {
    font-family: ${unsafeCSS(theme.typography.paragraph.body_short.getVariable('fontFamily'))};
    font-size: calc(
      ${unsafeCSS(theme.typography.paragraph.body_short.getVariable('fontSize'))} * var(--content-resize, 1)
    );
    color: var(--eds-color-text-neutral-strong);
    line-height: ${unsafeCSS(theme.typography.paragraph.body_short.getVariable('lineHeight'))};
  }
  :host([size='x-small']) {
    --content-resize: 0.6;
  }
  :host([size='small']) {
    --content-resize: 0.8;
  }
  :host([size='medium']) {
    --content-resize: 1;
  }
  :host([size='large']) {
    --content-resize: 1.2;
  }
  a {
    color: var(--eds-color-text-accent-subtle);
  }
  a:hover {
    color: var(--eds-color-bg-accent-fill-emphasis-hover);
  }
  .fwc-person-avatar-badge {
    z-index: 10;
    border: 1px solid var(--eds-color-bg-neutral-surface);
    border-radius: 50%;
  }
  .fwc-person-type__employee {
    --fwc-avatar-color: var(--eds-color-bg-neutral-fill-muted-default);
    --fwc-avatar-ink-color: var(--eds-color-text-neutral-strong);
  }
  .fwc-person-type__consultant {
    --fwc-avatar-color: var(--eds-color-bg-danger-fill-emphasis-default);
    --fwc-avatar-ink-color: var(--eds-color-text-danger-strong-on-emphasis);
  }
  .fwc-person-type__external {
    --fwc-avatar-color: var(--eds-color-bg-danger-fill-muted-default);
    --fwc-avatar-ink-color: var(--eds-color-text-danger-strong);
  }
  .fwc-person-type__external-hire {
    --fwc-avatar-color: var(--eds-color-bg-neutral-fill-emphasis-default);
    --fwc-avatar-ink-color: var(--eds-color-text-neutral-strong-on-emphasis);
  }
`;

export default personStyle;
