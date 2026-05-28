import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
import * as Select from '@components/select';
import { CheckmarkIcon, ChevronDownIcon, ChevronUpIcon } from '@components/icons';
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

  function changeSpace(value: ColorSpace | null) {
    if (value !== null) {
      setSpace(value);
    }
  }

  return (
    <>
      <Select.Root items={colorSpaceOptions} value={space} onValueChange={changeSpace}>
        <Select.Trigger style={{ width: 128, position: 'fixed', top: 24, left: 24 }}>
          <Select.Value />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <ColorSpaceSelectPopup>
          {colorSpaceOptions.map((option) => (
            <Select.Item key={option.value} value={option.value} label={option.label}>
              <Select.ItemIndicator>
                <CheckmarkIcon size="4" />
              </Select.ItemIndicator>
              <Select.ItemText>{option.label}</Select.ItemText>
            </Select.Item>
          ))}
        </ColorSpaceSelectPopup>
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

const colorSpaceOptions: readonly { value: ColorSpace; label: string }[] = [
  { value: 'srgb', label: 'sRGB' },
  { value: 'display-p3', label: 'Display P3' },
];

function ColorSpaceSelectPopup(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <Select.Portal>
      <Select.Positioner>
        <Select.Popup>
          <Select.ScrollUpArrow>
            <ChevronUpIcon />
          </Select.ScrollUpArrow>
          <Select.List>{children}</Select.List>
          <Select.ScrollDownArrow>
            <ChevronDownIcon />
          </Select.ScrollDownArrow>
        </Select.Popup>
      </Select.Positioner>
    </Select.Portal>
  );
}

export default meta;
export { Story };
