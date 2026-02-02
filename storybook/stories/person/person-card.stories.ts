import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { setCustomElementsManifest } from '@storybook/web-components-vite';
import { PersonCardElement, type PersonCardElementProps } from '@equinor/fusion-wc-person';
import cem from '@equinor/fusion-wc-person/custom-elements.json';

import { faker } from '@faker-js/faker';
import { personProviderDecorator } from './person-provider';

PersonCardElement;

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
  render: (props) => html`
    <div style="display: flex; gap: 1rem; align-items: flex-start;">
      <fwc-person-card size="small" azureId=${faker.string.uuid()}></fwc-person-card>
      <fwc-person-card size="medium" azureId=${faker.string.uuid()}></fwc-person-card>
      <fwc-person-card size="large" azureId=${faker.string.uuid()}></fwc-person-card>
    </div>
  `
};

export default meta;
