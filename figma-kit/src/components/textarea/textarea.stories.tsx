import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './textarea';

type Story = StoryObj<typeof Textarea>;

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  title: 'Components/Textarea',
  decorators: [
    (Story) => {
      return (
        <div style={{ width: 256 }}>
          <Story />
        </div>
      );
    },
  ],
  argTypes: {
    disabled: {
      type: 'boolean',
    },
    minRows: {
      type: 'number',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Textarea that grows vertically to accommodate content.',
      },
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    placeholder: 'Textarea that grows vertically to accommodate content.',
  },
};
