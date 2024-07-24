import { createContext } from '@lib/react/create-context';
import type { RGBA } from '@lib/color';
import { useControllableState } from '@lib/react/use-controllable-state';

type ColorModel = 'hsv' | 'hsl' | 'hex' | 'rgb';
type ColorSpace = 'srgb' | 'display-p3';

const DEFAULT_COLOR = { r: 0, g: 0, b: 0, a: 1 };

const [ColorPickerContextProvider, useColorPickerContext] = createContext<{
  colorSpace: ColorSpace;
  colorModel: ColorModel;
  color: RGBA;
  onColorChange: (color: RGBA) => void;
}>('ColorPicker');

type RootProps = {
  colorSpace: ColorSpace;
  colorModel: ColorModel;
  color?: RGBA;
  onColorChange?: (color: RGBA) => void;
  children: React.ReactNode;
};

const Root = (props: RootProps) => {
  const { colorModel, colorSpace, children, color: colorProp, onColorChange } = props;
  const [color = DEFAULT_COLOR, setColor] = useControllableState({
    prop: colorProp,
    defaultProp: colorProp,
    onChange: onColorChange,
  });

  return (
    <ColorPickerContextProvider colorModel={colorModel} colorSpace={colorSpace} color={color} onColorChange={setColor}>
      {children}
    </ColorPickerContextProvider>
  );
};

export type { RootProps, ColorModel, ColorSpace };
export { Root, useColorPickerContext };
