import { it, describe, expect } from 'vitest';
import { evaluateExpression } from '@components/NumericInput/evaluateExpression';

describe('treat percentage as value', () => {
  const currentDisplayValue = 1;

  it.each([
    ['20', 20],
    ['20%', 20],
    ['20%%', 20],
    ['%%20', 20],

    ['20 + 5', 25],
    ['20% + 5', 25],
    ['20%% + 5', 25],
    ['%%20 + 5', 25],

    ['20 + 5%', 25],
    ['20% + 5%', 25],
    ['20%% + 5%', 25],
    ['%%20 + 5%', 25],

    ['20 * 5', 100],
    ['20% * 5', 100],
    ['20 * 5%', 100],
    ['20% * 5%', 100],

    ['20 / 5', 4],
    ['20% / 5', 4],
    ['20 / 5%', 4],
    ['20% / 5%', 4],

    ['(20% + 5) / 5', 5],
    //['(20% + 5) / -5', 5], // valid, but throws due to a bug in @emmetio/math-expression
    ['(20% + 5) * -5', -125],

    ['(20 + 5) * 5', 125],
    ['(20% + 5) * 5', 125],
    ['(20 + 5%) * 5', 125],
    ['(20% + 5%) * 5', 125],
  ])('evaluates %s to %d', (expression, expected) => {
    expect(evaluateExpression(expression, currentDisplayValue, true)).toBe(expected);
  });
});

describe('treat percentage as value with expressions containing x', () => {
  const currentDisplayValue = 10;

  it.each([
    ['20 + 5x', 20 + 5 * currentDisplayValue],
    ['20% + 5x', 20 + 5 * currentDisplayValue],
    ['20%% + 5x', 20 + 5 * currentDisplayValue],
    ['%%20 + 5x', 20 + 5 * currentDisplayValue],
    ['x20 + 5%', currentDisplayValue * 20 + 5],
    ['20% * 5x', 20 * 5 * currentDisplayValue],
    ['20x * 5%', 20 * 5 * currentDisplayValue],
    ['20% / 5x', 20 / (5 * currentDisplayValue)],
    ['20x / 5%', (20 * currentDisplayValue) / 5],
    ['(20% + 5) / 5x', (20 + 5) / (5 * currentDisplayValue)],
    // ['(20% + 5) / -5x', (20 + 5) / -(5 * currentDisplayValue)], // valid, but throws due to a bug in @emmetio/math-expression
    ['(20% + 5) * -5x', (20 + 5) * -(5 * currentDisplayValue)],
    ['(20% + 5x) * 5', (20 + 5 * currentDisplayValue) * 5],
    ['(20x + 5%) * 5', (20 * currentDisplayValue + 5) * 5],
    ['(20% + 5%) * 5x', (20 + 5) * 5 * currentDisplayValue],
  ])('evaluates %s to %d', (expression, expected) => {
    expect(evaluateExpression(expression, currentDisplayValue, true)).toBe(expected);
  });
});

describe('non-percentage inputs', () => {
  const currentDisplayValue = 10;

  it.each([
    ['20', 20],
    ['20 + 5', 25],
    ['20 * 5', 100],
    ['20 / 5', 4],
    ['(20 + 5) * 5', 125],
    ['20%', currentDisplayValue * (20 / 100)],
    ['20% + 5', currentDisplayValue * (20 / 100) + 5],
    ['20 + 5%', 20 + currentDisplayValue * (5 / 100)],
    ['20% + 5%', currentDisplayValue * (20 / 100) + currentDisplayValue * (5 / 100)],
    ['20% * 5', currentDisplayValue * (20 / 100) * 5],
    ['20 * 5%', 20 * currentDisplayValue * (5 / 100)],
    ['20% * 5%', currentDisplayValue * (20 / 100) * currentDisplayValue * (5 / 100)],
    ['20% / 5', (currentDisplayValue * (20 / 100)) / 5],
    ['20 / 5%', 20 / (currentDisplayValue * (5 / 100))],
    ['20% / 5%', (currentDisplayValue * (20 / 100)) / (currentDisplayValue * (5 / 100))],
    ['(20% + 5) / 5', (currentDisplayValue * (20 / 100) + 5) / 5],
    //['(20% + 5) / -5', 5], // valid, but throws due to a bug in @emmetio/math-expression
    ['(20% + 5) * -5', (currentDisplayValue * (20 / 100) + 5) * -5],
    ['(20% + 5) * 5', (currentDisplayValue * (20 / 100) + 5) * 5],
    ['(20 + 5%) * 5', (20 + currentDisplayValue * (5 / 100)) * 5],
    ['(20% + 5%) * 5', (currentDisplayValue * (20 / 100) + currentDisplayValue * (5 / 100)) * 5],
  ])('evaluates %s to %d', (expression, expected) => {
    expect(evaluateExpression(expression, currentDisplayValue)).toBe(expected);
  });
});

describe('non-percentage inputs containing % and x', () => {
  const currentDisplayValue = 10;

  it.each([
    ['20 + 5x', 20 + 5 * currentDisplayValue],
    ['20% + 5X', currentDisplayValue * (20 / 100) + 5 * currentDisplayValue],
    ['x20 + 5%', currentDisplayValue * 20 + currentDisplayValue * (5 / 100)],
    ['20% * 5x', currentDisplayValue * (20 / 100) * (5 * currentDisplayValue)],
    ['20x * 5%', currentDisplayValue * 20 * (currentDisplayValue * (5 / 100))],
    ['20% / 5x', (currentDisplayValue * (20 / 100)) / (5 * currentDisplayValue)],
    ['20x / 5%', (currentDisplayValue * 20) / (currentDisplayValue * (5 / 100))],
    ['(20% + 5) / 5x', ((currentDisplayValue * 20) / 100 + 5) / (5 * currentDisplayValue)],
    // ['(20% + 5) / -5x', ((currentDisplayValue * 20) / 100 + 5) / -(5 * currentDisplayValue)], // valid, but throws due to a bug in @emmetio/math-expression
    ['(20% + 5) * -5X', ((currentDisplayValue * 20) / 100 + 5) * -(5 * currentDisplayValue)],
    ['(20% + 5x) * 5', ((currentDisplayValue * 20) / 100 + 5 * currentDisplayValue) * 5],
    ['(20x + 5%) * 5', (20 * currentDisplayValue + (currentDisplayValue * 5) / 100) * 5],
    [
      '(20% + 5%) * 5x',
      ((currentDisplayValue * 20) / 100 + (currentDisplayValue * 5) / 100) * (currentDisplayValue * 5),
    ],
  ])('evaluates %s to %d', (expression, expected) => {
    expect(evaluateExpression(expression, currentDisplayValue)).toBe(expected);
  });
});

describe('invalid expressions', () => {
  const currentDisplayValue = 10;

  it.each([['dogs'], ['1xx'], ['2%%']])('throws error', (expression) => {
    expect(() => evaluateExpression(expression, currentDisplayValue)).toThrow;
  });
});
