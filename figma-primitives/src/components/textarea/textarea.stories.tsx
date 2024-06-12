import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './textarea';

type Story = StoryObj<typeof Textarea>;

const meta: Meta<typeof Textarea> = {
  component: Textarea,
};

export default meta;

export const Basic: Story = {
  args: {
    placeholder: 'What is it for?',
  },
};
