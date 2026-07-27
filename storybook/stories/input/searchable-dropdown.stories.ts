import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { setCustomElementsManifest } from '@storybook/web-components-vite';

import {
  type SearchableDropdownProps,
  SearchableDropdownElement,
} from '@equinor/fusion-wc-searchable-dropdown';
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
    top-layer="${ifDefined(props.topLayer)}"
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

/**
 * Demonstrates `topLayer` mode. The dropdown is nested inside a box that
 * creates its own stacking context (`transform: translateZ(0)`), and a red
 * overlay inside that same box uses `z-index: 999`. With the default
 * behavior an absolutely positioned, shadow-DOM-relative result list can
 * never escape that stacking context - no z-index on the dropdown could
 * beat it. With `topLayer` enabled, the result list renders in the
 * browser's top layer and appears above the overlay regardless of its
 * z-index.
 */
export const TopLayer: Story = {
  ...Default,
  args: { topLayer: true },
  render: (props) => html`
    <div
      style="position: relative; transform: translateZ(0); padding: 2rem 1rem 260px; border: 1px dashed gray;"
    >
      <p style="margin: 0 0 1rem; font: 0.85rem/1.4 sans-serif;">
        This box creates its own stacking context via
        <code>transform: translateZ(0)</code>. The overlay directly below the
        input sits inside it with <code>z-index: 999</code> - exactly where
        the result list would open. Toggle <strong>topLayer</strong> in the
        Controls panel to compare.
      </p>
      <div style="position: relative;">
        ${render(props)}
        <div
          style="position: absolute; top: 100%; left: 0; right: 0; height: 200px; z-index: 999; background: rgba(226, 6, 44, 0.25); font: 0.85rem/1.4 sans-serif; text-align: center; padding-top: 0.5rem;"
        >
          Overlay with its own stacking context (z-index: 999)
        </div>
      </div>
    </div>
  `,
};

export default meta;
