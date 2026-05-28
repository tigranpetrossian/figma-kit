import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { CheckmarkIcon } from '@components/icons';
import { Text } from '@components/text';
import * as ContextMenu from './context-menu';

const meta = {
  component: ContextMenu.Root,
  title: 'Components/Context Menu',
  decorators: [
    (Story) => {
      return (
        <div style={{ padding: 100 }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof ContextMenu.Root>;

type Story = StoryObj<typeof meta>;

const Simple: Story = {
  render() {
    return (
      <ContextMenu.Root>
        <ContextMenu.Trigger render={<Text size="large" style={triggerStyle} />}>Right click here</ContextMenu.Trigger>
        <ContextMenu.Portal>
          <ContextMenu.Positioner sideOffset={0}>
            <ContextMenu.Popup style={{ minWidth: 200 }}>
              <ContextMenu.Item>Paste here</ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.Item>Show/Hide UI</ContextMenu.Item>
              <ContextMenu.Item>Show/Hide comments</ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.Item>Cursor chat</ContextMenu.Item>
              <ContextMenu.Item>Quick actions</ContextMenu.Item>
              <ContextMenu.SubmenuRoot>
                <ContextMenu.SubmenuTrigger>Plugins</ContextMenu.SubmenuTrigger>
                <ContextMenu.Portal>
                  <ContextMenu.Positioner
                    sideOffset={12}
                    collisionAvoidance={submenuCollisionAvoidance}
                    collisionPadding={0}
                  >
                    <ContextMenu.Popup>
                      <ContextMenu.Group>
                        <ContextMenu.GroupLabel>Recents</ContextMenu.GroupLabel>
                        <ContextMenu.Item>OkColor</ContextMenu.Item>
                        <ContextMenu.Item>Noise & Texture</ContextMenu.Item>
                        <ContextMenu.Item>Bold Blobs</ContextMenu.Item>
                        <ContextMenu.Item>Beautiful Shadows</ContextMenu.Item>
                        <ContextMenu.Item>A11y - Color Contrast Checker</ContextMenu.Item>
                        <ContextMenu.Item>Color Compass</ContextMenu.Item>
                      </ContextMenu.Group>
                      <ContextMenu.Separator />
                      <ContextMenu.Item>Run last plugin</ContextMenu.Item>
                      <ContextMenu.Separator />
                      <ContextMenu.SubmenuRoot>
                        <ContextMenu.SubmenuTrigger>Development</ContextMenu.SubmenuTrigger>
                        <ContextMenu.Portal>
                          <ContextMenu.Positioner
                            sideOffset={12}
                            collisionAvoidance={submenuCollisionAvoidance}
                            collisionPadding={0}
                          >
                            <ContextMenu.Popup>
                              <ContextMenu.Item>New plugin…</ContextMenu.Item>
                              <ContextMenu.Item>Import plugin from manifest…</ContextMenu.Item>
                              <ContextMenu.Separator />
                              <ContextMenu.Item>View API Documentation</ContextMenu.Item>
                              <ContextMenu.Item>Show/Hide console</ContextMenu.Item>
                              <ContextMenu.Item>Use developer VM</ContextMenu.Item>
                              <ContextMenu.Item>Hot reload plugin</ContextMenu.Item>
                            </ContextMenu.Popup>
                          </ContextMenu.Positioner>
                        </ContextMenu.Portal>
                      </ContextMenu.SubmenuRoot>
                      <ContextMenu.Separator />
                      <ContextMenu.Item>Manage plugins…</ContextMenu.Item>
                    </ContextMenu.Popup>
                  </ContextMenu.Positioner>
                </ContextMenu.Portal>
              </ContextMenu.SubmenuRoot>
              <ContextMenu.SubmenuRoot>
                <ContextMenu.SubmenuTrigger>Widgets</ContextMenu.SubmenuTrigger>
                <ContextMenu.Portal>
                  <ContextMenu.Positioner
                    sideOffset={12}
                    collisionAvoidance={submenuCollisionAvoidance}
                    collisionPadding={0}
                  >
                    <ContextMenu.Popup style={{ minWidth: 200 }}>
                      <ContextMenu.Item>Manage widgets…</ContextMenu.Item>
                      <ContextMenu.Separator />
                      <ContextMenu.Item>Select all widgets</ContextMenu.Item>
                      <ContextMenu.Separator />
                      <ContextMenu.SubmenuRoot>
                        <ContextMenu.SubmenuTrigger>Development</ContextMenu.SubmenuTrigger>
                        <ContextMenu.Portal>
                          <ContextMenu.Positioner
                            sideOffset={12}
                            collisionAvoidance={submenuCollisionAvoidance}
                            collisionPadding={0}
                          >
                            <ContextMenu.Popup>
                              <ContextMenu.Item>New widget…</ContextMenu.Item>
                              <ContextMenu.Item>Import widget from manifest…</ContextMenu.Item>
                              <ContextMenu.Separator />
                              <ContextMenu.Item>Show/Hide console</ContextMenu.Item>
                              <ContextMenu.Item>Use developer VM</ContextMenu.Item>
                            </ContextMenu.Popup>
                          </ContextMenu.Positioner>
                        </ContextMenu.Portal>
                      </ContextMenu.SubmenuRoot>
                    </ContextMenu.Popup>
                  </ContextMenu.Positioner>
                </ContextMenu.Portal>
              </ContextMenu.SubmenuRoot>
            </ContextMenu.Popup>
          </ContextMenu.Positioner>
        </ContextMenu.Portal>
      </ContextMenu.Root>
    );
  },
};

const WithCheckboxes: Story = {
  render() {
    return (
      <ContextMenu.Root>
        <ContextMenu.Trigger render={<Text size="large" style={triggerStyle} />}>Right click here</ContextMenu.Trigger>
        <ContextMenu.Portal>
          <ContextMenu.Positioner sideOffset={0}>
            <ContextMenu.Popup style={{ minWidth: 200 }}>
              <ContextMenu.Item>Show version history</ContextMenu.Item>
              <ContextMenu.Item>Publish library…</ContextMenu.Item>
              <ContextMenu.Item>Export…</ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.Item>Add to sidebar</ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.Item>Create branch…</ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.SubmenuRoot>
                <ContextMenu.SubmenuTrigger>File color profile...</ContextMenu.SubmenuTrigger>
                <ContextMenu.Portal>
                  <ContextMenu.Positioner
                    sideOffset={12}
                    collisionAvoidance={submenuCollisionAvoidance}
                    collisionPadding={0}
                  >
                    <ContextMenu.Popup>
                      <ContextMenu.CheckboxItem checked>
                        <ContextMenu.CheckboxItemIndicator>
                          <CheckmarkIcon size="4" />
                        </ContextMenu.CheckboxItemIndicator>
                        Display P3
                      </ContextMenu.CheckboxItem>
                      <ContextMenu.CheckboxItem>Change to sRGB</ContextMenu.CheckboxItem>
                    </ContextMenu.Popup>
                  </ContextMenu.Positioner>
                </ContextMenu.Portal>
              </ContextMenu.SubmenuRoot>
              <ContextMenu.Separator />
              <ContextMenu.Item>Duplicate</ContextMenu.Item>
              <ContextMenu.Item>Rename</ContextMenu.Item>
              <ContextMenu.Item>Move to project…</ContextMenu.Item>
              <ContextMenu.Item>Delete…</ContextMenu.Item>
            </ContextMenu.Popup>
          </ContextMenu.Positioner>
        </ContextMenu.Portal>
      </ContextMenu.Root>
    );
  },
};

const triggerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 200,
  height: 80,
  border: '1px solid var(--figma-color-border)',
  borderRadius: 5,
};

const submenuCollisionAvoidance: NonNullable<ContextMenu.PositionerProps['collisionAvoidance']> = {
  side: 'shift',
  align: 'shift',
  fallbackAxisSide: 'none',
};

export default meta;
export { Simple, WithCheckboxes };
