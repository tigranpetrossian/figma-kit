import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import type { ColorModel } from '@components/color-picker';
import * as ColorPicker from '@components/color-picker';
import type { RGBA } from '@lib/color';

const GRAY = { r: 0.5, g: 0.5, b: 0.5, a: 1 };
const RED = { r: 1, g: 0, b: 0, a: 1 };
const GREEN = { r: 0, g: 1, b: 0, a: 1 };
const BLUE = { r: 0, g: 0, b: 1, a: 1 };

const user = userEvent.setup();

describe('controlled ColorPicker', () => {
  it('follows a new color prop after an internal hue edit', async () => {
    render(<ControlledPicker initialColor={GRAY} />);
    const hexField = () => screen.getAllByRole('textbox')[0];
    const hueThumb = () => screen.getAllByRole('slider')[0];

    await user.click(screen.getByRole('button', { name: 'Red' }));
    expect(hexField()).toHaveValue('FF0000');

    hueThumb().focus();
    await user.keyboard('{ArrowRight}');
    expect(hexField()).not.toHaveValue('FF0000');

    await user.click(screen.getByRole('button', { name: 'Blue' }));
    expect(hexField()).toHaveValue('0000FF');
    expect(hueThumb()).toHaveAttribute('aria-valuenow', '240');
  });

  it('keeps the edited hue when the parent passes back the emitted gray', async () => {
    render(<ControlledPicker initialColor={GREEN} defaultActiveModel="hsv" />);
    const [hueField, saturationField] = screen.getAllByRole('textbox');

    await user.type(saturationField, '0');
    await user.keyboard('{Enter}');

    expect(saturationField).toHaveValue('0');
    expect(hueField).toHaveValue('120');
  });
});

function ControlledPicker(props: { initialColor: RGBA; defaultActiveModel?: ColorModel }) {
  const [color, setColor] = useState(props.initialColor);

  return (
    <>
      <button onClick={() => setColor(RED)}>Red</button>
      <button onClick={() => setColor(BLUE)}>Blue</button>
      <ColorPicker.Root
        colorSpace="srgb"
        color={color}
        onColorChange={setColor}
        defaultActiveModel={props.defaultActiveModel}
      >
        <ColorPicker.Area />
        <ColorPicker.Hue />
        <ColorPicker.Alpha />
        <ColorPicker.Input />
      </ColorPicker.Root>
    </>
  );
}
