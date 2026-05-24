import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './switch';

const meta = {
  component: Switch,
  title: 'Components/Switch',
  argTypes: {
    defaultChecked: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    name: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Switch>;

type Story = StoryObj<typeof meta>;

const Unchecked: Story = {
  args: {},
};

const Checked: Story = {
  args: {
    checked: true,
  },
};

const Disabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};

export default meta;
export { Checked, Disabled, Unchecked };
