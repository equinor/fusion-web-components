import { css, unsafeCSS, type CSSResult } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

const style: CSSResult = css`
  :host {
    display: flex;
    --fwc-divider-color: ${unsafeCSS(theme.colors.ui.background__medium.getVariable('color'))};
  }
  :host .divider {
    border: none;
    background-color: var(--fwc-divider-color);
  }
  :host([color='medium']) .divider {
    --fwc-divider-color: ${unsafeCSS(theme.colors.ui.background__medium.getVariable('color'))};
  }
  :host([color='light']) .divider {
    --fwc-divider-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
  }
  :host([color='lighter']) .divider {
    --fwc-divider-color: ${unsafeCSS(theme.colors.ui.background__default.getVariable('color'))};
  }
  :host([orientation='horizontal']) .divider {
    width: 100%;
    height: 1px;
  }
  :host([orientation='vertical']) .divider {
    width: 1px;
    height: auto;
    align-self: stretch;
  }
  :host([variant='full'][orientation='vertical']) .divider {
    margin-top: 0;
    margin-bottom: 0;
  }
  :host([variant='middle'][orientation='horizontal']) .divider {
    margin-left: ${unsafeCSS(theme.spacing.comfortable.medium.getVariable('padding'))};
    margin-right: ${unsafeCSS(theme.spacing.comfortable.medium.getVariable('padding'))};
  }
  :host([variant='middle'][orientation='vertical']) .divider {
    margin-top: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
    margin-bottom: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
  }
  :host([variant='list'][orientation='horizontal']) .divider {
    margin: 0;
    padding: 0;
    flex-shrink: 0;
    height: 1px;
    list-style: none;
  }
  :host([spacing='small'][orientation='horizontal']:not([variant='list'])) .divider {
    margin-top: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
    margin-bottom: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
  }
  :host([spacing='medium'][orientation='horizontal']:not([variant='list'])) .divider {
    margin-top: ${unsafeCSS(theme.spacing.comfortable.medium.getVariable('padding'))};
    margin-bottom: ${unsafeCSS(theme.spacing.comfortable.medium.getVariable('padding'))};
  }
  :host([spacing='large'][orientation='horizontal']:not([variant='list'])) .divider {
    margin-top: ${unsafeCSS(theme.spacing.comfortable.large.getVariable('padding'))};
    margin-bottom: ${unsafeCSS(theme.spacing.comfortable.large.getVariable('padding'))};
  }
  :host([spacing='small'][orientation='vertical']) .divider {
    margin-left: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
    margin-right: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
  }
  :host([spacing='medium'][orientation='vertical']) .divider {
    margin-left: ${unsafeCSS(theme.spacing.comfortable.medium.getVariable('padding'))};
    margin-right: ${unsafeCSS(theme.spacing.comfortable.medium.getVariable('padding'))};
  }
  :host([spacing='large'][orientation='vertical']) .divider {
    margin-left: ${unsafeCSS(theme.spacing.comfortable.large.getVariable('padding'))};
    margin-right: ${unsafeCSS(theme.spacing.comfortable.large.getVariable('padding'))};
  }
`;

export default style;
