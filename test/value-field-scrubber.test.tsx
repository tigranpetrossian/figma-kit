import { act, render } from '@testing-library/react';
import { useState, type ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { NumericProps, ScrubberProps } from '@components/value-field';
import * as ValueField from '@components/value-field';

const FIELD_LABEL = 'value';
const SCRUBBER_TEST_ID = 'scrubber';

type TestPointerEventInit = {
  button?: number;
  clientX?: number;
  clientY?: number;
  movementX?: number;
  movementY?: number;
  pointerType?: string;
  shiftKey?: boolean;
};

type TestFieldProps = Partial<Omit<NumericProps, 'value' | 'onChange'>> & {
  initialValue: number;
  onChange?: (value: number) => void;
  rootDisabled?: boolean;
  scrubberChildren?: ReactNode;
  scrubberProps?: Partial<Pick<ScrubberProps, 'pixelSensitivity' | 'teleportDistance'>>;
};

describe('ValueField.Scrubber', () => {
  it('increments and decrements the numeric value while dragging a wrapped label', async () => {
    const { getByLabelText, getByTestId } = render(<TestField initialValue={0} />);
    const field = getByLabelText(FIELD_LABEL);
    const scrubber = getByTestId(SCRUBBER_TEST_ID);

    await startScrubbing(scrubber);
    await movePointer(4);
    expect(field).toHaveValue('4');

    await movePointer(-2);
    expect(field).toHaveValue('2');
  });

  it('uses the big nudge while dragging with shift pressed', async () => {
    const { getByLabelText, getByTestId } = render(<TestField initialValue={0} />);
    const field = getByLabelText(FIELD_LABEL);

    await startScrubbing(getByTestId(SCRUBBER_TEST_ID));
    await movePointer(2, { shiftKey: true });

    expect(field).toHaveValue('20');
  });

  it('applies the accumulated movement when pixel sensitivity is reached', async () => {
    const { getByLabelText, getByTestId } = render(
      <TestField initialValue={0} scrubberProps={{ pixelSensitivity: 5 }} />
    );
    const field = getByLabelText(FIELD_LABEL);
    const scrubber = getByTestId(SCRUBBER_TEST_ID);

    await startScrubbing(scrubber);
    await movePointer(-2);
    expect(field).toHaveValue('0');

    await movePointer(2);
    expect(field).toHaveValue('0');

    await movePointer(1);
    await movePointer(1);
    await movePointer(1);
    await movePointer(1);
    expect(field).toHaveValue('0');

    await movePointer(1);
    expect(field).toHaveValue('5');

    await movePointer(5);
    expect(field).toHaveValue('10');

    await movePointer(-4);
    expect(field).toHaveValue('10');

    await movePointer(-1);
    expect(field).toHaveValue('5');
  });

  it('changes by the same amount for slow and fast drags over the same distance', async () => {
    const { getByLabelText, getByTestId, rerender } = render(
      <TestField key="fast" initialValue={0} scrubberProps={{ pixelSensitivity: 2 }} />
    );
    const field = getByLabelText(FIELD_LABEL);

    await startScrubbing(getByTestId(SCRUBBER_TEST_ID));
    await movePointer(10);
    await stopScrubbing();
    expect(field).toHaveValue('10');

    rerender(<TestField key="slow" initialValue={0} scrubberProps={{ pixelSensitivity: 2 }} />);
    const nextField = getByLabelText(FIELD_LABEL);

    await startScrubbing(getByTestId(SCRUBBER_TEST_ID));
    await movePointer(1);
    await movePointer(1);
    await movePointer(1);
    await movePointer(1);
    await movePointer(1);
    await movePointer(1);
    await movePointer(1);
    await movePointer(1);
    await movePointer(1);
    await movePointer(1);
    await stopScrubbing();
    expect(nextField).toHaveValue('10');
  });

  it('keeps min, max, precision, suffix, and target range behavior', async () => {
    const onChange = vi.fn();
    const { getByLabelText, getByTestId } = render(
      <TestField
        initialValue={0.95}
        onChange={onChange}
        min={0}
        max={1}
        targetRange={[0, 100]}
        precision={0}
        suffix="%"
      />
    );
    const field = getByLabelText(FIELD_LABEL);

    await startScrubbing(getByTestId(SCRUBBER_TEST_ID));
    await movePointer(10);
    expect(field).toHaveValue('100%');
    expect(onChange).toHaveBeenLastCalledWith(1);

    await movePointer(-200);
    expect(field).toHaveValue('0%');
    expect(onChange).toHaveBeenLastCalledWith(0);
  });

  it('works as an invisible left-edge hitbox', async () => {
    const { getByLabelText, getByTestId } = render(<TestField initialValue={0} scrubberChildren={null} />);
    const field = getByLabelText(FIELD_LABEL);
    const scrubber = getByTestId(SCRUBBER_TEST_ID);

    expect(scrubber).toBeEmptyDOMElement();

    await startScrubbing(scrubber);
    await movePointer(3);

    expect(field).toHaveValue('3');
  });

  it('scrubs each field independently inside a multi value field', async () => {
    const { getByLabelText, getByTestId } = render(<TestMultiField />);

    await startScrubbing(getByTestId('scrubber-r'));
    await movePointer(4);
    await stopScrubbing();
    expect(getByLabelText('r')).toHaveValue('4');
    expect(getByLabelText('g')).toHaveValue('0');
    expect(getByLabelText('b')).toHaveValue('0');
    expect(getByLabelText('a')).toHaveValue('0%');

    await startScrubbing(getByTestId('scrubber-g'));
    await movePointer(8);
    await stopScrubbing();
    expect(getByLabelText('r')).toHaveValue('4');
    expect(getByLabelText('g')).toHaveValue('8');
    expect(getByLabelText('b')).toHaveValue('0');
    expect(getByLabelText('a')).toHaveValue('0%');

    await startScrubbing(getByTestId('scrubber-b'));
    await movePointer(12);
    await stopScrubbing();
    expect(getByLabelText('r')).toHaveValue('4');
    expect(getByLabelText('g')).toHaveValue('8');
    expect(getByLabelText('b')).toHaveValue('12');
    expect(getByLabelText('a')).toHaveValue('0%');

    await startScrubbing(getByTestId('scrubber-a'));
    await movePointer(16);
    await stopScrubbing();
    expect(getByLabelText('r')).toHaveValue('4');
    expect(getByLabelText('g')).toHaveValue('8');
    expect(getByLabelText('b')).toHaveValue('12');
    expect(getByLabelText('a')).toHaveValue('16%');
  });

  it('does not scrub a disabled field', async () => {
    const { getByLabelText, getByTestId } = render(<TestField initialValue={0} rootDisabled />);
    const field = getByLabelText(FIELD_LABEL);

    await startScrubbing(getByTestId(SCRUBBER_TEST_ID));
    await movePointer(10);

    expect(field).toHaveValue('0');
  });

  it('does not scrub a disabled numeric input', async () => {
    const { getByLabelText, getByTestId } = render(<TestField initialValue={0} disabled />);
    const field = getByLabelText(FIELD_LABEL);

    await startScrubbing(getByTestId(SCRUBBER_TEST_ID));
    await movePointer(10);

    expect(field).toHaveValue('0');
  });

  it('keeps child clicks working when the pointer does not move', async () => {
    const onClick = vi.fn();
    const { getByText } = render(<TestField initialValue={0} scrubberChildren={<span onClick={onClick}>X</span>} />);

    await startScrubbing(getByText('X'));
    await stopScrubbing();

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('sets scrubbing attributes only while dragging', async () => {
    const { getByTestId } = render(<TestField initialValue={0} />);
    const scrubber = getByTestId(SCRUBBER_TEST_ID);
    const root = scrubber.parentElement;

    if (!(root instanceof HTMLElement)) {
      expect(root).toBeInstanceOf(HTMLElement);
      return;
    }

    expect(root).not.toHaveAttribute('data-scrubbing');
    expect(scrubber).not.toHaveAttribute('data-scrubbing');

    await startScrubbing(scrubber);
    expect(root).toHaveAttribute('data-scrubbing');
    expect(scrubber).toHaveAttribute('data-scrubbing');

    await stopScrubbing();
    expect(root).not.toHaveAttribute('data-scrubbing');
    expect(scrubber).not.toHaveAttribute('data-scrubbing');
  });

  it('stops scrubbing after pointerup', async () => {
    const { getByLabelText, getByTestId } = render(<TestField initialValue={0} />);
    const field = getByLabelText(FIELD_LABEL);
    const scrubber = getByTestId(SCRUBBER_TEST_ID);

    await startScrubbing(scrubber);
    await movePointer(4);
    expect(field).toHaveValue('4');

    await stopScrubbing();
    await movePointer(4);
    expect(field).toHaveValue('4');
  });

  it('wraps the internal cursor around the viewport edge', async () => {
    const restorePointerLock = mockPointerLock();
    const { getByTestId } = render(
      <TestField initialValue={0} scrubberProps={{ teleportDistance: 0 }} scrubberChildren={null} />
    );
    const scrubber = getByTestId(SCRUBBER_TEST_ID);
    Object.defineProperty(scrubber, 'getBoundingClientRect', {
      configurable: true,
      value: () => new DOMRect(0, 0, 100, 24),
    });

    await startScrubbing(scrubber, { clientX: 95, clientY: 12 });
    const cursor = document.querySelector('.fp-ValueFieldScrubberCursor');

    if (cursor instanceof HTMLElement) {
      Object.defineProperty(cursor, 'offsetWidth', { configurable: true, value: 10 });
      Object.defineProperty(cursor, 'offsetHeight', { configurable: true, value: 10 });
      await movePointer(20);
      expect(cursor.style.transform).toBe('translate3d(-5px,12px,0)');
    } else {
      expect(cursor).toBeInstanceOf(HTMLElement);
    }

    await stopScrubbing();
    restorePointerLock();
  });
});

function TestField(props: TestFieldProps) {
  const { initialValue, onChange, rootDisabled, scrubberChildren, scrubberProps, ...numericProps } = props;
  const [value, setValue] = useState(initialValue);

  function handleChange(nextValue: number) {
    onChange?.(nextValue);
    setValue(nextValue);
  }

  return (
    <ValueField.Root disabled={rootDisabled} style={{ width: 100 }}>
      <ValueField.Scrubber data-testid={SCRUBBER_TEST_ID} {...scrubberProps}>
        {scrubberChildren === undefined ? <ValueField.Label>X</ValueField.Label> : scrubberChildren}
      </ValueField.Scrubber>
      <ValueField.Numeric aria-label={FIELD_LABEL} value={value} onChange={handleChange} {...numericProps} />
    </ValueField.Root>
  );
}

function TestMultiField() {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [alpha, setAlpha] = useState(0);

  return (
    <ValueField.Multi>
      <ValueField.Root>
        <ValueField.Scrubber data-testid="scrubber-r" />
        <ValueField.Numeric
          aria-label="r"
          value={red}
          onChange={setRed}
          min={0}
          max={1}
          targetRange={[0, 255]}
          precision={0}
        />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Scrubber data-testid="scrubber-g" />
        <ValueField.Numeric
          aria-label="g"
          value={green}
          onChange={setGreen}
          min={0}
          max={1}
          targetRange={[0, 255]}
          precision={0}
        />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Scrubber data-testid="scrubber-b" />
        <ValueField.Numeric
          aria-label="b"
          value={blue}
          onChange={setBlue}
          min={0}
          max={1}
          targetRange={[0, 255]}
          precision={0}
        />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Scrubber data-testid="scrubber-a" />
        <ValueField.Numeric
          aria-label="a"
          value={alpha}
          onChange={setAlpha}
          min={0}
          max={1}
          targetRange={[0, 100]}
          precision={0}
          suffix="%"
        />
      </ValueField.Root>
    </ValueField.Multi>
  );
}

async function startScrubbing(element: HTMLElement, init: TestPointerEventInit = {}) {
  await act(async () => {
    element.dispatchEvent(
      createPointerEvent('pointerdown', {
        clientX: 10,
        clientY: 10,
        pointerType: 'mouse',
        ...init,
      })
    );
  });
}

async function movePointer(movementX: number, init: TestPointerEventInit = {}) {
  await act(async () => {
    window.dispatchEvent(
      createPointerEvent('pointermove', {
        movementX,
        pointerType: 'mouse',
        ...init,
      })
    );
  });
}

async function stopScrubbing() {
  await act(async () => {
    window.dispatchEvent(createPointerEvent('pointerup', { pointerType: 'mouse' }));
  });
}

function createPointerEvent(type: string, init: TestPointerEventInit = {}) {
  const event = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    button: init.button ?? 0,
    clientX: init.clientX ?? 0,
    clientY: init.clientY ?? 0,
    shiftKey: init.shiftKey ?? false,
  });

  Object.defineProperties(event, {
    movementX: { value: init.movementX ?? 0 },
    movementY: { value: init.movementY ?? 0 },
    pointerType: { value: init.pointerType ?? 'mouse' },
  });

  return event;
}

function mockPointerLock() {
  const requestPointerLockDescriptor = Object.getOwnPropertyDescriptor(document.body, 'requestPointerLock');
  const exitPointerLockDescriptor = Object.getOwnPropertyDescriptor(document, 'exitPointerLock');

  Object.defineProperty(document.body, 'requestPointerLock', {
    configurable: true,
    value: () => Promise.resolve(),
  });
  Object.defineProperty(document, 'exitPointerLock', {
    configurable: true,
    value: () => undefined,
  });

  return () => {
    restoreProperty(document.body, 'requestPointerLock', requestPointerLockDescriptor);
    restoreProperty(document, 'exitPointerLock', exitPointerLockDescriptor);
  };
}

function restoreProperty(target: object, key: string, descriptor: PropertyDescriptor | undefined) {
  if (descriptor) {
    Object.defineProperty(target, key, descriptor);
    return;
  }

  Reflect.deleteProperty(target, key);
}
