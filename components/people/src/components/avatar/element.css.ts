import { type CSSResult, css } from 'lit';

const style: CSSResult = css`
  :host {
    display: inline-flex;
  }

  #root {
    position: relative;
    display: inline-flex;
  }

  .image-container {
    position: relative;
  }

  #floating {
    position: absolute;
    width: max-content;
    top: 100%;
    left: 0;
    z-index: 2;
  }

  #application-badge {
    color: #ffffff;
    position: absolute;
    right: -0.25em;
    bottom: 0.25em;
    font-size: 0.5em;
    border-radius: 100%;
    padding: 0.1em;
    display: flex;
    justify-content: center;
  }

  #image-container {
    margin-top: 0.2em;
    width: 30px;

    & img {
      width: 100%;
      object-fit: contain;
    }
  }
`;

export default style;
