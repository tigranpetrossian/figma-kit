import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './slider';

type Story = StoryObj<typeof Slider>;

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  tags: ['autodocs'],
  component: Slider,
  decorators: [
    (Story) => {
      return (
        <div>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;

export const Horizontal: Story = {
  decorators: [
    (Story) => {
      return (
        <div style={{ width: 200 }}>
          <Story />
        </div>
      );
    },
  ],
  args: {},
};

export const Vertical: Story = {
  decorators: [
    (Story) => {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 200 }}>
          <Story />
        </div>
      );
    },
  ],
  args: {
    orientation: 'vertical',
  },
};
