import '@equinor/fusion-wc-theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [(Story) => <div><fwc-theme></fwc-theme> {Story()}</div>];
