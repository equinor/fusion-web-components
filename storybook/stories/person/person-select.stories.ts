import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components';
import PersonSelect, { PersonSelectElementProps, PersonSelectEvent } from '@equinor/fusion-wc-person/select';

import { faker } from '@faker-js/faker';
import { personProviderDecorator } from './person-provider';

PersonSelect;

faker.seed(1);

type Story = StoryObj<PersonSelectElementProps>;

const meta: Meta<typeof PersonSelect> = {
  title: 'select',
  component: 'fwc-person-select',
  decorators: [personProviderDecorator],
};

const render = (props: PersonSelectElementProps) => {
  const selectedPerson = props.selectedPerson === null ? '' : props.selectedPerson;
  return html`
    <div style="min-height: 300px">
      <fwc-person-select
        .selectedPerson=${ifDefined(selectedPerson)}
        autofocus="${ifDefined(props.autofocus)}"
        selectTextOnFocus=${ifDefined(props.selectTextOnFocus)}
        disabled=${ifDefined(props.disabled)}
        dropdownHeight=${ifDefined(props.dropdownHeight)}
        graphic=${ifDefined(props.graphic)}
        initialText=${ifDefined(props.initialText)}
        label=${ifDefined(props.label)}
        leadingIcon=${ifDefined(props.leadingIcon)}
        meta=${ifDefined(props.meta)}
        multiple=${ifDefined(props.multiple)}
        placeholder=${ifDefined(props.placeholder)}
        selectedId=${ifDefined(props.selectedId)}
        textInputElement=${ifDefined(props.textInputElement)}
        listElement=${ifDefined(props.listElement)}
        value=${ifDefined(props.value)}
        variant=${ifDefined(props.variant)}
        @select=${(e: PersonSelectEvent) => {
          console.log('SelectEvent', e);
        }}
      ></fwc-person-select>
    </div>
  `;
};

export const Default: Story = {
  args: {
    autofocus: true,
  },
  render,
};

export const SetSelectedPersonAttributeWithUpn: Story = {
  args: {
    selectedPerson: 'fake@faker.info',
  },
  render,
};

export const SetSelectedPersonAttributeWithAzureId: Story = {
  args: {
    selectedPerson: '49132c24-6ea4-41fe-8221-112f314573f0',
  },
  render,
};

export const SetSelectedPersonAttributeWithPersonInfo: Story = {
  args: {
    // selectedPerson: JSON.stringify({ azureID: '49132c24-6ea4-41fe-8221-112f314573f0' }),
    selectedPerson:
      '{"azureId": "b4f6b901-902e-486a-979e-86d8eeee6365", "upn": "Noe.Rice@equinor.com", "name": "Naomi Steuber", "accountType": "Consultant", "accountClassification": "External", "jobTitle": "Product Assurance Representative", "department": "Automotive", "mail": "Noe.Rice@equinor.com", "mobilePhone": "(763) 255-9520", "officeLocation": "Catherinefield", "positions": [], "manager": { "azureUniqueId": "8da7cab8-5c43-4c99-9689-8c22501f6071","name": "Allan Kulas","department": "Health"}',
  },
  render,
};

export const ClearSelectedPersonOnSelect: Story = {
  args: {
    selectedPerson: null,
  },
  render,
};

export default meta;
