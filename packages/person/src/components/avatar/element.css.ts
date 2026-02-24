import { type CSSResult, css } from 'lit';

const style: CSSResult = css`
  :host {
    --fwc-avatar-size: 3.5rem;
  }
  :host([size='x-small']) {
    --fwc-avatar-size: 1.25rem;
  }
  :host([size='small']) {
    --fwc-avatar-size: 1.9rem;
  }
  :host([size='large']) {
    --fwc-avatar-size: 5rem;
  }

  :host {
    display: inline-flex;
  }

  :host([disabled]) {
    opacity: 0.5;
  }

  #root {
    position: relative;
    display: inline-flex;
  }

  #avatar-element-container {
    position: relative;
    width: var(--fwc-avatar-size);
    height: var(--fwc-avatar-size);
    
    img {
      width: 100%;
      height: 100%;
    }
  }

  #floating {
    position: absolute;
    width: max-content;
    top: 0;
    left: 0;
    z-index: 10000;
  }

  #avatar-badge {
    color: #ffffff;
    position: absolute;
    right: -0.25em;
    bottom: 0;
    font-size: calc(var(--fwc-avatar-size) / 5);
    border-radius: 100%;
    padding: 0.1em;
    display: flex;
    justify-content: center;
  }
`;

export default style;
