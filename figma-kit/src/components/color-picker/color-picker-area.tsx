import type { CSSProperties } from 'react';
import React, { useRef } from 'react';
import { clamp, pipe } from 'remeda';
import type { ColorModel, ColorsByModel } from '@components/color-picker/color-picker';
import { useColorPickerContext } from '@components/color-picker/color-picker';
import { hsvaToRgba, rgbaToCssString, rgbaToP3String } from '@lib/color';
import { normalize } from '@lib/number/normalize';

const CURSOR_VERTICAL_OFFSET = 8;

type ThumbPosition = { x: number; y: number };

type AreaProps = {
  size?: number;
};

const Area = (props: AreaProps) => {
  const { onColorChange, colorsByModel, hue, colorSpace, activeModel } = useColorPickerContext('ColorPicker.Area');
  const baseColor = {
    srgb: rgbaToCssString(hsvaToRgba({ h: hue, s: 100, v: 100, a: 1 })),
    p3: rgbaToP3String(hsvaToRgba({ h: hue, s: 100, v: 100, a: 1 })),
  };
  const thumbColor = {
    srgb: rgbaToCssString(colorsByModel.rgb),
    p3: rgbaToP3String(colorsByModel.rgb),
  };
  const position = getPosition(colorsByModel, activeModel);
  const areaRef = useRef<HTMLDivElement | null>(null);
  const { size } = useAreaSize(areaRef);

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
        } as CSSProperties
      }
    >
      <div className={`fp-ColorPickerAreaCanvas fp-color-space-${colorSpace} fp-color-model-${activeModel}`} />
      <div
        tabIndex={0}
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

function getPosition(colorsByModel: ColorsByModel, colorModel: ColorModel): ThumbPosition {
  if (colorModel === 'hsl') {
    const color = colorsByModel.hsl;

    return {
      x: color.s,
      y: 100 - color.l,
    };
  } else {
    const color = colorsByModel.hsv;

    return {
      x: color.s,
      y: 100 - color.v,
    };
  }
}

function useAreaSize(target: React.RefObject<HTMLDivElement>) {
  const [size, setSize] = React.useState<number>(0);

  React.useLayoutEffect(() => {
    const element = target.current;
    if (!element) {
      return;
    }
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

export { Area };
