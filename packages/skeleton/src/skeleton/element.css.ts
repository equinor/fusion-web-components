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
    border-radius: 0.25rem;
  }
  :host([variant='rectangle'][size='x-small']) {
    width: 3rem;
    height: 1.25rem;
    font-size: 0.625rem;
    line-height: 1.25rem;
  }
  :host([variant='rectangle'][size='small']) {
    width: 5rem;
    height: 2.5rem;
    font-size: 1.25rem;
    line-height: 2.5rem;
  }
  :host([variant='rectangle'][size='medium']) {
    width: 10rem;
    height: 5rem;
    font-size: 3rem;
    line-height: 5rem;
  }
  :host([variant='rectangle'][size='large']) {
    width: 15rem;
    height: 7.5rem;
    font-size: 5rem;
    line-height: 7.5rem;
  }
  :host([variant='square']) {
    border-radius: 0.25rem;
  }
  :host([variant='square'][size='x-small']) {
    width: 1.25rem;
    height: 1.25rem;
    font-size: 0.625rem;
    line-height: 1.25rem;
  }
  :host([variant='square'][size='small']) {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.25rem;
    line-height: 2.5rem;
  }
  :host([variant='square'][size='medium']) {
    width: 5rem;
    height: 5rem;
    font-size: 3rem;
    line-height: 5rem;
  }
  :host([variant='square'][size='large']) {
    width: 7.5rem;
    height: 7.5rem;
    font-size: 5rem;
    line-height: 7.5rem;
  }
  :host([variant='text']) {
    border-radius: 0.25rem;
  }
  :host([variant='text'][size='x-small']) {
    width: 5rem;
    height: 1em;
    font-size: 0.875rem;
    line-height: 1em;
  }
  :host([variant='text'][size='small']) {
    width: 10rem;
    height: 1em;
    font-size: 0.875rem;
    line-height: 1em;
  }
  :host([variant='text'][size='medium']) {
    width: 20rem;
    height: 1em;
    font-size: 0.875rem;
    line-height: 1em;
  }
  :host([variant='text'][size='large']) {
    width: 30rem;
    height: 1em;
    font-size: 0.875rem;
    line-height: 1em;
  }
  :host([fullWidth]) {
    width: 100%;
  }
  :host([fullWidth][variant='circle']) {
    height: 100%;
  }
  :host([variant='circle']) {
    border-radius: 50%;
  }
  :host([variant='circle'][size='x-small']) {
    width: 1.25rem;
    height: 1.25rem;
    font-size: 0.625rem;
    line-height: 1.25rem;
  }
  :host([variant='circle'][size='small']) {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
    line-height: 2rem;
  }
  :host([variant='circle'][size='medium']) {
    width: 3.5rem;
    height: 3.5rem;
    font-size: 2rem;
    line-height: 3.5rem;
  }
  :host([variant='circle'][size='large']) {
    width: 5rem;
    height: 5rem;
    font-size: 3rem;
    line-height: 5rem;
  }
  :host(:not([inactive])):after {
    background-image: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.05), transparent);
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
    color: var(--fwc-skeleton-font-color);
    font-size: 0.875em;
  }
  :host([variant='text']) .fwc-skeleton__icon {
    justify-content: left;
  }
  :host(:not([variant='text'])) .fwc-skeleton__icon {
    justify-content: center;
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
