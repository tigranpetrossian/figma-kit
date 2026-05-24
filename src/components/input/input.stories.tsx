import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './input';

const meta = {
  component: Input,
  title: 'Components/Input',
  args: {
    disabled: false,
  },
  argTypes: {
    selectOnClick: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof meta>;

const Basic: Story = {
  args: {
    placeholder: 'Basic input',
  },
};

const SelectOnClick: Story = {
  args: {
    value: 'Some value',
    selectOnClick: true,
  },
};

export default meta;
export { Basic, SelectOnClick };
