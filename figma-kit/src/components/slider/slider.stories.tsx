import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Slider } from './slider';

type Story = StoryObj<typeof Slider>;

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  tags: ['autodocs'],
  component: Slider,
  decorators: [
    (Story) => {
      return (
        <div>
          <Story />
        </div>
      );
    },
  ],
  argTypes: {
    defaultValue: {
      //type: 'number[]',
      description: 'The initial value of the slider when it is first rendered.',
      table: {
        type: {
          summary: 'number[]',
        },
      },
      control: {
        type: 'object',
      },
    },
    value: {
      table: {
        type: {
          summary: 'number[]',
        },
      },
      description: 'The controlled value of the slider.',
    },
    onValueChange: {
      type: 'function',
      description: 'Event handler called when the value of the slider changes.',
    },
    onValueCommit: {
      type: 'function',
      description: 'Event handler called when the user is done changing the value.',
    },
    name: {
      type: 'string',
      description: 'The name of the input field in a form.',
    },
    disabled: {
      type: 'boolean',
      description: 'When true, prevents the user from interacting with the slider.',
    },
    orientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: 'horizontal' },
        type: { summary: 'enum' },
      },
      description: 'The orientation of the slider, either "horizontal" or "vertical".',
    },
    dir: {
      options: ['ltr', 'rtl'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: 'ltr' },
        type: { summary: 'enum' },
      },
      description: 'The text direction of the slider, either "ltr" or "rtl".',
    },
    inverted: {
      type: 'boolean',
      description: 'When true, inverts the slider values.',
    },
    min: {
      type: 'number',
      description: 'The minimum value of the slider.',
    },
    max: {
      type: 'number',
      description: 'The maximum value of the slider.',
    },
    step: {
      type: 'number',
      description: 'The step value of the slider.',
    },
    minStepsBetweenThumbs: {
      type: 'number',
      description: 'The minimum steps between slider thumbs.',
    },
    range: {
      type: 'boolean',
      description: 'When true, displays range element.',
    },
    rangeAnchor: {
      type: 'number',
      description: 'The starting point of the range. Defaults to min.',
    },
  },
};

export default meta;

export const Horizontal: Story = {
  decorators: [
    (Story) => {
      return (
        <div style={{ width: 200 }}>
          <Story />
        </div>
      );
    },
  ],
  args: {},
};

export const Vertical: Story = {
  decorators: [
    (Story) => {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 200 }}>
          <Story />
        </div>
      );
    },
  ],
  args: {
    orientation: 'vertical',
  },
};

export const BaseValue: Story = {
  decorators: [
    (Story) => {
      return (
        <div style={{ width: 200 }}>
          <Story />
        </div>
      );
    },
  ],
  args: {
    defaultValue: [50],
    baseValue: 50,
  },
};
export const RangeAnchor: Story = {
  decorators: [
    (Story) => {
      return (
        <div style={{ width: 200 }}>
          <Story />
        </div>
      );
    },
  ],
  args: {
    defaultValue: [50],
    rangeAnchor: 50,
    baseValue: 50,
  },
};

export const Hints = () => {
  const [value, setValue] = useState([400]);

  return (
    <div>
      <div style={{ width: 200 }}>
        <Slider
          baseValue={400}
          hints={[100, 200, 300, 400, 500, 600, 700, 800, 900]}
          min={100}
          max={900}
          value={value}
          onValueChange={setValue}
        />
      </div>
    </div>
  );
};
