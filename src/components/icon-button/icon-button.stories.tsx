import type { Meta, StoryObj } from '@storybook/react-vite';
import { PlusIcon, StylesIcon } from '@components/icons';
import * as Popover from '@components/popover';
import { Text } from '@components/text';
import { Tooltip } from '@components/tooltip';
import { IconButton } from './icon-button';

const meta = {
  component: IconButton,
  title: 'Components/Icon Button',
  args: {
    'aria-label': 'Open popover',
    activeAppearance: 'subtle',
    size: 'small',
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium'],
    },
    activeAppearance: {
      control: 'radio',
      options: ['subtle', 'solid'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof IconButton>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  render(args) {
    return (
      <Popover.Root>
        <Popover.Trigger
          render={
            <IconButton {...args}>
              <StylesIcon />
            </IconButton>
          }
        />
        <Popover.Portal>
          <Popover.Positioner>
            <Popover.Popup style={{ width: 300, maxWidth: '100vw' }}>
              <Popover.Header>
                <Popover.Title>Popover</Popover.Title>
                <Popover.Controls>
                  <Popover.Close />
                </Popover.Controls>
              </Popover.Header>
              <Popover.Section>
                <Text>A sample popover for demonstrating icon button active state.</Text>
              </Popover.Section>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    );
  },
};

const WithCustomIcon: Story = {
  args: {
    'aria-label': 'Add item',
  },
  render(args) {
    return (
      <IconButton {...args}>
        <PlusIcon />
      </IconButton>
    );
  },
};

const WithTooltip: Story = {
  args: {
    'aria-label': 'Add item',
  },
  render(args) {
    return (
      <Tooltip content="Add item">
        <IconButton {...args}>
          <PlusIcon />
        </IconButton>
      </Tooltip>
    );
  },
};

export default meta;
export { Default, WithCustomIcon, WithTooltip };
