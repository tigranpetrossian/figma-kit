import type { CSSProperties } from 'react';
import type { SliderProps } from '@components/slider';
import { Slider } from '@components/slider';
import { useColorPickerContext } from '@components/color-picker/color-picker';
import { OPACITY_DISPLAY, blendWithWhite, rgbaToCssString, rgbaToP3String } from '@lib/color';
import { addClassName } from '@lib/react/add-class-name';

type AlphaProps = Omit<
  SliderProps,
  'defaultValue' | 'inverted' | 'max' | 'min' | 'onValueChange' | 'orientation' | 'range' | 'style' | 'value'
> & {
  style?: CSSProperties | undefined;
};

const Alpha = (props: AlphaProps) => {
  const { className, style, ...sliderProps } = props;
  const { colorSpace, colorsByModel, onColorChange } = useColorPickerContext('ColorPicker.Alpha');
  const color = colorsByModel.rgb;
  const trackBg = {
    srgb: {
      transparent: rgbaToCssString({ ...color, a: 0 }),
      opaque: rgbaToCssString({ ...color, a: 1 }),
    },
    p3: {
      transparent: rgbaToP3String({ ...color, a: 0 }),
      opaque: rgbaToP3String({ ...color, a: 1 }),
    },
  };
  const thumbBg = {
    srgb: rgbaToCssString(blendWithWhite(color)),
    p3: rgbaToP3String(blendWithWhite(color)),
  };

  const handleValueChange = (value: number[]) => {
    onColorChange({ mode: 'alpha', value: OPACITY_DISPLAY.fromDisplay(value[0]) });
  };

  return (
    <Slider
      aria-label="Opacity"
      {...sliderProps}
      min={0}
      max={100}
      range={false}
      value={[OPACITY_DISPLAY.toDisplay(color.a)]}
      onValueChange={handleValueChange}
      className={addClassName(className, `fp-ColorPickerAlphaSlider fp-color-space-${colorSpace}`)}
      style={
        {
          '--track-bg-transparent-srgb': trackBg.srgb.transparent,
          '--track-bg-opaque-srgb': trackBg.srgb.opaque,
          '--track-bg-transparent-p3': trackBg.p3.transparent,
          '--track-bg-opaque-p3': trackBg.p3.opaque,
          '--thumb-bg-srgb': thumbBg.srgb,
          '--thumb-bg-p3': thumbBg.p3,
          ...style,
        } as CSSProperties
      }
    />
  );
};

export type { AlphaProps };
export { Alpha };
