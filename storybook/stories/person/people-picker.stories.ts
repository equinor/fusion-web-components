import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

import { PeoplePickerElement, PickerPersonAddedEvent, PickerPersonRemovedEvent, PickerSelectionChangedEvent, type PeoplePickerElementProps } from '@equinor/fusion-wc-people-picker';

import { generatePerson, generateIds, personProviderDecorator } from './person-provider';

PeoplePickerElement;

type Story = StoryObj<PeoplePickerElementProps>;

const meta: Meta<typeof PeoplePickerElement> = {
  title: 'picker',
  component: 'fwc-people-picker',
  decorators: [personProviderDecorator],
};

const handleSelectionChanged = (e: PickerSelectionChangedEvent) => {
  console.log('fwc-people-picker::selection-changed', e.detail);
};

const handlePersonAdded = (e: PickerPersonAddedEvent) => {
  console.log('fwc-people-picker::person-added', e.detail);
};

const handlePersonRemoved = (e: PickerPersonRemovedEvent) => {
  console.log('fwc-people-picker::person-removed', e.detail);
};

const render = (props: PeoplePickerElementProps) => html`
  <fwc-people-picker
    multiple=${ifDefined(props.multiple)}
    preselectedids=${ifDefined(props.preselectedIds)}
    preselectedpeople=${ifDefined(props.preselectedPeople)}
    showselectedpeople=${ifDefined(props.showSelectedPeople)}
    subtitle=${ifDefined(props.subTitle)}
    secondarysubtitle=${ifDefined(props.secondarySubTitle)}
    placeholder=${ifDefined(props.placeholder)}
    @selection-changed=${handleSelectionChanged}
    @person-added=${handlePersonAdded}
    @person-removed=${handlePersonRemoved}>
  </fwc-people-picker>
`;

export const Single: Story = {
  args: {
    multiple: false,
  },
  render,
};

export const Multiple: Story = {
  args: {
    multiple: true,
  },
  render,
};

export const preselectedIds: Story = {
  args: {
    multiple: true,
    preselectedIds: JSON.stringify(generateIds(1, 2)),
  },
  render,
};

const resolvedPeople = generateIds(1, 3).map((azureId) => generatePerson({ azureId }));
export const preselectedPeople: Story = {
  args: {
    multiple: true,
    preselectedPeople: JSON.stringify(resolvedPeople),
  },
  render,
};

export const hideSelectedPeople: Story = {
  args: {
    multiple: false,
    showSelectedPeople: false,
  },
  render,
};

export default meta;
