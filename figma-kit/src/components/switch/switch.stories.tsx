import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './switch';

type Story = StoryObj<typeof Switch>;

const meta = {
  component: Switch,
  title: 'Components/Switch',
} satisfies Meta<typeof Switch>;

export default meta;

// Limitation - no Mixed state support
export const Unchecked: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};
