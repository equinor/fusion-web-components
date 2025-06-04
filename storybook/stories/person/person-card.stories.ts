import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { setCustomElementsManifest } from '@storybook/web-components-vite';
import PersonCard, { PersonCardElementProps } from '@equinor/fusion-wc-person/card';
import cem from '@equinor/fusion-wc-person/custom-elements.json';

import { faker } from '@faker-js/faker';
import { personProviderDecorator } from './person-provider';

PersonCard;

const avatarSeed = 1;

faker.seed(avatarSeed);

setCustomElementsManifest(cem);

type Story = StoryObj<PersonCardElementProps>;

const meta: Meta<typeof cem> = {
  title: 'card',
  component: 'fwc-person-card',
  decorators: [personProviderDecorator],
};

const render = (props: PersonCardElementProps) => html`
  <fwc-person-card size="${ifDefined(props.size)}" azureId=${ifDefined(props.azureId)}></fwc-person-card>
`;

export const Default: Story = {
  args: {
    azureId: String(faker.string.uuid()),
  },
  render,
};

export const Sizes: Story = {
  ...Default,
  render: (props) =>
    html`${(['small', 'medium', 'large'] as PersonCardElementProps['size'][])
      .map((size) => ({ ...props, size }))
      .map(render)}`,
};

export default meta;
