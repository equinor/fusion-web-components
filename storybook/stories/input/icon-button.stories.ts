import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components';
import { setCustomElementsManifest } from '@storybook/web-components';
import { IconButtonElement, IconButtonElementProps } from '@equinor/fusion-wc-button/icon-button';
import cem from '@equinor/fusion-wc-button/custom-elements.json';
import { IconButtonColor, IconButtonSize } from '@equinor/fusion-wc-button/icon-button';

console.log(cem);

IconButtonElement;

setCustomElementsManifest(cem);

type Story = StoryObj<IconButtonElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-icon-button',
};

const render = (props: IconButtonElementProps) => html`
  <fwc-icon-button
    icon="${ifDefined(props.icon)}"
    color="${ifDefined(props.color)}"
    ?disabled="${ifDefined(props.disabled)}"
    ?rounded="${ifDefined(props.rounded)}"
    size="${ifDefined(props.size)}"
    icon="notifications"
  ></fwc-icon-button>
`;

const btnColors: Array<IconButtonColor> = ['primary', 'secondary', 'success', 'danger', 'warning'];

const renderAllColors = (props: IconButtonElementProps) => html`
  ${btnColors.map((color) => render({ ...props, color }))} ${render({ ...props, disabled: true, color: 'disabled' })}
`;

const sizes: Array<IconButtonSize> = ['x-small', 'small', 'medium', 'large', 'x-large'];

const renderAllSizes = (props: IconButtonElementProps) => html`
  ${sizes.map((size) => html`<div>${renderAllColors({ ...props, size })}</div>`)}
`;

export const Default: Story = {
  args: {
    icon: 'notifications',
  },
  render,
};

export const Standard: Story = {
  ...Default,
  render: (props) => renderAllColors(props),
};

export const Rounded: Story = {
  ...Default,
  render: (props) => renderAllColors({ ...props, rounded: true }),
};

export const Sizes: Story = {
  ...Default,
  render: (props) => renderAllSizes(props),
};

export default meta;
