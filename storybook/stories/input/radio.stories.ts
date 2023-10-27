import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components';
import { setCustomElementsManifest } from '@storybook/web-components';

import { RadioElement, RadioElementProps } from '@equinor/fusion-wc-radio';
import cem from '@equinor/fusion-wc-radio/custom-elements.json';

RadioElement;

setCustomElementsManifest(cem);

type Story = StoryObj<RadioElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-radio',
};

const render = (props: RadioElementProps) => html`
  <fwc-radio ?disabled="${ifDefined(props.disabled)}" ?checked="${ifDefined(props.checked)}" />
`;

export const Default: Story = {
  args: {},
  render,
};

export const Disabled: Story = {
  ...Default,
  render: (props) => render({ ...props, disabled: true }),
};

export const Checked: Story = {
  ...Default,
  render: (props) => render({ ...props, checked: true }),
};

export default meta;
