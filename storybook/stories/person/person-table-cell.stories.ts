import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import PersonTableCell, { PersonTableCellElementProps, TableCellData } from '@equinor/fusion-wc-person/table-cell';
import { faker } from '@faker-js/faker';
import { personProviderDecorator } from './person-provider';

PersonTableCell;

type Story = StoryObj<PersonTableCellElementProps>;

const meta: Meta<PersonTableCellElementProps> = {
  title: 'table-cell',
  component: 'fwc-person-table-cell',
  decorators: [personProviderDecorator],
};

const render = (props: PersonTableCellElementProps) => html`
  <fwc-person-table-cell 
    size="${ifDefined(props.size)}" 
    showAvatar="${ifDefined(props.showAvatar)}"
    azureId=${faker.string.uuid()} 
    .heading=${ifDefined(props.heading)}
    .subHeading=${ifDefined(props.subHeading)} />
  `;

export const Default: Story = {
  args: {
    size: "medium",
    subHeading: (person: TableCellData) => person.azureId
  },
  render,
};

export const ShowAvatar: Story = {
  args: {
    ...Default.args,
    showAvatar: true,
    heading: (person: TableCellData) => person.mobilePhone,
    subHeading: (person: TableCellData) => `<a href="mailto:${person.mail}">${person.mail}</a>`
  },
  render,
};

export const Sizes: Story = {
  render: (props) =>
    html`${(['small', 'medium', 'large'] as PersonTableCellElementProps['size'][])
      .map((size) => ({ ...props, size }))
      .map(
        (props) => html`
          <fwc-person-table-cell size="${ifDefined(props.size)}" azureId=${faker.string.uuid()} .heading=${(person: TableCellData) => person.jobTitle} showAvatar />
        `,
      )}`,
};

export default meta;
