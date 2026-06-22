import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import PersonTableCell, {
  type PersonTableCellElementProps,
  type TableCellData,
} from '@equinor/fusion-wc-person/table-cell';
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
    size: 'medium',
    subHeading: (person: TableCellData) => person.azureId,
  },
  render,
};

export const ShowAvatar: Story = {
  args: {
    ...Default.args,
    showAvatar: true,
    heading: (person: TableCellData) => person.mobilePhone,
    subHeading: (person: TableCellData) => `<a href="mailto:${person.mail}">${person.mail}</a>`,
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

/**
 * Regression story for equinor/fusion#837.
 *
 * Places `<fwc-person-table-cell>` inside a table row next to a plain-text cell
 * (mirroring usage inside an EDS `Table.Cell`) so the heading text alignment
 * against sibling text is visible. The heading should be vertically centered
 * with the avatar and align with the adjacent plain-text cell across all sizes.
 */
export const TableAlignment: Story = {
  render: () => html`
    <table style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr style="text-align: left; border-bottom: 1px solid #dcdcdc;">
          <th style="padding: 8px;">Person</th>
          <th style="padding: 8px;">Department</th>
        </tr>
      </thead>
      <tbody>
        ${(['small', 'medium', 'large'] as PersonTableCellElementProps['size'][]).map(
          (size) => html`
            <tr style="border-bottom: 1px solid #dcdcdc;">
              <td style="padding: 8px; vertical-align: middle;">
                <fwc-person-table-cell
                  size="${ifDefined(size)}"
                  azureId=${faker.string.uuid()}
                  .heading=${(person: TableCellData) => person.name}
                  .subHeading=${(person: TableCellData) => person.jobTitle}
                  showAvatar
                />
              </td>
              <td style="padding: 8px; vertical-align: middle;">${faker.commerce.department()}</td>
            </tr>
          `,
        )}
      </tbody>
    </table>
  `,
};

export default meta;
