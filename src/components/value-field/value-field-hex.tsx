import React, { useMemo } from 'react';
import type { RGBA } from '@lib/color';
import { BYTE_DISPLAY } from '@lib/color';
import type { InputProps } from '@components/input';
import { namedColors } from '@components/value-field/named-colors';
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

type HexDigits = {
  rgb: string;
  alpha: string | undefined;
};

function createFormatter(options: FormatterOptions): Formatter<RGBA> {
  const { ignoreAlpha } = options;

  return {
    parse(input, currentValue) {
      if (isValidNamedColor(input)) {
        const { r, g, b } = namedColors[input];
        return {
          valid: true,
          value: { r: r / 255, g: g / 255, b: b / 255, a: currentValue.a },
        };
      }

      const digits = parseHexDigits(getFirstValidSubstring(input));
      if (digits === null) {
        return { valid: false };
      }

      const rgba = hexDigitsToRgba(digits, currentValue.a);
      return { valid: true, value: ignoreAlpha ? { ...rgba, a: 1 } : rgba };
    },
    format(value) {
      return [value.r, value.g, value.b].map(channelToHex).join('').toUpperCase();
    },
    incrementBy(value, amount, incrementTargets): RGBA {
      incrementTargets ??= { r: true, g: true, b: true };
      return {
        r: incrementTargets.r ? BYTE_DISPLAY.nudge(value.r, amount) : value.r,
        g: incrementTargets.g ? BYTE_DISPLAY.nudge(value.g, amount) : value.g,
        b: incrementTargets.b ? BYTE_DISPLAY.nudge(value.b, amount) : value.b,
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

function isValidNamedColor(input: string): input is keyof typeof namedColors {
  return Object.keys(namedColors).includes(input);
}

function getFirstValidSubstring(input: string) {
  const pattern = /[0-9a-f]+/gi;
  return input.match(pattern)?.[0] ?? '';
}

function parseHexDigits(hex: string): HexDigits | null {
  switch (hex.length) {
    case 1:
      return { rgb: hex.repeat(6), alpha: undefined };
    case 2:
      return { rgb: hex.repeat(3), alpha: undefined };
    case 3:
      return { rgb: doubleEachDigit(hex), alpha: undefined };
    case 4:
      return { rgb: doubleEachDigit(hex.slice(0, 3)), alpha: doubleEachDigit(hex.slice(3)) };
    case 5:
      return { rgb: doubleEachDigit(hex.slice(0, 3)), alpha: hex.slice(3) };
    case 6:
      return { rgb: hex, alpha: undefined };
    case 7:
      return { rgb: hex.slice(0, 6), alpha: doubleEachDigit(hex.slice(6)) };
    case 8:
      return { rgb: hex.slice(0, 6), alpha: hex.slice(6) };
    default:
      return null;
  }
}

function hexDigitsToRgba(digits: HexDigits, currentAlpha: number): RGBA {
  const { rgb, alpha } = digits;
  return {
    r: hexToChannel(rgb.slice(0, 2)),
    g: hexToChannel(rgb.slice(2, 4)),
    b: hexToChannel(rgb.slice(4, 6)),
    a: alpha === undefined ? currentAlpha : hexToChannel(alpha),
  };
}

function doubleEachDigit(hex: string) {
  return hex
    .split('')
    .map((digit) => digit.repeat(2))
    .join('');
}

function hexToChannel(hex: string) {
  return BYTE_DISPLAY.fromDisplay(parseInt(hex, 16));
}

function channelToHex(channel: number) {
  return BYTE_DISPLAY.toDisplay(channel).toString(16).padStart(2, '0');
}

export type { HexProps };
export { Hex };
