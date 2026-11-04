import { StrictMode, createRef, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import type { ColorModel, ColorSpace } from '@components/color-picker';
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
const AZURE = { r: 0, g: 0.5, b: 0.75, a: 1 };
const TEAL = { r: 0, g: 85 / 255, b: 102 / 255, a: 1 };
const HALF_RED = { r: 1, g: 0, b: 0, a: 0.5 };

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

describe('ColorPicker precision', () => {
  it('shows the same channel values in the hex and RGB fields', async () => {
    render(<ControlledPicker initialColor={RED} defaultActiveModel="hsv" />);
    const { saturation, value } = getHsvFields();

    await user.type(saturation, '80');
    await user.keyboard('{Enter}');
    await user.type(value, '50');
    await user.keyboard('{Enter}');

    await selectModel('HEX');
    expect(screen.getByRole('textbox', { name: 'Hex' })).toHaveValue('801A1A');
    await selectModel('RGB');
    expect(screen.getByRole('textbox', { name: 'Red' })).toHaveValue('128');
    expect(screen.getByRole('textbox', { name: 'Green' })).toHaveValue('26');
    expect(screen.getByRole('textbox', { name: 'Blue' })).toHaveValue('26');
  });

  it('emits channels within range from the HSL fields', async () => {
    const handleColorChange = vi.fn();
    render(<ControlledPicker initialColor={RED} defaultActiveModel="hsl" onColorChange={handleColorChange} />);
    const { lightness } = getHslFields();

    await user.type(lightness, '7');
    await user.keyboard('{Enter}');

    const [color] = handleColorChange.mock.lastCall ?? [];
    expect(color.r).toBeCloseTo(0.14);
    expect(color.g).toBe(0);
    expect(color.b).toBe(0);
  });

  it.each(['hsl', 'hsv'] satisfies ColorModel[])(
    'keeps the RGB channels when opacity changes in %s mode',
    async (model) => {
      const handleColorChange = vi.fn();
      render(<ControlledPicker initialColor={AZURE} defaultActiveModel={model} onColorChange={handleColorChange} />);

      await user.type(screen.getByRole('textbox', { name: 'Opacity' }), '50');
      await user.keyboard('{Enter}');

      expect(handleColorChange).toHaveBeenLastCalledWith({ ...AZURE, a: 0.5 });
    }
  );

  it('reports a typed opacity to assistive tech without noise', async () => {
    render(<ControlledPicker initialColor={RED} defaultActiveModel="rgb" />);

    await user.type(screen.getByRole('textbox', { name: 'Opacity' }), '7');
    await user.keyboard('{Enter}');

    expect(getAlphaThumb()).toHaveAttribute('aria-valuenow', '7');
  });

  it('reports a float32 opacity to assistive tech without noise', () => {
    render(<ControlledPicker initialColor={{ ...RED, a: Math.fround(0.07) }} />);

    expect(getAlphaThumb()).toHaveAttribute('aria-valuenow', '7');
  });

  it('reports a computed hue to assistive tech without noise', () => {
    render(<UncontrolledPicker defaultColor={TEAL} />);

    expect(getHueThumb()).toHaveAttribute('aria-valuenow', '190');
  });
});

describe('ColorPicker.Eyedropper', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders nothing where the browser has no EyeDropper', () => {
    render(<EyedropperPicker initialColor={BLUE} />);

    expect(screen.queryByRole('button', { name: 'Pick color' })).not.toBeInTheDocument();
  });

  it('renders a button named Pick color where the browser has an EyeDropper', () => {
    stubEyeDropper();
    render(<EyedropperPicker initialColor={BLUE} />);

    expect(screen.getByRole('button', { name: 'Pick color' })).toBeInTheDocument();
  });

  it('renders no button in a server render even where the browser has an EyeDropper', () => {
    stubEyeDropper();

    const html = renderToString(<EyedropperPicker initialColor={BLUE} />);

    expect(html).not.toContain('Pick color');
  });

  it('replaces the default name with the aria-label prop', () => {
    stubEyeDropper();
    render(<EyedropperPicker initialColor={BLUE} aria-label="Pipette" />);

    expect(screen.getByRole('button', { name: 'Pipette' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Pick color' })).not.toBeInTheDocument();
  });

  it('forwards its ref and onClick to the button and still opens the eyedropper', async () => {
    const open = stubEyeDropper().mockResolvedValueOnce({ sRGBHex: '#00ff00' });
    const ref = createRef<HTMLButtonElement>();
    const handleClick = vi.fn();
    render(
      <ColorPicker.Root colorSpace="srgb" defaultColor={BLUE} defaultActiveModel="hex">
        <ColorPicker.Eyedropper ref={ref} onClick={handleClick} />
        <ColorPicker.Input />
      </ColorPicker.Root>
    );
    const button = screen.getByRole('button', { name: 'Pick color' });

    await user.click(button);

    expect(ref.current).toBe(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(open).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByRole('textbox', { name: 'Hex' })).toHaveValue('00FF00'));
  });

  it('applies the sampled color and keeps the opacity', async () => {
    stubEyeDropper().mockResolvedValueOnce({ sRGBHex: '#336699' });
    const handleColorChange = vi.fn();
    render(<EyedropperPicker initialColor={HALF_RED} onColorChange={handleColorChange} />);

    await user.click(screen.getByRole('button', { name: 'Pick color' }));

    await waitFor(() => expect(handleColorChange).toHaveBeenLastCalledWith({ r: 0.2, g: 0.4, b: 0.6, a: 0.5 }));
    expect(screen.getByRole('textbox', { name: 'Hex' })).toHaveValue('336699');
    expect(screen.getByRole('textbox', { name: 'Opacity' })).toHaveValue('50');
  });

  it('converts the sampled sRGB color to display-p3', async () => {
    stubEyeDropper().mockResolvedValueOnce({ sRGBHex: '#ff0000' });
    const handleColorChange = vi.fn();
    render(<EyedropperPicker initialColor={BLUE} colorSpace="display-p3" onColorChange={handleColorChange} />);

    await user.click(screen.getByRole('button', { name: 'Pick color' }));

    await waitFor(() =>
      expect(handleColorChange).toHaveBeenLastCalledWith({
        r: expect.closeTo(0.9175, 4),
        g: expect.closeTo(0.2003, 4),
        b: expect.closeTo(0.1386, 4),
        a: 1,
      })
    );
  });

  it('keeps the hue when it samples white in display-p3', async () => {
    stubEyeDropper().mockResolvedValueOnce({ sRGBHex: '#ffffff' });
    render(<EyedropperPicker initialColor={BLUE} colorSpace="display-p3" />);

    await user.click(screen.getByRole('button', { name: 'Pick color' }));

    await waitFor(() => expect(screen.getByRole('textbox', { name: 'Hex' })).toHaveValue('FFFFFF'));
    expect(getHueThumb()).toHaveAttribute('aria-valuenow', '240');
  });

  it.each([
    ['a cancelled pick', () => Promise.reject(new DOMException('', 'AbortError'))],
    ['a malformed result', () => Promise.resolve({ sRGBHex: 'red' })],
  ])('leaves the color alone after %s', async (_, open) => {
    stubEyeDropper().mockImplementationOnce(open);
    const handleColorChange = vi.fn();
    render(<EyedropperPicker initialColor={BLUE} onColorChange={handleColorChange} />);

    await user.click(screen.getByRole('button', { name: 'Pick color' }));
    await settlePendingPicks();

    expect(screen.getByRole('textbox', { name: 'Hex' })).toHaveValue('0000FF');
    expect(handleColorChange).not.toHaveBeenCalled();
  });

  it('closes the eyedropper when the picker unmounts and not before', async () => {
    const open = stubEyeDropper().mockImplementationOnce(rejectWhenAborted);
    const { unmount } = render(
      <StrictMode>
        <EyedropperPicker initialColor={BLUE} />
      </StrictMode>
    );

    await user.click(screen.getByRole('button', { name: 'Pick color' }));
    const signal = open.mock.lastCall?.[0].signal;
    expect(signal?.aborted).toBe(false);
    unmount();
    await settlePendingPicks();

    expect(signal?.aborted).toBe(true);
  });

  it('keeps the first pick when the browser refuses a second one', async () => {
    let resolveFirstPick: (result: unknown) => void = () => {};
    stubEyeDropper()
      .mockImplementationOnce(() => new Promise((resolve) => (resolveFirstPick = resolve)))
      .mockImplementationOnce(() => Promise.reject(new DOMException('', 'InvalidStateError')));
    render(<EyedropperPicker initialColor={BLUE} />);
    const button = screen.getByRole('button', { name: 'Pick color' });

    await user.click(button);
    await user.click(button);
    resolveFirstPick({ sRGBHex: '#00ff00' });

    await waitFor(() => expect(screen.getByRole('textbox', { name: 'Hex' })).toHaveValue('00FF00'));
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

function EyedropperPicker(props: {
  initialColor: RGBA;
  colorSpace?: ColorSpace;
  'aria-label'?: string;
  onColorChange?: (color: RGBA) => void;
}) {
  const { initialColor, colorSpace = 'srgb', 'aria-label': ariaLabel, onColorChange } = props;

  return (
    <ColorPicker.Root
      colorSpace={colorSpace}
      defaultColor={initialColor}
      defaultActiveModel="hex"
      onColorChange={onColorChange}
    >
      <ColorPicker.Eyedropper aria-label={ariaLabel} />
      <ColorPicker.Hue />
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

async function selectModel(name: string) {
  await user.click(screen.getByRole('combobox', { name: 'Color model' }));
  await user.click(screen.getByRole('option', { name }));
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

function stubEyeDropper() {
  const open = vi.fn<(options: { signal?: AbortSignal }) => Promise<unknown>>();
  vi.stubGlobal(
    'EyeDropper',
    class {
      open = open;
    }
  );
  return open;
}

function rejectWhenAborted({ signal }: { signal?: AbortSignal }) {
  return new Promise<unknown>((_, reject) => {
    signal?.addEventListener('abort', () => reject(new DOMException('', 'AbortError')));
  });
}

function settlePendingPicks() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}
