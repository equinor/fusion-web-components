import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components';
import { setCustomElementsManifest } from '@storybook/web-components';
import PersonListItem, { PersonListItemElementProps } from '@equinor/fusion-wc-person/list-item';
import cem from '@equinor/fusion-wc-person/custom-elements.json';

import { faker } from '@faker-js/faker';
import { personProviderDecorator } from './person-provider';

PersonListItem;

setCustomElementsManifest(cem);

type Story = StoryObj<PersonListItemElementProps>;

const meta: Meta<typeof cem> = {
  title: 'list-item',
  component: 'fwc-person-list-item',
  decorators: [personProviderDecorator],
};

const render = (props: PersonListItemElementProps) => html`
  ${new Array(30).fill(undefined).map((_, i) => {
    faker.seed(i);
    return html`
      <fwc-person-list-item size="${ifDefined(props.size)}" azureId=${faker.string.uuid()}></fwc-person-list-item>
    `;
  })}
`;

export const Default: Story = {
  render,
};

export const Sizes: Story = {
  ...Default,
  render: (props) =>
    html`${(['small', 'medium', 'large'] as PersonListItemElementProps['size'][])
      .map((size) => ({ ...props, size }))
      .map(
        (props) => html`
          <fwc-person-list-item size="${ifDefined(props.size)}" azureId=${faker.string.uuid()}></fwc-person-list-item>
        `,
      )}`,
};

export const Plain: Story = {
  ...Default,
  render: () => html`<fwc-person-list-item plain azureId=${faker.string.uuid()}></fwc-person-list-item>`,
};

export default meta;
