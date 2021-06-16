import { html } from 'lit-element';
import Theme from '@equinor/fusion-wc-theme';
Theme;

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [(Story) => html`<fwc-theme></fwc-theme>${Story()}`];
