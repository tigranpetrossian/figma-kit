import React, { useMemo } from 'react';
import { clamp, pipe, round } from 'remeda';
import evaluate from '@emmetio/math-expression';
import type { InputProps } from '@components/input';
import type { Formatter } from './types';
import { Base } from './control-input-base';

const MAX_SUPPORTED_PRECISION = 15;

type NumericProps = Omit<InputProps, 'value' | 'onChange' | 'min' | 'max' | 'type'> & {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  targetRange?: [number, number];
  precision?: number;
  suffix?: string;
  allowedUnits?: string[];
  smallNudge?: number;
  bigNudge?: number;
};

type FormatterOptions = Pick<NumericProps, 'min' | 'max' | 'targetRange' | 'precision' | 'suffix' | 'allowedUnits'>;

const Numeric = (props: NumericProps) => {
  const { value, onChange, min, max, targetRange, precision, suffix, allowedUnits, ...inputProps } = props;
  const formatter = useMemo(
    () => createFormatter({ min, max, precision, targetRange, suffix, allowedUnits }),
    [min, max, precision, targetRange, suffix, allowedUnits]
  );

  return <Base value={value} onChange={onChange} formatter={formatter} {...inputProps} />;
};

function createFormatter(options: FormatterOptions = {}): Formatter<number> {
  const { min, max, targetRange, precision = MAX_SUPPORTED_PRECISION, suffix, allowedUnits = [] } = options;
  const toDisplayValue = normalize({ min, max, targetRange });
  const fromDisplayValue = normalize({
    min: targetRange?.[0],
    max: targetRange?.[1],
    targetRange: typeof min === 'number' && typeof max === 'number' ? [min, max] : undefined,
  });

  return {
    parse: (input: string, currentValue: number) => {
      try {
        return {
          valid: true,
          value: pipe(
            currentValue,
            toDisplayValue,
            (displayValue) => evaluateExpression({ expression: input, displayValue, suffix, allowedUnits }),
            fromDisplayValue
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
