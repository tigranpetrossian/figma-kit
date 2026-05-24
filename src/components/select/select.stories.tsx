import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Select from './select';

const meta = {
  component: Select.Root,
  title: 'Components/Select',
  decorators: [
    (Story) => {
      return (
        <div style={{ width: 128 }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof Select.Root>;

type Story = StoryObj<typeof meta>;

const Simple: Story = {
  render() {
    return (
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
  },
};

const Separators: Story = {
  render() {
    return (
      <Select.Root value="pass-through">
        <Select.Trigger />
        <Select.Content>
          <Select.Item value="pass-through">Pass through</Select.Item>
          <Select.Item value="normal" disabled>
            Normal
          </Select.Item>
          <Select.Separator />
          <Select.Item value="darken">Darken</Select.Item>
          <Select.Item value="multiply">Multiply</Select.Item>
          <Select.Item value="plus-darker">Plus darker</Select.Item>
          <Select.Item value="color-burn">Color burn</Select.Item>
          <Select.Separator />
          <Select.Item value="lighten">Lighten</Select.Item>
          <Select.Item value="screen">Screen</Select.Item>
          <Select.Item value="plus-lighter">Plus lighter</Select.Item>
          <Select.Item value="color-dodge">Color dodge</Select.Item>
          <Select.Separator />
          <Select.Item value="overlay">Overlay</Select.Item>
          <Select.Item value="soft-light">Soft light</Select.Item>
          <Select.Item value="hard-light">Hard light</Select.Item>
          <Select.Separator />
          <Select.Item value="difference">Difference</Select.Item>
          <Select.Item value="exclusion">Exclusion</Select.Item>
          <Select.Separator />
          <Select.Item value="hue">Hue</Select.Item>
          <Select.Item value="saturation">Saturation</Select.Item>
          <Select.Item value="color">Color</Select.Item>
          <Select.Item value="luminosity">Luminosity</Select.Item>
        </Select.Content>
      </Select.Root>
    );
  },
};

const GroupsAndLabels: Story = {
  render() {
    return (
      <Select.Root value="pass-through">
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            <Select.Item value="pass-through">Pass through</Select.Item>
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
  },
};

export default meta;
export { GroupsAndLabels, Separators, Simple };
