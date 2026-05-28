import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import { IconButton } from '@components/icon-button';
import { CloseIcon, StylesIcon } from '@components/icons';
import { Text } from '@components/text';
import * as Popover from '../popover';
import * as Tabs from './tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs.Root,
} satisfies Meta<typeof Tabs.Root>;

type Story = StoryObj<typeof meta>;

const Story: Story = {
  render() {
    return (
      <Tabs.Root defaultValue="custom">
        <Tabs.List>
          <Tabs.Tab value="custom">Custom</Tabs.Tab>
          <Tabs.Tab value="libraries">Libraries</Tabs.Tab>
          <Tabs.Tab value="carburetors">Carburetors</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="custom">
          <Text>Custom Content</Text>
        </Tabs.Panel>
        <Tabs.Panel value="libraries">
          <Text>Libraries Content</Text>
        </Tabs.Panel>
        <Tabs.Panel value="carburetors">
          <Text>Carburetors Content</Text>
        </Tabs.Panel>
      </Tabs.Root>
    );
  },
};

const WithinPopover: Story = {
  render() {
    return <TabsInPopover />;
  },
};

const TabsInPopover = () => {
  const [activeTab, setActiveTab] = useState('custom');
  const closeRef = useRef<HTMLButtonElement>(null);

  return (
    <Tabs.Root value={activeTab} onValueChange={setActiveTab} style={{ display: 'contents' }}>
      <Popover.Root>
        <Popover.Trigger>
          <IconButton aria-label="Styles and variables">
            <StylesIcon />
          </IconButton>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner>
            <Popover.Popup initialFocus={closeRef} style={{ width: 300 }}>
              <Popover.Header>
                <Tabs.List>
                  <Tabs.Tab value="custom">Custom</Tabs.Tab>
                  <Tabs.Tab value="libraries">Libraries</Tabs.Tab>
                  <Tabs.Tab value="carburetors">Carburetors</Tabs.Tab>
                </Tabs.List>
                <Popover.Controls>
                  <Popover.Close>
                    <IconButton ref={closeRef} aria-label="Close" disableTooltip>
                      <CloseIcon />
                    </IconButton>
                  </Popover.Close>
                </Popover.Controls>
              </Popover.Header>
              <Popover.Section>
                <Tabs.Panel value="custom">
                  <Text>Custom Content</Text>
                </Tabs.Panel>
                <Tabs.Panel value="libraries">
                  <Text>Libraries Content</Text>
                </Tabs.Panel>
                <Tabs.Panel value="carburetors">
                  <Text>Carburetors Content</Text>
                </Tabs.Panel>
              </Popover.Section>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </Tabs.Root>
  );
};

export default meta;
export { Story, WithinPopover };
