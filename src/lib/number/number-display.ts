import { ceil, clamp, floor, round } from 'remeda';

const MAX_PRECISION = 15;
const FLOAT32_MAX_SIGNIFICANT_DIGITS = 9;
const DOUBLE_SIGNIFICANT_DIGITS = 15;

type NumberDisplayOptions = {
  /** Lower bound in stored units. */
  min?: number;
  /** Upper bound in stored units. */
  max?: number;
  /** Displayed value = stored value * scale. */
  scale?: number;
  /**
   * Decimal places kept in displayed units. Truncated to an integer and limited to [-15, 15].
   * Undefined keeps every digit that survives noise removal.
   */
  precision?: number;
};

type NumberDisplay = {
  /** Options after precision normalization. Spread into `ValueField.Numeric` props to share the mapping. */
  readonly options: NumberDisplayOptions;
  toDisplay: (stored: number) => number;
  fromDisplay: (display: number) => number;
  /** Adds `amount` displayed units, rounding toward the nudge so a nudge finer than `precision` still moves. */
  nudge: (stored: number, amount: number) => number;
  /** The displayed value as a plain decimal, never in exponent form. Empty for NaN. */
  format: (stored: number) => string;
};

function createNumberDisplay(options: NumberDisplayOptions = {}): NumberDisplay {
  const { min, max, scale = 1 } = options;
  const precision = normalizePrecision(options.precision);
  const clampToRange = (value: number) => clamp(value, { min, max });
  const toDisplay = (stored: number) =>
    roundToPrecision(stripBinaryNoise(snapFloat32(clampToRange(stored)) * scale), precision);
  const fromDisplay = (display: number) =>
    clampToRange(stripBinaryNoise(roundToPrecision(stripBinaryNoise(display), precision) / scale));

  return {
    options: { min, max, scale, precision },
    toDisplay,
    fromDisplay,
    nudge: (stored, amount) =>
      fromDisplay(roundTowardNudge(stripBinaryNoise(toDisplay(stored) + amount), amount, precision)),
    format: (stored) => (Number.isNaN(stored) ? '' : toPlainString(toDisplay(stored))),
  };
}

function normalizePrecision(precision: number | undefined): number | undefined {
  if (precision === undefined || !Number.isFinite(precision)) {
    return undefined;
  }

  return clamp(Math.trunc(precision), { min: -MAX_PRECISION, max: MAX_PRECISION });
}

// Figma stores paint channels, opacity and geometry as float32, so a value read back from it is Math.fround of the
// written one. Integers are exempt because their shortest float32 decimal can drop digits (2 ** 30 to 1073741800).
function snapFloat32(value: number): number {
  if (Number.isInteger(value) || Math.fround(value) !== value) {
    return value;
  }

  for (let digits = 1; digits <= FLOAT32_MAX_SIGNIFICANT_DIGITS; digits++) {
    const candidate = Number(value.toPrecision(digits));
    if (Math.fround(candidate) === value) {
      return candidate;
    }
  }

  return value;
}

function stripBinaryNoise(value: number): number {
  return Number.isInteger(value) ? value : Number(value.toPrecision(DOUBLE_SIGNIFICANT_DIGITS));
}

function roundToPrecision(value: number, precision: number | undefined): number {
  return precision === undefined ? value : Math.sign(value) * round(Math.abs(value), precision);
}

function roundTowardNudge(value: number, amount: number, precision: number | undefined): number {
  if (precision === undefined) {
    return value;
  }

  return amount < 0 ? floor(value, precision) : ceil(value, precision);
}

function toPlainString(value: number): string {
  if (Number.isInteger(value)) {
    return BigInt(value).toString();
  }

  const text = String(value);
  const [mantissa, exponent] = text.split('e');
  if (exponent === undefined) {
    return text;
  }

  const sign = value < 0 ? '-' : '';
  const digits = mantissa.replace('-', '').replace('.', '');
  const leadingZeros = '0'.repeat(-Number(exponent) - 1);
  return `${sign}0.${leadingZeros}${digits}`;
}

export type { NumberDisplay, NumberDisplayOptions };
export { createNumberDisplay };
