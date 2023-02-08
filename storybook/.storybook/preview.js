import '@equinor/fusion-wc-theme';
import './custom_element'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewMode: 'docs',
  previewTabs: {
    canvas: { hidden: true },
  },
};

export const decorators = [(Story) => <fwc-theme>{Story()}</fwc-theme>];
