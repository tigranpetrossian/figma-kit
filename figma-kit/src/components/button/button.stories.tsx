import type { Meta, StoryObj } from '@storybook/react';
import { PlusIcon } from '@components/icons';
import { Button } from './button';

type Story = StoryObj<typeof Button>;

const meta = {
  component: Button,
  title: 'Components/Button',
  tags: ['autodocs'],
  args: {
    variant: undefined,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    variant: {
      description: 'Contextual variant of the button.',
      type: 'string',
      table: {
        type: {
          summary: 'enum',
        },
        defaultValue: {
          summary: 'secondary',
        },
      },
      options: ['primary', 'secondary', 'inverse', 'destructive', 'destructiveSecondary', 'success', 'text'],
      control: { type: 'radio' },
    },
    fullWidth: {
      description: 'Set to `true`, for the button to fill its parent',
      type: 'boolean',
    },
    disabled: {
      type: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};
export const DestructiveSecondary: Story = {
  args: {
    variant: 'destructiveSecondary',
    children: 'Destructive Secondary',
  },
};
export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
};
export const Inverse: Story = {
  args: {
    variant: 'inverse',
    children: 'Inverse',
  },
};
export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Text',
  },
};
export const IconLeft: Story = {
  name: 'Icon on the left',
  args: {
    variant: 'secondary',
    children: (
      <>
        <PlusIcon size="3" />
        With icon
      </>
    ),
  },
};
export const IconRight: Story = {
  name: 'Icon on the right',
  args: {
    variant: 'secondary',
    children: (
      <>
        With icon
        <PlusIcon size="3" />
      </>
    ),
  },
};
