import { html } from 'lit-element';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [(Story) => html`<fwc-theme></fwc-theme>${Story()}`];
