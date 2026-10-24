import { useState } from 'react';
import { createContext } from '@lib/react/create-context';
import type { HEX, HSLA, HSVA, RGBA } from '@lib/color';
import {
  hslaToHex,
  hsvaToHex,
  rgbaToHex,
  hslaToHsva,
  hslaToRgba,
  hsvaToHsla,
  hsvaToRgba,
  rgbaToHsla,
  rgbaToHsva,
} from '@lib/color';
import { useControllableState } from '@lib/react/use-controllable-state';

type ColorModel = 'hex' | 'rgb' | 'hsl' | 'hsv';
type ColorSpace = 'srgb' | 'display-p3';
type ColorsByModel = {
  hex: HEX;
  rgb: RGBA;
  hsl: HSLA;
  hsv: HSVA;
};

const DEFAULT_COLOR = { r: 0, g: 0, b: 0, a: 1 };
const DEFAULT_MODELS: ColorModel[] = ['hex', 'rgb', 'hsl', 'hsv'];

const [ColorPickerContextProvider, useColorPickerContext] = createContext<{
  colorSpace: ColorSpace;
  models: ColorModel[];
  activeModel: ColorModel;
  onActiveModelChange: (model: ColorModel) => void;
  color: RGBA;
  onColorChange: (params: ColorChangeParams) => void;
  colorsByModel: ColorsByModel;
  hue: number;
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

type ColorChangeParams = { mode: 'hsv'; value: HSVA } | { mode: 'hsl'; value: HSLA } | { mode: 'rgb'; value: RGBA };

const Root = (props: RootProps) => {
  const {
    colorSpace,
    models = DEFAULT_MODELS,
    defaultActiveModel,
    activeModel: activeModelProp,
    onActiveModelChange,
    defaultColor,
    color: colorProp,
    onColorChange,
    children,
  } = props;
  validateModelProps(activeModelProp, defaultActiveModel, models);
  const [color = DEFAULT_COLOR, setColor] = useControllableState({
    prop: colorProp,
    defaultProp: defaultColor,
    onChange: onColorChange,
  });
  const [activeModel = models[0], setActiveModel] = useControllableState({
    prop: activeModelProp,
    defaultProp: defaultActiveModel,
    onChange: onActiveModelChange,
  });

  const [editingColorsByModel, setEditingColorsByModel] = useState<ColorsByModel | null>(null);
  const colorsByModel =
    editingColorsByModel && isSameRgba(editingColorsByModel.rgb, color)
      ? editingColorsByModel
      : getColorsByModel(color);
  // TODO: Rethink when adding OKLCH
  const hue = colorsByModel.hsv.h;

  const handleColorChange = (params: ColorChangeParams) => {
    const next = getColorsByModelFromChange(params);
    setEditingColorsByModel(next);
    setColor(next.rgb);
  };

  return (
    <ColorPickerContextProvider
      colorSpace={colorSpace}
      models={models}
      activeModel={activeModel}
      onActiveModelChange={setActiveModel}
      color={color}
      onColorChange={handleColorChange}
      hue={hue}
      colorsByModel={colorsByModel}
    >
      {children}
    </ColorPickerContextProvider>
  );
};

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
  return {
    rgb,
    hsv: rgbaToHsva(rgb),
    hsl: rgbaToHsla(rgb),
    hex: rgbaToHex(rgb),
  };
}

function getColorsByModelFromChange(params: ColorChangeParams): ColorsByModel {
  switch (params.mode) {
    case 'rgb':
      return getColorsByModel(params.value);
    case 'hsv':
      return {
        hsv: params.value,
        hsl: hsvaToHsla(params.value),
        rgb: hsvaToRgba(params.value),
        hex: hsvaToHex(params.value),
      };
    case 'hsl':
      return {
        hsv: hslaToHsva(params.value),
        hsl: params.value,
        rgb: hslaToRgba(params.value),
        hex: hslaToHex(params.value),
      };
  }
}

function isSameRgba(left: RGBA, right: RGBA) {
  return left.r === right.r && left.g === right.g && left.b === right.b && left.a === right.a;
}

export type { RootProps, ColorModel, ColorSpace, ColorsByModel };
export { Root, useColorPickerContext };
