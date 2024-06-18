import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useState } from 'react';
import { Numeric } from '@components/control-input/control-input-numeric';
import type { NumericProps } from '@components/control-input/control-input-numeric';

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

  it('throws an error, when min or max is not specified', () => {
    const consoleError = vi.spyOn(console, 'error');
    consoleError.mockImplementation(() => {});
    expect(() => renderInput({ value: 1, min: 0, targetRange: [0, 100] })).toThrow();
    expect(() => renderInput({ value: 1, max: 1, targetRange: [0, 100] })).toThrow();
    consoleError.mockRestore();
  });

  it('throws an error, when min equals to max', () => {
    const consoleError = vi.spyOn(console, 'error');
    consoleError.mockImplementation(() => {});
    expect(() => renderInput({ value: 1, min: 0, max: 0, targetRange: [0, 100] })).toThrow();
    consoleError.mockRestore();
  });

  it('normalizes formatted value to specified target range', () => {
    const { getByLabelText } = renderInput({ value: 0.5, min: 0, max: 1, targetRange: [0, 100] });
    expect(getByLabelText(LABEL)).toHaveValue('50');
  });

  it('adds suffix', () => {
    const { getByLabelText } = renderInput({ value: 1, suffix: '%' });
    expect(getByLabelText(LABEL)).toHaveValue('1%');
  });

  it('rounds to specified precision', () => {
    const { getByLabelText } = renderInput({ value: 3.14159265359, precision: 2 });
    expect(getByLabelText(LABEL)).toHaveValue('3.14');
  });
});

// Expression evaluations are tested separately in ./control-input-numeric-evaluator.test.ts,
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

  it('denormalizes into initial min-max range upon submission', async () => {
    const onChange = vi.fn();
    const { getByLabelText } = renderInput({
      initialValue: 0,
      min: 0,
      max: 1,
      targetRange: [0, 100],
      onChange,
    });
    const field = getByLabelText(LABEL);
    await user.type(field, '50');
    await user.keyboard('{Enter}');
    expect(field).not.toHaveFocus();
    expect(field).toHaveValue('50');
    expect(onChange).toHaveBeenCalledWith(0.5);
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
});
