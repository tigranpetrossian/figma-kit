import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { IconButton } from '@components/icon-button';
import { PlusIcon, StylesIcon } from '@components/icons';
import * as Popover from './popover';

type Story = StoryObj<typeof Popover.Root>;

const meta: Meta<typeof Popover.Root> = {
  title: 'Components/Popover',
  component: Popover.Root,
};

export default meta;

export const Story: Story = {
  args: {},
  render: () => {
    return (
      <Popover.Root>
        <Popover.Trigger asChild>
          <IconButton aria-label="Styles and variables">
            <StylesIcon />
          </IconButton>
        </Popover.Trigger>
        <Popover.Content align="start" side="right">
          <Popover.Header>
            <Popover.Title>Text styles</Popover.Title>
            <Popover.Controls>
              <IconButton aria-label="New style" disableTooltip>
                <PlusIcon />
              </IconButton>

              <Popover.Close />
            </Popover.Controls>
          </Popover.Header>
          <Popover.Section></Popover.Section>
          <Popover.Section size="small"></Popover.Section>
        </Popover.Content>
      </Popover.Root>
    );
  },
};