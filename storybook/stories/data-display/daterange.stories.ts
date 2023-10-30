import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components';
import { setCustomElementsManifest } from '@storybook/web-components';

import { DateRangeElement, DateRangeElementProps } from '@equinor/fusion-wc-date';
import cem from '@equinor/fusion-wc-date/custom-elements.json';

DateRangeElement;

setCustomElementsManifest(cem);

type Story = StoryObj<DateRangeElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-daterange',
};

const render = (props: DateRangeElementProps) => html`
  <div>
    <fwc-daterange
      from="${ifDefined(props.from)}"
      to="${ifDefined(props.to)}"
      variant="${ifDefined(props.variant)}"
      format="${ifDefined(props.format)}"
    />
  </div>
`;

const now = new Date();

const toDates: Array<Date> = [
  new Date(now.getTime() + 60 * 60000),
  new Date(now.getTime() + 24 * 60 * 60000),
  new Date(now.getTime() + 2 * 24 * 60 * 60000),
  new Date(now.getTime() + 30 * 24 * 60 * 60000),
  new Date(now.getTime() + 2 * 365 * 24 * 60 * 60000),
];

const renderAllDistances = (props: DateRangeElementProps) => html`
  ${toDates.map((to) => render({ ...props, from: now, to, variant: 'distance' }))}
`;

const renderAllRelative = (props: DateRangeElementProps) => html`
  ${toDates.map((to) => render({ ...props, from: now, to, variant: 'relative' }))}
`;

export const Default: Story = {
  args: {
    from: '2021-08-09T09:12:49Z',
    to: '2021-09-09T09:12:49Z',
  },
  render,
};

export const Distance: Story = {
  ...Default,
  render: (props) => renderAllDistances(props),
};

export const Relative: Story = {
  ...Default,
  render: (props) => renderAllRelative(props),
};

export const Formatting: Story = {
  ...Default,
  render: (props) => html`
    ${render({ ...props, from: '2021-08-09T09:12:49Z', to: '2021-09-09T09:12:49Z', format: 'yyyy-mm-dd' })}
    ${render({ ...props, from: '2021-08-09T09:12:49Z', to: '2021-09-09T09:12:49Z', format: 'd MMMM yy' })}
  `,
};

export default meta;
