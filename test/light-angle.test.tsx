import { useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { LightAngleProps } from '@components/light-angle';
import { LightAngle } from '@components/light-angle';

const BOX_SIZE = 56;
const CENTER = BOX_SIZE / 2;

describe('LightAngle', () => {
  it('stays out of the accessibility tree', () => {
    const { container } = render(<LightAngle value={0} onValueChange={vi.fn()} />);
    const root = getPart(container, '.fp-LightAngleRoot');

    expect(root).toHaveAttribute('aria-hidden', 'true');
    expect(root).not.toHaveAttribute('tabindex');
    expect(screen.queryByRole('slider')).toBeNull();
  });

  it('points the source at the given angle', () => {
    const { container } = render(<LightAngle value={30} onValueChange={vi.fn()} />);

    expect(getPart(container, '.fp-LightAngleRotor')).toHaveStyle({ transform: 'rotate(30deg)' });
  });

  it('moves the source to a pressed empty spot', () => {
    const handleValueChange = vi.fn();
    const { container } = render(<LightAngle value={0} onValueChange={handleValueChange} />);
    const root = mockGeometry(container);

    pressPointer(root, { clientX: BOX_SIZE, clientY: CENTER });

    expect(handleValueChange).toHaveBeenCalledWith(90);
  });

  it('follows the pointer while dragging', () => {
    const handleValueChange = vi.fn();
    const { container } = render(<StatefulLightAngle onValueChange={handleValueChange} />);
    const root = mockGeometry(container);

    pressPointer(root, { clientX: BOX_SIZE, clientY: CENTER });
    movePointer(root, { clientX: CENTER, clientY: BOX_SIZE });

    expect(handleValueChange.mock.calls).toEqual([[90], [-180]]);
  });

  it('keeps the angle when the drag starts on the source', () => {
    const handleValueChange = vi.fn();
    const { container } = render(<StatefulLightAngle onValueChange={handleValueChange} />);
    const root = mockGeometry(container);
    const source = getPart(container, '.fp-LightAngleSource');

    pressPointer(source, { clientX: CENTER + 6, clientY: CENTER - 18 });
    expect(handleValueChange).not.toHaveBeenCalled();

    movePointer(root, { clientX: BOX_SIZE, clientY: CENTER });
    expect(handleValueChange).toHaveBeenCalledWith(90 - 18);
  });

  it('commits the angle when the pointer is released', () => {
    const handleValueCommit = vi.fn();
    const { container } = render(<StatefulLightAngle onValueCommit={handleValueCommit} />);
    const root = mockGeometry(container);

    pressPointer(root, { clientX: 0, clientY: CENTER });
    expect(handleValueCommit).not.toHaveBeenCalled();

    releasePointer(root, { clientX: 0, clientY: CENTER });
    expect(handleValueCommit).toHaveBeenCalledWith(-90);
  });

  it('calls consumer handlers alongside its own', () => {
    const handlePointerDown = vi.fn();
    const handlePointerUp = vi.fn();
    const handleValueCommit = vi.fn();
    const { container } = render(
      <StatefulLightAngle
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onValueCommit={handleValueCommit}
      />
    );
    const root = mockGeometry(container);

    pressPointer(root, { clientX: BOX_SIZE, clientY: CENTER });
    releasePointer(root, { clientX: BOX_SIZE, clientY: CENTER });

    expect(handlePointerDown).toHaveBeenCalledOnce();
    expect(handlePointerUp).toHaveBeenCalledOnce();
    expect(handleValueCommit).toHaveBeenCalledWith(90);
  });

  it('skips the drag when a consumer prevents pointer events', () => {
    const handleValueChange = vi.fn();
    const handleValueCommit = vi.fn();
    const { container } = render(
      <StatefulLightAngle
        onValueChange={handleValueChange}
        onValueCommit={handleValueCommit}
        onPointerDown={(event) => event.preventDefault()}
      />
    );
    const root = mockGeometry(container);

    pressPointer(root, { clientX: BOX_SIZE, clientY: CENTER });
    movePointer(root, { clientX: 0, clientY: CENTER });
    releasePointer(root, { clientX: 0, clientY: CENTER });

    expect(handleValueChange).not.toHaveBeenCalled();
    expect(handleValueCommit).not.toHaveBeenCalled();
  });

  it('keeps the dragged angle uncommitted when a consumer prevents the release', () => {
    const handleValueChange = vi.fn();
    const handleValueCommit = vi.fn();
    const { container } = render(
      <StatefulLightAngle
        onValueChange={handleValueChange}
        onValueCommit={handleValueCommit}
        onPointerUp={(event) => event.preventDefault()}
      />
    );
    const root = mockGeometry(container);

    pressPointer(root, { clientX: BOX_SIZE, clientY: CENTER });
    releasePointer(root, { clientX: 0, clientY: CENTER });

    expect(handleValueChange.mock.calls).toEqual([[90]]);
    expect(handleValueCommit).not.toHaveBeenCalled();
  });
});

type PointerPosition = { clientX: number; clientY: number };

type StatefulLightAngleProps = Omit<LightAngleProps, 'value' | 'onValueChange'> & {
  onValueChange?: (value: number) => void;
};

const StatefulLightAngle = (props: StatefulLightAngleProps) => {
  const { onValueChange, ...lightAngleProps } = props;
  const [angle, setAngle] = useState(0);

  const handleValueChange = (nextAngle: number) => {
    setAngle(nextAngle);
    onValueChange?.(nextAngle);
  };

  return <LightAngle {...lightAngleProps} value={angle} onValueChange={handleValueChange} />;
};

function mockGeometry(container: HTMLElement) {
  const root = getPart(container, '.fp-LightAngleRoot');
  const capturedPointers = new Set<number>();
  root.getBoundingClientRect = () => new DOMRect(0, 0, BOX_SIZE, BOX_SIZE);
  root.setPointerCapture = (pointerId) => capturedPointers.add(pointerId);
  root.hasPointerCapture = (pointerId) => capturedPointers.has(pointerId);
  root.releasePointerCapture = (pointerId) => capturedPointers.delete(pointerId);

  return root;
}

function getPart(container: HTMLElement, selector: string) {
  const part = container.querySelector(selector);
  if (!(part instanceof HTMLElement)) {
    throw new Error(`${selector} is missing`);
  }

  return part;
}

function pressPointer(target: HTMLElement, position: PointerPosition) {
  act(() => {
    fireEvent.pointerDown(target, { button: 0, buttons: 1, pointerId: 1, ...position });
  });
}

function movePointer(root: HTMLElement, position: PointerPosition) {
  act(() => {
    fireEvent.pointerMove(root, { buttons: 1, pointerId: 1, ...position });
  });
}

function releasePointer(root: HTMLElement, position: PointerPosition) {
  act(() => {
    fireEvent.pointerUp(root, { button: 0, pointerId: 1, ...position });
  });
}
