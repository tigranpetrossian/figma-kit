import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading, Paragraph, TEXT_COLORS, TEXT_SIZES, type HeadingLevel } from './text';

const HEADING_LEVELS: HeadingLevel[] = [1, 2, 3, 4, 5];

const meta = {
  title: 'Components/Heading',
  component: Heading,
  decorators: [
    (Story) => {
      return (
        <div style={{ maxWidth: 500 }}>
          <Story />
        </div>
      );
    },
  ],
  argTypes: {
    level: {
      control: 'select',
      options: HEADING_LEVELS,
    },
    size: {
      control: 'select',
      options: TEXT_SIZES,
    },
    weight: {
      control: 'radio',
      options: ['default', 'strong'],
    },
    color: {
      control: 'select',
      options: TEXT_COLORS,
    },
    align: {
      control: 'radio',
      options: ['start', 'center', 'end'],
    },
  },
} satisfies Meta<typeof Heading>;

type Story = StoryObj<typeof meta>;

const BasicHeading: Story = {
  args: {
    level: 1,
    children: 'Export settings',
  },
};

const Levels: Story = {
  render(args) {
    return (
      <>
        {HEADING_LEVELS.map((level) => (
          <Heading key={level} {...args} level={level}>
            Heading {level}
          </Heading>
        ))}
      </>
    );
  },
};

const CustomSize: Story = {
  render() {
    return (
      <>
        <Heading level={2} size="3">
          Layer
        </Heading>
        <Paragraph color="secondary">A level 2 heading at Figma's 11px panel title size.</Paragraph>
      </>
    );
  },
};

export default meta;
export { BasicHeading, Levels, CustomSize };
