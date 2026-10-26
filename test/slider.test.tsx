import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Slider } from '@components/slider';

const ROOT_BORDER_WIDTH = 8;
const CONTROL_LEFT = 100;
const CONTROL_WIDTH = 200;
const POINTER_Y = 10;

describe('Slider', () => {
  it('keeps showing the controlled value when the parent rejects a change', () => {
    const handleValueChange = vi.fn();
    render(<Slider aria-label="Opacity" value={[30]} onValueChange={handleValueChange} />);
    const slider = screen.getByRole('slider');

    fireEvent.keyDown(slider, { key: 'ArrowRight' });

    expect(handleValueChange).toHaveBeenCalledWith([31]);
    expect(slider).toHaveAttribute('aria-valuenow', '30');
  });

  it('steps past a hint with the keyboard', () => {
    const handleValueChange = vi.fn();
    render(<Slider aria-label="Opacity" defaultValue={[50]} hints={[50]} onValueChange={handleValueChange} />);
    const slider = screen.getByRole('slider');

    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    fireEvent.keyDown(slider, { key: 'ArrowRight' });

    expect(handleValueChange.mock.calls).toEqual([[[51]], [[52]]]);
    expect(slider).toHaveAttribute('aria-valuenow', '52');
  });

  it('snaps a track press to a nearby hint', () => {
    const handleValueChange = vi.fn();
    const { container } = render(
      <Slider aria-label="Opacity" defaultValue={[0]} hints={[50]} onValueChange={handleValueChange} />
    );
    const control = mockSliderGeometry(container);

    pressPointer(control, CONTROL_LEFT + CONTROL_WIDTH * 0.51);

    expect(handleValueChange).toHaveBeenLastCalledWith([50]);
  });

  it('moves the focused thumb of an inverted range', () => {
    const handleValueChange = vi.fn();
    render(<Slider inverted defaultValue={[20, 80]} onValueChange={handleValueChange} />);

    fireEvent.keyDown(screen.getByRole('slider', { value: { now: 20 } }), { key: 'ArrowLeft' });

    expect(handleValueChange).toHaveBeenCalledWith([21, 80]);
  });

  it('reports the real value of an inverted slider', () => {
    render(<Slider aria-label="Opacity" inverted value={[20]} />);

    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '20');
  });

  it('puts the maximum at the start edge of an inverted slider', () => {
    const handleValueChange = vi.fn();
    const { container } = render(<Slider aria-label="Opacity" inverted onValueChange={handleValueChange} />);
    const control = mockSliderGeometry(container);

    pressPointer(control, CONTROL_LEFT);

    expect(handleValueChange).toHaveBeenLastCalledWith([100]);
  });

  it('keeps the value when dragging starts where the track was pressed', () => {
    const handleValueChange = vi.fn();
    const { container } = render(<Slider aria-label="Opacity" defaultValue={[50]} onValueChange={handleValueChange} />);
    const control = mockSliderGeometry(container);

    pressPointer(control, CONTROL_LEFT);
    expect(handleValueChange).toHaveBeenLastCalledWith([0]);

    movePointer(CONTROL_LEFT);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '0');
  });

  it('names the slider with aria-label', () => {
    render(<Slider aria-label="Opacity" defaultValue={[50]} />);

    expect(screen.getByRole('slider', { name: 'Opacity' })).toHaveAttribute('aria-valuenow', '50');
  });

  it('names each thumb with getAriaLabel', () => {
    render(<Slider defaultValue={[20, 80]} getAriaLabel={(index) => (index === 0 ? 'Minimum' : 'Maximum')} />);

    expect(screen.getByRole('slider', { name: 'Minimum' })).toHaveAttribute('aria-valuenow', '20');
    expect(screen.getByRole('slider', { name: 'Maximum' })).toHaveAttribute('aria-valuenow', '80');
  });
});

function mockSliderGeometry(container: HTMLElement) {
  const root = container.querySelector('.fp-SliderRoot');
  const control = container.querySelector('.fp-SliderControl');

  if (!(root instanceof HTMLElement) || !(control instanceof HTMLElement)) {
    throw new Error('Slider root or control is missing');
  }

  root.getBoundingClientRect = () =>
    new DOMRect(CONTROL_LEFT - ROOT_BORDER_WIDTH, 0, CONTROL_WIDTH + ROOT_BORDER_WIDTH * 2, POINTER_Y * 2);
  control.getBoundingClientRect = () => new DOMRect(CONTROL_LEFT, 0, CONTROL_WIDTH, POINTER_Y * 2);

  return control;
}

function pressPointer(control: HTMLElement, clientX: number) {
  act(() => {
    fireEvent.pointerDown(control, { button: 0, buttons: 1, clientX, clientY: POINTER_Y });
  });
}

function movePointer(clientX: number) {
  act(() => {
    fireEvent.pointerMove(document, { buttons: 1, clientX, clientY: POINTER_Y });
  });
}
