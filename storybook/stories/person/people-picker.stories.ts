import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

import { PeoplePickerElement, PersonAddedEvent, PersonRemovedEvent, SelectionChangedEvent, type PeoplePickerElementProps } from '@equinor/fusion-wc-people';

import { generatePerson, generateIds, personProviderDecorator } from './person-provider';

PeoplePickerElement;

type Story = StoryObj<PeoplePickerElementProps>;

const meta: Meta<typeof PeoplePickerElement> = {
  title: 'picker',
  component: 'fwc-people-picker',
  decorators: [personProviderDecorator],
};

const handleSelectionChanged = (e: SelectionChangedEvent) => {
  // console.log('fwc-people-picker::selection-changed', e.detail);
};

const handlePersonAdded = (e: PersonAddedEvent) => {
  // console.log('fwc-people-picker::person-added', e.detail);
};

const handlePersonRemoved = (e: PersonRemovedEvent) => {
  // console.log('fwc-people-picker::person-removed', e.detail);
};

const render = (props: PeoplePickerElementProps) => html`
  <fwc-people-picker
    multiple=${ifDefined(props.multiple)}
    resolveids=${ifDefined(props.resolveIds)}
    people=${ifDefined(props.people)}
    showselectedpeople=${ifDefined(props.showSelectedPeople)}
    subtitle=${ifDefined(props.subtitle)}
    secondarysubtitle=${ifDefined(props.secondarySubtitle)}
    placeholder=${ifDefined(props.placeholder)}
    systemaccounts=${ifDefined(props.systemAccounts)}
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

export const resolveIds: Story = {
  args: {
    multiple: true,
    resolveIds: generateIds(3, 100).join(','),
  },
  render,
};

export const people: Story = {
  args: {
    multiple: true,
  },
  loaders: [
    async () => {
      const resolvedPeople = await Promise.all(generateIds(1, 3).map((azureId) => generatePerson({ azureId })));
      return { resolvedPeople };
    },
  ],
  render: (props: PeoplePickerElementProps, { loaded: { resolvedPeople } }: any) => html`
    <fwc-people-picker
      multiple=${ifDefined(props.multiple)}
      resolveids=${ifDefined(props.resolveIds)}
      people=${JSON.stringify(resolvedPeople)}
      showselectedpeople=${ifDefined(props.showSelectedPeople)}
      subtitle=${ifDefined(props.subtitle)}
      secondarysubtitle=${ifDefined(props.secondarySubtitle)}
      placeholder=${ifDefined(props.placeholder)}
      @selection-changed=${handleSelectionChanged}
      @person-added=${handlePersonAdded}
      @person-removed=${handlePersonRemoved}>
    </fwc-people-picker>
  `,
};

export const hideSelectedPeople: Story = {
  args: {
    multiple: false,
    showSelectedPeople: false,
  },
  render,
};

export default meta;
