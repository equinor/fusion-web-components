import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components';
import { setCustomElementsManifest } from '@storybook/web-components';
import PersonSelect, { PersonSelectElementProps } from '@equinor/fusion-wc-person/select';
import cem from '@equinor/fusion-wc-person/custom-elements.json';

import { faker } from '@faker-js/faker';
import { personProviderDecorator } from './person-provider';

PersonSelect;

faker.seed(1);

setCustomElementsManifest(cem);

type Story = StoryObj<PersonSelectElementProps>;

const meta: Meta<typeof cem> = {
  title: 'select',
  component: 'fwc-person-select',
  decorators: [personProviderDecorator],
};

const render = (props: PersonSelectElementProps) =>
  html`
    <div style="min-height: 300px">
      <fwc-person-select autofocus=${ifDefined(props.autofocus)}></fwc-person-avatar>
    </div>
`;

export const Default: Story = {
  args: {
    autofocus: true,
  },
  render,
};

export default meta;
