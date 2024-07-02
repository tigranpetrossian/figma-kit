import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Text } from '@components/text';
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

export const Simple: Story = {
  render() {
    return (
      <ContextMenu.Root>
        <ContextMenu.Trigger asChild>
          <Text
            size="large"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 200,
              height: 80,
              border: '1px solid #e6e6e6',
              borderRadius: 5,
            }}
          >
            Right click here
          </Text>
        </ContextMenu.Trigger>
        <ContextMenu.Content style={{ minWidth: 200 }}>
          <ContextMenu.Item>Paste here</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Show/Hide UI</ContextMenu.Item>
          <ContextMenu.Item>Show/Hide comments</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Cursor chat</ContextMenu.Item>
          <ContextMenu.Item>Quick actions</ContextMenu.Item>
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>Plugins</ContextMenu.SubTrigger>
            <ContextMenu.SubContent>
              <ContextMenu.Label>Recents</ContextMenu.Label>
              <ContextMenu.Item>Bold Blobs</ContextMenu.Item>
              <ContextMenu.Item>Noise & Texture</ContextMenu.Item>
              <ContextMenu.Item>Beautiful Shadows</ContextMenu.Item>
              <ContextMenu.Item>A11y - Color Contrast Checker</ContextMenu.Item>
              <ContextMenu.Item>Color Compass</ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.Item>Run last plugin</ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.Sub>
                <ContextMenu.SubTrigger>Development</ContextMenu.SubTrigger>
                <ContextMenu.SubContent>
                  <ContextMenu.Item>New plugin…</ContextMenu.Item>
                  <ContextMenu.Item>Import plugin from manifest…</ContextMenu.Item>
                  <ContextMenu.Separator />
                  <ContextMenu.Item>View API Documentation</ContextMenu.Item>
                  <ContextMenu.Item>Show/Hide console</ContextMenu.Item>
                  <ContextMenu.Item>Use developer VM</ContextMenu.Item>
                  <ContextMenu.Item>Hot reload plugin</ContextMenu.Item>
                </ContextMenu.SubContent>
              </ContextMenu.Sub>
              <ContextMenu.Separator />
              <ContextMenu.Item>Manage plugins…</ContextMenu.Item>
            </ContextMenu.SubContent>
          </ContextMenu.Sub>
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>Widgets</ContextMenu.SubTrigger>
            <ContextMenu.SubContent style={{ minWidth: 200 }}>
              <ContextMenu.Item>Manage widgets…</ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.Item>Select all widgets</ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.Sub>
                <ContextMenu.SubTrigger>Development</ContextMenu.SubTrigger>
                <ContextMenu.SubContent>
                  <ContextMenu.Item>New widget…</ContextMenu.Item>
                  <ContextMenu.Item>Import widget from manifest…</ContextMenu.Item>
                  <ContextMenu.Separator />
                  <ContextMenu.Item>Show/Hide console</ContextMenu.Item>
                  <ContextMenu.Item>Use developer VM</ContextMenu.Item>
                </ContextMenu.SubContent>
              </ContextMenu.Sub>
            </ContextMenu.SubContent>
          </ContextMenu.Sub>
        </ContextMenu.Content>
      </ContextMenu.Root>
    );
  },
};

export const WithCheckboxes: Story = {
  render() {
    return (
      <ContextMenu.Root>
        <ContextMenu.Trigger asChild>
          <Text
            size="large"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 200,
              height: 80,
              border: '1px solid #e6e6e6',
              borderRadius: 5,
            }}
          >
            Right click here
          </Text>
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
        </ContextMenu.Content>
      </ContextMenu.Root>
    );
  },
};
