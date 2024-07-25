import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import * as Select from '@components/select';
import * as ColorPicker from '@components/color-picker';
import type { ColorSpace } from '@components/color-picker';

const Picker = () => {
  return <div></div>;
};

type Story = StoryObj<typeof Picker>;

const meta: Meta<typeof Picker> = {
  title: 'Components/Color',
  component: Picker,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Story = () => {
  const [space, setSpace] = useState<ColorSpace>('srgb');

  return (
    <>
      <Select.Root value={space} onValueChange={(value: ColorSpace) => setSpace(value)}>
        <Select.Trigger style={{ width: 128, position: 'fixed', top: 24, left: 24 }} />
        <Select.Content>
          <Select.Item value="srgb">sRGB</Select.Item>
          <Select.Item value="display-p3">Display P3</Select.Item>
        </Select.Content>
      </Select.Root>
      <div style={{ width: 240 }}>
        <ColorPicker.Root colorSpace={space} models={['hsv', 'hsl']}>
          <ColorPicker.Area />
          <ColorPicker.Hue />
          <ColorPicker.Alpha />
          <ColorPicker.Input />
        </ColorPicker.Root>
      </div>
    </>
  );
};
