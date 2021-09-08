import '@equinor/fusion-wc-theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [(Story) => <fwc-theme>{Story()}</fwc-theme>];
