import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { setCustomElementsManifest } from '@storybook/web-components-vite';

import {
  ListElement,
  ListElementProps,
  ListItemElement,
  CheckListItemElement,
  RadioListItemElement,
} from '@equinor/fusion-wc-list';

import { IconElement } from '@equinor/fusion-wc-icon';
import { AvatarElement } from '@equinor/fusion-wc-avatar';
import { PictureElement } from '@equinor/fusion-wc-picture';
import cem from '@equinor/fusion-wc-list/custom-elements.json';

ListElement;
ListItemElement;
CheckListItemElement;
RadioListItemElement;
IconElement;
AvatarElement;
PictureElement;

setCustomElementsManifest(cem);

type Story = StoryObj<ListElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-list',
};

const render = (props: ListElementProps) => html`
  <fwc-list
    ?activatable="${ifDefined(props.activatable)}"
    ?multi="${ifDefined(props.multi)}"
    ?noninteractive="${ifDefined(props.noninteractive)}"
  >
    <fwc-list-item>Foo</fwc-list-item>
    <fwc-list-item>Bar</fwc-list-item>
    <fwc-list-item>Baz</fwc-list-item>
  </fwc-list>
`;

const renderCheckList = (props: ListElementProps) => html`
  <fwc-list
    ?activatable="${ifDefined(props.activatable)}"
    ?multi="${ifDefined(props.multi)}"
    ?noninteractive="${ifDefined(props.noninteractive)}"
  >
    <fwc-check-list-item>Foo</fwc-check-list-item>
    <fwc-check-list-item>Bar</fwc-check-list-item>
    <fwc-check-list-item>Baz</fwc-check-list-item>
  </fwc-list>
`;

const renderRadioList = (props: ListElementProps) => html`
  <fwc-list
    ?activatable="${ifDefined(props.activatable)}"
    ?multi="${ifDefined(props.multi)}"
    ?noninteractive="${ifDefined(props.noninteractive)}"
  >
    <fwc-radio-list-item>Foo</fwc-radio-list-item>
    <fwc-radio-list-item>Bar</fwc-radio-list-item>
    <fwc-radio-list-item>Baz</fwc-radio-list-item>
  </fwc-list>
`;

const renderTwoLines = (props: ListElementProps) => html`
  <fwc-list
    ?activatable="${ifDefined(props.activatable)}"
    ?multi="${ifDefined(props.multi)}"
    ?noninteractive="${ifDefined(props.noninteractive)}"
  >
    <fwc-list-item twoline>
      <span>Foo</span>
      <span slot="secondary">Secondary line</span>
    </fwc-list-item>
    <fwc-list-item twoline>
      <span>Bar</span>
      <span slot="secondary">Secondary line</span>
    </fwc-list-item>
    <fwc-list-item twoline>
      <span>Baz</span>
      <span slot="secondary">Secondary line</span>
    </fwc-list-item>
  </fwc-list>
`;

const renderMetaIcon = (props: ListElementProps) => html`
  <fwc-list
    ?activatable="${ifDefined(props.activatable)}"
    ?multi="${ifDefined(props.multi)}"
    ?noninteractive="${ifDefined(props.noninteractive)}"
  >
    <fwc-list-item hasMeta>
      <fwc-icon icon="settings" slot="meta"></fwc-icon>
      <span>Foo</span>
    </fwc-list-item>
    <fwc-list-item hasMeta>
      <fwc-icon icon="list" slot="meta"></fwc-icon>
      <span>Bar</span>
    </fwc-list-item>
    <fwc-list-item hasMeta>
      <fwc-icon icon="more_horizontal" slot="meta"></fwc-icon>
      <span>Baz</span>
    </fwc-list-item>
  </fwc-list>
`;

const renderGraphic = (props: ListElementProps) => html`
  <fwc-list
    ?activatable="${ifDefined(props.activatable)}"
    ?multi="${ifDefined(props.multi)}"
    ?noninteractive="${ifDefined(props.noninteractive)}"
  >
    <fwc-list-item graphic="icon">
      <fwc-icon icon="settings" slot="graphic"></fwc-icon>
      <span>Icon</span>
    </fwc-list-item>
    <fwc-list-item graphic="avatar">
      <fwc-avatar slot="graphic" size="small" src="https://i.imgur.com/GcZeeXX.jpeg" {...props}></fwc-avatar>
      <span>Avatar</span>
    </fwc-list-item>
    <fwc-list-item graphic="medium">
      <fwc-picture slot="graphic" src="https://i.imgur.com/GcZeeXX.jpeg" cover></fwc-picture>
      <span>Medium</span>
    </fwc-list-item>
    <fwc-list-item graphic="large">
      <fwc-picture slot="graphic" src="https://i.imgur.com/GcZeeXX.jpeg" cover></fwc-picture>
      <span>Large</span>
    </fwc-list-item>
  </fwc-list>
`;

export const Default: Story = {
  args: {},
  render,
};

export const Activatable: Story = {
  ...Default,
  render: (props) => render({ ...props, activatable: true }),
};

export const MultiActivatable: Story = {
  ...Default,
  render: (props) => render({ ...props, multi: true, activatable: true }),
};

export const NonInteractive: Story = {
  ...Default,
  render: (props) => render({ ...props, noninteractive: true }),
};

export const CheckList: Story = {
  ...Default,
  render: (props) => renderCheckList({ ...props, multi: true }),
};

export const RadioList: Story = {
  ...Default,
  render: (props) => renderRadioList(props),
};

export const TwoLines: Story = {
  ...Default,
  render: (props) => renderTwoLines(props),
};

export const MetaIcon: Story = {
  ...Default,
  render: (props) => renderMetaIcon(props),
};

export const Graphic: Story = {
  ...Default,
  render: (props) => renderGraphic(props),
};

export default meta;
