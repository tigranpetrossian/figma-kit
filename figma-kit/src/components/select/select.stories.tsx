import type { Meta, StoryObj } from '@storybook/react';
import { Root, Trigger, Content, Item, Separator, Group, Label } from './select';

type Story = StoryObj<typeof Root>;

const meta: Meta<typeof Root> = {
  component: Root,
  title: 'Components/Select',
  tags: ['autodocs'],
  parameters: {
    radixUrl: 'https://www.radix-ui.com/primitives/docs/components/select',
    radixComponentName: 'Select',
  },
} satisfies Meta<typeof Root>;

export default meta;

export const Basic: Story = {
  render: () => (
    <Root value="one">
      <Trigger style={{ width: 120 }}>Dogs</Trigger>
      <Content>
        <Item value="one">Pass through</Item>
        <Item value="two" disabled>
          Normal
        </Item>
        <Separator />
        <Item value="three">Darken</Item>
        <Item value="three">Multiply</Item>
        <Item value="three">Plus darker</Item>
        <Item value="three">Color burn</Item>
        <Separator />
        <Item value="three">Lighten</Item>
        <Item value="three">Screen</Item>
        <Item value="three">Plus lighter</Item>
        <Item value="three">Color dodge</Item>
        <Separator />
        <Item value="three">Overlay</Item>
        <Item value="three">Soft light</Item>
        <Item value="three">Hard light</Item>
        <Separator />
        <Item value="three">Difference</Item>
        <Item value="three">Exclusion</Item>
        <Separator />
        <Item value="three">Hue</Item>
        <Item value="three">Saturation</Item>
        <Item value="three">Color</Item>
        <Item value="three">Luminosity</Item>
      </Content>
    </Root>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Root value="passthrough">
      <Trigger style={{ width: 120 }}>Dogs</Trigger>
      <Content>
        <Group>
          <Item value="passthrough">Pass through</Item>
          <Item value="normal">Normal</Item>
        </Group>
        <Group>
          <Label>Darker</Label>
          <Item value="darken">Darken</Item>
          <Item value="multiply">Multiply</Item>
          <Item value="plus-darker">Plus darker</Item>
          <Item value="color-burn">Color burn</Item>
        </Group>
        <Group>
          <Label>Lighter</Label>
          <Item value="lighten">Lighten</Item>
          <Item value="screen">Screen</Item>
          <Item value="plus-lighter">Plus lighter</Item>
          <Item value="color-dodge">Color dodge</Item>
        </Group>
        <Group>
          <Label>Contrast</Label>
          <Item value="overlay">Overlay</Item>
          <Item value="soft-light">Soft light</Item>
          <Item value="hard-light">Hard light</Item>
        </Group>
        <Group>
          <Label>Comparative</Label>
          <Item value="difference">Difference</Item>
          <Item value="exclusion">Exclusion</Item>
        </Group>
        <Group>
          <Label>Color</Label>
          <Item value="hue">Hue</Item>
          <Item value="saturation">Saturation</Item>
          <Item value="color">Color</Item>
          <Item value="luminosity">Luminosity</Item>
        </Group>
      </Content>
    </Root>
  ),
};
