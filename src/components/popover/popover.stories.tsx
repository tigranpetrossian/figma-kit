import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from '@components/icon-button';
import { PlusIcon, StylesIcon } from '@components/icons';
import { Tooltip } from '@components/tooltip';
import * as Popover from '@components/popover';

const meta = {
  title: 'Components/Popover',
  component: Popover.Root,
} satisfies Meta<typeof Popover.Root>;

type Story = StoryObj<typeof meta>;

const Story: Story = {
  render() {
    return (
      <Popover.Root>
        <Tooltip content="Styles and variables">
          <Popover.Trigger render={<IconButton aria-label="Styles and variables" />}>
            <StylesIcon />
          </Popover.Trigger>
        </Tooltip>
        <Popover.Portal>
          <Popover.Positioner>
            <Popover.Popup style={{ width: 228 }}>
              <Popover.Header>
                <Popover.Title>Text styles</Popover.Title>
                <Popover.Controls>
                  <IconButton aria-label="New style">
                    <PlusIcon />
                  </IconButton>
                  <Popover.Close />
                </Popover.Controls>
              </Popover.Header>
              <Popover.Section />
              <Popover.Section size="small" />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    );
  },
};

export default meta;
export { Story };
