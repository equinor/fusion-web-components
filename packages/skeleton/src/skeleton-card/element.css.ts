import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  :host {
    display: block;
    position: relative;
    overflow: hidden;
    --fwc-skeleton-color: ${unsafeCSS(theme.colors.interactive.disabled__fill.getVariable('color'))};
    --fwc-skeleton-font-color: ${unsafeCSS(theme.colors.interactive.disabled__text.getVariable('color'))};
    background-color: var(--fwc-skeleton-color);
  }
  :host([variant='rectangle']) {
    min-height: 1rem;
    border-radius: 0.25rem;
  }
  :host([variant='circle']) {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  :host([animation]):after {
    background-image: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.04), transparent);
    animation: 1.6s linear 0.5s infinite normal none running fwc-skeleton__animation-shine;
    content: '';
    position: absolute;
    transform: translateX(-100%);
    inset: 0px;
  }
  .fwc-skeleton__icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--fwc-skeleton-font-color);
    font-size: 0.875em;
  }
  @keyframes fwc-skeleton__animation-shine {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

export default style;
