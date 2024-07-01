import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Text, Link } from './text';

const meta = {
  title: 'Components/Text',
  component: Text,
  decorators: [
    (Story) => {
      return (
        <div style={{ maxWidth: 500, margin: '0 auto' }}>
          <Story />
        </div>
      );
    },
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      table: {
        defaultValue: { summary: '3' },
      },
    },
    weight: {
      control: 'radio',
      options: ['default', 'strong'],
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    align: {
      control: 'radio',
      options: ['start', 'center', 'end'],
      table: {
        defaultValue: { summary: 'start' },
      },
    },
    block: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    asChild: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

export const BasicText: StoryObj<typeof Text> = {
  args: {
    size: 'medium',
    weight: 'default',
    align: 'start',
    block: false,
    children: 'Basic text',
  },
};

export const InlineSemantics: StoryObj<typeof Text> = {
  args: {
    children: (
      <>
        <strong>This is strong text</strong> to highlight important points. <em>This is emphasized text</em> to indicate
        subtle importance. Use <code>inline code</code> for code snippets. <mark>This is marked text</mark> to draw
        attention. This is a link to <Link href="https://help.figma.com/">Figma's documentation</Link>
        .
        <br />
        <Text weight="default">Nested</Text>
      </>
    ),
  },
};

export const BasicLink = () => {
  return <Link href="https://figma.com">Link</Link>;
};
