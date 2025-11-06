import { css, type CSSResult } from "lit";

export const pillContainerStyle: CSSResult = css`
  :host {
    display: block;
  }
  #pills {
    display: flex;
    width: 100%;
    flex-flow: row wrap;
    gap: 0.5rem;
  }
`;
