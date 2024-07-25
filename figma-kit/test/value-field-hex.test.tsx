import { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import type { HexProps } from '@components/value-field/value-field-hex';
import { Hex, Root, Multi, Numeric } from '@components/value-field';
import type { RGBA } from '@lib/color';

const HEX_INPUT_LABEL = 'hex';
const ALPHA_INPUT_LABEL = 'alpha';

const user = userEvent.setup();

describe('input parsing', () => {
  const TestHexInput = (props: Partial<HexProps>) => {
    const { onChange, ...hexProps } = props;
    const [value, setValue] = useState({ r: 0, g: 0, b: 0, a: 1 });

    const setAlpha = (alpha: number) => {
      setValue(({ r, g, b }) => ({ r, g, b, a: alpha }));
    };

    const handleChange = (value: RGBA) => {
      setValue(value);
      onChange?.(value);
    };

    return (
      <Multi>
        <Root>
          <Hex aria-label={HEX_INPUT_LABEL} value={value} onChange={handleChange} {...hexProps} />
        </Root>
        <Root>
          <Numeric
            aria-label={ALPHA_INPUT_LABEL}
            value={value.a}
            onChange={setAlpha}
            min={0}
            max={1}
            targetRange={[0, 100]}
            suffix="%"
            precision={2}
          />
        </Root>
      </Multi>
    );
  };

  describe('given an input with valid hexedecimal characters', () => {
    it.each([
      { input: 'f', expected: { hex: 'FFFFFF', alpha: '100%' } },
      { input: 'ff', expected: { hex: 'FFFFFF', alpha: '100%' } },
      { input: 'fc', expected: { hex: 'FCFCFC', alpha: '100%' } },
      { input: 'fc0', expected: { hex: 'FFCC00', alpha: '100%' } },
      { input: 'fc00', expected: { hex: 'FFCC00', alpha: '0%' } },
      { input: 'fc000', expected: { hex: 'FFCC00', alpha: '0%' } },
      { input: 'fc01', expected: { hex: 'FFCC00', alpha: '6.67%' } },
      { input: 'fc010', expected: { hex: 'FFCC00', alpha: '6.27%' } },
      { input: 'fc0ef', expected: { hex: 'FFCC00', alpha: '93.73%' } },
      { input: 'fcfcfc0', expected: { hex: 'FCFCFC', alpha: '0%' } },
      { input: 'fcfcfc00', expected: { hex: 'FCFCFC', alpha: '0%' } },
      { input: 'fcfcfc1', expected: { hex: 'FCFCFC', alpha: '6.67%' } },
      { input: 'fcfcfc10', expected: { hex: 'FCFCFC', alpha: '6.27%' } },
      { input: 'fcfcfcef', expected: { hex: 'FCFCFC', alpha: '93.73%' } },
    ])('Converts $input to $expected', async ({ input, expected }) => {
      render(<TestHexInput />);
      const hexField = screen.getByLabelText(HEX_INPUT_LABEL);
      const alphaField = screen.getByLabelText(ALPHA_INPUT_LABEL);
      await user.type(hexField, input);
      await user.keyboard('{Enter}');
      expect(hexField).toHaveValue(expected.hex);
      expect(alphaField).toHaveValue(expected.alpha);
    });
  });

  describe('given an input containing non-hexedecimal characters', () => {
    it.each([
      { input: 'z', expected: { hex: '000000', alpha: '100%' } },
      { input: '#f', expected: { hex: 'FFFFFF', alpha: '100%' } },
      { input: 'zf', expected: { hex: 'FFFFFF', alpha: '100%' } },
      { input: 'fz', expected: { hex: 'FFFFFF', alpha: '100%' } },
      { input: 'zfz', expected: { hex: 'FFFFFF', alpha: '100%' } },
      { input: '#fcd0', expected: { hex: 'FFCCDD', alpha: '0%' } },
      { input: '#fcd00', expected: { hex: 'FFCCDD', alpha: '0%' } },
      { input: '#fcd80', expected: { hex: 'FFCCDD', alpha: '50.2%' } },
      { input: '#fcdef', expected: { hex: 'FFCCDD', alpha: '93.73%' } },
      { input: '_fcd_ef', expected: { hex: 'FFCCDD', alpha: '100%' } },
      { input: '_fcd_e_', expected: { hex: 'FFCCDD', alpha: '100%' } },
      { input: '#ffccdd', expected: { hex: 'FFCCDD', alpha: '100%' } },
      { input: '#ffccdd_00', expected: { hex: 'FFCCDD', alpha: '100%' } },
      { input: '#ffccdd0', expected: { hex: 'FFCCDD', alpha: '0%' } },
      { input: '#ffccdd00', expected: { hex: 'FFCCDD', alpha: '0%' } },
    ])('Converts $input to $expected', async ({ input, expected }) => {
      render(<TestHexInput />);
      const hexField = screen.getByLabelText(HEX_INPUT_LABEL);
      const alphaField = screen.getByLabelText(ALPHA_INPUT_LABEL);
      await user.type(hexField, input);
      await user.keyboard('{Enter}');
      expect(hexField).toHaveValue(expected.hex);
      expect(alphaField).toHaveValue(expected.alpha);
    });
  });

  describe('given an input with `ignoreAlpha`', () => {
    it('ignores alpha triplet from user input', async () => {
      const onChange = vi.fn();
      render(<TestHexInput onChange={onChange} ignoreAlpha />);
      const hexField = screen.getByLabelText(HEX_INPUT_LABEL);
      await user.type(hexField, '#FFFFFF00');
      await user.keyboard('{Enter}');
      expect(onChange).toHaveBeenCalledWith({ r: 1, g: 1, b: 1, a: 1 });
    });
  });
});

describe('incrementing', () => {
  const TestHexInput = () => {
    const [value, setValue] = useState({ r: 0.5, g: 0.5, b: 0.5, a: 1 });
    return <Hex aria-label={HEX_INPUT_LABEL} value={value} onChange={setValue} />;
  };

  async function renderAndPrepare(options: {
    selectionStart: number;
    selectionEnd: number;
    key: 'ArrowUp' | 'ArrowDown';
  }) {
    render(<TestHexInput />);
    const hexField = screen.getByLabelText<HTMLInputElement>(HEX_INPUT_LABEL);
    await user.click(hexField);
    hexField.setSelectionRange(options.selectionStart, options.selectionEnd);
    await user.keyboard(`{${options.key}}`);
    return hexField;
  }

  it('increments entire hex value when input value is fully selected', async () => {
    const hexField = await renderAndPrepare({ selectionStart: 0, selectionEnd: 6, key: 'ArrowUp' });
    expect(hexField).toHaveValue('818181');
  });

  it('decrements entire hex value when input value is fully selected', async () => {
    const hexField = await renderAndPrepare({ selectionStart: 0, selectionEnd: 6, key: 'ArrowDown' });
    expect(hexField).toHaveValue('7F7F7F');
  });

  describe('given a caret or selection in or around the first hex triplet', () => {
    it.each([
      { start: 0, end: 0 },
      { start: 1, end: 1 },
      { start: 2, end: 2 },
      { start: 0, end: 1 },
      { start: 1, end: 2 },
      { start: 0, end: 2 },
    ])('increments red channel', async ({ start, end }) => {
      const hexField = await renderAndPrepare({
        selectionStart: start,
        selectionEnd: end,
        key: 'ArrowUp',
      });
      expect(hexField).toHaveValue('818080');
      expect(hexField.selectionStart).toBe(0);
      expect(hexField.selectionEnd).toBe(2);
    });

    it.each([
      { start: 0, end: 0 },
      { start: 1, end: 1 },
      { start: 2, end: 2 },
      { start: 0, end: 1 },
      { start: 1, end: 2 },
      { start: 0, end: 2 },
    ])('decrements red channel', async ({ start, end }) => {
      const hexField = await renderAndPrepare({
        selectionStart: start,
        selectionEnd: end,
        key: 'ArrowDown',
      });
      expect(hexField).toHaveValue('7F8080');
      expect(hexField.selectionStart).toBe(0);
      expect(hexField.selectionEnd).toBe(2);
    });
  });

  describe('given a caret or selection in or around the second hex triplet', () => {
    it.each([
      { start: 3, end: 3 },
      { start: 4, end: 4 },
      { start: 2, end: 3 },
      { start: 2, end: 4 },
      { start: 3, end: 4 },
    ])('increments red channel', async ({ start, end }) => {
      const hexField = await renderAndPrepare({
        selectionStart: start,
        selectionEnd: end,
        key: 'ArrowUp',
      });
      expect(hexField).toHaveValue('808180');
      expect(hexField.selectionStart).toBe(2);
      expect(hexField.selectionEnd).toBe(4);
    });

    it.each([
      { start: 3, end: 3 },
      { start: 4, end: 4 },
      { start: 2, end: 3 },
      { start: 2, end: 4 },
      { start: 3, end: 4 },
    ])('decrements red channel', async ({ start, end }) => {
      const hexField = await renderAndPrepare({
        selectionStart: start,
        selectionEnd: end,
        key: 'ArrowDown',
      });
      expect(hexField).toHaveValue('807F80');
      expect(hexField.selectionStart).toBe(2);
      expect(hexField.selectionEnd).toBe(4);
    });
  });

  describe('given a caret or selection in or around the third hex triplet', () => {
    it.each([
      { start: 5, end: 5 },
      { start: 4, end: 5 },
      { start: 4, end: 6 },
      { start: 5, end: 6 },
    ])('increments red channel', async ({ start, end }) => {
      const hexField = await renderAndPrepare({
        selectionStart: start,
        selectionEnd: end,
        key: 'ArrowUp',
      });
      expect(hexField).toHaveValue('808081');
      expect(hexField.selectionStart).toBe(4);
      expect(hexField.selectionEnd).toBe(6);
    });

    it.each([
      { start: 5, end: 5 },
      { start: 4, end: 5 },
      { start: 4, end: 6 },
      { start: 5, end: 6 },
    ])('decrements red channel', async ({ start, end }) => {
      const hexField = await renderAndPrepare({
        selectionStart: start,
        selectionEnd: end,
        key: 'ArrowDown',
      });
      expect(hexField).toHaveValue('80807F');
      expect(hexField.selectionStart).toBe(4);
      expect(hexField.selectionEnd).toBe(6);
    });
  });

  describe('given a selection including any of the characters of red and green triplets', () => {
    it.each([
      { start: 0, end: 3 },
      { start: 0, end: 4 },
      { start: 1, end: 3 },
      { start: 1, end: 4 },
    ])('increments red and green channels', async ({ start, end }) => {
      const hexField = await renderAndPrepare({
        selectionStart: start,
        selectionEnd: end,
        key: 'ArrowUp',
      });
      expect(hexField).toHaveValue('818180');
      expect(hexField.selectionStart).toBe(0);
      expect(hexField.selectionEnd).toBe(4);
    });

    it.each([
      { start: 0, end: 3 },
      { start: 0, end: 4 },
      { start: 1, end: 3 },
      { start: 1, end: 4 },
    ])('decrements red and green channels', async ({ start, end }) => {
      const hexField = await renderAndPrepare({
        selectionStart: start,
        selectionEnd: end,
        key: 'ArrowDown',
      });
      expect(hexField).toHaveValue('7F7F80');
      expect(hexField.selectionStart).toBe(0);
      expect(hexField.selectionEnd).toBe(4);
    });
  });
});
