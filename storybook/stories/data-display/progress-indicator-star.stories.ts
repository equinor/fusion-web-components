import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components';
import { setCustomElementsManifest } from '@storybook/web-components';
import { StarProgressElement, StarProgressElementProps } from '@equinor/fusion-wc-progress-indicator';
import cem from '@equinor/fusion-wc-progress-indicator/custom-elements.json';

StarProgressElement;

setCustomElementsManifest(cem);

type Story = StoryObj<StarProgressElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-star-progress',
};

const render = (props: StarProgressElementProps) => html`
  <fwc-star-progress size="${ifDefined(props.size)}" text="${ifDefined(props.text)}" />
`;

export const Default: Story = {
  args: {},
  render,
};

export const Size: Story = {
  ...Default,
  render: (props) => render({ ...props, size: 100 }),
};

export const Text: Story = {
  ...Default,
  render: (props) => render({ ...props, text: 'Loading ...' }),
};

export default meta;
