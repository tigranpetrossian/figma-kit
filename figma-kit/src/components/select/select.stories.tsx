import type { Meta, StoryObj } from '@storybook/react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import * as Select from './select';

type Story = StoryObj<typeof Select.Root>;

const meta: Meta<typeof Select.Root> = {
  component: Select.Root,
  title: 'Components/Select',
  parameters: {
    radixUrl: 'https://www.radix-ui.com/primitives/docs/components/select',
    radixComponentName: 'Select',
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ width: 128 }}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;

const SimpleSelectElement = (
  <Select.Root value="drop-shadow">
    <Select.Trigger />
    <Select.Content>
      <Select.Item value="inner-shadow">Inner shadow</Select.Item>
      <Select.Item value="drop-shadow">Drop shadow</Select.Item>
      <Select.Item value="layer-blur">Layer blur</Select.Item>
      <Select.Item value="background-blur">Background blur</Select.Item>
    </Select.Content>
  </Select.Root>
);

const SeparatorsElement = (
  <Select.Root value="one">
    <Select.Trigger />
    <Select.Content>
      <Select.Item value="one">Pass through</Select.Item>
      <Select.Item value="two" disabled>
        Normal
      </Select.Item>
      <Select.Separator />
      <Select.Item value="three">Darken</Select.Item>
      <Select.Item value="three">Multiply</Select.Item>
      <Select.Item value="three">Plus darker</Select.Item>
      <Select.Item value="three">Color burn</Select.Item>
      <Select.Separator />
      <Select.Item value="three">Lighten</Select.Item>
      <Select.Item value="three">Screen</Select.Item>
      <Select.Item value="three">Plus lighter</Select.Item>
      <Select.Item value="three">Color dodge</Select.Item>
      <Select.Separator />
      <Select.Item value="three">Overlay</Select.Item>
      <Select.Item value="three">Soft light</Select.Item>
      <Select.Item value="three">Hard light</Select.Item>
      <Select.Separator />
      <Select.Item value="three">Difference</Select.Item>
      <Select.Item value="three">Exclusion</Select.Item>
      <Select.Separator />
      <Select.Item value="three">Hue</Select.Item>
      <Select.Item value="three">Saturation</Select.Item>
      <Select.Item value="three">Color</Select.Item>
      <Select.Item value="three">Luminosity</Select.Item>
    </Select.Content>
  </Select.Root>
);

const GroupsAndLabelsElement = (
  <Select.Root value="passthrough">
    <Select.Trigger />
    <Select.Content>
      <Select.Group>
        <Select.Item value="passthrough">Pass through</Select.Item>
        <Select.Item value="normal">Normal</Select.Item>
      </Select.Group>
      <Select.Group>
        <Select.Label>Darker</Select.Label>
        <Select.Item value="darken">Darken</Select.Item>
        <Select.Item value="multiply">Multiply</Select.Item>
        <Select.Item value="plus-darker">Plus darker</Select.Item>
        <Select.Item value="color-burn">Color burn</Select.Item>
      </Select.Group>
      <Select.Group>
        <Select.Label>Lighter</Select.Label>
        <Select.Item value="lighten">Lighten</Select.Item>
        <Select.Item value="screen">Screen</Select.Item>
        <Select.Item value="plus-lighter">Plus lighter</Select.Item>
        <Select.Item value="color-dodge">Color dodge</Select.Item>
      </Select.Group>
      <Select.Group>
        <Select.Label>Contrast</Select.Label>
        <Select.Item value="overlay">Overlay</Select.Item>
        <Select.Item value="soft-light">Soft light</Select.Item>
        <Select.Item value="hard-light">Hard light</Select.Item>
      </Select.Group>
      <Select.Group>
        <Select.Label>Comparative</Select.Label>
        <Select.Item value="difference">Difference</Select.Item>
        <Select.Item value="exclusion">Exclusion</Select.Item>
      </Select.Group>
      <Select.Group>
        <Select.Label>Color</Select.Label>
        <Select.Item value="hue">Hue</Select.Item>
        <Select.Item value="saturation">Saturation</Select.Item>
        <Select.Item value="color">Color</Select.Item>
        <Select.Item value="luminosity">Luminosity</Select.Item>
      </Select.Group>
    </Select.Content>
  </Select.Root>
);

export const Simple: Story = {
  parameters: {
    storySource: {
      source: reactElementToJSXString(SimpleSelectElement),
    },
  },
  render: () => SimpleSelectElement,
};

export const Separators: Story = {
  parameters: {
    storySource: {
      source: reactElementToJSXString(SeparatorsElement),
    },
  },
  render: () => SeparatorsElement,
};

export const GroupsAndLabels: Story = {
  parameters: {
    storySource: {
      source: reactElementToJSXString(GroupsAndLabelsElement),
    },
  },

  render: () => GroupsAndLabelsElement,
};
