import '@equinor/fusion-wc-theme';
import './custom_element'
import { PersonProvider } from './PersonProvider';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewMode: 'docs',
  previewTabs: {
    canvas: { hidden: true },
  },
};

export const decorators = [(Story) => <fwc-theme><PersonProvider>{Story()}</PersonProvider></fwc-theme>];
