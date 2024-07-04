import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TooltipProvider } from '@components/tooltip';
import { PlusIcon, StylesIcon } from '@components/icons';
import * as Popover from '@components/popover';
import { Text } from '@components/text';
import { IconButton } from './icon-button';

type Story = StoryObj<typeof IconButton>;

const meta: Meta<typeof IconButton> = {
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
    size: {
      description: 'Size of the button.',
      table: {
        type: {
          summary: 'enum',
        },
        defaultValue: {
          summary: 'small',
        },
      },
      options: ['small', 'medium'],
      control: { type: 'radio' },
    },
    activeAppearance: {
      description: 'Appearance of the button when in active/pressed mode',
      table: {
        type: {
          summary: 'enum',
        },
        defaultValue: {
          summary: 'subtle',
        },
      },
      options: ['subtle', 'solid'],
      control: { type: 'radio' },
    },
    disabled: {
      type: 'boolean',
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
};

export default meta;

const code = `
<IconButton aria-label="Styles">
  <StylesIcon />
</IconButton>
`;

export const Default: Story = {
  parameters: {
    storySource: {
      source: code,
    },
  },
  render: (args) => {
    return (
      <Popover.Root>
        <Popover.Trigger>
          <IconButton {...args}>
            <StylesIcon />
          </IconButton>
        </Popover.Trigger>
        <Popover.Content width={300} maxWidth="100vw">
          <Popover.Header>
            <Popover.Title>Popover</Popover.Title>
            <Popover.Controls>
              <Popover.Close />
            </Popover.Controls>
          </Popover.Header>
          <Popover.Section>
            <Text>A sample popover for demonstrating icon button active state.</Text>
          </Popover.Section>
        </Popover.Content>
      </Popover.Root>
    );
  },
  args: {
    'aria-label': 'Open popover',
    activeAppearance: 'subtle',
    size: 'small',
    children: <PlusIcon />,
  },
};
