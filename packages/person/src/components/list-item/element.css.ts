import { css, unsafeCSS, type CSSResult } from 'lit';
import { tokens } from '@equinor/eds-tokens';

const style: CSSResult = css`
  :host {
    --fwc-avatar-size: 2.5rem;
    --fwc-person-list-item-background: initial;
  }
  :host([size='small']) {
    --fwc-avatar-size: 2rem;
  }
  :host([size='large']) {
    --fwc-avatar-size: 3.5rem;
  }
  .person-list__item {
    display: flex;
    justify-content: space-between;
    column-gap: ${unsafeCSS(tokens.spacings.comfortable.medium)};
    background-color: var(--fwc-person-list-item-background);
    padding: calc(${unsafeCSS(tokens.spacings.comfortable.medium_small)} * var(--content-resize, 1))
      calc(${unsafeCSS(tokens.spacings.comfortable.medium)} * var(--content-resize, 1));
    transition: box-shadow 0.2s ease;
    -webkit-transition: box-shadow 0.2s ease;
  }
  .person-list__item-outline {
    border: 1px solid;
    border-color: ${unsafeCSS(tokens.colors.ui.background__medium.hex)};
    border-radius: ${unsafeCSS(tokens.spacings.comfortable.small)};
  }
  .person-list__item.person-list__item-clickable:hover {
    box-shadow: ${unsafeCSS(tokens.elevation.raised)};
    background-color: ${unsafeCSS(tokens.colors.ui.background__light)};
  }
  .person-list__item-clickable {
    cursor: pointer;
  }
  .person-list__about {
    display: flex;
    align-items: center;
    column-gap: ${unsafeCSS(tokens.spacings.comfortable.medium)};
  }
  .person-list__content {
    display: flex;
    flex-direction: column;
  }
  .person-list__heading {
    font-size: calc(${unsafeCSS(tokens.typography.heading.h6.fontSize)} * var(--content-resize, 1));
    line-height: calc(${unsafeCSS(tokens.typography.heading.h6.lineHeight)} * var(--content-resize, 0.8));
  }
  .person-list__sub-heading {
    font-size: calc(${unsafeCSS(tokens.typography.paragraph.caption.fontSize)} * var(--content-resize, 1));
  }
  .person-list__toolbar {
    display: flex;
    align-items: center;
    gap: ${unsafeCSS(tokens.spacings.comfortable.x_small)};
  }
  .fwc-person-avatar-badge {
    --fwc-badge-size: calc(0.58rem * var(--content-resize, 1));
  }
`;

export default style;
