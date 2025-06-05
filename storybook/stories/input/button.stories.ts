import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { setCustomElementsManifest } from '@storybook/web-components-vite';
import { ButtonElementProps, ButtonElement, ButtonColor } from '@equinor/fusion-wc-button';
import cem from '@equinor/fusion-wc-button/custom-elements.json';

console.log(cem);

ButtonElement;

setCustomElementsManifest(cem);

type Story = StoryObj<ButtonElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-button',
};

const btnColor: Array<ButtonColor> = ['primary', 'secondary', 'danger'];

const render = (props: ButtonElementProps) => html`
  <fwc-button
    color="${ifDefined(props.color)}"
    ?dense="${ifDefined(props.dense)}"
    ?disabled="${ifDefined(props.disabled)}"
    ?expandContent="${ifDefined(props.expandContent)}"
    ?fullwidth="${ifDefined(props.fullwidth)}"
    icon="${ifDefined(props.icon)}"
    label="${ifDefined(props.label)}"
    ?trailingIcon="${ifDefined(props.trailingIcon)}"
    variant="${ifDefined(props.variant)}"
  ></fwc-button>
`;

const renderAllColors = (props: ButtonElementProps) =>
  html`${btnColor.map((color) => render({ ...props, color }))} ${render({ ...props, disabled: true })}`;

export const Default: Story = {
  args: {
    label: 'button',
    icon: 'notifications',
  },
  render,
};

export const Standard: Story = {
  ...Default,
  render: (props) => renderAllColors(props),
};

export const Dense: Story = {
  ...Default,
  render: (props) => renderAllColors({ ...props, dense: true }),
};

export const Outlined: Story = {
  ...Default,
  render: (props) => renderAllColors({ ...props, variant: 'outlined' }),
};

export const Ghost: Story = {
  ...Default,
  render: (props) => renderAllColors({ ...props, variant: 'ghost' }),
};
export const Trailing: Story = {
  ...Default,
  render: (props) => render({ ...props, trailingIcon: true }),
};
export const Fullwidth: Story = {
  ...Default,
  render: (props) => render({ ...props, fullwidth: true }),
};
export const expandContent: Story = {
  ...Default,
  render: (props) => render({ ...props, fullwidth: true, expandContent: true, trailingIcon: true }),
};

export default meta;
