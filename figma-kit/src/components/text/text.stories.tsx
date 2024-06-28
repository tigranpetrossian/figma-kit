import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Text } from './text';

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

export const Default: StoryObj<typeof Text> = {
  args: {
    children: 'Default text',
  },
};

export const TextStory: StoryObj<typeof Text> = {
  args: {
    children: (
      <>
        <strong>This is strong text</strong> to highlight important points. <em>This is emphasized text</em> to indicate
        subtle importance. Use <code>inline code</code> for code snippets. <mark>This is marked text</mark> to draw
        attention.
      </>
    ),
  },
};
