import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Typography from './text';

const meta = {
  title: 'Components/Text',
  component: Typography.Text,
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
      options: ['small', 'medium', 'large'],
    },
    weight: {
      control: 'radio',
      options: ['default', 'strong'],
    },
    align: {
      control: 'radio',
      options: ['start', 'center', 'end'],
    },
    block: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Typography.Text>;

type Story = StoryObj<typeof meta>;

const BasicText: Story = {
  args: {
    size: 'medium',
    weight: 'default',
    align: 'start',
    block: false,
    children: 'Basic text',
  },
};

const InlineSemantics: Story = {
  args: {
    children: (
      <>
        <strong>This is strong text</strong> to highlight important points. <em>This is emphasized text</em> to indicate
        subtle importance. Use <code>inline code</code> for code snippets. <mark>This is marked text</mark> to draw
        attention. This is a link to{' '}
        <Typography.Link href="https://help.figma.com/">Figma documentation</Typography.Link>.
      </>
    ),
  },
};

const Link: Story = {
  render() {
    return <Typography.Link href="https://figma.com">Link</Typography.Link>;
  },
};

export default meta;
export { BasicText, InlineSemantics, Link };
