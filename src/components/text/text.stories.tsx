import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link as TextLink, Text, TEXT_COLORS, TEXT_SIZES, type TextColor } from './text';

const meta = {
  title: 'Components/Text',
  component: Text,
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
    block: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Text>;

type Story = StoryObj<typeof meta>;

const BasicText: Story = {
  args: {
    children: 'Basic text',
  },
};

const TypeScale: Story = {
  render(args) {
    return (
      <>
        {TEXT_SIZES.map((size) => (
          <Text key={size} {...args} size={size} block>
            Size {size}: Frames export at 1x
          </Text>
        ))}
      </>
    );
  },
};

const Colors: Story = {
  render(args) {
    return (
      <>
        {TEXT_COLORS.map((color) => (
          <Text key={color} {...args} color={color} block style={{ background: backgroundFor(color), padding: 4 }}>
            {color}
          </Text>
        ))}
      </>
    );
  },
};

const InlineSemantics: Story = {
  args: {
    children: (
      <>
        <strong>This is strong text</strong> to highlight important points. <em>This is emphasized text</em> to indicate
        subtle importance. Use <code>inline code</code> for code snippets. <mark>This is marked text</mark> to draw
        attention. <Text color="secondary">Nested text inherits size and weight.</Text> This is a link to{' '}
        <TextLink href="https://help.figma.com/">Figma documentation</TextLink>.
      </>
    ),
  },
};

const Link: Story = {
  render() {
    return <TextLink href="https://figma.com">Link</TextLink>;
  },
};

function backgroundFor(color: TextColor) {
  if (!color.startsWith('on')) return undefined;
  const surface = color.slice('on'.length).replace(/-(secondary|tertiary)$/, '');
  return `var(--figma-color-bg-${surface})`;
}

export default meta;
export { BasicText, TypeScale, Colors, InlineSemantics, Link };
