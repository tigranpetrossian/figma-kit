import type { Meta, StoryObj } from '@storybook/react';
import { TooltipProvider } from '@components/tooltip';
import { IconButton } from './icon-button';

type Story = StoryObj<typeof IconButton>;

const PlusIcon = () => {
  return (
    <svg className="svg" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
      <path fillOpacity="1" fillRule="nonzero" stroke="none" d="M5.5 5.5v-5h1v5h5v1h-5v5h-1v-5h-5v-1h5z"></path>
    </svg>
  );
};

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: 'Components/Icon Button',
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;

export const Story: Story = {
  args: {
    'aria-label': 'Add color',
    children: <PlusIcon />,
  },
};
