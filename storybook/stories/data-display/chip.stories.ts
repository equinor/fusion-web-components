import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components';
import { setCustomElementsManifest } from '@storybook/web-components';
import { ChipColor, ChipElement, ChipElementProps, ChipSize } from '@equinor/fusion-wc-chip';
import cem from '@equinor/fusion-wc-chip/lib/custom-elements.json';

ChipElement;

setCustomElementsManifest(cem);

type Story = StoryObj<ChipElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-chip',
};

const render = (props: ChipElementProps) => html`
  <fwc-chip
    size="${ifDefined(props.size)}"
    icon="${ifDefined(props.icon)}"
    value="${ifDefined(props.value)}"
    color="${ifDefined(props.color)}"
    variant="${ifDefined(props.variant)}"
    ?clickable=${ifDefined(props.clickable)}
    ?removable=${ifDefined(props.removable)}
    ?disabled=${ifDefined(props.disabled)}
    ></fwc-cip>
`;

const renderColors = (props: ChipElementProps) =>
  html`${(['primary', 'secondary', 'success', 'danger', 'warning'] as ChipColor[])
    .map((color) => ({ ...props, color }))
    .map(render)}
  ${render({ ...props, disabled: true })}`;

export const Default: Story = {
  args: {
    value: 'chip',
    variant: 'filled',
  },
  render,
};

export const Filled: Story = {
  ...Default,
  render: (props) => renderColors(props),
};

export const Outlined: Story = {
  ...Default,
  render: (props) => renderColors({ ...props, variant: 'outlined' }),
};

export const Size: Story = {
  ...Default,
  render: (props) =>
    html`${(['small', 'medium', 'large'] as ChipSize[]).map((size) => ({ ...props, size })).map(render)}`,
};

export const WithIcon: Story = {
  ...Default,
  render: (props) => render({ ...props, icon: 'accessible' }),
};

export const WithRemove: Story = {
  ...Default,
  render: (props) => render({ ...props, removable: true }),
};

export default meta;
