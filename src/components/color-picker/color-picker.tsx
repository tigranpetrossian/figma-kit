import { useState } from 'react';
import { createContext } from '@lib/react/create-context';
import type { HSLA, HSVA, RGB, RGBA } from '@lib/color';
import { hslaToHsva, hslaToRgba, hsvaToHsla, hsvaToRgba, rgbaToHsla, rgbaToHsva } from '@lib/color';
import { useControllableState } from '@lib/react/use-controllable-state';

type ColorModel = 'hex' | 'rgb' | 'hsl' | 'hsv';
type ColorSpace = 'srgb' | 'display-p3';
type ColorsByModel = {
  rgb: RGBA;
  hsv: HSVA;
  hsl: HSLA;
};

const DEFAULT_COLOR = { r: 0, g: 0, b: 0, a: 1 };
const DEFAULT_MODELS: ColorModel[] = ['hex', 'rgb', 'hsl', 'hsv'];

const [ColorPickerContextProvider, useColorPickerContext] = createContext<{
  colorSpace: ColorSpace;
  models: ColorModel[];
  activeModel: ColorModel;
  onActiveModelChange: (model: ColorModel) => void;
  colorsByModel: ColorsByModel;
  hue: number;
  onColorChange: (params: ColorChangeParams) => void;
}>('ColorPicker');

type RootProps = {
  /**
   * Color space of the picker. Should match the color profile of the current Figma document.
   * see: https://www.figma.com/plugin-docs/api/DocumentNode/#documentcolorprofile
   * */
  colorSpace: ColorSpace;
  /**
   * Default color model for the picker (uncontrolled mode). Determines the area box type and the initially displayed color input.
   * */
  defaultActiveModel?: ColorModel;
  /**
   * Color model for the picker (controlled mode). Determines the area box type and the initially displayed color input.
   * When specified, you also need to specify 'onActiveModelChange' callback to handle changing the models.
   * @default 'hex' or first item in 'models' if specified.
   * */
  activeModel?: ColorModel;
  /** Callback to call upon model change */
  onActiveModelChange?: (model: ColorModel) => void;
  /**
   * Color models the picker needs to display.
   * @default ['hex', 'rgb', 'hsl', 'hsv']
   * */
  models?: ColorModel[];
  /** Default color in Figma's normalized RGBA format  (uncontrolled mode) */
  defaultColor?: RGBA;
  /** Color in Figma's normalized RGBA format  (controlled mode) */
  color?: RGBA;
  /** Callback to call upon color change */
  onColorChange?: (color: RGBA) => void;
  children: React.ReactNode;
};

type ColorChangeParams =
  | { mode: 'rgb'; value: RGBA }
  | { mode: 'hsv'; value: HSVA }
  | { mode: 'hsl'; value: HSLA }
  | { mode: 'hue'; value: number };

const Root = (props: RootProps) => {
  const {
    colorSpace,
    models = DEFAULT_MODELS,
    defaultActiveModel,
    activeModel: activeModelProp,
    onActiveModelChange,
    defaultColor,
    color,
    onColorChange,
    children,
  } = props;
  validateModelProps(activeModelProp, defaultActiveModel, models);
  const [colorsByModel, changeColor] = useColorsByModel(color, defaultColor, onColorChange);
  const [activeModel = models[0], setActiveModel] = useControllableState({
    prop: activeModelProp,
    defaultProp: defaultActiveModel,
    onChange: onActiveModelChange,
  });

  return (
    <ColorPickerContextProvider
      colorSpace={colorSpace}
      models={models}
      activeModel={activeModel}
      onActiveModelChange={setActiveModel}
      colorsByModel={colorsByModel}
      hue={colorsByModel.hsv.h}
      onColorChange={changeColor}
    >
      {children}
    </ColorPickerContextProvider>
  );
};

function useColorsByModel(
  color: RGBA | undefined,
  defaultColor: RGBA | undefined,
  onColorChange: ((color: RGBA) => void) | undefined
): [ColorsByModel, (change: ColorChangeParams) => void] {
  const [storedColorsByModel, setColorsByModel] = useState(() =>
    getColorsByModel(color ?? defaultColor ?? DEFAULT_COLOR)
  );
  const colorsByModel =
    color === undefined ? storedColorsByModel : applyColorChange(storedColorsByModel, { mode: 'rgb', value: color });

  if (colorsByModel !== storedColorsByModel) {
    setColorsByModel(colorsByModel);
  }

  const changeColor = (change: ColorChangeParams) => {
    const next = applyColorChange(colorsByModel, change);
    setColorsByModel(next);
    if (!isSameRgbaAtFloat32(next.rgb, colorsByModel.rgb)) {
      onColorChange?.(next.rgb);
    }
  };

  return [colorsByModel, changeColor];
}

function validateModelProps(
  activeModel: ColorModel | undefined,
  defaultActiveModel: ColorModel | undefined,
  models: ColorModel[]
) {
  if (models.length === 0) {
    throw new Error(
      "The 'models' prop must contain at least one color model. Omit the 'models' prop entirely to use default models."
    );
  }

  if (activeModel && !models.includes(activeModel)) {
    throw new Error(
      `Invalid 'activeModel': '${activeModel}' is not present in the 'models' array. Make sure 'activeModel' matches a model name in 'models'.`
    );
  }

  if (defaultActiveModel && !models.includes(defaultActiveModel)) {
    throw new Error(
      `Invalid 'defaultActiveModel': '${defaultActiveModel}' is not present in the 'models' array. Make sure 'activeModel' matches a model name in 'models'.`
    );
  }
}

function getColorsByModel(rgb: RGBA): ColorsByModel {
  return { rgb, hsv: rgbaToHsva(rgb), hsl: rgbaToHsla(rgb) };
}

function applyColorChange(current: ColorsByModel, change: ColorChangeParams): ColorsByModel {
  switch (change.mode) {
    case 'rgb':
      return applyRgbChange(current, change.value);
    case 'hue':
      return applyHueChange(current, change.value);
    case 'hsv': {
      const rgb = hsvaToRgba(change.value);
      return { rgb, hsv: change.value, hsl: keepHslSaturation(current.hsl, hsvaToHsla(change.value), rgb) };
    }
    case 'hsl': {
      const rgb = hslaToRgba(change.value);
      return { rgb, hsv: keepHsvSaturation(current.hsv, hslaToHsva(change.value), rgb), hsl: change.value };
    }
  }
}

function applyRgbChange(current: ColorsByModel, rgb: RGBA): ColorsByModel {
  if (isSameRgbaAtFloat32(current.rgb, rgb)) {
    return current;
  }

  if (isSameRgbAtFloat32(current.rgb, rgb)) {
    return { rgb, hsv: { ...current.hsv, a: rgb.a }, hsl: { ...current.hsl, a: rgb.a } };
  }

  return {
    rgb,
    hsv: keepHue(current.hsv, keepHsvSaturation(current.hsv, rgbaToHsva(rgb), rgb), rgb),
    hsl: keepHue(current.hsl, keepHslSaturation(current.hsl, rgbaToHsla(rgb), rgb), rgb),
  };
}

function applyHueChange(current: ColorsByModel, h: number): ColorsByModel {
  const hsv = { ...current.hsv, h };
  return { rgb: hsvaToRgba(hsv), hsv, hsl: { ...current.hsl, h } };
}

function keepHue<T extends { h: number }>(current: T, next: T, rgb: RGB): T {
  return hasHue(rgb) ? next : { ...next, h: current.h };
}

function keepHsvSaturation(current: HSVA, next: HSVA, rgb: RGB): HSVA {
  return isBlack(rgb) ? { ...next, s: current.s } : next;
}

function keepHslSaturation(current: HSLA, next: HSLA, rgb: RGB): HSLA {
  return isBlack(rgb) || isWhite(rgb) ? { ...next, s: current.s } : next;
}

function hasHue({ r, g, b }: RGB) {
  return Math.max(r, g, b) !== Math.min(r, g, b);
}

function isBlack({ r, g, b }: RGB) {
  return Math.max(r, g, b) === 0;
}

function isWhite({ r, g, b }: RGB) {
  return Math.min(r, g, b) === 1;
}

function isSameRgbaAtFloat32(left: RGBA, right: RGBA) {
  return isSameRgbAtFloat32(left, right) && isSameChannelAtFloat32(left.a, right.a);
}

function isSameRgbAtFloat32(left: RGB, right: RGB) {
  return (
    isSameChannelAtFloat32(left.r, right.r) &&
    isSameChannelAtFloat32(left.g, right.g) &&
    isSameChannelAtFloat32(left.b, right.b)
  );
}

// Figma stores paint channels and opacity as float32: a color read back from a node is Math.fround of the written one.
function isSameChannelAtFloat32(left: number, right: number) {
  return Object.is(Math.fround(left), Math.fround(right));
}

export type { RootProps, ColorModel, ColorSpace, ColorsByModel };
export { Root, useColorPickerContext };
