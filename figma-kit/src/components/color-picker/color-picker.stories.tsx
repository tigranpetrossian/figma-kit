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
  const [color, setColor] = useState({ r: 0, g: 1, b: 0, a: 1 });

  return (
    <ColorPicker.Root colorModel="hsv" colorSpace="srgb" color={color} onColorChange={setColor}>
      <Flex style={{ width: 240 }}>
        <ColorPicker.Hue />
      </Flex>
    </ColorPicker.Root>
  );
};
