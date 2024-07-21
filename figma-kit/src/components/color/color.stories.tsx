import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Flex } from '@components/flex';
import * as ValueField from '@components/value-field';
import * as Select from '@components/select';
import { Slider } from '@components/slider';
import { Picker } from './picker';
import type { ColorModel, ColorSpace } from './picker';

type Story = StoryObj<typeof Picker>;

const meta: Meta<typeof Picker> = {
  title: 'Components/Color',
  component: Picker,
};

export default meta;

export const Story = () => {
  const [color, setColor] = useState({ r: 0, g: 0, b: 0, a: 1 });
  const [model, setModel] = useState<ColorModel>('hsva');
  const [colorSpace, setColorSpace] = useState<ColorSpace>('srgb');

  const handleAlphaChange = (value: number) => {
    setColor((color) => ({
      ...color,
      a: value,
    }));
  };

  const handleModelChange = (model: 'hsva' | 'hsla') => {
    setModel(model);
  };

  const handleColorSpaceChange = (colorSpace: 'srgb' | 'display-p3') => {
    setColorSpace(colorSpace);
  };

  return (
    <>
      <Select.Root value={colorSpace} onValueChange={handleColorSpaceChange}>
        <Select.Trigger style={{ width: 128, position: 'fixed', top: 24, left: 24 }} />
        <Select.Content>
          <Select.Item value="srgb">sRGB</Select.Item>
          <Select.Item value="display-p3">Display P3</Select.Item>
        </Select.Content>
      </Select.Root>
      <Flex direction="column" gap="3" style={{ width: 240 }}>
        <Picker color={color} model={model} colorSpace="srgb" onColorChange={setColor} />
        <Flex direction="column" gap="3" style={{ padding: '0 16px' }}>
          <Slider min={0} max={360} range={false} />
          <Flex gap="2">
            <Select.Root value={model} onValueChange={handleModelChange}>
              <Select.Trigger style={{ width: 64 }} />
              <Select.Content>
                <Select.Item value="hsva">HSB</Select.Item>
                <Select.Item value="hsla">HSL</Select.Item>
              </Select.Content>
            </Select.Root>

            <ValueField.Multi style={{ width: 168 }}>
              <ValueField.Root>
                {/*                <div
                  style={{
                    width: 14,
                    height: 14,
                    margin: '5px 0 5px 4px',
                    borderRadius: '2px',
                    backgroundColor: `rgb(${color.r * 255} ${color.g * 255} ${color.b * 255} / ${Math.round(color.a * 100)}%)`,
                  }}
                />*/}
                <ValueField.Hex value={color} onChange={setColor} />
              </ValueField.Root>
              <ValueField.Root>
                <ValueField.Numeric
                  style={{ width: 32 }}
                  value={color.a}
                  onChange={handleAlphaChange}
                  min={0}
                  max={1}
                  targetRange={[0, 100]}
                  precision={2}
                />
                <ValueField.Label>%</ValueField.Label>
              </ValueField.Root>
            </ValueField.Multi>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
