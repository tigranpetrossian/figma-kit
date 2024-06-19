import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TooltipProvider } from '@components/tooltip';
import { PlusIcon } from '@components/icons';
import { IconButton } from './icon-button';

type Story = StoryObj<typeof IconButton>;

const meta = {
  component: IconButton,
  tags: ['autodocs'],
  title: 'Components/Icon Button',
  argTypes: {
    'aria-label': {
      description: 'Text for screen readers, also used as tooltip text by default.',
      type: {
        name: 'string',
        required: true,
      },
    },
    tooltipContent: {
      description: 'Custom content for the tooltip. Defaults to aria-label if not specified.',
      type: 'string',
    },
    disableTooltip: {
      description: "Disables the tooltip. Use sparingly when the button's function is clear.",
      type: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof IconButton>;

export default meta;

export const Story: Story = {
  args: {
    children: <PlusIcon />,
  },
};
