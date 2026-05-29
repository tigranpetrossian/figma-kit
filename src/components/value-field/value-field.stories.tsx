import type { StoryObj, Meta } from '@storybook/react-vite';
import { useState } from 'react';
import type { RGBA } from '@lib/color';
import * as ValueField from './';

const meta = {
  component: ValueField.Numeric,
  title: 'Components/Value Field',
} satisfies Meta<typeof ValueField.Numeric>;

type NumericStory = StoryObj<typeof ValueField.Numeric>;
type NumericSelectStory = StoryObj<typeof ValueField.NumericSelect>;
type HexStory = StoryObj<typeof ValueField.Hex>;
type Story = StoryObj;

const NUMERIC_SELECT_OPTIONS = [10, 11, 12, 13, 14, 15, 16, 20, 24, 32, 36, 40, 48, 64, 96, 128];

const Numeric: NumericStory = {
  render() {
    return <NumericField />;
  },
  argTypes: {
    value: {
      control: false,
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    precision: {
      control: 'number',
    },
    suffix: {
      control: 'text',
    },
    smallNudge: {
      control: 'number',
    },
    bigNudge: {
      control: 'number',
    },
  },
};

const Hex: HexStory = {
  render() {
    return <HexField />;
  },
};

const NumericSelect: NumericSelectStory = {
  render() {
    return <NumericSelectField initialValue={20} />;
  },
};

const NumericSelectOutOfOptions: NumericSelectStory = {
  render() {
    return <NumericSelectField initialValue={21} />;
  },
};

const WithLabel: Story = {
  render() {
    return <LabeledField />;
  },
};

const WithIcon: Story = {
  render() {
    return <IconField />;
  },
};

const MultiInput: Story = {
  render() {
    return <RgbaFields />;
  },
};

const Rgba: Story = {
  render() {
    return <RgbaFields />;
  },
};

const HexWithAlpha: Story = {
  render() {
    return <HexWithAlphaField />;
  },
};

const NumericField = () => {
  const [value, setValue] = useState(0);

  return (
    <ValueField.Root style={{ width: 100 }}>
      <ValueField.Scrubber />
      <ValueField.Numeric value={value} onChange={setValue} />
    </ValueField.Root>
  );
};

const NumericSelectField = (props: { initialValue: number }) => {
  const [value, setValue] = useState(props.initialValue);

  return (
    <ValueField.NumericSelect
      value={value}
      onChange={setValue}
      options={NUMERIC_SELECT_OPTIONS}
      style={{ width: 296 }}
      min={0}
      precision={0}
    />
  );
};

const HexField = () => {
  const [rgba, setRgba] = useState<RGBA>({ r: 0, g: 0, b: 0, a: 1 });

  return <ValueField.Hex value={rgba} onChange={setRgba} />;
};

const LabeledField = () => {
  const [value, setValue] = useState(0);

  return (
    <ValueField.Root style={{ width: 100 }}>
      <ValueField.Scrubber>
        <ValueField.Label>X</ValueField.Label>
      </ValueField.Scrubber>
      <ValueField.Numeric value={value} onChange={setValue} />
    </ValueField.Root>
  );
};

const IconField = () => {
  const [value, setValue] = useState(0);

  return (
    <ValueField.Root style={{ width: 100 }}>
      <ValueField.Scrubber>
        <ValueField.Label>
          <OpacityIcon />
        </ValueField.Label>
      </ValueField.Scrubber>
      <ValueField.Numeric value={value} onChange={setValue} />
    </ValueField.Root>
  );
};

const RgbaFields = () => {
  const [rgba, setRgba] = useState<RGBA>({ r: 1, g: 1, b: 1, a: 1 });

  function setRed(r: number) {
    setRgba((rgba) => ({ ...rgba, r }));
  }

  function setGreen(g: number) {
    setRgba((rgba) => ({ ...rgba, g }));
  }

  function setBlue(b: number) {
    setRgba((rgba) => ({ ...rgba, b }));
  }

  function setAlpha(a: number) {
    setRgba((rgba) => ({ ...rgba, a }));
  }

  return (
    <div style={{ width: 160 }}>
      <ValueField.Multi>
        <ValueField.Root>
          <ValueField.Scrubber />
          <ValueField.Numeric value={rgba.r} onChange={setRed} min={0} max={1} targetRange={[0, 255]} precision={0} />
        </ValueField.Root>
        <ValueField.Root>
          <ValueField.Scrubber />
          <ValueField.Numeric value={rgba.g} onChange={setGreen} min={0} max={1} targetRange={[0, 255]} precision={0} />
        </ValueField.Root>
        <ValueField.Root>
          <ValueField.Scrubber />
          <ValueField.Numeric value={rgba.b} onChange={setBlue} min={0} max={1} targetRange={[0, 255]} precision={0} />
        </ValueField.Root>
        <ValueField.Root style={{ flex: '0 0 48px' }}>
          <ValueField.Scrubber />
          <ValueField.Numeric
            value={rgba.a}
            onChange={setAlpha}
            min={0}
            max={1}
            targetRange={[0, 100]}
            precision={2}
            suffix="%"
          />
        </ValueField.Root>
      </ValueField.Multi>
    </div>
  );
};

const HexWithAlphaField = () => {
  const [rgba, setRgba] = useState<RGBA>({ r: 1, g: 1, b: 1, a: 1 });

  function setAlpha(a: number) {
    setRgba((rgba) => ({ ...rgba, a }));
  }

  return (
    <div style={{ width: 160 }}>
      <ValueField.Multi>
        <ValueField.Root>
          <ValueField.Hex value={rgba} onChange={setRgba} />
        </ValueField.Root>
        <ValueField.Root style={{ flex: '0 0 62px' }}>
          <ValueField.Numeric
            value={rgba.a}
            onChange={setAlpha}
            min={0}
            max={1}
            targetRange={[0, 100]}
            allowedUnits={['%']}
            precision={2}
          />
          <ValueField.Label>%</ValueField.Label>
        </ValueField.Root>
      </ValueField.Multi>
    </div>
  );
};

const OpacityIcon = () => {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path
        fill="var(--color-icon)"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 7h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Zm-2 1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8Zm9 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1ZM13.5 11a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm-2 2a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm-2 2a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm1.5.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm2-2a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm.5 1.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm2-4a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm-.5 2.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm.5 1.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
      />
    </svg>
  );
};

export default meta;
export { Hex, HexWithAlpha, MultiInput, Numeric, NumericSelect, NumericSelectOutOfOptions, Rgba, WithIcon, WithLabel };
