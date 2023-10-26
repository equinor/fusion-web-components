import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components';
import { setCustomElementsManifest } from '@storybook/web-components';

import { SwitchElement, SwitchElementProps } from '@equinor/fusion-wc-switch';
import cem from '@equinor/fusion-wc-switch/custom-elements.json';

SwitchElement;

setCustomElementsManifest(cem);

type Story = StoryObj<SwitchElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-switch',
};

const render = (props: SwitchElementProps) => html`
  <fwc-switch ?selected="${ifDefined(props.selected)}" ?disabled="${ifDefined(props.disabled)}" />
`;

export const Default: Story = {
  args: {},
  render,
};

export const Selected: Story = {
  ...Default,
  render: (props) => html`${render({ ...props, selected: true })} ${render({ ...props, selected: false })}`,
};

export const Disabled: Story = {
  ...Default,
  render: (props) =>
    html`${render({ ...props, selected: true, disabled: true })} ${render({ ...props, disabled: true })}`,
};

export default meta;
