import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useState } from 'react';
import { Numeric } from '@components/value-field/value-field-numeric';
import type { NumericProps } from '@components/value-field/value-field-numeric';

const LABEL = 'label';

const user = userEvent.setup();

describe('formatting', () => {
  const onChange = vi.fn();
  function renderInput(props: Partial<NumericProps> & { value: number }) {
    return render(<Numeric aria-label={LABEL} onChange={onChange} {...props} />);
  }

  it('clamps value to max', () => {
    const { getByLabelText } = renderInput({ min: 0, max: 100, value: 110 });
    expect(getByLabelText(LABEL)).toHaveValue('100');
  });

  it('clamps value to min', () => {
    const { getByLabelText } = renderInput({ min: 0, max: 100, value: -10 });
    expect(getByLabelText(LABEL)).toHaveValue('0');
  });

  it('multiplies formatted value by scale', () => {
    const { getByLabelText } = renderInput({ value: 0.5, min: 0, max: 1, scale: 100 });
    expect(getByLabelText(LABEL)).toHaveValue('50');
  });

  it('scales without min and max', () => {
    const { getByLabelText } = renderInput({ value: 3, scale: 100 });
    expect(getByLabelText(LABEL)).toHaveValue('300');
  });

  it('adds suffix', () => {
    const { getByLabelText } = renderInput({ value: 1, suffix: '%' });
    expect(getByLabelText(LABEL)).toHaveValue('1%');
  });

  it('rounds to specified precision', () => {
    const { getByLabelText } = renderInput({ value: 3.14159265359, precision: 2 });
    expect(getByLabelText(LABEL)).toHaveValue('3.14');
  });

  it.each([
    { value: 1234567890123456, expected: '1234567890123456' },
    { value: Number.MAX_SAFE_INTEGER, expected: '9007199254740991' },
  ])('shows every digit of the integer $value', ({ value, expected }) => {
    const { getByLabelText } = renderInput({ value });
    expect(getByLabelText(LABEL)).toHaveValue(expected);
  });

  it.each([
    { value: 1e-7, expected: '0.0000001' },
    { value: 1e21, expected: '1000000000000000000000' },
  ])('shows $value without exponent notation', ({ value, expected }) => {
    const { getByLabelText } = renderInput({ value });
    expect(getByLabelText(LABEL)).toHaveValue(expected);
  });

  it('shows a value read back from Figma as float32 without noise', () => {
    const { getByLabelText } = renderInput({ value: Math.fround(0.07), min: 0, max: 1, scale: 100 });
    expect(getByLabelText(LABEL)).toHaveValue('7');
  });

  it.each([
    { precision: 16, expected: '1.23' },
    { precision: -16, expected: '0' },
    { precision: 1.5, expected: '1.2' },
  ])('renders with an unsupported precision of $precision', ({ precision, expected }) => {
    const { getByLabelText } = renderInput({ value: 1.23, precision });
    expect(getByLabelText(LABEL)).toHaveValue(expected);
  });
});

// Expression evaluations are tested separately in ./value-field-numeric-evaluator.test.ts,
// as they add a significant overhead to test suite duration when done via @testing-library.
describe('interactions', () => {
  const TestNumeric = (props: Partial<Omit<NumericProps, 'value'>> & { initialValue: number }) => {
    const { initialValue, onChange, ...numericProps } = props;
    const [value, setValue] = useState(initialValue);

    const handleChange = (value: number) => {
      onChange?.(value);
      setValue(value);
    };

    return <Numeric aria-label={LABEL} value={value} onChange={handleChange} {...numericProps} />;
  };

  function renderInput(props: Partial<NumericProps> & { initialValue: number }) {
    return render(<TestNumeric {...props} />);
  }

  it('allows specified units in input', async () => {
    const { getByLabelText } = renderInput({ initialValue: 10, allowedUnits: ['px'] });
    const field = getByLabelText(LABEL);
    await user.type(field, '11px');
    await user.keyboard('{Enter}');
    expect(field).toHaveValue('11');
  });

  it('allows specified suffix in input', async () => {
    const { getByLabelText } = renderInput({ initialValue: 10, suffix: 'px' });
    const field = getByLabelText(LABEL);
    await user.type(field, '11px');
    await user.keyboard('{Enter}');
    expect(field).toHaveValue('11px');
  });

  it("doesn't fire onChange or round the value when blurred without an edit", async () => {
    const onChange = vi.fn();
    const { getByLabelText } = renderInput({ initialValue: 10.23456, precision: 2, onChange });
    await user.click(getByLabelText(LABEL));
    await user.keyboard('{Tab}');
    expect(onChange).not.toBeCalled();
  });

  it.each(['1/0', '0/0'])('reverts input that evaluates to a non-finite number: %s', async (input) => {
    const onChange = vi.fn();
    const { getByLabelText } = renderInput({ initialValue: 10, min: 0, max: 100, onChange });
    const field = getByLabelText(LABEL);
    await user.type(field, input);
    await user.keyboard('{Enter}');
    expect(field).toHaveValue('10');
    expect(onChange).not.toBeCalled();
  });

  it('rounds input to specified precision', async () => {
    const { getByLabelText } = renderInput({ initialValue: 10, precision: 2 });
    const field = getByLabelText(LABEL);
    await user.type(field, '10.23456');
    await user.keyboard('{Enter}');
    expect(field).toHaveValue('10.23');
  });

  it('clamps input to specified min', async () => {
    const { getByLabelText } = renderInput({ initialValue: 10, min: 0, max: 100 });
    const field = getByLabelText(LABEL);
    await user.type(field, '-10');
    await user.keyboard('{Enter}');
    expect(field).toHaveValue('0');
  });

  it('clamps input to specified max', async () => {
    const { getByLabelText } = renderInput({ initialValue: 10, min: 0, max: 100 });
    const field = getByLabelText(LABEL);
    await user.type(field, '110');
    await user.keyboard('{Enter}');
    expect(field).toHaveValue('100');
  });

  it('divides submitted value by scale', async () => {
    const onChange = vi.fn();
    const { getByLabelText } = renderInput({
      initialValue: 0,
      min: 0,
      max: 1,
      scale: 100,
      onChange,
    });
    const field = getByLabelText(LABEL);
    await user.type(field, '50');
    await user.keyboard('{Enter}');
    expect(field).not.toHaveFocus();
    expect(field).toHaveValue('50');
    expect(onChange).toHaveBeenCalledWith(0.5);
  });

  it('nudges by displayed units when scaled', async () => {
    const onChange = vi.fn();
    const { getByLabelText } = renderInput({ initialValue: 15, min: 10, max: 20, scale: 10, onChange });
    const field = getByLabelText(LABEL);
    await user.click(field);
    await user.keyboard('{ArrowUp}');
    expect(field).toHaveValue('151');
    expect(onChange).toHaveBeenCalledWith(15.1);
  });

  it('nudges scaled values without floating point error', async () => {
    const onChange = vi.fn();
    const { getByLabelText } = renderInput({ initialValue: 0, min: 0, max: 1, scale: 100, onChange });
    const field = getByLabelText(LABEL);
    await user.click(field);

    for (let step = 1; step <= 100; step++) {
      await user.keyboard('{ArrowUp}');
      expect(field).toHaveValue(String(step));
      expect(onChange).toHaveBeenLastCalledWith(step / 100);
    }
  });

  it('shows evaluated input without floating point error', async () => {
    const { getByLabelText } = renderInput({ initialValue: 0 });
    const field = getByLabelText(LABEL);
    await user.type(field, '10.1+20.2');
    await user.keyboard('{Enter}');
    expect(field).toHaveValue('30.3');
  });

  describe('when nudge amounts are not specified', () => {
    it('increments by default small nudge', async () => {
      const { getByLabelText } = renderInput({ initialValue: 10 });
      const field = getByLabelText(LABEL);
      await user.click(field);
      await user.keyboard('{ArrowUp}');
      expect(field).toHaveValue('11');
    });

    it('decrements by default small nudge', async () => {
      const { getByLabelText } = renderInput({ initialValue: 10 });
      const field = getByLabelText(LABEL);
      await user.click(field);
      await user.keyboard('{ArrowDown}');
      expect(field).toHaveValue('9');
    });

    it('increments by default big nudge with shift', async () => {
      const { getByLabelText } = renderInput({ initialValue: 10 });
      const field = getByLabelText(LABEL);
      await user.click(field);
      await user.keyboard('{Shift>}{ArrowUp}{/Shift}');
      expect(field).toHaveValue('20');
    });

    it('decrements by default big nudge with shift', async () => {
      const { getByLabelText } = renderInput({ initialValue: 10 });
      const field = getByLabelText(LABEL);
      await user.click(field);
      await user.keyboard('{Shift>}{ArrowDown}{/Shift}');
      expect(field).toHaveValue('0');
    });
  });

  describe('when nudge amounts are specified', () => {
    it('increments by custom small nudge', async () => {
      const { getByLabelText } = renderInput({ initialValue: 10, smallNudge: 2 });
      const field = getByLabelText(LABEL);
      await user.click(field);
      await user.keyboard('{ArrowUp}');
      expect(field).toHaveValue('12');
    });

    it('decrements by custom small nudge', async () => {
      const { getByLabelText } = renderInput({ initialValue: 10, smallNudge: 2 });
      const field = getByLabelText(LABEL);
      await user.click(field);
      await user.keyboard('{ArrowDown}');
      expect(field).toHaveValue('8');
    });

    it('increments by custom big nudge with shift', async () => {
      const { getByLabelText } = renderInput({ initialValue: 10, bigNudge: 20 });
      const field = getByLabelText(LABEL);
      await user.click(field);
      await user.keyboard('{Shift>}{ArrowUp}{/Shift}');
      expect(field).toHaveValue('30');
    });

    it('decrements by custom big nudge with shift', async () => {
      const { getByLabelText } = renderInput({ initialValue: 10, bigNudge: 20 });
      const field = getByLabelText(LABEL);
      await user.click(field);
      await user.keyboard('{Shift>}{ArrowDown}{/Shift}');
      expect(field).toHaveValue('-10');
    });
  });

  describe('when min and max are specified', () => {
    it('stays within range when incrementing', async () => {
      const { getByLabelText } = renderInput({ initialValue: 100, min: 0, max: 100 });
      const field = getByLabelText(LABEL);
      await user.click(field);
      await user.keyboard('{ArrowUp}');
      expect(field).toHaveValue('100');
    });

    it('stays within range when decrementing', async () => {
      const { getByLabelText } = renderInput({ initialValue: 0, min: 0, max: 100 });
      const field = getByLabelText(LABEL);
      await user.click(field);
      await user.keyboard('{ArrowDown}');
      expect(field).toHaveValue('0');
    });
  });

  it('saves fractional nudges on a scaled field without noise', async () => {
    const onChange = vi.fn();
    const { getByLabelText } = renderInput({ initialValue: 0, scale: 100, smallNudge: 0.1, onChange });
    const field = getByLabelText(LABEL);
    await user.click(field);
    await user.keyboard('{ArrowUp>7/}');
    expect(field).toHaveValue('0.7');
    expect(onChange).toHaveBeenLastCalledWith(0.007);
  });

  it('saves a typed fraction on a scaled field without noise', async () => {
    const onChange = vi.fn();
    const { getByLabelText } = renderInput({ initialValue: 0, scale: 100, onChange });
    const field = getByLabelText(LABEL);
    await user.type(field, '0.07');
    await user.keyboard('{Enter}');
    expect(onChange).toHaveBeenLastCalledWith(0.0007);
  });

  it('nudges a value read back from Figma as float32 without noise', async () => {
    const onChange = vi.fn();
    const { getByLabelText } = renderInput({ initialValue: Math.fround(0.07), min: 0, max: 1, scale: 100, onChange });
    const field = getByLabelText(LABEL);
    await user.click(field);
    await user.keyboard('{ArrowUp}');
    expect(field).toHaveValue('8');
    expect(onChange).toHaveBeenLastCalledWith(0.08);
  });

  it.each([
    { input: '2.5', precision: 0, expected: '3' },
    { input: '-2.5', precision: 0, expected: '-3' },
    { input: '1.005', precision: 2, expected: '1.01' },
    { input: '-1.005', precision: 2, expected: '-1.01' },
  ])('rounds $input half away from zero at precision $precision', async ({ input, precision, expected }) => {
    const { getByLabelText } = renderInput({ initialValue: 0, precision });
    const field = getByLabelText(LABEL);
    await user.type(field, input);
    await user.keyboard('{Enter}');
    expect(field).toHaveValue(expected);
  });

  it.each([
    { key: '{ArrowUp}', expected: '3' },
    { key: '{ArrowDown}', expected: '1' },
  ])('moves to the next value at precision when the nudge is finer, with $key', async ({ key, expected }) => {
    const { getByLabelText } = renderInput({ initialValue: 2, precision: 0, smallNudge: 0.5 });
    const field = getByLabelText(LABEL);
    await user.click(field);
    await user.keyboard(key);
    expect(field).toHaveValue(expected);
  });

  it('shows typed small numbers without exponent notation', async () => {
    const { getByLabelText } = renderInput({ initialValue: 0 });
    const field = getByLabelText(LABEL);
    await user.type(field, '0.0000001');
    await user.keyboard('{Enter}');
    expect(field).toHaveValue('0.0000001');
  });
});
