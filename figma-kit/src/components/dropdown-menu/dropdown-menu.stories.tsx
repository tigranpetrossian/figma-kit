import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '@components/button';
import * as DropdownMenu from './dropdown-menu';

type Story = StoryObj<typeof DropdownMenu.Root>;

const meta = {
  component: DropdownMenu.Root,
  title: 'Components/Dropdown Menu',
  tags: ['autodocs'],
  parameters: {
    radixUrl: 'https://www.radix-ui.com/primitives/docs/components/dropdown-menu',
    radixComponentName: 'Dropdown Menu',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '0 100px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropdownMenu.Root>;

export default meta;

export const Story: Story = {
  render: (args) => {
    return (
      <DropdownMenu.Root {...args}>
        <DropdownMenu.Trigger asChild>
          <Button>Menu</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content style={{ minWidth: 200 }}>
          <DropdownMenu.Item>Show version history</DropdownMenu.Item>
          <DropdownMenu.Item>Publish library…</DropdownMenu.Item>
          <DropdownMenu.Item>Export…</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Add to sidebar</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Create branch…</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>File color profile...</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.CheckboxItem checked>Display P3</DropdownMenu.CheckboxItem>
              <DropdownMenu.CheckboxItem>Change to sRGB</DropdownMenu.CheckboxItem>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
          <DropdownMenu.Item>Rename</DropdownMenu.Item>
          <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
          <DropdownMenu.Item>Delete…</DropdownMenu.Item>
          <DropdownMenu.RadioGroup value="this">
            <DropdownMenu.RadioItem value="this">This</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="orthis">Or this</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="orthisone">Or this one</DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
          <DropdownMenu.CheckboxItem checked>Display P3</DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem>Change to sRGB</DropdownMenu.CheckboxItem>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  },
};
