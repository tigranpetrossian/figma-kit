import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './textarea';

const meta = {
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
      control: 'boolean',
    },
    minRows: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Textarea>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  args: {
    placeholder: 'Textarea that grows vertically to accommodate content.',
  },
};

export default meta;
export { Default };
