import type { CSSProperties } from 'react';
import React, { useRef } from 'react';
import { clamp, pipe } from 'remeda';
import type { ColorModel, ColorsByModel } from '@components/color-picker/color-picker';
import { useColorPickerContext } from '@components/color-picker/color-picker';
import type { HSLA, HSVA } from '@lib/color';
import { hsvaToRgba, rgbaToCssString, rgbaToP3String } from '@lib/color';
import { normalize } from '@lib/number/normalize';

const CURSOR_VERTICAL_OFFSET = 8;

type ThumbPosition = { x: number; y: number };

type AreaColor = { model: 'hsv'; value: HSVA } | { model: 'hsl'; value: HSLA };

type AreaProps = {
  size?: number;
  'aria-label'?: string;
  getAriaValueText?: (color: AreaColor) => string;
};

const Area = (props: AreaProps) => {
  const { 'aria-label': ariaLabel = 'Color', getAriaValueText = getDefaultAriaValueText } = props;
  const { onColorChange, colorsByModel, hue, colorSpace, activeModel } = useColorPickerContext('ColorPicker.Area');
  const baseColor = {
    srgb: rgbaToCssString(hsvaToRgba({ h: hue, s: 100, v: 100, a: 1 })),
    p3: rgbaToP3String(hsvaToRgba({ h: hue, s: 100, v: 100, a: 1 })),
  };
  const thumbColor = {
    srgb: rgbaToCssString(colorsByModel.rgb),
    p3: rgbaToP3String(colorsByModel.rgb),
  };
  const areaColor = getAreaColor(colorsByModel, activeModel);
  const position = getPosition(areaColor);
  const areaRef = useRef<HTMLDivElement | null>(null);
  const { size: measuredSize } = useAreaSize(areaRef);
  const size = props.size ?? measuredSize;

  const handlePositionChange = (position: ThumbPosition) => {
    if (activeModel === 'hsl') {
      onColorChange({
        mode: 'hsl',
        value: { h: hue, s: position.x, l: 100 - position.y, a: colorsByModel.rgb.a },
      });
    } else {
      onColorChange({
        mode: 'hsv',
        value: { h: hue, s: position.x, v: 100 - position.y, a: colorsByModel.rgb.a },
      });
    }
  };

  const handlePointerEvents = (event: React.PointerEvent) => {
    if (event.type === 'pointerdown') {
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    if (event.type === 'pointermove' && !event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }
    const targetRect = event.currentTarget.getBoundingClientRect();

    handlePositionChange({
      x: pipe(event.clientX - targetRect.x, normalize([0, size], [0, 100]), clamp({ min: 0, max: 100 })),
      y: pipe(
        event.clientY - targetRect.y - CURSOR_VERTICAL_OFFSET,
        normalize([0, size], [0, 100]),
        clamp({ min: 0, max: 100 })
      ),
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const incrementMultiplier = event.shiftKey ? 10 : 1;

    const direction = {
      ArrowRight: { x: 1, y: 0 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowDown: { x: 0, y: 1 },
      ArrowUp: { x: 0, y: -1 },
    }[event.key];

    if (direction) {
      event.preventDefault();
      handlePositionChange({
        x: clamp(position.x + direction.x * incrementMultiplier, { min: 0, max: 100 }),
        y: clamp(position.y + direction.y * incrementMultiplier, { min: 0, max: 100 }),
      });
    }
  };

  return (
    <div
      ref={areaRef}
      className="fp-ColorPickerArea"
      onPointerDown={handlePointerEvents}
      onPointerMove={handlePointerEvents}
      style={
        {
          '--base-color-srgb': baseColor.srgb,
          '--base-color-p3': baseColor.p3,
          width: props.size,
        } as CSSProperties
      }
    >
      <div className={`fp-ColorPickerAreaCanvas fp-color-space-${colorSpace} fp-color-model-${activeModel}`} />
      <div
        role="slider"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-valuetext={getAriaValueText(areaColor)}
        onKeyDown={handleKeyDown}
        className={`fp-ColorPickerThumb fp-color-space-${colorSpace}`}
        style={
          {
            '--thumb-bg-srgb': thumbColor.srgb,
            '--thumb-bg-p3': thumbColor.p3,
            left: `${position.x}%`,
            top: `${position.y}%`,
          } as CSSProperties
        }
      />
    </div>
  );
};

function getAreaColor(colorsByModel: ColorsByModel, colorModel: ColorModel): AreaColor {
  return colorModel === 'hsl' ? { model: 'hsl', value: colorsByModel.hsl } : { model: 'hsv', value: colorsByModel.hsv };
}

function getPosition(color: AreaColor): ThumbPosition {
  if (color.model === 'hsl') {
    return {
      x: color.value.s,
      y: 100 - color.value.l,
    };
  } else {
    return {
      x: color.value.s,
      y: 100 - color.value.v,
    };
  }
}

function getDefaultAriaValueText(color: AreaColor) {
  const saturation = `Saturation ${Math.round(color.value.s)}%`;

  return color.model === 'hsl'
    ? `${saturation}, Lightness ${Math.round(color.value.l)}%`
    : `${saturation}, Brightness ${Math.round(color.value.v)}%`;
}

function useAreaSize(target: React.RefObject<HTMLDivElement>) {
  const [size, setSize] = React.useState<number>(0);

  React.useLayoutEffect(() => {
    const element = target.current;
    if (!element) {
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSize(element.getBoundingClientRect().width);
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setSize(entry.contentRect.width);
      }
    });
    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [target]);

  return { size };
}

export type { AreaProps, AreaColor };
export { Area };
