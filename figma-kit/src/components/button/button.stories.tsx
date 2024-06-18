import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Button',
  args: {
    variant: undefined,
    disabled: false,
  },
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'inverse', 'destructive', 'destructiveSecondary', 'success', 'text'],
      control: { type: 'radio' },
    },
    disabled: {
      control: 'boolean',
    },
  },
};

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
