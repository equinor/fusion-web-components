import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  :host {
    --mdc-list-side-padding: ${unsafeCSS(theme.spacing.comfortable.medium.getVariable('padding'))};
  }
  .fwc-list-item__text {
    flex: 1;
    color: ${unsafeCSS(theme.typography.paragraph.body_short.getVariable('color'))};
    font-size: ${unsafeCSS(theme.typography.paragraph.body_short.getVariable('fontSize'))};
    font-weight: ${unsafeCSS(theme.typography.paragraph.body_short.getVariable('fontWeight'))};
  }
  .fwc-list-item__primary-text {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    line-height: normal;
    display: block;
  }
  .fwc-list-item__secondary-text {
    color: ${unsafeCSS(theme.typography.paragraph.caption.getVariable('color'))};
    font-size: ${unsafeCSS(theme.typography.paragraph.caption.getVariable('fontSize'))};
  }
  .fwc-list-item__meta {
    margin-left: auto;
    color: ${unsafeCSS(theme.typography.paragraph.meta.getVariable('color'))};
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
