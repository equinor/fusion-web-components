import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

import { PeoplePickerElement, PersonAddedEvent, PersonRemovedEvent, SelectionChangedEvent, type PeoplePickerElementProps, PeopleViewerElement, PeopleViewerElementProps } from '@equinor/fusion-wc-people';
import type { PersonInfo } from '@equinor/fusion-wc-person';

import { generatePerson, generateIds, personProviderDecorator } from './person-provider';

PeoplePickerElement;

type Story = StoryObj<PeoplePickerElementProps & PeopleViewerElementProps>;

const meta: Meta<typeof PeopleViewerElement> = {
  title: 'viewer',
  component: 'fwc-people-viewer',
  decorators: [personProviderDecorator],
};

const resolvedPeople = generateIds(3, 12).map((azureId) => generatePerson({ azureId }));

const handlePersonRemoved = (e: PersonRemovedEvent) => {
  console.log('fwc-people-viewer::person-removed', e.detail);
};

const render = (props: PeopleViewerElementProps) => html`
  <fwc-people-viewer
    people=${ifDefined(props.people)}
    resolveids=${ifDefined(props.resolveIds)}
    showViewMode=${ifDefined(props.showViewMode)}
    viewMode=${ifDefined(props.viewMode)}
    tableColumns=${ifDefined(props.tableColumns)}
    @person-removed=${handlePersonRemoved}
  >
  </fwc-people-viewer>
`;

const renderConnected = (props: PeoplePickerElementProps & PeopleViewerElementProps) => {
  let people: PersonInfo[] = props.people ? typeof props.people === 'string' ? JSON.parse(props.people) : props.people : [];

  const setPropPeople = (people: PersonInfo[]) => {
    const peopleViewer = document.getElementById('people-viewer');
    if (peopleViewer) {
      peopleViewer.setAttribute('people', JSON.stringify(people));
    }
  };

  const handlePersonAdded = (e: PersonAddedEvent) => {
    // Add the person to the shared people array
    people = [...people, e.detail];

    setPropPeople(people);
  };

  const handlePersonRemoved = (e: PersonRemovedEvent) => {
    // Remove the person from the shared people array
    people = people.filter((person) => person.azureId !== e.detail.azureId);

    setPropPeople(people);
  };

  const handleSelectionChanged = (e: SelectionChangedEvent) => {
    console.log('fwc-people-viewer::selection-changed', e.detail);
    people = [...e.detail];

    setPropPeople(people);
  };

  return html`
    <div>
      <p><strong>Note:</strong> This interactive story demonstrates the event flow.</p>

      <fwc-people-picker
        id="people-picker"
        multiple"false"
        showselectedpeople="false"
        @person-added=${handlePersonAdded}
        @person-removed=${handlePersonRemoved}
        style="margin-bottom: 1em;">
      </fwc-people-picker>

      <fwc-people-viewer
        id="people-viewer"
        people=${JSON.stringify(people)}
        resolveids=${generateIds(3, 12).join(',')}
        @selection-changed=${handleSelectionChanged}
      >
      </fwc-people-viewer>
    </div>
  `;
};

export const Default: Story = {
  render,
};

export const resolveIds: Story = {
  args: {
    resolveIds: generateIds(4, 16).join(','),
    viewMode: 'table',
  },
  render,
};

export const people: Story = {
  args: {
  },
  loaders: [
    async () => {
      const resolvedPeople = await Promise.all(generateIds(3, 12).map((azureId) => generatePerson({ azureId })));
      return { resolvedPeople };
    },
  ],
  render: (props: PeopleViewerElementProps, { loaded: { resolvedPeople } }: any) => html`
    <fwc-people-viewer people=${JSON.stringify(resolvedPeople)}></fwc-people-viewer>
  `,
};

export const InteractivePicker: Story = {
  args: {
    people: [],
  },
  render: renderConnected,
};

export default meta;
