import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components';
import { setCustomElementsManifest } from '@storybook/web-components';

import { SearchableDropdownProps, SearchableDropdownElement } from '@equinor/fusion-wc-searchable-dropdown';
import cem from '@equinor/fusion-wc-searchable-dropdown/lib/custom-elements.json';
import { faker } from '@faker-js/faker';
import { searchableDropdownProviderDecorator } from './searchable-dropdown-provider';

SearchableDropdownElement;

faker.seed(1);

setCustomElementsManifest(cem);

type Story = StoryObj<SearchableDropdownProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-searchable-dropdown',
  decorators: [searchableDropdownProviderDecorator],
};

const render = (props: SearchableDropdownProps) => html`
  <fwc-searchable-dropdown
    label="${ifDefined(props.label)}"
    placeholder="${ifDefined(props.placeholder)}"
    leadingIcon="${ifDefined(props.leadingIcon)}"
    multiple="${ifDefined(props.multiple)}"
    selectedId="${ifDefined(props.selectedId)}"
    select-text-on-focus="${ifDefined(props.selectTextOnFocus)}"
  ></fwc-searchable-dropdown>
`;

export const Default: Story = {
  args: {},
  render,
};

export const Label: Story = {
  ...Default,
  render: (props) => render({ ...props, label: 'Label' }),
};

export const Placeholder: Story = {
  ...Default,
  render: (props) => render({ ...props, placeholder: 'Placeholder' }),
};

export const LeadingIcon: Story = {
  ...Default,
  render: (props) => render({ ...props, leadingIcon: 'list' }),
};

export const Multiple: Story = {
  ...Default,
  render: (props) => render({ ...props, multiple: true }),
};

export const SelectTextOnFocus: Story = {
  ...Default,
  render: (props) => render({ ...props, selectTextOnFocus: true }),
};

export default meta;
