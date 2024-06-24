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
      options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
      table: {
        defaultValue: { summary: '3' },
      },
    },
    weight: {
      control: 'radio',
      options: ['default', 'medium', 'strong'],
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
    asChild: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

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
