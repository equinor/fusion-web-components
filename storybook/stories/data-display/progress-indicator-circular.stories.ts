import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components';
import { setCustomElementsManifest } from '@storybook/web-components';
import {
  CircularColorProps,
  CircularProgressElement,
  CircularProgressElementProps,
  CircularSize,
} from '@equinor/fusion-wc-progress-indicator';
import cem from '@equinor/fusion-wc-progress-indicator/custom-elements.json';

CircularProgressElement;

setCustomElementsManifest(cem);

type Story = StoryObj<CircularProgressElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-circular-progress',
};

const render = (props: CircularProgressElementProps) => html`
  <fwc-circular-progress color="${ifDefined(props.color)}" size="${ifDefined(props.size)}" />
`;

const progressColors: Array<CircularColorProps> = ['primary', 'neutral'];
const progressSizes: Array<CircularSize> = [
  CircularSize.XSmall,
  CircularSize.Small,
  CircularSize.Medium,
  CircularSize.Large,
  CircularSize.XLarge,
];

export const Default: Story = {
  args: {},
  render,
};

export const Color: Story = {
  ...Default,
  render: (props) => html`${progressColors.map((color) => render({ ...props, color }))}`,
};

export const Size: Story = {
  ...Default,
  render: (props) => html`${progressSizes.map((size) => render({ ...props, size }))}`,
};

export default meta;
