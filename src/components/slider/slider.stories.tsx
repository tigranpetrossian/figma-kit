import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Slider } from './slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  argTypes: {
    defaultValue: {
      control: 'object',
    },
    value: {
      control: 'object',
    },
    disabled: {
      control: 'boolean',
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    dir: {
      control: 'radio',
      options: ['ltr', 'rtl'],
    },
    inverted: {
      control: 'boolean',
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
    minStepsBetweenThumbs: {
      control: 'number',
    },
    range: {
      control: 'boolean',
    },
    rangeAnchor: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Slider>;

type Story = StoryObj<typeof meta>;

const Horizontal: Story = {
  decorators: [withHorizontalWidth],
  args: {},
};

const Vertical: Story = {
  decorators: [withVerticalHeight],
  args: {
    orientation: 'vertical',
  },
};

const RangeAnchor: Story = {
  decorators: [withHorizontalWidth],
  args: {
    defaultValue: [50],
    rangeAnchor: 50,
    baseValue: 50,
    hints: [50],
  },
};

const Hints: Story = {
  decorators: [withHorizontalWidth],
  args: {
    baseValue: 400,
    defaultValue: [400],
    hints: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    min: 100,
    max: 900,
  },
};

const Disabled: Story = {
  decorators: [withHorizontalWidth],
  args: {
    disabled: true,
    baseValue: 400,
    defaultValue: [400],
    hints: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    min: 100,
    max: 900,
  },
};

function withHorizontalWidth(Story: () => ReactNode) {
  return (
    <div style={{ width: 200 }}>
      <Story />
    </div>
  );
}

function withVerticalHeight(Story: () => ReactNode) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 200 }}>
      <Story />
    </div>
  );
}

export default meta;
export { Disabled, Hints, Horizontal, RangeAnchor, Vertical };
