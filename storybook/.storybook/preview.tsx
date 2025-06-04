import '@equinor/fusion-wc-theme';
import './custom_element';

import { Preview } from '@storybook/web-components-vite';

import { html } from 'lit';

export const preview: Preview = {
  decorators: [(story) => html`<fwc-theme>${story()}</fwc-theme>`]
}


export default preview;
