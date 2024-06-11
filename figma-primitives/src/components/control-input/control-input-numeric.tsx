import React, { useMemo } from 'react';
import { clamp, pipe, round } from 'remeda';
import evaluate from '@emmetio/math-expression';
import type { Formatter } from './types';
import { Base } from './control-input-base';

const MAX_SUPPORTED_PRECISION = 15;

type NumericProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  targetRange?: [number, number];
  precision?: number;
  suffix?: string;
};

type FormatterOptions = Pick<NumericProps, 'min' | 'max' | 'targetRange' | 'precision' | 'suffix'>;

const Numeric = (props: NumericProps) => {
  const { value, onChange, min, max, targetRange, precision, suffix } = props;
  const formatter = useMemo(
    () => createFormatter({ min, max, precision, targetRange, suffix }),
    [min, max, precision, targetRange, suffix]
  );

  return <Base value={value} onChange={onChange} formatter={formatter} />;
};

function createFormatter(options: FormatterOptions = {}): Formatter<number> {
  const { min, max, targetRange, precision = MAX_SUPPORTED_PRECISION, suffix = '' } = options;
  const isPercentageInput = suffix === '%';
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
            (displayValue) => evaluateExpression(input, displayValue, isPercentageInput),
            fromDisplayValue
          ),
        };
      } catch (e) {
        return { valid: false };
      }
    },
    format: (value: number) => {
      return pipe(value, clamp({ min, max }), toDisplayValue, round(precision), (value) => `${value}${suffix}`);
    },
    incrementBy(value: number, amount: number) {
      return value + fromDisplayValue(amount);
    },
  };
}

type NormalizeParams = {
  min?: number;
  max?: number;
  targetRange?: [number, number];
};

/**
 * Map a value to a specified range.
 *
 * @param {NormalizeParams} params
 * @param {number} [params.min] - The minimum value of the input range.
 * @param {number} [params.max] - The maximum value of the input range.
 * @param {[number, number]} [params.targetRange] - The target range to map the value to.
 * @return {function(number): number} A function that takes a number and maps it to the specified range.
 *
 * @example:
 * normalize(0, 1, [0, 100])(0.5) -> 50
 * normalize(0, 1, [0, 255])(1) -> 255
 */
function normalize(params: NormalizeParams): (value: number) => number {
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

function evaluateExpression(expression: string, currentDisplayValue: number, treatPercentageAsValue: boolean = false) {
  const modifiedExpression = treatPercentageAsValue
    ? expression
        .replace(/%/g, '')
        .replace(/(\d*\.?\d+)x/gi, (match, p1) => `(${currentDisplayValue}*${p1})`)
        .replace(/x(\d*\.?\d+)/gi, (match, p1) => `(${currentDisplayValue}*${p1})`)
        .replace(/(?<!\d)x(?!\d)/gi, `${currentDisplayValue}`)
    : expression
        .replace(/(\d*\.?\d+)%/gi, (match, p1) => `(${currentDisplayValue}*${p1}/100)`)
        .replace(/%(\d*\.?\d+)/gi, (match, p1) => `(${currentDisplayValue}*${p1}/100)`)
        .replace(/(\d*\.?\d+)x/gi, (match, p1) => `(${currentDisplayValue}*${p1})`)
        .replace(/x(\d*\.?\d+)/gi, (match, p1) => `(${currentDisplayValue}*${p1})`)
        .replace(/(?<!\d)x(?!\d)/gi, `${currentDisplayValue}`);

  const result = evaluate(modifiedExpression);
  if (result === null) {
    throw new Error('Invalid expression.');
  }
  return result;
}

export type { NumericProps };
export { Numeric, evaluateExpression };
