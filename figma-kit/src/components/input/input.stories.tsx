import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

type Story = StoryObj<typeof Input>;

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Components/Input',
  tags: ['autodocs'],
  args: {
    placeholder: '',
    disabled: false,
  },
  argTypes: {
    selectOnClick: {
      type: 'boolean',
      description: 'Enable content selection on click.',
    },
  },
};

export default meta;

export const Basic: Story = {
  args: {
    placeholder: 'Basic input',
  },
};

export const SelectOnClick: Story = {
  args: {
    value: 'Some value',
    selectOnClick: true,
  },
};
