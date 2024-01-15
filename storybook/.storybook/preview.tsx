import '@equinor/fusion-wc-theme';
import './custom_element';

import { Preview } from '@storybook/web-components';

import { html } from 'lit';

import { theme } from './manager';

export const preview: Preview = {
  parameters: {
    docs: {
      theme
    },
  },
  decorators: [(story) => html`<fwc-theme>${story()}</fwc-theme>`]
}

export default preview;
