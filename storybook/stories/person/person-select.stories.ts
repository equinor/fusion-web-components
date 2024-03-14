import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components';
import { setCustomElementsManifest } from '@storybook/web-components';
import PersonSelect, { PersonSelectElementProps, PersonSelectEvent } from '@equinor/fusion-wc-person/select';
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

const render = (props: PersonSelectElementProps) => {
  const selectedPerson = props.selectedPerson === null ? '' : props.selectedPerson;
  return html`
    <div style="min-height: 300px">
      <fwc-person-select
        autofocus="${ifDefined(props.autofocus)}"
        selectedPerson=${ifDefined(selectedPerson)}
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
    selectedPerson: '{"azureId":"49132c24-6ea4-41fe-8221-112f314573f0"}',
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
