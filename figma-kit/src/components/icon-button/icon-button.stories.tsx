import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TooltipProvider } from '@components/tooltip';
import { PlusIcon } from '@components/icons';
import { IconButton } from './icon-button';

type Story = StoryObj<typeof IconButton>;

const meta = {
  component: IconButton,
  title: 'Components/Icon Button',
  parameters: { controls: { expanded: true } },
  argTypes: {
    'aria-label': {
      description: 'Text for screen readers, also used as tooltip text by default.',
      type: {
        name: 'string',
        required: true,
      },
    },
    variant: {
      description: 'Size of the button.',
      type: 'string',
      table: {
        type: {
          summary: 'enum',
        },
        defaultValue: {
          summary: 'default',
        },
      },
      options: ['default', 'toolbar'],
      control: { type: 'radio' },
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
    'aria-label': 'New style',
    children: <PlusIcon />,
  },
};
