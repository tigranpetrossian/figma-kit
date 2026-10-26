import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import type { ColorModel } from '@components/color-picker';
import * as ColorPicker from '@components/color-picker';
import type { RGBA } from '@lib/color';

const GRAY = { r: 0.5, g: 0.5, b: 0.5, a: 1 };
const BLACK = { r: 0, g: 0, b: 0, a: 1 };
const WHITE = { r: 1, g: 1, b: 1, a: 1 };
const RED = { r: 1, g: 0, b: 0, a: 1 };
const GREEN = { r: 0, g: 1, b: 0, a: 1 };
const DARK_GREEN = { r: 0, g: 0.6, b: 0, a: 1 };
const BLUE = { r: 0, g: 0, b: 1, a: 1 };
const OFF_GRID = { r: 0.123, g: 0.456, b: 0.789, a: 0.5 };
const NEARLY_RED = { r: 1, g: 0, b: 1 / 255, a: 1 };
const NEARLY_RED_HUE = 360 - 60 / 255;

const user = userEvent.setup();

describe('controlled ColorPicker', () => {
  it('follows a new color prop after an internal hue edit', async () => {
    render(<ControlledPicker initialColor={GRAY} />);
    const hexField = () => screen.getAllByRole('textbox')[0];

    await user.click(screen.getByRole('button', { name: 'Red' }));
    expect(hexField()).toHaveValue('FF0000');

    getHueThumb().focus();
    await user.keyboard('{ArrowRight}');
    expect(hexField()).not.toHaveValue('FF0000');

    await user.click(screen.getByRole('button', { name: 'Blue' }));
    expect(hexField()).toHaveValue('0000FF');
    expect(getHueThumb()).toHaveAttribute('aria-valuenow', '240');
  });

  it('keeps the edited hue when the parent passes back the emitted gray', async () => {
    render(<ControlledPicker initialColor={GREEN} defaultActiveModel="hsv" />);
    const { hue, saturation } = getHsvFields();

    await user.type(saturation, '0');
    await user.keyboard('{Enter}');

    expect(saturation).toHaveValue('0');
    expect(hue).toHaveValue('120');
  });

  it('keeps the edited hue when the parent passes back the emitted gray rounded to float32', async () => {
    render(<ControlledPicker initialColor={DARK_GREEN} defaultActiveModel="hsv" roundToFloat32 />);
    const { hue, saturation } = getHsvFields();

    await user.type(saturation, '0');
    await user.keyboard('{Enter}');

    expect(saturation).toHaveValue('0');
    expect(hue).toHaveValue('120');
  });

  it('changes the hue of a gray with the hue slider', async () => {
    render(<ControlledPicker initialColor={GRAY} defaultActiveModel="hsv" />);
    const { hue, saturation, value } = getHsvFields();

    getHueThumb().focus();
    await user.keyboard('{PageUp}');

    expect(hue).not.toHaveValue('0');
    expect(saturation).toHaveValue('0');
    expect(value).toHaveValue('50');
  });

  it('keeps the hue of a gray when alpha changes', async () => {
    render(<ControlledPicker initialColor={GREEN} defaultActiveModel="hsv" />);
    const { hue, saturation } = getHsvFields();

    await user.type(saturation, '0');
    await user.keyboard('{Enter}');
    getAlphaThumb().focus();
    await user.keyboard('{ArrowLeft}');

    expect(hue).toHaveValue('120');
  });

  it('keeps the hue when the parent passes a gray', async () => {
    render(<ControlledPicker initialColor={BLUE} defaultActiveModel="hsv" />);
    const { hue, saturation, value } = getHsvFields();

    await user.click(screen.getByRole('button', { name: 'Gray' }));

    expect(hue).toHaveValue('240');
    expect(saturation).toHaveValue('0');
    expect(value).toHaveValue('50');
  });

  it('keeps the hue when the parent passes black', async () => {
    render(<ControlledPicker initialColor={BLUE} defaultActiveModel="hsv" />);
    const { hue, value } = getHsvFields();

    await user.click(screen.getByRole('button', { name: 'Black' }));

    expect(hue).toHaveValue('240');
    expect(value).toHaveValue('0');
  });

  it('takes the hue of the last color the parent passed before a gray', async () => {
    render(<ControlledPicker initialColor={BLUE} defaultActiveModel="hsv" />);
    const { hue } = getHsvFields();

    await user.click(screen.getByRole('button', { name: 'Red' }));
    await user.click(screen.getByRole('button', { name: 'Gray' }));

    expect(hue).toHaveValue('0');
  });

  it('keeps the hue and the gray saturation when the parent passes a gray, then black', async () => {
    render(<ControlledPicker initialColor={BLUE} defaultActiveModel="hsv" />);
    const { hue, saturation, value } = getHsvFields();

    await user.click(screen.getByRole('button', { name: 'Gray' }));
    await user.click(screen.getByRole('button', { name: 'Black' }));

    expect(hue).toHaveValue('240');
    expect(saturation).toHaveValue('0');
    expect(value).toHaveValue('0');
  });

  it('keeps the HSL saturation when the parent passes white', async () => {
    render(<ControlledPicker initialColor={BLUE} defaultActiveModel="hsl" />);
    const { saturation, lightness } = getHslFields();

    await user.click(screen.getByRole('button', { name: 'White' }));

    expect(saturation).toHaveValue('100');
    expect(lightness).toHaveValue('100');
  });

  it('does not report a color change when its fields are focused and blurred without an edit', async () => {
    const onColorChange = vi.fn();
    render(<ControlledPicker initialColor={OFF_GRID} onColorChange={onColorChange} />);

    for (const field of screen.getAllByRole('textbox')) {
      await user.click(field);
      await user.keyboard('{Tab}');
    }

    expect(onColorChange).not.toBeCalled();
  });

  it('does not report a color change when the hue slider moves on a gray', async () => {
    const handleColorChange = vi.fn();
    render(<ControlledPicker initialColor={GRAY} defaultActiveModel="hsv" onColorChange={handleColorChange} />);
    const { hue } = getHsvFields();

    getHueThumb().focus();
    await user.keyboard('{ArrowRight}{ArrowRight}');

    expect(hue).toHaveValue('2');
    expect(handleColorChange).not.toHaveBeenCalled();
  });

  it('reports each hue slider step on a chromatic color', async () => {
    const handleColorChange = vi.fn();
    render(<ControlledPicker initialColor={RED} defaultActiveModel="hsv" onColorChange={handleColorChange} />);
    const { hue } = getHsvFields();

    getHueThumb().focus();
    await user.keyboard('{ArrowRight}{ArrowRight}');

    expect(hue).toHaveValue('2');
    expect(handleColorChange).toHaveBeenCalledTimes(2);
  });
});

describe('uncontrolled ColorPicker', () => {
  it('changes the hue of a gray with the hue slider', async () => {
    render(<UncontrolledPicker defaultColor={GRAY} />);
    const { hue, saturation, value } = getHsvFields();

    getHueThumb().focus();
    await user.keyboard('{PageUp}');

    expect(hue).not.toHaveValue('0');
    expect(saturation).toHaveValue('0');
    expect(value).toHaveValue('50');
  });
});

describe('ColorPicker.Hue', () => {
  it('holds a hue between 359 and 360', () => {
    render(<UncontrolledPicker defaultColor={NEARLY_RED} />);

    expect(Number(getHueThumb().getAttribute('aria-valuenow'))).toBeCloseTo(NEARLY_RED_HUE);
  });

  it('moves a hue between 359 and 360 up to red', async () => {
    const handleColorChange = vi.fn();
    render(<ControlledPicker initialColor={NEARLY_RED} onColorChange={handleColorChange} />);

    getHueThumb().focus();
    await user.keyboard('{ArrowRight}');

    expect(handleColorChange).toHaveBeenLastCalledWith(RED);
  });
});

describe.each([
  ['Hue', ColorPicker.Hue],
  ['Alpha', ColorPicker.Alpha],
])('ColorPicker.%s', (_, Part) => {
  it('forwards props to the slider', () => {
    const handlePointerDown = vi.fn();
    render(
      <ColorPicker.Root colorSpace="srgb">
        <Part id="part" aria-label="Part" onPointerDown={handlePointerDown} />
      </ColorPicker.Root>
    );
    const slider = screen.getByRole('slider', { name: 'Part' });

    fireEvent.pointerDown(slider);

    expect(document.getElementById('part')).toContainElement(slider);
    expect(handlePointerDown).toHaveBeenCalled();
  });

  it('renders no undefined class without a className', () => {
    render(
      <ColorPicker.Root colorSpace="srgb">
        <Part />
      </ColorPicker.Root>
    );

    expect(screen.getByRole('group')).not.toHaveClass('undefined');
  });
});

describe('ColorPicker.Area', () => {
  it('sets its width from the size prop', () => {
    const { container } = render(<UncontrolledPicker defaultColor={RED} areaSize={200} />);

    expect(getArea(container)).toHaveStyle({ width: '200px' });
  });

  it('maps the pointer position against the size prop', () => {
    const { container } = render(<UncontrolledPicker defaultColor={RED} areaSize={200} />);
    const { saturation, value } = getHsvFields();

    fireEvent.pointerDown(getArea(container), { clientX: 100, clientY: 108 });

    expect(saturation).toHaveValue('50');
    expect(value).toHaveValue('50');
  });
});

describe('ColorPicker accessible names', () => {
  it.each([
    ['hex', ['Hex', 'Opacity']],
    ['rgb', ['Red', 'Green', 'Blue', 'Opacity']],
    ['hsl', ['Hue', 'Saturation', 'Lightness', 'Opacity']],
    ['hsv', ['Hue', 'Saturation', 'Brightness', 'Opacity']],
  ] satisfies [ColorModel, string[]][])('names the %s fields', (model, names) => {
    render(<ControlledPicker initialColor={RED} defaultActiveModel={model} />);

    for (const name of names) {
      expect(screen.getByRole('textbox', { name })).toBeInTheDocument();
    }
    expect(screen.getByRole('combobox', { name: 'Color model' })).toBeInTheDocument();
  });

  it('replaces the default field names with the labels prop', () => {
    render(
      <ColorPicker.Root colorSpace="srgb" defaultColor={RED} defaultActiveModel="rgb">
        <ColorPicker.Input labels={{ red: 'Rouge', model: 'Modèle' }} />
      </ColorPicker.Root>
    );

    expect(screen.getByRole('textbox', { name: 'Rouge' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Green' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Modèle' })).toBeInTheDocument();
  });

  it('names the hue and opacity sliders', () => {
    render(<UncontrolledPicker defaultColor={RED} />);

    expect(screen.getByRole('slider', { name: 'Hue' })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Opacity' })).toBeInTheDocument();
  });

  it('describes the area thumb position in the active model', () => {
    render(<ControlledPicker initialColor={RED} defaultActiveModel="hsl" />);

    expect(screen.getByRole('slider', { name: 'Color' })).toHaveAttribute(
      'aria-valuetext',
      'Saturation 100%, Lightness 50%'
    );
  });

  it('takes a custom area label and value text', () => {
    render(
      <ColorPicker.Root colorSpace="srgb" defaultColor={RED} defaultActiveModel="hsv">
        <ColorPicker.Area aria-label="Couleur" getAriaValueText={(color) => `${color.model} ${color.value.s}`} />
      </ColorPicker.Root>
    );

    expect(screen.getByRole('slider', { name: 'Couleur' })).toHaveAttribute('aria-valuetext', 'hsv 100');
  });

  it('keeps arrow keys on the area thumb from scrolling the page', () => {
    render(<UncontrolledPicker defaultColor={RED} />);

    const notPrevented = fireEvent.keyDown(screen.getByRole('slider', { name: 'Color' }), { key: 'ArrowDown' });

    expect(notPrevented).toBe(false);
  });
});

function ControlledPicker(props: {
  initialColor: RGBA;
  defaultActiveModel?: ColorModel;
  roundToFloat32?: boolean;
  onColorChange?: (color: RGBA) => void;
}) {
  const { initialColor, defaultActiveModel, roundToFloat32 = false, onColorChange } = props;
  const [color, setColor] = useState(initialColor);

  const handleColorChange = (color: RGBA) => {
    onColorChange?.(color);
    setColor(roundToFloat32 ? toFloat32(color) : color);
  };

  return (
    <>
      <button onClick={() => setColor(RED)}>Red</button>
      <button onClick={() => setColor(BLUE)}>Blue</button>
      <button onClick={() => setColor(GRAY)}>Gray</button>
      <button onClick={() => setColor(BLACK)}>Black</button>
      <button onClick={() => setColor(WHITE)}>White</button>
      <ColorPicker.Root
        colorSpace="srgb"
        color={color}
        onColorChange={handleColorChange}
        defaultActiveModel={defaultActiveModel}
      >
        <ColorPicker.Area />
        <ColorPicker.Hue />
        <ColorPicker.Alpha />
        <ColorPicker.Input />
      </ColorPicker.Root>
    </>
  );
}

function UncontrolledPicker(props: { defaultColor: RGBA; areaSize?: number }) {
  return (
    <ColorPicker.Root colorSpace="srgb" defaultColor={props.defaultColor} defaultActiveModel="hsv">
      <ColorPicker.Area size={props.areaSize} />
      <ColorPicker.Hue />
      <ColorPicker.Alpha />
      <ColorPicker.Input />
    </ColorPicker.Root>
  );
}

function getHsvFields() {
  const [hue, saturation, value] = screen.getAllByRole('textbox');
  return { hue, saturation, value };
}

function getHslFields() {
  const [hue, saturation, lightness] = screen.getAllByRole('textbox');
  return { hue, saturation, lightness };
}

function getArea(container: HTMLElement) {
  const area = container.querySelector('.fp-ColorPickerArea');
  if (!(area instanceof HTMLElement)) {
    throw new Error('ColorPicker.Area is not rendered');
  }
  return area;
}

function getHueThumb() {
  return screen.getByRole('slider', { name: 'Hue' });
}

function getAlphaThumb() {
  return screen.getByRole('slider', { name: 'Opacity' });
}

function toFloat32(color: RGBA): RGBA {
  return { r: Math.fround(color.r), g: Math.fround(color.g), b: Math.fround(color.b), a: Math.fround(color.a) };
}
