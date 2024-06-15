import type { Meta, StoryObj } from '@storybook/react';
import { Root, Thumb } from './switch';

type Story = StoryObj<typeof Root>;

const meta: Meta<typeof Root> = {
  component: Root,
  title: 'Components/Switch',
};

export default meta;

// Limitation - no Mixed state support

export const Basic: Story = {
  render: () => (
    <Root>
      <Thumb />
    </Root>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Root checked={true} disabled>
      <Thumb />
    </Root>
  ),
};
