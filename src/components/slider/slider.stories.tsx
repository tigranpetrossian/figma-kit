import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { OpacityIcon } from '@components/icons';
import * as ValueField from '@components/value-field';
import { Slider } from './slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'large'],
    },
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

const Range: Story = {
  decorators: [withHorizontalWidth],
  args: {
    defaultValue: [25, 75],
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

const SmallHorizontal: Story = { ...Horizontal, args: { ...Horizontal.args, size: 'small' } };

const SmallVertical: Story = { ...Vertical, args: { ...Vertical.args, size: 'small' } };

const SmallRange: Story = { ...Range, args: { ...Range.args, size: 'small' } };

const SmallRangeAnchor: Story = { ...RangeAnchor, args: { ...RangeAnchor.args, size: 'small' } };

const SmallHints: Story = { ...Hints, args: { ...Hints.args, size: 'small' } };

const SmallDisabled: Story = { ...Disabled, args: { ...Disabled.args, size: 'small' } };

const WithValueField: Story = {
  decorators: [withHorizontalWidth],
  render() {
    return <SliderWithValueField valueFieldSide="right" />;
  },
};

const WithValueFieldLeft: Story = {
  decorators: [withHorizontalWidth],
  render() {
    return <SliderWithValueField valueFieldSide="left" icon={<OpacityIcon />} />;
  },
};

function SliderWithValueField(props: { valueFieldSide: 'left' | 'right'; icon?: ReactNode }) {
  const [value, setValue] = useState(80);

  function handleSliderChange([nextValue = value]: number[]) {
    setValue(nextValue);
  }

  const valueField = (
    <ValueField.Root>
      <ValueField.Scrubber>{props.icon && <ValueField.Label>{props.icon}</ValueField.Label>}</ValueField.Scrubber>
      <ValueField.Numeric value={value} onChange={setValue} min={0} max={100} precision={0} />
    </ValueField.Root>
  );

  return (
    <ValueField.Multi>
      {props.valueFieldSide === 'left' && valueField}
      <Slider size="small" min={0} max={100} value={[value]} onValueChange={handleSliderChange} />
      {props.valueFieldSide === 'right' && valueField}
    </ValueField.Multi>
  );
}

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
export {
  Disabled,
  Hints,
  Horizontal,
  Range,
  RangeAnchor,
  SmallDisabled,
  SmallHints,
  SmallHorizontal,
  SmallRange,
  SmallRangeAnchor,
  SmallVertical,
  Vertical,
  WithValueField,
  WithValueFieldLeft,
};
