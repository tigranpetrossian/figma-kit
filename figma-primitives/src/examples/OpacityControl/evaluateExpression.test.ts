import { describe, it, expect } from 'vitest';
import { evaluateExpression } from './/evaluateExpression';

const VALUE = 100;

describe('Percentage Evaluations', () => {
  it.each([
    ['10%', 10],
    ['10% + 5', 15],
    ['50 + 25%', 75],
    ['75% + 10.5', 85.5],
    ['10 + 50%', 60],

    ['100% - 50', 50],
    ['20% - 10.5', 9.5],
    ['30% - 5', 25],
    ['50 - 10%', 40],

    ['10% * 5', 50],
    ['50% * 2', 100],
    ['30 * 20%', 600],
    ['10% * 10%', 100],

    ['10% / 2', 5],
    ['50% / 4', 12.5],
    ['25 / 5%', 5], // 0.0125 why

    ['10% / 10', 1],

    ['(10% + 5) * 2', 30],
    ['50% * (20 - 5)', 750],
    ['(30 + 20%) / 2', 25],
    ['(15.5 - 10%) * 3', 16.5],
    ['(50 + 5%) / 2', 27.5],
  ])('evaluates %s to %d', (expression, expected) => {
    expect(evaluateExpression(expression, 100)).toBe(expected);
  });
});

describe('Multiplication Evaluations', () => {
  it.each([
    ['10x', 1000],
    ['100x + 1', 10001],
    ['50 + 25x', 2550],
    ['10.5 + 75x', 7510.5],
    ['10x + 50', 1050],

    ['100x - 50', 9950],
    ['20x - 10.5', 1989.5],
    ['30x - 5', 2995],
    ['50 - 10x', -950],

    ['10x * 5', 5000],
    ['50x * 2', 10000],
    ['30 * 20x', 60000],
    ['10x * 10x', 1000000],

    ['10x / 2', 500],
    ['50x / 4', 1250],
    ['25 / 5x', 0.05],
    ['10x / 10', 100],

    ['(10x + 5) * 2', 2010],
    ['50x * (20 - 5)', 75000],
    ['(30 + 20x) / 2', 1015],
    ['(15.5 - 10x) * 3', -2953.5],
    ['(50 + 5x) / 2', 275],
  ])('evaluates %s to %d', (expression, expected) => {
    expect(evaluateExpression(expression, 100)).toBe(expected);
  });
});

describe('Mixed Evaluations', () => {
  it.each([
    ['10% + 5x', 510],
    ['50x - 25%', 4975],
    ['75% * 2x', 15000],
    ['10 + 50% * 2x', 10010],
    ['(20% + 30x) / 2', 1510],
    ['(50x - 10%) * 3', 14970],
    ['10x + 20% * 5', 1100],
    ['(15.5 - 10%) * 3x', 1650],
    ['50% + 5x * 2', 1050],
    ['(25 + 10%) * 4x', 14000],
  ])('evaluates %s to %d', (expression, expected) => {
    expect(evaluateExpression(expression, VALUE)).toBe(expected);
  });
});

describe('invalid expressions', () => {
  it.each(['dogs', '%10%', 'x10%', '10%%', '%%10', '10xx', 'xx10'])('invalid values throw exceptions', (expression) => {
    expect(() => evaluateExpression(expression, VALUE)).toThrow();
  });
});
