import { it, describe, expect } from 'vitest';
import { evaluateExpression } from './value-field-numeric';

describe('treat percentage as value', () => {
  const displayValue = 1;

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
    expect(evaluateExpression({ expression, displayValue, suffix: '%' })).toBe(expected);
  });
});

describe('treat percentage as value with expressions containing x', () => {
  const displayValue = 10;

  it.each([
    ['20 + 5x', 20 + 5 * displayValue],
    ['20% + 5x', 20 + 5 * displayValue],
    ['20%% + 5x', 20 + 5 * displayValue],
    ['%%20 + 5x', 20 + 5 * displayValue],
    ['x20 + 5%', displayValue * 20 + 5],
    ['20% * 5x', 20 * 5 * displayValue],
    ['20x * 5%', 20 * 5 * displayValue],
    ['20% / 5x', 20 / (5 * displayValue)],
    ['20x / 5%', (20 * displayValue) / 5],
    ['(20% + 5) / 5x', (20 + 5) / (5 * displayValue)],
    // ['(20% + 5) / -5x', (20 + 5) / -(5 * displayValue)], // valid, but throws due to a bug in @emmetio/math-expression
    ['(20% + 5) * -5x', (20 + 5) * -(5 * displayValue)],
    ['(20% + 5x) * 5', (20 + 5 * displayValue) * 5],
    ['(20x + 5%) * 5', (20 * displayValue + 5) * 5],
    ['(20% + 5%) * 5x', (20 + 5) * 5 * displayValue],
  ])('evaluates %s to %d', (expression, expected) => {
    expect(evaluateExpression({ expression, displayValue, suffix: '%' })).toBe(expected);
  });
});

describe('non-percentage inputs', () => {
  const displayValue = 10;

  it.each([
    ['20', 20],
    ['20 + 5', 25],
    ['20 * 5', 100],
    ['20 / 5', 4],
    ['(20 + 5) * 5', 125],
    ['20%', displayValue * (20 / 100)],
    ['20% + 5', displayValue * (20 / 100) + 5],
    ['20 + 5%', 20 + displayValue * (5 / 100)],
    ['20% + 5%', displayValue * (20 / 100) + displayValue * (5 / 100)],
    ['20% * 5', displayValue * (20 / 100) * 5],
    ['20 * 5%', 20 * displayValue * (5 / 100)],
    ['20% * 5%', displayValue * (20 / 100) * displayValue * (5 / 100)],
    ['20% / 5', (displayValue * (20 / 100)) / 5],
    ['20 / 5%', 20 / (displayValue * (5 / 100))],
    ['20% / 5%', (displayValue * (20 / 100)) / (displayValue * (5 / 100))],
    ['(20% + 5) / 5', (displayValue * (20 / 100) + 5) / 5],
    //['(20% + 5) / -5', 5], // valid, but throws due to a bug in @emmetio/math-expression
    ['(20% + 5) * -5', (displayValue * (20 / 100) + 5) * -5],
    ['(20% + 5) * 5', (displayValue * (20 / 100) + 5) * 5],
    ['(20 + 5%) * 5', (20 + displayValue * (5 / 100)) * 5],
    ['(20% + 5%) * 5', (displayValue * (20 / 100) + displayValue * (5 / 100)) * 5],

    ['(%20 + 5) * -5', (displayValue * (20 / 100) + 5) * -5],
    ['(%20 + 5) * 5', (displayValue * (20 / 100) + 5) * 5],
    ['(20 + 5%) * 5', (20 + displayValue * (5 / 100)) * 5],
    ['(%20 + %5) * 5', (displayValue * (20 / 100) + displayValue * (5 / 100)) * 5],
  ])('evaluates %s to %d', (expression, expected) => {
    expect(evaluateExpression({ expression, displayValue })).toBe(expected);
  });
});

describe('non-percentage inputs containing % and x', () => {
  const displayValue = 10;

  it.each([
    ['20 + 5x', 20 + 5 * displayValue],
    ['20% + 5X', displayValue * (20 / 100) + 5 * displayValue],
    ['x20 + 5%', displayValue * 20 + displayValue * (5 / 100)],
    ['20% * 5x', displayValue * (20 / 100) * (5 * displayValue)],
    ['20x * 5%', displayValue * 20 * (displayValue * (5 / 100))],
    ['20% / 5x', (displayValue * (20 / 100)) / (5 * displayValue)],
    ['20x / 5%', (displayValue * 20) / (displayValue * (5 / 100))],
    ['(20% + 5) / 5x', ((displayValue * 20) / 100 + 5) / (5 * displayValue)],
    //['(20% + 5) / -5x', ((displayValue * 20) / 100 + 5) / -(5 * displayValue)], // valid, but throws due to a bug in @emmetio/math-expression
    ['(20% + 5) * -5X', ((displayValue * 20) / 100 + 5) * -(5 * displayValue)],
    ['(20% + 5x) * 5', ((displayValue * 20) / 100 + 5 * displayValue) * 5],
    ['(20x + 5%) * 5', (20 * displayValue + (displayValue * 5) / 100) * 5],
    ['(20% + 5%) * 5x', ((displayValue * 20) / 100 + (displayValue * 5) / 100) * (displayValue * 5)],
  ])('evaluates %s to %d', (expression, expected) => {
    expect(evaluateExpression({ expression, displayValue })).toBe(expected);
  });
});

describe('allowed units', () => {
  const displayValue = 10;

  // prettier-ignore
  it.each([
    ['20px', 20],
    ['20%', 2],
  ])('evaluates %s to %d', (expression, expected) => {
    expect(evaluateExpression({ expression, displayValue,  allowedUnits: ['px'] })).toBe(expected);
  });
});

describe('allowed units with suffix', () => {
  const displayValue = 10;

  // prettier-ignore
  it.each([
    ['20px', 20],
    ['20pixels', 20],
    ['20%', 2],
  ])('evaluates %s to %d', (expression, expected) => {
    expect(evaluateExpression({ expression, displayValue, suffix: 'px',  allowedUnits: ['pixels'] })).toBe(expected);
  });
});

describe('invalid expressions', () => {
  const displayValue = 10;

  it.each([['dogs'], ['1xx'], ['2%%']])('throws error', (expression) => {
    expect(() => evaluateExpression({ expression, displayValue })).toThrow;
  });
});
