import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './flex';

type Story = StoryObj<typeof Flex>;

const meta: Meta<typeof Flex> = {
  title: 'Components/Flex',
  component: Flex,
  parameters: {
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    direction: {
      description: 'The direction of the flex container.',
      type: 'string',
      table: {
        type: {
          summary: 'enum',
        },
        defaultValue: {
          summary: 'row',
        },
      },
      options: ['row', 'column', 'rowReverse', 'columnReverse'],
      control: { type: 'radio' },
    },
    align: {
      description: 'The alignment of the flex items along the cross axis.',
      type: 'string',
      table: {
        type: {
          summary: 'enum',
        },
      },
      options: ['start', 'center', 'end', 'baseline', 'stretch'],
      control: { type: 'radio' },
    },
    justify: {
      description: 'The alignment of the flex items along the main axis.',
      type: 'string',
      table: {
        type: {
          summary: 'enum',
        },
      },
      options: ['start', 'center', 'end', 'between'],
      control: { type: 'radio' },
    },
    wrap: {
      description: 'The wrapping behavior of the flex container.',
      type: 'string',
      table: {
        type: {
          summary: 'enum',
        },
      },
      options: ['nowrap', 'wrap', 'wrapReverse'],
      control: { type: 'radio' },
    },
    gap: {
      description: 'The gap between flex items.',
      type: 'string',
      table: {
        type: {
          summary: 'string',
        },
      },
      options: [
        '0',
        'px',
        '0.5',
        '1',
        '1.5',
        '2',
        '2.5',
        '3',
        '3.5',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
      ],
      control: { type: 'select' },
    },
    columnGap: {
      description: 'The gap between flex columns.',
      type: 'string',
      table: {
        type: {
          summary: 'string',
        },
      },
      options: [
        '0',
        'px',
        '0_5',
        '1',
        '1_5',
        '2',
        '2_5',
        '3',
        '3_5',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
      ],
      control: { type: 'select' },
    },
    rowGap: {
      description: 'The gap between flex rows.',
      type: 'string',
      table: {
        type: {
          summary: 'string',
        },
      },
      options: [
        '0',
        'px',
        '0_5',
        '1',
        '1_5',
        '2',
        '2_5',
        '3',
        '3_5',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
      ],
      control: { type: 'select' },
    },
  },
};

export default meta;

const PreviewBox = () => <div style={{ width: 72, height: 72, backgroundColor: 'var(--figma-color-bg-brand)' }}></div>;

const flexCode = `
<Flex align="center" justify="center" gap="2"/>
`;

export const Story: Story = {
  parameters: {
    storySource: {
      source: flexCode,
    },
  },
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
