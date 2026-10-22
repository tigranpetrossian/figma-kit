import { describe, expect, it, vi } from 'vitest';
import { act, render, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useState } from 'react';
import { NumericSelect } from '@components/value-field/value-field-numeric-select';
import type { NumericSelectProps } from '@components/value-field/value-field-numeric-select';

const LABEL = 'Size';
const OPTIONS = [10, 12, 14, 20];
const user = userEvent.setup();

type TestNumericSelectProps = Partial<Omit<NumericSelectProps, 'value' | 'onChange' | 'options'>> & {
  initialValue: number;
  options?: readonly number[];
};

type TestPointerEventInit = {
  button?: number;
  clientX?: number;
  clientY?: number;
  movementX?: number;
  pointerType?: string;
};

const TestNumericSelect = (props: TestNumericSelectProps) => {
  const { initialValue, options = OPTIONS, ...numericSelectProps } = props;
  const [value, setValue] = useState(initialValue);

  return (
    <NumericSelect aria-label={LABEL} value={value} onChange={setValue} options={options} {...numericSelectProps} />
  );
};

describe('NumericSelect', () => {
  it('renders the numeric value', () => {
    const { getByLabelText } = render(<TestNumericSelect initialValue={12} />);
    expect(getByLabelText(LABEL)).toHaveValue('12');
  });

  it('updates from typed input', async () => {
    const { getByLabelText } = render(<TestNumericSelect initialValue={12} />);
    const field = getByLabelText(LABEL);
    await user.type(field, '14');
    await user.keyboard('{Enter}');
    expect(field).toHaveValue('14');
  });

  it('updates from scrubber drag', async () => {
    const { container, getByLabelText } = render(<TestNumericSelect initialValue={12} />);
    const scrubber = container.querySelector('.fp-ValueFieldScrubber');

    if (!(scrubber instanceof HTMLElement)) {
      expect(scrubber).toBeInstanceOf(HTMLElement);
      return;
    }

    await startScrubbing(scrubber);
    await movePointer(4);
    await stopScrubbing();

    expect(getByLabelText(LABEL)).toHaveValue('16');
  });

  it('updates from selected option', async () => {
    const { getByLabelText, getByRole } = render(<TestNumericSelect initialValue={12} />);
    await user.click(getByRole('combobox', { name: 'Select value' }));
    await user.click(getByRole('option', { name: '20' }));
    expect(getByLabelText(LABEL)).toHaveValue('20');
  });

  it('shows the current value above options when it is not an option', async () => {
    const { getAllByRole, getByLabelText, getByRole } = render(<TestNumericSelect initialValue={20} />);
    const field = getByLabelText(LABEL);
    await user.type(field, '21');
    await user.keyboard('{Enter}');
    await user.click(getByRole('combobox', { name: 'Select value' }));
    expect(getByRole('option', { name: '21', selected: true })).toBeInTheDocument();
    expect(getAllByRole('option').map((option) => option.textContent)).toEqual(['21', '10', '12', '14', '20']);
    expect(document.querySelector('.fp-MenuSeparator')).toBeInTheDocument();
  });

  it('reports the option highlighted with the keyboard', async () => {
    const onItemHighlighted = vi.fn();
    const { getByRole } = render(<TestNumericSelect initialValue={12} onItemHighlighted={onItemHighlighted} />);
    await user.click(getByRole('combobox', { name: 'Select value' }));
    await waitFor(() => expect(onItemHighlighted).toHaveBeenLastCalledWith(12));
    await user.keyboard('{ArrowDown}');
    expect(onItemHighlighted).toHaveBeenLastCalledWith(14);
  });

  it('reports the hovered option, then undefined when the pointer leaves', async () => {
    const onItemHighlighted = vi.fn();
    const { getByRole } = render(<TestNumericSelect initialValue={12} onItemHighlighted={onItemHighlighted} />);
    await user.click(getByRole('combobox', { name: 'Select value' }));
    const option = getByRole('option', { name: '20' });
    await user.hover(option);
    expect(onItemHighlighted).toHaveBeenLastCalledWith(20);
    await user.unhover(option);
    expect(onItemHighlighted).toHaveBeenLastCalledWith(undefined);
  });

  it('reports undefined when the menu closes', async () => {
    const onItemHighlighted = vi.fn();
    const { getByRole } = render(<TestNumericSelect initialValue={12} onItemHighlighted={onItemHighlighted} />);
    await user.click(getByRole('combobox', { name: 'Select value' }));
    await waitFor(() => expect(onItemHighlighted).toHaveBeenLastCalledWith(12));
    await user.keyboard('{Escape}');
    expect(onItemHighlighted).toHaveBeenLastCalledWith(undefined);
  });

  it('reports each highlight change once', async () => {
    const onItemHighlighted = vi.fn();
    const { getByRole } = render(<TestNumericSelect initialValue={12} onItemHighlighted={onItemHighlighted} />);
    await user.click(getByRole('combobox', { name: 'Select value' }));
    await waitFor(() => expect(onItemHighlighted).toHaveBeenLastCalledWith(12));
    const option = getByRole('option', { name: '20' });
    await user.hover(option);
    await user.unhover(option);
    await user.keyboard('{Escape}');
    expect(onItemHighlighted.mock.calls).toEqual([[12], [20], [undefined]]);
  });

  it('reports undefined after an option is selected', async () => {
    const onItemHighlighted = vi.fn();
    const { getByLabelText, getByRole } = render(
      <TestNumericSelect initialValue={12} onItemHighlighted={onItemHighlighted} />
    );
    await user.click(getByRole('combobox', { name: 'Select value' }));
    await waitFor(() => expect(onItemHighlighted).toHaveBeenLastCalledWith(12));
    await user.click(getByRole('option', { name: '20' }));
    expect(getByLabelText(LABEL)).toHaveValue('20');
    expect(onItemHighlighted.mock.calls).toEqual([[12], [20], [undefined]]);
  });

  it('reports the current value when it is not an option', async () => {
    const onItemHighlighted = vi.fn();
    const { getByRole } = render(<TestNumericSelect initialValue={21} onItemHighlighted={onItemHighlighted} />);
    await user.click(getByRole('combobox', { name: 'Select value' }));
    await waitFor(() => expect(onItemHighlighted).toHaveBeenLastCalledWith(21));
  });

  it('reports the option matched by typing', async () => {
    const onItemHighlighted = vi.fn();
    const { getByRole } = render(<TestNumericSelect initialValue={12} onItemHighlighted={onItemHighlighted} />);
    await user.click(getByRole('combobox', { name: 'Select value' }));
    await waitFor(() => expect(onItemHighlighted).toHaveBeenLastCalledWith(12));
    await user.keyboard('2');
    expect(onItemHighlighted).toHaveBeenLastCalledWith(20);
  });

  it('reports the highlighted option again when the menu reopens', async () => {
    const onItemHighlighted = vi.fn();
    const { getByRole } = render(<TestNumericSelect initialValue={12} onItemHighlighted={onItemHighlighted} />);
    const trigger = getByRole('combobox', { name: 'Select value' });
    await user.click(trigger);
    await waitFor(() => expect(onItemHighlighted).toHaveBeenLastCalledWith(12));
    await user.keyboard('{Escape}');
    await user.click(trigger);
    await waitFor(() => expect(onItemHighlighted.mock.calls).toEqual([[12], [undefined], [12]]));
  });

  it('disables the field and trigger', () => {
    const { getByLabelText, getByRole } = render(<TestNumericSelect initialValue={12} disabled />);
    expect(getByLabelText(LABEL)).toBeDisabled();
    expect(getByRole('combobox', { name: 'Select value' })).toBeDisabled();
  });
});

async function startScrubbing(element: HTMLElement) {
  await act(async () => {
    element.dispatchEvent(
      createPointerEvent('pointerdown', {
        clientX: 10,
        clientY: 10,
        pointerType: 'mouse',
      })
    );
  });
}

async function movePointer(movementX: number) {
  await act(async () => {
    window.dispatchEvent(
      createPointerEvent('pointermove', {
        movementX,
        pointerType: 'mouse',
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
  });

  Object.defineProperties(event, {
    movementX: { value: init.movementX ?? 0 },
    pointerType: { value: init.pointerType ?? 'mouse' },
  });

  return event;
}
