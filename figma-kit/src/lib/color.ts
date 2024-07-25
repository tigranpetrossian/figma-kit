import { round } from 'remeda';

type RGBA = { r: number; g: number; b: number; a: number };
type HSVA = { h: number; s: number; v: number; a: number };
type HSLA = { h: number; s: number; l: number; a: number };
type HEX = string;
type P3String = `color(display-p3 ${number} ${number} ${number}${` / ${number}` | ''})`;
type RGBString = `rgb(${number} ${number} ${number}${` / ${number}` | ''})`;

function decimalToHex(number: number): string {
  const hex = round(number * 255, 0).toString(16);
  return hex.length < 2 ? '0' + hex : hex;
}

function rgbaToHex({ r, g, b, a }: RGBA): HEX {
  const alphaHex = a < 1 ? decimalToHex(a) : '';
  return '#' + decimalToHex(r) + decimalToHex(g) + decimalToHex(b) + alphaHex;
}

function hslaToHex(hsla: HSLA): HEX {
  return rgbaToHex(hslaToRgba(hsla));
}

function hsvaToHex(hsla: HSVA): HEX {
  return rgbaToHex(hsvaToRgba(hsla));
}

function rgbaToHsva({ r, g, b, a }: RGBA): HSVA {
  const max = Math.max(r, g, b);
  const delta = max - Math.min(r, g, b);

  const hh = delta ? (max === r ? (g - b) / delta : max === g ? 2 + (b - r) / delta : 4 + (r - g) / delta) : 0;

  return {
    h: 60 * (hh < 0 ? hh + 6 : hh),
    s: max ? (delta / max) * 100 : 0,
    v: max * 100,
    a,
  };
}

function hsvaToRgba({ h, s, v, a }: HSVA): RGBA {
  h = (h / 360) * 6;
  s = s / 100;
  v = v / 100;

  const hh = Math.floor(h),
    b = v * (1 - s),
    c = v * (1 - (h - hh) * s),
    d = v * (1 - (1 - h + hh) * s),
    module = hh % 6;

  return {
    r: [v, c, b, b, d, v][module],
    g: [d, v, v, c, b, b][module],
    b: [b, b, d, v, v, c][module],
    a: a,
  };
}

function hslaToHsva({ h, s, l, a }: HSLA): HSVA {
  s *= (l < 50 ? l : 100 - l) / 100;

  return {
    h: h,
    s: s > 0 ? ((2 * s) / (l + s)) * 100 : 0,
    v: l + s,
    a,
  };
}

function hsvaToHsla({ h, s, v, a }: HSVA): HSLA {
  const hh = ((200 - s) * v) / 100;

  return {
    h,
    s: hh > 0 && hh < 200 ? ((s * v) / 100 / (hh <= 100 ? hh : 200 - hh)) * 100 : 0,
    l: hh / 2,
    a,
  };
}

function hslaToRgba(hsla: HSLA): RGBA {
  return hsvaToRgba(hslaToHsva(hsla));
}

function rgbaToHsla(rgba: RGBA): HSLA {
  return hsvaToHsla(rgbaToHsva(rgba));
}

function rgbaToP3String(color: RGBA): P3String {
  const r = round(color.r, 4);
  const g = round(color.g, 4);
  const b = round(color.b, 4);
  const a = round(color.a, 2);
  return a < 1 ? `color(display-p3 ${r} ${g} ${b} / ${a})` : `color(display-p3 ${r} ${g} ${b})`;
}

function rgbaToCssString(color: RGBA): RGBString {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const a = color.a;

  return a < 1 ? `rgb(${r} ${g} ${b} / ${a})` : `rgb(${r} ${g} ${b})`;
}

function blendWithWhite(color: RGBA): RGBA {
  const { r, g, b, a } = color;
  return {
    r: r + (1 - r) * (1 - a),
    g: g + (1 - g) * (1 - a),
    b: b + (1 - b) * (1 - a),
    a: 1,
  };
}

function roundHsva(hsva: HSVA): HSVA {
  return {
    h: round(hsva.h, 0),
    s: round(hsva.s, 0),
    v: round(hsva.v, 0),
    a: round(hsva.a, 2),
  };
}

function roundHsla(hsla: HSLA): HSLA {
  return {
    h: round(hsla.h, 0),
    s: round(hsla.s, 0),
    l: round(hsla.l, 0),
    a: round(hsla.a, 2),
  };
}

export type { RGBA, HSVA, HSLA, HEX, P3String, RGBString };

export {
  rgbaToHex,
  rgbaToHsva,
  hsvaToRgba,
  hslaToHsva,
  hsvaToHsla,
  hslaToRgba,
  rgbaToHsla,
  rgbaToP3String,
  rgbaToCssString,
  blendWithWhite,
  roundHsva,
  roundHsla,
  hslaToHex,
  hsvaToHex,
};
