import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

import { PersonPickerElement, type PersonPickerElementProps } from '@equinor/fusion-wc-person-picker';

import { personProviderDecorator } from './person-provider';

PersonPickerElement;

type Story = StoryObj<PersonPickerElementProps>;

const meta: Meta<typeof PersonPickerElement> = {
  title: 'picker',
  component: 'fwc-person-picker',
  decorators: [personProviderDecorator],
};

const render = (props: PersonPickerElementProps) => html`
  <fwc-person-picker multiple=${ifDefined(props.multiple)}></fwc-person-picker>
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
