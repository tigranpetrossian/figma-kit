import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

type Story = StoryObj<typeof Button>;

const meta = {
  component: Button,
  title: 'Components/Button',
  args: {
    variant: undefined,
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
  argTypes: {
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
      options: ['primary', 'secondary', 'inverse', 'destructive', 'success', 'text'],
      control: { type: 'radio' },
    },
    size: {
      description: 'Size of the button.',
      type: 'string',
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
    fullWidth: {
      description: 'Set to `true` for the button to fill its parent container.',
      type: 'boolean',
    },
    disabled: {
      description: 'Set to `true` to disable the button.',
      type: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
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
