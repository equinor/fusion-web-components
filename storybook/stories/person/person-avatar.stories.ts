import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components';
import { setCustomElementsManifest } from '@storybook/web-components';
import PersonAvatar, { PersonAvatarElementProps } from '@equinor/fusion-wc-person/avatar';
import cem from '@equinor/fusion-wc-person/custom-elements.json';

import { faker } from '@faker-js/faker';
import { personProviderDecorator } from './person-provider';
import { AvatarElementProps } from '@equinor/fusion-wc-avatar';

PersonAvatar;

faker.seed(1);

setCustomElementsManifest(cem);

type Story = StoryObj<PersonAvatarElementProps>;

const meta: Meta<typeof cem> = {
  title: 'avatar',
  component: 'fwc-person-avatar',
  decorators: [personProviderDecorator],
};

const render = (props: PersonAvatarElementProps) => html`
  <fwc-person-avatar
    size="${ifDefined(props.size)}"
    pictureSrc=${ifDefined(props.pictureSrc)}
    azureId=${ifDefined(props.azureId)}
    ?disabled=${ifDefined(props.disabled)}
  ></fwc-person-avatar>
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
    html`${(['small', 'medium', 'large'] as AvatarElementProps['size'][])
      .map((size) => ({ ...props, size }))
      .map(render)}`,
};

export const Disabled: Story = {
  ...Default,
  render: (props) => render({ ...props, disabled: true }),
};

export default meta;
