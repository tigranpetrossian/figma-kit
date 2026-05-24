import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from './flex';

const meta = {
  title: 'Components/Flex',
  component: Flex,
  argTypes: {
    direction: {
      control: 'radio',
      options: ['row', 'column', 'rowReverse', 'columnReverse'],
    },
    align: {
      control: 'radio',
      options: ['start', 'center', 'end', 'baseline', 'stretch'],
    },
    justify: {
      control: 'radio',
      options: ['start', 'center', 'end', 'between'],
    },
    wrap: {
      control: 'radio',
      options: ['nowrap', 'wrap', 'wrapReverse'],
    },
    gap: {
      control: 'select',
      options: ['0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8'],
    },
  },
} satisfies Meta<typeof Flex>;

type Story = StoryObj<typeof meta>;

const Story: Story = {
  args: {
    align: 'center',
    justify: 'center',
    gap: '2',
  },
  render(args) {
    return (
      <Flex {...args}>
        <PreviewBox />
        <PreviewBox />
        <PreviewBox />
        <PreviewBox />
        <PreviewBox />
      </Flex>
    );
  },
};

const PreviewBox = () => {
  return <div style={{ width: 72, height: 72, backgroundColor: 'var(--figma-color-bg-brand)' }} />;
};

export default meta;
export { Story };
