import type { CSSProperties } from 'react';
import type { SliderProps } from '@components/slider';
import { Slider } from '@components/slider';
import type { ColorSpace } from '@components/color-picker/color-picker';
import { useColorPickerContext } from '@components/color-picker/color-picker';
import { hsvaToRgba } from '@lib/color';
import { addClassName } from '@lib/react/add-class-name';

type HueProps = Omit<
  SliderProps,
  'defaultValue' | 'inverted' | 'max' | 'min' | 'onValueChange' | 'orientation' | 'range' | 'style' | 'value'
> & {
  style?: CSSProperties | undefined;
};

const Hue = (props: HueProps) => {
  const { className, style, ...sliderProps } = props;
  const { activeModel, colorSpace, hue, onColorChange } = useColorPickerContext('ColorPicker.Hue');

  const handleValueChange = (value: number[]) => {
    onColorChange({ mode: 'hue', value: value[0] });
  };

  return (
    <Slider
      aria-label="Hue"
      {...sliderProps}
      range={false}
      min={0}
      max={360}
      value={[hue]}
      onValueChange={handleValueChange}
      className={addClassName(
        className,
        `fp-ColorPickerHueSlider fp-color-model-${activeModel} fp-color-space-${colorSpace}`
      )}
      style={{ '--slider-thumb-bg': getThumbColor(hue, colorSpace), ...style } as CSSProperties}
    />
  );
};

function getThumbColor(hue: number, colorSpace: ColorSpace) {
  const { r, g, b } = hsvaToRgba({ h: hue, s: 100, v: 100, a: 1 });
  return colorSpace === 'display-p3'
    ? `color(display-p3 ${+r.toFixed(4)} ${+g.toFixed(4)} ${+b.toFixed(4)})`
    : `rgb(${Math.round(r * 255)} ${Math.round(g * 255)} ${Math.round(b * 255)})`;
}

export type { HueProps };
export { Hue };
