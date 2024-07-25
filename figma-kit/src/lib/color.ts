import { round } from 'remeda';

export type RGBA = { r: number; g: number; b: number; a: number };
export type HSVA = { h: number; s: number; v: number; a: number };
export type HSLA = { h: number; s: number; l: number; a: number };
export type P3String = `color(display-p3 ${number} ${number} ${number}${` / ${number}` | ''})`;
export type RGBString = `rgb(${number} ${number} ${number}${` / ${number}` | ''})`;

export const rgbaToHsva = ({ r, g, b, a }: RGBA): HSVA => {
  const max = Math.max(r, g, b);
  const delta = max - Math.min(r, g, b);

  const hh = delta ? (max === r ? (g - b) / delta : max === g ? 2 + (b - r) / delta : 4 + (r - g) / delta) : 0;

  return {
    h: 60 * (hh < 0 ? hh + 6 : hh),
    s: max ? (delta / max) * 100 : 0,
    v: max * 100,
    a,
  };
};

export const hsvaToRgba = ({ h, s, v, a }: HSVA): RGBA => {
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
};

export const hslaToHsva = ({ h, s, l, a }: HSLA): HSVA => {
  s *= (l < 50 ? l : 100 - l) / 100;

  return {
    h: h,
    s: s > 0 ? ((2 * s) / (l + s)) * 100 : 0,
    v: l + s,
    a,
  };
};

export const hsvaToHsla = ({ h, s, v, a }: HSVA): HSLA => {
  const hh = ((200 - s) * v) / 100;

  return {
    h,
    s: hh > 0 && hh < 200 ? ((s * v) / 100 / (hh <= 100 ? hh : 200 - hh)) * 100 : 0,
    l: hh / 2,
    a,
  };
};

export const hslaToRgba = (hsla: HSLA): RGBA => {
  return hsvaToRgba(hslaToHsva(hsla));
};

export const rgbaToHsla = (rgba: RGBA): HSLA => {
  return hsvaToHsla(rgbaToHsva(rgba));
};

export function rgbaToP3String(color: RGBA): P3String {
  const r = round(color.r, 4);
  const g = round(color.g, 4);
  const b = round(color.b, 4);
  const a = round(color.a, 2);
  return a < 1 ? `color(display-p3 ${r} ${g} ${b} / ${a})` : `color(display-p3 ${r} ${g} ${b})`;
}

export function rgbaToCssString(color: RGBA): RGBString {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const a = color.a;

  return a < 1 ? `rgb(${r} ${g} ${b} / ${a})` : `rgb(${r} ${g} ${b})`;
}

export function blendWithWhite(color: RGBA): RGBA {
  const { r, g, b, a } = color;
  return {
    r: r + (1 - r) * (1 - a),
    g: g + (1 - g) * (1 - a),
    b: b + (1 - b) * (1 - a),
    a: 1,
  };
}
