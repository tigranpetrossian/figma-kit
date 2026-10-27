import React, { useMemo } from 'react';
import evaluate from '@emmetio/math-expression';
import type { InputProps } from '@components/input';
import { createNumberDisplay } from '@lib/number/number-display';
import type { Formatter } from './types';
import { Base } from './value-field-base';

type NumericElement = React.ElementRef<'input'>;
type NumericProps = Omit<InputProps, 'value' | 'onChange' | 'min' | 'max' | 'type'> & {
  /** The numeric value of the input. */
  value: number;

  /** Callback to call upon submission. */
  onChange: (value: number) => void;

  /** The minimum allowed value. */
  min?: number;

  /** The maximum allowed value. */
  max?: number;

  /** The factor that the `value` prop is multiplied by when displayed in the input.
   * @example:
   * <Numeric value={0.5} min={0} max={1} scale={100} /> // Displays value of 50
   * */
  scale?: number;

  /**
   * The decimal places, in displayed units, that values are rounded to. Halves round away from zero.
   * Non-integers are truncated and values outside [-15, 15] are limited to that range.
   * */
  precision?: number;

  /** Units that will be accepted as valid input (e.g., "px", "%"). */
  allowedUnits?: string[];

  /** Suffix to be appended to the value (e.g., "px", "%"). Suffix is treated as an allowed unit.  */
  suffix?: string;

  /** The small nudge increment for the value. */
  smallNudge?: number;

  /** The big nudge increment for the value. */
  bigNudge?: number;
};

const Numeric = React.forwardRef<NumericElement, NumericProps>((props, ref) => {
  const { value, onChange, min, max, scale, precision, suffix, allowedUnits, ...inputProps } = props;
  const formatter = useNumericFormatter({ min, max, scale, precision, suffix, allowedUnits });

  return <Base inputRef={ref} value={value} onChange={onChange} formatter={formatter} {...inputProps} />;
});

type NumericFormatterOptions = Pick<NumericProps, 'min' | 'max' | 'scale' | 'precision' | 'suffix' | 'allowedUnits'>;

function useNumericFormatter(options: NumericFormatterOptions): Formatter<number> {
  const { min, max, scale, precision, suffix, allowedUnits } = options;
  return useMemo(
    () => createFormatter({ min, max, scale, precision, suffix, allowedUnits }),
    [min, max, scale, precision, suffix, allowedUnits]
  );
}

function createFormatter(options: NumericFormatterOptions): Formatter<number> {
  const { suffix, allowedUnits = [], ...displayOptions } = options;
  const display = createNumberDisplay(displayOptions);

  return {
    parse: (input: string, currentValue: number) => {
      try {
        const displayValue = evaluateExpression({
          expression: input,
          displayValue: display.toDisplay(currentValue),
          suffix,
          allowedUnits,
        });

        if (!Number.isFinite(displayValue)) {
          return { valid: false };
        }

        return { valid: true, value: display.fromDisplay(displayValue) };
      } catch {
        return { valid: false };
      }
    },
    format: (value: number) => withSuffix(display.format(value), suffix),
    incrementBy: (value: number, amount: number) => display.nudge(value, amount),
  };
}

function withSuffix(text: string, suffix: string | undefined) {
  return text && suffix ? `${text}${suffix}` : text;
}

function evaluateExpression(params: {
  expression: string;
  displayValue: number;
  suffix?: string;
  allowedUnits?: string[];
}) {
  const { displayValue, expression, suffix = '', allowedUnits = [] } = params;
  const numberPattern = '(\\d*\\.?\\d+)';
  const unitsPattern = `(?:${[...allowedUnits, suffix].join('|')})*`;

  const modifiedExpression = expression
    .replace(new RegExp(`${numberPattern}${unitsPattern}`, 'gi'), (_, p1) => p1)
    .replace(new RegExp(`${unitsPattern}${numberPattern}`, 'gi'), (_, p1) => p1)
    .replace(new RegExp(`${numberPattern}%`, 'gi'), (_, p1) => `(${displayValue}*${p1}/100)`)
    .replace(new RegExp(`%${numberPattern}`, 'gi'), (_, p1) => `(${displayValue}*${p1}/100)`)
    .replace(new RegExp(`${numberPattern}x`, 'gi'), (_, p1) => `(${displayValue}*${p1})`)
    .replace(new RegExp(`x${numberPattern}`, 'gi'), (_, p1) => `(${displayValue}*${p1})`)
    .replace(/(?<!\d)x(?!\d)/gi, `${displayValue}`)
    .trim();

  const result = evaluate(modifiedExpression);
  if (result === null) {
    throw new Error('Invalid expression.');
  }
  return result;
}

export type { NumericProps };
export { Numeric, evaluateExpression, useNumericFormatter };
