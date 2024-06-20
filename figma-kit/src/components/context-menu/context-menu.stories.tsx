import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import * as ContextMenu from './context-menu';

type Story = StoryObj<typeof ContextMenu.Root>;

const meta: Meta<typeof ContextMenu.Root> = {
  component: ContextMenu.Root,
  title: 'Components/Context Menu',
  tags: ['autodocs'],
  parameters: {
    radixUrl: 'https://www.radix-ui.com/primitives/docs/components/context-menu',
    radixComponentName: 'Context Menu',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 100 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Story: Story = {
  render() {
    return (
      <ContextMenu.Root>
        <ContextMenu.Trigger asChild>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 200,
              height: 80,
              border: '1px solid black',
              borderRadius: 2,
            }}
          >
            Right click here
          </div>
        </ContextMenu.Trigger>
        <ContextMenu.Content style={{ minWidth: 200 }}>
          <ContextMenu.Item>Show version history</ContextMenu.Item>
          <ContextMenu.Item>Publish library…</ContextMenu.Item>
          <ContextMenu.Item>Export…</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Add to sidebar</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Create branch…</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>File color profile...</ContextMenu.SubTrigger>
            <ContextMenu.SubContent>
              <ContextMenu.CheckboxItem checked>Display P3</ContextMenu.CheckboxItem>
              <ContextMenu.CheckboxItem>Change to sRGB</ContextMenu.CheckboxItem>
            </ContextMenu.SubContent>
          </ContextMenu.Sub>
          <ContextMenu.Separator />
          <ContextMenu.Item>Duplicate</ContextMenu.Item>
          <ContextMenu.Item>Rename</ContextMenu.Item>
          <ContextMenu.Item>Move to project…</ContextMenu.Item>
          <ContextMenu.Item>Delete…</ContextMenu.Item>
          <ContextMenu.RadioGroup value="this">
            <ContextMenu.RadioItem value="this">This</ContextMenu.RadioItem>
            <ContextMenu.RadioItem value="orthis">Or this</ContextMenu.RadioItem>
            <ContextMenu.RadioItem value="orthisone">Or this one</ContextMenu.RadioItem>
          </ContextMenu.RadioGroup>
          <ContextMenu.CheckboxItem checked>Display P3</ContextMenu.CheckboxItem>
          <ContextMenu.CheckboxItem>Change to sRGB</ContextMenu.CheckboxItem>
        </ContextMenu.Content>
      </ContextMenu.Root>
    );
  },
};
