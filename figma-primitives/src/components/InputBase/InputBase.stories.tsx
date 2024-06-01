import type { Meta, StoryObj } from '@storybook/react';
import { InputBase } from './InputBase';

type Story = StoryObj<typeof InputBase>;

const meta: Meta<typeof InputBase> = {
  component: InputBase,
  argTypes: {
    variant: {
      options: ['normal', 'ghost', 'underline'],
      control: { type: 'radio' },
    },
    disabled: {
      control: { type: 'boolean' },
      type: 'boolean',
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
