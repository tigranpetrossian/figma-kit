import React, { useMemo } from 'react';
import { clamp, pipe, round } from 'remeda';
import evaluate from '@emmetio/math-expression';
import type { InputProps } from '@components/input';
import type { Formatter } from './types';
import { Base } from './control-input-base';

const MAX_SUPPORTED_PRECISION = 15;

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

  /** The numeric range that the `value` prop will be normalized to when displayed in the input.
   * Requires non-equal 'max' and 'min' values.
   * @example:
   * <Numeric value={0.5} min={0} max={1} targetRange={[0, 100]} /> // Displays value of 50
   * */
  targetRange?: [number, number];

  /** The decimal precision that user input will be rounded to. */
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
  const { value, onChange, min, max, targetRange, precision, suffix, allowedUnits, ...inputProps } = props;
  const formatter = useMemo(
    () => createFormatter({ min, max, precision, targetRange, suffix, allowedUnits }),
    [min, max, precision, targetRange, suffix, allowedUnits]
  );

  return <Base inputRef={ref} value={value} onChange={onChange} formatter={formatter} {...inputProps} />;
});

type FormatterOptions = Pick<NumericProps, 'min' | 'max' | 'targetRange' | 'precision' | 'suffix' | 'allowedUnits'>;

function createFormatter(options: FormatterOptions = {}): Formatter<number> {
  const { min, max, targetRange, precision = MAX_SUPPORTED_PRECISION, suffix, allowedUnits = [] } = options;
  const toDisplayValue = normalize({ min, max, targetRange });
  const fromDisplayValue = denormalize({ min, max, targetRange });

  return {
    parse: (input: string, currentValue: number) => {
      try {
        return {
          valid: true,
          value: pipe(
            input,
            (input) =>
              evaluateExpression({
                expression: input,
                displayValue: toDisplayValue(currentValue),
                suffix,
                allowedUnits,
              }),
            round(precision),
            fromDisplayValue,
            clamp({ min, max })
          ),
        };
      } catch (e) {
        return { valid: false };
      }
    },
    format: (value: number) => {
      return pipe(value, clamp({ min, max }), toDisplayValue, round(precision), (value) =>
        toValueString(value, suffix)
      );
    },
    incrementBy(value: number, amount: number) {
      return value + fromDisplayValue(amount);
    },
  };
}

// TODO Extract into a single decoupled helper, validate prop combinations from within the component instead.
/**
 * Map a value to a specified range.
 *
 * @param {number} [params.min] - The minimum value of the input range.
 * @param {number} [params.max] - The maximum value of the input range.
 * @param {[number, number]} [params.targetRange] - The target range to map the value to.
 * @return {function(number): number} A function that takes a number and maps it to the specified range.
 *
 * @example:
 * normalize(0, 1, [0, 100])(0.5) -> 50
 * normalize(0, 1, [0, 255])(1) -> 255
 */
function normalize(params: { min?: number; max?: number; targetRange?: [number, number] }): (value: number) => number {
  const { min, max, targetRange } = params;

  return function (value: number) {
    if (!targetRange) {
      return value;
    }

    if (typeof min !== 'number' || typeof max !== 'number') {
      throw Error("'targetRange' requires specifying 'min' and 'max'.");
    }

    if (min === max) {
      throw Error("'min' and 'max' cannot be equal.");
    }

    const [targetMin, targetMax] = targetRange;
    return ((value - min) / (max - min)) * (targetMax - targetMin) + targetMin;
  };
}

/**
 * Denormalize value from target range
 * */
function denormalize(params: {
  min?: number;
  max?: number;
  targetRange?: [number, number];
}): (value: number) => number {
  const { min, max, targetRange } = params;

  return function (value: number) {
    // Mostly to appease TS. This would be an extreme edge case of formatter options changing while user was typing.
    if (!targetRange || typeof min !== 'number' || typeof max !== 'number' || min === max) {
      return value;
    }

    const [targetMin, targetMax] = targetRange;
    return ((value - targetMin) / (targetMax - targetMin)) * (max - min) + min;
  };
}

function toValueString(value: number, suffix: string | undefined) {
  if (Number.isNaN(value)) {
    return '';
  }

  return suffix ? `${value}${suffix}` : `${value}`;
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
export { Numeric, evaluateExpression };
