import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

import { PeoplePickerElement, PickerPersonAddedEvent, PickerPersonRemovedEvent, PickerSelectionChangedEvent, type PeoplePickerElementProps, PeopleViewerElement, PeopleViewerElementProps } from '@equinor/fusion-wc-people';
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

const handlePersonRemoved = (e: PickerPersonRemovedEvent) => {
  console.log('fwc-people-picker::person-removed', e.detail);
  resolvedPeople.filter((person: PersonInfo) => person.azureId !== e.detail.azureId);
};

const render = (props: PeopleViewerElementProps) => html`
  <fwc-people-viewer
    .people=${ifDefined(props.people)}
    .resolveIds=${ifDefined(props.resolveIds)}
    showViewMode=${ifDefined(props.showViewMode)}
    @person-removed=${handlePersonRemoved}
  >
  </fwc-people-viewer>
`;

const renderConnected = (props: PeoplePickerElementProps & PeopleViewerElementProps) => {
  let people: PersonInfo[] = props.people ? typeof props.people === 'string' ? JSON.parse(props.people) : props.people : [];

  const handlePersonAdded = (e: PickerPersonAddedEvent) => {
    // Add the person to the shared people array
    people = [...people, e.detail];

    const peopleViewer = document.getElementById('people-viewer');
    if (peopleViewer) {
      peopleViewer.setAttribute('people', JSON.stringify(people));
    }
  };

  const handlePersonRemoved = (e: PickerPersonRemovedEvent) => {
    console.log('fwc-people-picker::person-removed', e.detail);
    // Remove the person from the shared people array
    people = people.filter((person) => person.azureId !== e.detail.azureId);
    const peopleViewer = document.getElementById('people-viewer');
    if (peopleViewer) {
      peopleViewer.setAttribute('people', JSON.stringify(people));
    }
  };

  return html`
    <div>
      <p><strong>Note:</strong> This interactive story demonstrates the event flow.</p>

      <fwc-people-picker
        multiple=${ifDefined(props.multiple)}
        showselectedpeople=${ifDefined(props.showSelectedPeople)}
        @person-added=${handlePersonAdded}
        @person-removed=${handlePersonRemoved}
        style="margin-bottom: 1em;">
      </fwc-people-picker>

      <fwc-people-viewer
        id="people-viewer"
        .resolveIds=${ifDefined(props.resolveIds)}
        @person-removed=${handlePersonRemoved}
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
    resolveIds: generateIds(3, 12),
  },
  render,
};

export const InteractivePicker: Story = {
  args: {
    multiple: false,
    showSelectedPeople: false,
    people: [],
  },
  render: renderConnected,
};

export default meta;
