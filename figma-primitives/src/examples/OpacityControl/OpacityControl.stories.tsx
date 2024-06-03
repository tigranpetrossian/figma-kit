import type { Meta, StoryObj } from '@storybook/react';
import { OpacityControl } from './OpacityControl';

type Story = StoryObj<typeof OpacityControl>;

const meta: Meta<typeof OpacityControl> = {
  component: OpacityControl,
};

export default meta;

export const Story: Story = {
  args: {},
};
