import React, { useMemo } from 'react';
import { clamp, pipe } from 'remeda';
import type { RGBA } from '@lib/color';
import type { InputProps } from '@components/input';
import type { Formatter } from './types';
import { Base } from './value-field-base';

type HexElement = React.ElementRef<'input'>;
type HexProps = Omit<InputProps, 'value' | 'onChange'> & {
  /** Color in Figma's normalized RGBA format */
  value: RGBA;
  /** Callback to call upon submission. */
  onChange: (value: RGBA) => void;
  /**
   * Ignores the alpha channel in user input, treating it as opaque. Useful when rendering without an alpha field.
   * Results in 'onChange' always being called with an alpha value of 1.
   * @default false
   * */
  ignoreAlpha?: boolean;
};

const Hex = React.forwardRef<HexElement, HexProps>((props, ref) => {
  const { value, onChange, ignoreAlpha = false, ...inputProps } = props;
  const formatter = useMemo(() => createFormatter({ ignoreAlpha }), [ignoreAlpha]);

  return <Base inputRef={ref} value={value} onChange={onChange} formatter={formatter} {...inputProps} />;
});

type FormatterOptions = { ignoreAlpha?: boolean };

function createFormatter(options: FormatterOptions): Formatter<RGBA> {
  const { ignoreAlpha } = options;

  return {
    parse(input, currentValue) {
      try {
        return {
          value: pipe(
            input,
            getFirstValidSubstring,
            (input) => expandToHex8(input, currentValue),
            hex8toRgba,
            (rgba) => (ignoreAlpha ? { ...rgba, a: 1 } : rgba)
          ),
          valid: true,
        };
      } catch (e) {
        return { valid: false };
      }
    },
    format(value) {
      return (
        Math.round(value.r * 255)
          .toString(16)
          .padStart(2, '0') +
        Math.round(value.g * 255)
          .toString(16)
          .padStart(2, '0') +
        Math.round(value.b * 255)
          .toString(16)
          .padStart(2, '0')
      ).toUpperCase();
    },
    incrementBy(value, amount, incrementTargets): RGBA {
      incrementTargets ??= { r: true, g: true, b: true };
      return {
        r: incrementTargets.r ? clamp(Math.round(value.r * 255) + amount, { min: 0, max: 255 }) / 255 : value.r,
        g: incrementTargets.g ? clamp(Math.round(value.g * 255) + amount, { min: 0, max: 255 }) / 255 : value.g,
        b: incrementTargets.b ? clamp(Math.round(value.b * 255) + amount, { min: 0, max: 255 }) / 255 : value.b,
        a: value.a,
      };
    },
    getIncrementTargets(inputElement) {
      const start = inputElement.selectionStart;
      const end = inputElement.selectionEnd;

      if (start === null || end === null) {
        return null;
      }

      return {
        r: start < 2 || (start === 2 && end === 2),
        g: (start < 4 && end >= 3) || (start === 4 && end === 4),
        b: end >= 5,
      };
    },
    getIncrementSelection(targets) {
      let start: number;
      let end: number;

      if (!targets) {
        return [0, 6];
      }

      if (targets.r) {
        start = 0;
      } else if (targets.g) {
        start = 2;
      } else {
        start = 4;
      }

      if (targets.b) {
        end = 6;
      } else if (targets.g) {
        end = 4;
      } else {
        end = 2;
      }

      return [start, end];
    },
  };
}

function getFirstValidSubstring(input: string) {
  const pattern = /[0-9a-f]+/gi;
  return input.match(pattern)?.[0] ?? '';
}

function expandToHex8(hexLike: string, currentValue: RGBA): string {
  if (!/^[0-9a-f]{1,8}$/i.test(hexLike)) {
    throw new Error('Invalid hex substring');
  }

  switch (hexLike.length) {
    case 1:
      return hexLike.repeat(6) + alphaToHex(currentValue.a);
    case 2:
      return hexLike.repeat(3) + alphaToHex(currentValue.a);
    case 3:
      return (
        hexLike
          .split('')
          .map((c) => c.repeat(2))
          .join('') + alphaToHex(currentValue.a)
      );
    case 4:
      return (
        hexLike
          .slice(0, 3)
          .split('')
          .map((c) => c.repeat(2))
          .join('') + hexLike[3].repeat(2)
      );
    case 5:
      return (
        hexLike
          .slice(0, 3)
          .split('')
          .map((c) => c.repeat(2))
          .join('') + hexLike.slice(-2)
      );
    case 6:
      return hexLike + alphaToHex(currentValue.a);
    case 7:
      return hexLike.slice(0, 6) + hexLike[6].repeat(2);
    case 8:
      return hexLike;
    default:
      throw new Error('Invalid hex substring');
  }
}

function hex8toRgba(hex: string): RGBA {
  return {
    r: parseInt(hex.substring(0, 2), 16) / 255,
    g: parseInt(hex.substring(2, 4), 16) / 255,
    b: parseInt(hex.substring(4, 6), 16) / 255,
    a: parseInt(hex.substring(6, 8), 16) / 255,
  };
}

function alphaToHex(a: number): string {
  return Math.round(a * 255).toString(16);
}

export type { HexProps };
export { Hex };
