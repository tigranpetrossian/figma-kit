import React, { useState } from 'react';
import { hslaToRgba, hsvaToRgba, RGBA, rgbaToHsla, rgbaToHsva } from '@lib/color';
import { normalize } from '@lib/number/normalize';
import { clamp, pipe } from 'remeda';

const CURSOR_VERTICAL_OFFSET = 4;
const PICKER_SIZE = 240;

type HXYA = {
  h: number;
  x: number;
  y: number;
  a: number;
};

type ThumbPosition = {
  x: number;
  y: number;
};

type ColorModel = 'hsva' | 'hsla';
type ColorSpace = 'srgb' | 'display-p3';

type PickerProps = {
  color: RGBA;
  model: ColorModel;
  colorSpace: ColorSpace;
  onColorChange: (color: RGBA) => void;
};

const Picker = (props: PickerProps) => {
  const { model, color, colorSpace, onColorChange } = props;
  const [editingHxya, setEditingHxya] = useState<HXYA | null>(null);
  const hxya = editingHxya ?? formatter[model](color);

  const handlePointerDown = (event: React.PointerEvent) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.setPointerCapture(event.pointerId);
    const newHxya = {
      h: hxya.h,
      x: pipe(event.clientX - targetRect.x, normalize([0, PICKER_SIZE], [0, 100]), clamp({ min: 0, max: 100 })),
      y: pipe(
        event.clientY - targetRect.y,
        normalize([0, PICKER_SIZE], [0, 100]),
        (value) => value - CURSOR_VERTICAL_OFFSET,
        clamp({ min: 0, max: 100 })
      ),
      a: hxya.a,
    };
    setEditingHxya(newHxya);
    onColorChange(parser[model](newHxya));
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }
    const targetRect = event.currentTarget.getBoundingClientRect();
    const newHxya = {
      h: hxya.h,
      x: pipe(event.clientX - targetRect.x, normalize([0, PICKER_SIZE], [0, 100]), clamp({ min: 0, max: 100 })),
      y: pipe(
        event.clientY - targetRect.y,
        normalize([0, 240], [0, 100]),
        (value) => value - CURSOR_VERTICAL_OFFSET,
        clamp({ min: 0, max: 100 })
      ),
      a: hxya.a,
    };
    setEditingHxya(newHxya);
    onColorChange(parser[model](newHxya));
  };

  const handlePointerUp = (event: React.PointerEvent) => {
    setEditingHxya(null);
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ position: 'relative' }}
    >
      <Thumb color={color} position={hxya} />
      <Canvas color={color} model={model} colorSpace={colorSpace} />
    </div>
  );
};

type CanvasProps = {
  color: RGBA;
  model: ColorModel;
  colorSpace: ColorSpace;
};

const Canvas = (props: CanvasProps) => {
  const { color, model, colorSpace } = props;
  return <div className={`fp-ColorPicker fp-model-${model}`} />;
};

type ThumbProps = {
  color: RGBA;
  position: ThumbPosition;
};

const Thumb = (props: ThumbProps) => {
  const { color, position } = props;

  return (
    <div
      tabIndex={0}
      className="fp-ColorPickerThumb"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
    />
  );
};

type Formatter = Record<ColorModel, (color: RGBA) => HXYA>;

const formatter: Formatter = {
  hsva: (color: RGBA) => {
    const { h, s, v, a } = rgbaToHsva(color);
    return {
      h,
      x: s,
      y: 100 - v,
      a,
    };
  },
  hsla: (color: RGBA) => {
    const { h, s, l, a } = rgbaToHsla(color);
    return {
      h,
      x: s,
      y: 100 - l,
      a,
    };
  },
};

type Parser = Record<ColorModel, (hxya: HXYA) => RGBA>;

const parser: Parser = {
  hsva: (hxya) =>
    hsvaToRgba({
      h: hxya.h,
      s: hxya.x,
      v: 100 - hxya.y,
      a: hxya.a,
    }),
  hsla: (hxya) =>
    hslaToRgba({
      h: hxya.h,
      s: hxya.x,
      l: 100 - hxya.y,
      a: hxya.a,
    }),
};

export type { PickerProps, ColorSpace, ColorModel };
export { Picker };
