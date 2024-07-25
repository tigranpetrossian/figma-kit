import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import * as ValueField from '@components/value-field';
import * as Select from '@components/select';
import * as ColorPicker from '@components/color-picker';
import { Flex } from '@components/flex';
import type { ColorModel, ColorSpace } from '@components/color-picker';
import type { RGBA } from '@lib/color';
import { hslaToRgba, hsvaToRgba, rgbaToCssString, rgbaToHsla, rgbaToHsva } from '@lib/color';

const Picker = () => {
  return <div></div>;
};

type Story = StoryObj<typeof Picker>;

const meta: Meta<typeof Picker> = {
  title: 'Components/Color',
  component: Picker,
};

export default meta;

export const Story = () => {
  const [color, setColor] = useState({ r: 1, g: 0.21176471, b: 0.18235294, a: 1 });
  const [model, setModel] = useState<ColorModel>('hsv');
  const [space, setSpace] = useState<ColorSpace>('srgb');
  const Input = inputs[model];

  const handleModelChange = (value: ColorModel) => {
    setModel(value);
  };

  return (
    <ColorPicker.Root colorModel={model} colorSpace={space} color={color} onColorChange={setColor}>
      <Select.Root value={space} onValueChange={(value: ColorSpace) => setSpace(value)}>
        <Select.Trigger style={{ width: 128, position: 'fixed', top: 24, left: 24 }} />
        <Select.Content>
          <Select.Item value="srgb">sRGB</Select.Item>
          <Select.Item value="display-p3">Display P3</Select.Item>
        </Select.Content>
      </Select.Root>
      <Flex direction="column" gap="2.5" style={{ width: 240 }}>
        <div style={{ width: 240, height: 240, backgroundColor: rgbaToCssString(color) }} />
        <Flex direction="column" gap="1">
          <ColorPicker.Hue />
          <ColorPicker.Alpha />
        </Flex>
        <Flex gap="2.5">
          <Select.Root value={model} onValueChange={handleModelChange}>
            <Select.Trigger style={{ width: 56 }} />
            <Select.Content>
              <Select.Item value="hex">HEX</Select.Item>
              <Select.Item value="rgb">RGB</Select.Item>
              <Select.Item value="hsl">HSL</Select.Item>
              <Select.Item value="hsv">HSB</Select.Item>
            </Select.Content>
          </Select.Root>

          <Input color={color} onColorChange={setColor} />
        </Flex>
      </Flex>
    </ColorPicker.Root>
  );
};

type InputProps = {
  color: RGBA;
  onColorChange: (color: RGBA) => void;
};

const HexInput = (props: InputProps) => {
  const { color, onColorChange } = props;

  return (
    <ValueField.Multi>
      <ValueField.Root>
        <ValueField.Hex onChange={onColorChange} value={color} />
      </ValueField.Root>
      <ValueField.Root style={{ flex: '0 0 52px' }}>
        <ValueField.Numeric
          onChange={() => {}}
          value={color.a}
          min={0}
          max={1}
          targetRange={[0, 100]}
          precision={2}
          allowedUnits={['%']}
        />
        <ValueField.Label>%</ValueField.Label>
      </ValueField.Root>
    </ValueField.Multi>
  );
};

const RgbaInput = (props: InputProps) => {
  const { color, onColorChange } = props;

  const onChange = (channel: 'r' | 'g' | 'b' | 'a') => (value: number) => {
    onColorChange({ ...color, [channel]: value });
  };

  return (
    <ValueField.Multi>
      <ValueField.Root>
        <ValueField.Numeric
          onChange={onChange('r')}
          value={color.r}
          min={0}
          max={1}
          targetRange={[0, 255]}
          precision={0}
        />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Numeric
          onChange={onChange('g')}
          value={color.g}
          min={0}
          max={1}
          targetRange={[0, 255]}
          precision={0}
        />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Numeric
          onChange={onChange('b')}
          value={color.b}
          min={0}
          max={1}
          targetRange={[0, 255]}
          precision={0}
        />
      </ValueField.Root>
      <ValueField.Root style={{ flex: '0 0 52px' }}>
        <ValueField.Numeric
          onChange={onChange('a')}
          value={color.a}
          min={0}
          max={1}
          targetRange={[0, 100]}
          precision={2}
          allowedUnits={['%']}
        />
        <ValueField.Label>%</ValueField.Label>
      </ValueField.Root>
    </ValueField.Multi>
  );
};

const HsvaInput = (props: InputProps) => {
  const { color, onColorChange } = props;
  const hsva = rgbaToHsva(color);

  const onChange = (channel: 'h' | 's' | 'v' | 'a') => (value: number) => {
    onColorChange(hsvaToRgba({ ...hsva, [channel]: value }));
  };

  return (
    <ValueField.Multi>
      <ValueField.Root>
        <ValueField.Numeric onChange={onChange('h')} value={hsva.h} min={0} max={360} precision={0} />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Numeric onChange={onChange('s')} value={hsva.s} min={0} max={100} precision={0} />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Numeric onChange={onChange('v')} value={hsva.v} min={0} max={100} precision={0} />
      </ValueField.Root>
      <ValueField.Root style={{ flex: '0 0 52px' }}>
        <ValueField.Numeric
          onChange={onChange('a')}
          value={hsva.a}
          min={0}
          max={1}
          targetRange={[0, 100]}
          precision={2}
          allowedUnits={['%']}
        />
        <ValueField.Label>%</ValueField.Label>
      </ValueField.Root>
    </ValueField.Multi>
  );
};

const HslaInput = (props: InputProps) => {
  const { color, onColorChange } = props;
  const hsla = rgbaToHsla(color);

  const onChange = (channel: 'h' | 's' | 'l' | 'a') => (value: number) => {
    onColorChange(hslaToRgba({ ...hsla, [channel]: value }));
  };

  return (
    <ValueField.Multi>
      <ValueField.Root>
        <ValueField.Numeric onChange={onChange('h')} value={hsla.h} min={0} max={360} precision={0} />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Numeric onChange={onChange('s')} value={hsla.s} min={0} max={100} precision={0} />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Numeric onChange={onChange('l')} value={hsla.l} min={0} max={100} precision={0} />
      </ValueField.Root>
      <ValueField.Root style={{ flex: '0 0 52px' }}>
        <ValueField.Numeric
          onChange={onChange('a')}
          value={hsla.a}
          min={0}
          max={1}
          targetRange={[0, 100]}
          precision={2}
          allowedUnits={['%']}
        />
        <ValueField.Label>%</ValueField.Label>
      </ValueField.Root>
    </ValueField.Multi>
  );
};

const inputs = {
  hex: HexInput,
  hsv: HsvaInput,
  hsl: HslaInput,
  rgb: RgbaInput,
};
