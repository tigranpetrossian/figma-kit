import type { CSSProperties } from 'react';
import { Slider } from '@components/slider';
import type { ColorModel, ColorSpace } from '@components/color-picker/color-picker';
import { useColorPickerContext } from '@components/color-picker/color-picker';
import type { RGBA } from '@lib/color';
import { hsvaToRgba, rgbaToHsva } from '@lib/color';

type HueProps = React.ComponentPropsWithoutRef<'div'>;

const Hue = (props: HueProps) => {
  const { className, style } = props;
  const { activeModel, colorSpace, hue, color, onColorChange } = useColorPickerContext('Hue');
  const strategy = colorModelStrategies[activeModel];
  const handleValueChange = (value: number[]) => {
    const newColor = strategy.setHue(color, value[0]);
    onColorChange({ mode: 'rgb', value: newColor });
  };
  const thumbColor = strategy.getThumbColor(hue, colorSpace);

  return (
    <Slider
      aria-label="hue"
      range={false}
      min={0}
      max={359}
      value={[hue]}
      onValueChange={handleValueChange}
      className={`fp-ColorPickerHueSlider fp-color-model-${activeModel} fp-color-space-${colorSpace} ${className}`}
      style={{ '--slider-thumb-bg': thumbColor, ...style } as CSSProperties}
    />
  );
};

type ColorModelStrategy = {
  getHue: (color: RGBA) => number;
  setHue: (color: RGBA, hue: number) => RGBA;
  getThumbColor: (hue: number, colorSpace: ColorSpace) => string;
};

const standardModelStrategy: ColorModelStrategy = {
  getHue: (color) => Math.round(rgbaToHsva(color).h),
  setHue: (color, hue) => {
    const { s, v } = rgbaToHsva(color);
    return hsvaToRgba({ h: hue, s, v, a: color.a });
  },
  getThumbColor: (hue, colorSpace) => {
    const { r, g, b } = hsvaToRgba({ h: hue, s: 100, v: 100, a: 1 });
    return colorSpace === 'display-p3'
      ? `color(display-p3 ${+r.toFixed(4)} ${+g.toFixed(4)} ${+b.toFixed(4)})`
      : `rgb(${Math.round(r * 255)} ${Math.round(g * 255)} ${Math.round(b * 255)})`;
  },
};

const colorModelStrategies: Record<ColorModel, ColorModelStrategy> = {
  rgb: standardModelStrategy,
  hsl: standardModelStrategy,
  hsv: standardModelStrategy,
  hex: standardModelStrategy,
};

export type { HueProps };
export { Hue };
