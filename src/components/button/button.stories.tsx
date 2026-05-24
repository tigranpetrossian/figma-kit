import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';

const meta = {
  component: Button,
  title: 'Components/Button',
  args: {
    size: 'small',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'inverse', 'destructive', 'success', 'text'],
    },
    size: {
      control: 'radio',
      options: ['small', 'medium'],
    },
    fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
};

const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
};

const Inverse: Story = {
  args: {
    variant: 'inverse',
    children: 'Inverse',
  },
};

const Text: Story = {
  args: {
    variant: 'text',
    children: 'Text',
  },
};

export default meta;
export { Destructive, Inverse, Primary, Secondary, Success, Text };
