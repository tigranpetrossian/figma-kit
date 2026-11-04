import { describe, expect, it } from 'vitest';
import type { RGB } from '@lib/color';
import { hslaToRgba, srgbToDisplayP3 } from '@lib/color';

const HUES = Array.from({ length: 13 }, (_, index) => index * 30);
const PERCENTS = Array.from({ length: 101 }, (_, index) => index);
const BYTES = Array.from({ length: 256 }, (_, index) => index);
const BYTE_SWEEP = Array.from({ length: 52 }, (_, index) => index * 5);
const SRGB_PRIMARIES_IN_DISPLAY_P3: [string, RGB, RGB][] = [
  ['red', { r: 1, g: 0, b: 0 }, { r: 0.917488, g: 0.200287, b: 0.138561 }],
  ['green', { r: 0, g: 1, b: 0 }, { r: 0.458402, g: 0.985265, b: 0.298295 }],
  ['blue', { r: 0, g: 0, b: 1 }, { r: 0, g: 0, b: 0.959588 }],
];

describe('hslaToRgba', () => {
  it('keeps every channel between 0 and 1 for whole-percent saturation and lightness', () => {
    expect(findOutOfRangeColors()).toEqual([]);
  });
});

describe('srgbToDisplayP3', () => {
  it.each(SRGB_PRIMARIES_IN_DISPLAY_P3)('maps sRGB %s to the same color in display-p3', (_, srgb, displayP3) => {
    const { r, g, b } = srgbToDisplayP3(srgb);

    expect(r).toBeCloseTo(displayP3.r, 5);
    expect(g).toBeCloseTo(displayP3.g, 5);
    expect(b).toBeCloseTo(displayP3.b, 5);
  });

  it('maps every 8-bit gray to exactly itself', () => {
    expect(findDriftedGrays()).toEqual([]);
  });

  it('keeps every channel between 0 and 1 for 8-bit colors', () => {
    expect(findOutOfRangeDisplayP3Colors()).toEqual([]);
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

function findDriftedGrays() {
  return BYTES.filter((byte) => {
    const gray = byte / 255;
    const { r, g, b } = srgbToDisplayP3({ r: gray, g: gray, b: gray });
    return r !== gray || g !== gray || b !== gray;
  });
}

function findOutOfRangeDisplayP3Colors() {
  const outOfRange = [];
  for (const r of BYTE_SWEEP) {
    for (const g of BYTE_SWEEP) {
      for (const b of BYTE_SWEEP) {
        const displayP3 = srgbToDisplayP3({ r: r / 255, g: g / 255, b: b / 255 });
        if ([displayP3.r, displayP3.g, displayP3.b].some((channel) => channel < 0 || channel > 1)) {
          outOfRange.push({ r, g, b });
        }
      }
    }
  }
  return outOfRange;
}
