import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

import { PeoplePickerElement, type PeoplePickerElementProps } from '@equinor/fusion-wc-people-picker';

import { personProviderDecorator } from './person-provider';

PeoplePickerElement;

type Story = StoryObj<PeoplePickerElementProps>;

const meta: Meta<typeof PeoplePickerElement> = {
  title: 'picker',
  component: 'fwc-people-picker',
  decorators: [personProviderDecorator],
};

const render = (props: PeoplePickerElementProps) => html`
  <fwc-people-picker multiple=${ifDefined(props.multiple)}></fwc-people-picker>
`;

export const Default: Story = {
  render,
};

export const Multiple: Story = {
  args: {
    multiple: true,
  },
  render,
};

export default meta;
