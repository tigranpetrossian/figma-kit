import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { Button } from '@components/button';
import { Tooltip, TooltipProvider } from './tooltip';

type TooltipStoryArgs = Pick<ComponentProps<typeof Tooltip>, 'children' | 'content'>;

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
} satisfies Meta<TooltipStoryArgs>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  args: {
    content: 'Create a new layer',
    children: <Button>Add layer</Button>,
  },
  render(args) {
    return (
      <TooltipProvider delay={0}>
        <Tooltip {...args} />
      </TooltipProvider>
    );
  },
};

const LongContent: Story = {
  args: {
    content: 'Hold Shift while dragging to preserve the current aspect ratio.',
    children: <Button>Resize</Button>,
  },
  render(args) {
    return (
      <TooltipProvider delay={0}>
        <Tooltip {...args} />
      </TooltipProvider>
    );
  },
};

export default meta;
export { Default, LongContent };
