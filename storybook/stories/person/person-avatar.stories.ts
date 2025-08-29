import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { setCustomElementsManifest } from '@storybook/web-components-vite';
import PersonAvatar, { PersonAvatarElementProps } from '@equinor/fusion-wc-person/avatar';
import cem from '@equinor/fusion-wc-person/custom-elements.json';

import { faker } from '@faker-js/faker';
import { personProviderDecorator } from './person-provider';
import { AvatarElementProps } from '@equinor/fusion-wc-avatar';
import { PersonAccountType } from '@equinor/fusion-wc-person';

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
    .dataSource="${ifDefined(props.dataSource)}"
    .trigger="${ifDefined(props.trigger)}"
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

export const ImgAndLetter: Story = {
  ...Default,
  render: (props) => {
    return html`${render(props)}${render({ pictureSrc: "", azureId: props.azureId })}`;
  },
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

export const Employees: Story = {
  name: 'External/Internal Employee',
  ...Default,
  render: (props) => {
    return html`${render({
      ...props,
      dataSource: { accountType: PersonAccountType.Employee, accountClassification: 'External' },
    })}${render({
      ...props,
      dataSource: { accountType: PersonAccountType.Employee, accountClassification: 'Internal' },
    })}`;
  },
};

export const CornerPositions: Story = {
  ...Default,
  render: (props) => html`
    <div style="height: 85vh;">
      <div style="display: flex; justify-content: space-between;">${render(props)}${render(props)}</div>
      <div style="display: flex; justify-content: space-between; height: 100%; align-items: flex-end;">
        ${render(props)}${render(props)}
      </div>
    </div>
  `,
};

export default meta;
