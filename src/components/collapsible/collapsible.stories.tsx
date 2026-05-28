import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Checkbox from '@components/checkbox';
import { Flex } from '@components/flex';
import * as Collapsible from './collapsible';

const meta = {
  title: 'Components/Collapsible',
  component: Collapsible.Root,
  decorators: [
    (Story) => {
      return (
        <div style={{ width: 320 }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof Collapsible.Root>;

type Story = StoryObj<typeof meta>;

const Story: Story = {
  render() {
    return (
      <Collapsible.Root>
        <Collapsible.Trigger>State</Collapsible.Trigger>
        <Collapsible.Panel>
          <ContentOptions />
        </Collapsible.Panel>
      </Collapsible.Root>
    );
  },
};

const Nesting: Story = {
  render() {
    return (
      <Collapsible.Root>
        <Collapsible.Trigger>State</Collapsible.Trigger>
        <Collapsible.Panel>
          <Collapsible.Root>
            <Collapsible.Trigger>State</Collapsible.Trigger>
            <Collapsible.Panel>
              <Collapsible.Root>
                <Collapsible.Trigger>State</Collapsible.Trigger>
                <Collapsible.Panel>
                  <Collapsible.Root>
                    <Collapsible.Trigger>State</Collapsible.Trigger>
                    <Collapsible.Panel>
                      <ContentOptions />
                    </Collapsible.Panel>
                  </Collapsible.Root>
                </Collapsible.Panel>
              </Collapsible.Root>
            </Collapsible.Panel>
          </Collapsible.Root>
        </Collapsible.Panel>
      </Collapsible.Root>
    );
  },
};

const ContentOptions = () => {
  return (
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
  );
};

export default meta;
export { Nesting, Story };
