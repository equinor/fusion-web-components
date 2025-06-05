import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { setCustomElementsManifest } from '@storybook/web-components-vite';

import { TextAreaElement, TextAreaElementProps } from '@equinor/fusion-wc-textarea';
import cem from '@equinor/fusion-wc-textarea/custom-elements.json';

TextAreaElement;

setCustomElementsManifest(cem);

type Story = StoryObj<TextAreaElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-textarea',
};

const render = (props: TextAreaElementProps) => html`
  <fwc-textarea
    cols="${ifDefined(props.cols)}"
    rows="${ifDefined(props.rows)}"
    value="${ifDefined(props.value)}"
    label="${ifDefined(props.label)}"
    placeholder="${ifDefined(props.placeholder)}"
    ?disabled="${ifDefined(props.disabled)}"
    ?charCounter="${ifDefined(props.charCounter)}"
    maxLength="${ifDefined(props.maxLength)}"
    errorMessage="${ifDefined(props.errorMessage)}"
  ></fwc-textarea>
`;

export const Default: Story = {
  args: {},
  render,
};

export const Cols: Story = {
  ...Default,
  render: (props) => render({ ...props, cols: 50 }),
};

export const Rows: Story = {
  ...Default,
  render: (props) => render({ ...props, rows: 10 }),
};

export const InitialValue: Story = {
  ...Default,
  render: (props) => render({ ...props, value: 'Lorem ipsum dolor sit amet' }),
};

export const Label: Story = {
  ...Default,
  render: (props) => render({ ...props, label: 'FooBar' }),
};

export const Placeholder: Story = {
  ...Default,
  render: (props) => render({ ...props, placeholder: 'Fill in text' }),
};

export const Disabled: Story = {
  ...Default,
  render: (props) => render({ ...props, disabled: true }),
};

export const Counter: Story = {
  ...Default,
  render: (props) => render({ ...props, charCounter: true, maxLength: 15 }),
};

export const Error: Story = {
  ...Default,
  render: (props) => render({ ...props, errorMessage: 'An error occured' }),
};

export default meta;
