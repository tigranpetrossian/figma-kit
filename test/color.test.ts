import { describe, expect, it } from 'vitest';
import { hslaToRgba } from '@lib/color';

const HUES = Array.from({ length: 13 }, (_, index) => index * 30);
const PERCENTS = Array.from({ length: 101 }, (_, index) => index);

describe('hslaToRgba', () => {
  it('keeps every channel between 0 and 1 for whole-percent saturation and lightness', () => {
    expect(findOutOfRangeColors()).toEqual([]);
  });
});

function findOutOfRangeColors() {
  const outOfRange = [];
  for (const h of HUES) {
    for (const s of PERCENTS) {
      for (const l of PERCENTS) {
        const { r, g, b } = hslaToRgba({ h, s, l, a: 1 });
        if ([r, g, b].some((channel) => channel < 0 || channel > 1)) {
          outOfRange.push({ h, s, l });
        }
      }
    }
  }
  return outOfRange;
}
