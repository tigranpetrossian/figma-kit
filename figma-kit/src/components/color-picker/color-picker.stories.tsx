import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import * as ColorPicker from '@components/color-picker';
import { Flex } from '@components/flex';

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
  const [color, setColor] = useState({ r: 0.48235294, g: 0.81176471, b: 0.48235294, a: 1 });

  return (
    <ColorPicker.Root colorModel="hsv" colorSpace="display-p3" color={color} onColorChange={setColor}>
      <Flex direction="column" gap="1" style={{ width: 240 }}>
        <ColorPicker.Hue />
        <ColorPicker.Alpha />
      </Flex>
    </ColorPicker.Root>
  );
};
