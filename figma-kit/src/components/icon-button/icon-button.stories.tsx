import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TooltipProvider } from '@components/tooltip';
import { PlusIcon } from '@components/icons';
import { IconButton } from './icon-button';

type Story = StoryObj<typeof IconButton>;

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: 'Components/Icon Button',
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;

export const Story: Story = {
  args: {
    'aria-label': 'Add color',
    children: <PlusIcon />,
  },
};
