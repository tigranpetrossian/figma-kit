import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '@components/flex';
import { Checkbox } from '../../index';
import * as Collapsible from './collapsible';

type Story = StoryObj<typeof Collapsible.Root>;

const meta: Meta<typeof Collapsible.Root> = {
  title: 'Components/Collapsible',
  component: Collapsible.Root,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ width: 320, margin: '100px auto' }}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;

export const Story: Story = {
  args: {},
  render: () => {
    return (
      <Collapsible.Root>
        <Collapsible.Trigger>State</Collapsible.Trigger>
        <Collapsible.Content>
          <Flex direction="column" gap="2">
            <Checkbox.Root>
              <Checkbox.Input />
              <Checkbox.Label>Reset scroll position</Checkbox.Label>
            </Checkbox.Root>
            <Checkbox.Root>
              <Checkbox.Input />
              <Checkbox.Label>Reset component state</Checkbox.Label>
            </Checkbox.Root>
            <Checkbox.Root>
              <Checkbox.Input />
              <Checkbox.Label>Reset video state</Checkbox.Label>
            </Checkbox.Root>
          </Flex>
        </Collapsible.Content>
      </Collapsible.Root>
    );
  },
};

export const Nesting: Story = {
  args: {},
  render: () => {
    return (
      <Collapsible.Root>
        <Collapsible.Trigger>State</Collapsible.Trigger>
        <Collapsible.Content>
          <Collapsible.Root>
            <Collapsible.Trigger>State</Collapsible.Trigger>
            <Collapsible.Content>
              <Collapsible.Root>
                <Collapsible.Trigger>State</Collapsible.Trigger>
                <Collapsible.Content>
                  <Collapsible.Root>
                    <Collapsible.Trigger>State</Collapsible.Trigger>
                    <Collapsible.Content>
                      <Flex direction="column" gap="2">
                        <Checkbox.Root>
                          <Checkbox.Input />
                          <Checkbox.Label>Reset scroll position</Checkbox.Label>
                        </Checkbox.Root>
                        <Checkbox.Root>
                          <Checkbox.Input />
                          <Checkbox.Label>Reset component state</Checkbox.Label>
                        </Checkbox.Root>
                        <Checkbox.Root>
                          <Checkbox.Input />
                          <Checkbox.Label>Reset video state</Checkbox.Label>
                        </Checkbox.Root>
                      </Flex>
                    </Collapsible.Content>
                  </Collapsible.Root>
                </Collapsible.Content>
              </Collapsible.Root>
            </Collapsible.Content>
          </Collapsible.Root>
        </Collapsible.Content>
      </Collapsible.Root>
    );
  },
};
