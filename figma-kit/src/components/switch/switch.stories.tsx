import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './switch';

type Story = StoryObj<typeof Switch>;

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: 'Components/Switch',
};

export default meta;

// Limitation - no Mixed state support
export const Basic: Story = {
  render: () => <Switch />,
};

export const Disabled: Story = {
  render: () => <Switch checked={true} disabled />,
};
