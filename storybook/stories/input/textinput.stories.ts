import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components';
import { setCustomElementsManifest } from '@storybook/web-components';

import { TextInputElementProps, TextInputElement } from '@equinor/fusion-wc-textinput';
import cem from '@equinor/fusion-wc-textinput/custom-elements.json';

TextInputElement;

setCustomElementsManifest(cem);

type Story = StoryObj<TextInputElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-textinput',
};

const render = (props: TextInputElementProps) => html`
  <fwc-textinput
    label="${ifDefined(props.label)}"
    value="${ifDefined(props.value)}"
    variant="${ifDefined(props.variant)}"
    ?disabled="${ifDefined(props.disabled)}"
    charCounter="${ifDefined(props.charCounter)}"
    maxLength="${ifDefined(props.maxLength)}"
    helper="${ifDefined(props.helper)}"
    icon="${ifDefined(props.icon)}"
    iconTrailing="${ifDefined(props.iconTrailing)}"
    ?dense="${ifDefined(props.dense)}"
    errorMessage="${ifDefined(props.errorMessage)}"
  />
`;

export const Default: Story = {
  args: {},
  render,
};

export const Label: Story = {
  ...Default,
  render: (props) => render({ ...props, label: 'Label' }),
};

export const InitialValue: Story = {
  ...Default,
  render: (props) => render({ ...props, value: 'Lorem ipsum' }),
};

export const Outlined: Story = {
  ...Default,
  render: (props) => render({ ...props, variant: 'outlined' }),
};

export const Disabled: Story = {
  ...Default,
  render: (props) => render({ ...props, disabled: true }),
};

export const Counter: Story = {
  ...Default,
  render: (props) => render({ ...props, charCounter: true, maxLength: 20 }),
};

export const HelpText: Story = {
  ...Default,
  render: (props) => render({ ...props, helper: 'Lorem' }),
};

export const Icon: Story = {
  ...Default,
  render: (props) => html`${render({ ...props, icon: 'wifi' })} ${render({ ...props, iconTrailing: 'wifi_off' })}`,
};

export const Dense: Story = {
  ...Default,
  render: (props) => render({ ...props, dense: true }),
};

export const Error: Story = {
  ...Default,
  render: (props) => render({ ...props, errorMessage: 'An error occured' }),
};

export default meta;
