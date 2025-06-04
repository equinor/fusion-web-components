import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { setCustomElementsManifest } from '@storybook/web-components-vite';

import { SelectElement, SelectElementProps } from '@equinor/fusion-wc-select';
import { ListItemElement } from '@equinor/fusion-wc-list';
import cem from '@equinor/fusion-wc-select/custom-elements.json';

SelectElement;
ListItemElement;

setCustomElementsManifest(cem);

type Story = StoryObj<SelectElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-select',
};

const render = (props: SelectElementProps) => html`
  <fwc-select ?disabled="${ifDefined(props.disabled)}" ?outlined="${ifDefined(props.outlined)}">
    <fwc-list-item>Foo</fwc-list-item>
    <fwc-list-item>Bar</fwc-list-item>
    <fwc-list-item>Baz</fwc-list-item>
  </fwc-select>
`;

export const Default: Story = {
  args: {},
  render,
};

export const Disabled: Story = {
  render: (props) => render({ ...props, disabled: true }),
};

export const Outlined: Story = {
  render: (props) => render({ ...props, outlined: true }),
};

export default meta;
