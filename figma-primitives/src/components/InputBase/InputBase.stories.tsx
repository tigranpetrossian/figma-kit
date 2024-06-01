import type { Meta, StoryObj } from '@storybook/react';
import { InputBase } from './InputBase';

type Story = StoryObj<typeof InputBase>;

const meta: Meta<typeof InputBase> = {
  component: InputBase,
};

export default meta;

export const Story: Story = {
  args: {},
};
