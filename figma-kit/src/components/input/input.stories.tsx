import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

type Story = StoryObj<typeof Input>;

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Components/Input',
  tags: ['autodocs'],
  args: {
    variant: 'normal',
    value: '',
    placeholder: '',
    disabled: false,
  },
  argTypes: {
    variant: {
      options: ['normal', 'ghost', 'underline', 'base'],
      control: { type: 'radio' },
    },
    selectOnClick: {
      type: 'boolean',
      description: 'Enable content selection on click.',
    },
  },
};

export default meta;

export const Normal: Story = {
  args: {
    variant: 'normal',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    placeholder: 'Ghost',
  },
};

export const Underline: Story = {
  args: {
    variant: 'underline',
    placeholder: 'Suffix',
  },
};

export const SelectOnClick: Story = {
  args: {
    value: 'Some value',
    selectOnClick: true,
  },
};
