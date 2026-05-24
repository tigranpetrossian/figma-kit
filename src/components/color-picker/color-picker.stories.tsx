import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as Select from '@components/select';
import type { ColorSpace } from './color-picker';
import * as ColorPicker from './';

const meta = {
  title: 'Components/Color Picker',
  component: ColorPicker.Root,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ColorPicker.Root>;

type Story = StoryObj;

const Story: Story = {
  render() {
    return <Picker />;
  },
};

const Picker = () => {
  const [space, setSpace] = useState<ColorSpace>('srgb');

  function changeSpace(value: string) {
    if (isColorSpace(value)) {
      setSpace(value);
    }
  }

  return (
    <>
      <Select.Root value={space} onValueChange={changeSpace}>
        <Select.Trigger style={{ width: 128, position: 'fixed', top: 24, left: 24 }} />
        <Select.Content>
          <Select.Item value="srgb">sRGB</Select.Item>
          <Select.Item value="display-p3">Display P3</Select.Item>
        </Select.Content>
      </Select.Root>
      <div style={{ width: 240 }}>
        <ColorPicker.Root colorSpace={space}>
          <ColorPicker.Area />
          <ColorPicker.Hue />
          <ColorPicker.Alpha />
          <ColorPicker.Input />
        </ColorPicker.Root>
      </div>
    </>
  );
};

function isColorSpace(value: string): value is ColorSpace {
  return value === 'srgb' || value === 'display-p3';
}

export default meta;
export { Story };
