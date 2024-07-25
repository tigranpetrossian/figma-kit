import { round } from 'remeda';
import type { CSSProperties } from 'react';
import { Slider } from '@components/slider';
import { useColorPickerContext } from '@components/color-picker/color-picker';
import { blendWithWhite, rgbaToCssString, rgbaToP3String } from '@lib/color';

type AlphaProps = React.ComponentPropsWithoutRef<'div'>;

const Alpha = (props: AlphaProps) => {
  const { className, style } = props;
  const { colorSpace, color, onColorChange } = useColorPickerContext('Hue');
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
    onColorChange({ ...color, a: round(value[0] / 100, 2) });
  };

  return (
    <Slider
      min={0}
      max={100}
      range={false}
      value={[color.a * 100]}
      onValueChange={handleValueChange}
      className={`fp-ColorPickerAlphaSlider fp-color-space-${colorSpace} ${className}`}
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
