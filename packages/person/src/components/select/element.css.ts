import { css, type CSSResult } from 'lit';
import { sddStyles } from '@equinor/fusion-wc-searchable-dropdown';

// TODO - maybe this styling should be changed in parent!
export const styles: CSSResult[] = [
  ...sddStyles,
  css`
    fwc-list {
      --fwc-list-side-padding: 0.5rem;
    }
    fwc-list-item {
      --fwc-list-item-vertical-padding: 0;
    }
    fwc-person-list-item {
      --fwc-person-list-item-background: #ffffff;
    }
    .selected-persons fwc-textinput {
      opacity: 0;
    }
    #selected-persons {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: row;
      flex-gap: 0;
      position: absolute;
      top: 1px;
      left: 0;
      width: 100%;
    }
    #selected-persons li {
      flex: 1 0 auto;
    }
  `,
];
