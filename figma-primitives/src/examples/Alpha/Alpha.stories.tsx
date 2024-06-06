import type { Meta, StoryObj } from '@storybook/react';
import { Alpha } from './Alpha';

type Story = StoryObj<typeof Alpha>;

const meta: Meta<typeof Alpha> = {
  component: Alpha,
};

export default meta;

export const Story: Story = {
  args: {},
};
