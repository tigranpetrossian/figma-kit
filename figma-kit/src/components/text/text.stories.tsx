import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import * as Typography from './text';

const meta: Meta<Typography.TextProps> = {
  title: 'Components/Text',
  component: Typography.Text,
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
};

export default meta;

const basicTextCode = `
<Text />
`;

export const BasicText: StoryObj<Typography.TextProps> = {
  parameters: {
    storySource: {
      source: basicTextCode,
    },
  },
  args: {
    size: 'medium',
    weight: 'default',
    align: 'start',
    block: false,
    children: 'Basic text',
  },
};

const inlineSemanticsCode = `
<Text>
  <strong>This is strong text</strong> to highlight important points. <em>This is emphasized text</em> to indicate
  subtle importance. Use <code>inline code</code> for code snippets. <mark>This is marked text</mark> to draw
  attention. This is a link to <Link href="https://help.figma.com/">Figma's documentation</Link>.
</Text>
`;

export const InlineSemantics: StoryObj<Typography.TextProps> = {
  parameters: {
    storySource: {
      source: inlineSemanticsCode,
    },
  },
  args: {
    children: (
      <>
        <strong>This is strong text</strong> to highlight important points. <em>This is emphasized text</em> to indicate
        subtle importance. Use <code>inline code</code> for code snippets. <mark>This is marked text</mark> to draw
        attention. This is a link to{' '}
        <Typography.Link href="https://help.figma.com/">Figma's documentation</Typography.Link>.
      </>
    ),
  },
};

const linkCode = `
<Link href="https://figma.com">Link</Link>;
`;

export const Link: StoryObj<Typography.TextProps> = {
  parameters: {
    storySource: {
      source: linkCode,
    },
  },
  render() {
    return <Typography.Link href="https://figma.com">Link</Typography.Link>;
  },
};
