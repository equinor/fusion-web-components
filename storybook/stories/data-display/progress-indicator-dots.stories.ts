import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { setCustomElementsManifest } from '@storybook/web-components-vite';
import {
  DotsProgressElement,
  DotsProgressElementProps,
  DotsColorProps,
  DotsSize,
} from '@equinor/fusion-wc-progress-indicator';
import cem from '@equinor/fusion-wc-progress-indicator/custom-elements.json';

DotsProgressElement;

setCustomElementsManifest(cem);

type Story = StoryObj<DotsProgressElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-dots-progress',
};

const render = (props: DotsProgressElementProps) => html`
  <fwc-dots-progress color="${ifDefined(props.color)}" size="${ifDefined(props.size)}" />
`;

const dotsColors: Array<DotsColorProps> = ['primary', 'tertiary', 'neutral'];
const dotsSizes: Array<DotsSize> = [DotsSize.Small, DotsSize.Medium, DotsSize.Large];

export const Default: Story = {
  args: {},
  render,
};

export const Color: Story = {
  ...Default,
  render: (props) => html`${dotsColors.map((color) => render({ ...props, color }))}`,
};

export const Size: Story = {
  ...Default,
  render: (props) => html`${dotsSizes.map((size) => render({ ...props, size }))}`,
};

export default meta;
