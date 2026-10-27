import type { CSSProperties, ReactElement, ReactNode } from 'react';
import * as Select from '@components/select';
import { Flex } from '@components/flex';
import { CheckmarkIcon, ChevronDownIcon, ChevronUpIcon } from '@components/icons';
import { useColorPickerContext } from '@components/color-picker/color-picker';
import type { ColorModel } from '@components/color-picker/color-picker';
import type { RGBA } from '@lib/color';
import { BYTE_DISPLAY, OPACITY_DISPLAY } from '@lib/color';
import * as ValueField from '@components/value-field';

const DEFAULT_INPUT_LABELS: InputLabels = {
  model: 'Color model',
  hex: 'Hex',
  red: 'Red',
  green: 'Green',
  blue: 'Blue',
  hue: 'Hue',
  saturation: 'Saturation',
  lightness: 'Lightness',
  brightness: 'Brightness',
  opacity: 'Opacity',
};

type InputLabels = Record<
  'model' | 'hex' | 'red' | 'green' | 'blue' | 'hue' | 'saturation' | 'lightness' | 'brightness' | 'opacity',
  string
>;

type ModelInputProps = {
  labels: InputLabels;
};

const HexInput = ({ labels }: ModelInputProps) => {
  const { colorsByModel, onColorChange } = useColorPickerContext('ColorPicker.HEX');
  const rgba = colorsByModel.rgb;

  const onChange = (rgba: RGBA) => {
    onColorChange({ mode: 'rgb', value: rgba });
  };

  return (
    <ValueField.Multi>
      <ValueField.Root>
        <ValueField.Hex aria-label={labels.hex} onChange={onChange} value={rgba} />
      </ValueField.Root>
      <OpacityField label={labels.opacity} />
    </ValueField.Multi>
  );
};

const RgbaInput = ({ labels }: ModelInputProps) => {
  const { colorsByModel, onColorChange } = useColorPickerContext('ColorPicker.RGBA');
  const rgba = colorsByModel.rgb;

  const onChange = (channel: 'r' | 'g' | 'b') => (value: number) => {
    onColorChange({ mode: 'rgb', value: { ...rgba, [channel]: value } });
  };

  return (
    <ValueField.Multi>
      <ValueField.Root>
        <ValueField.Numeric aria-label={labels.red} onChange={onChange('r')} value={rgba.r} {...BYTE_DISPLAY.options} />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Numeric
          aria-label={labels.green}
          onChange={onChange('g')}
          value={rgba.g}
          {...BYTE_DISPLAY.options}
        />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Numeric
          aria-label={labels.blue}
          onChange={onChange('b')}
          value={rgba.b}
          {...BYTE_DISPLAY.options}
        />
      </ValueField.Root>
      <OpacityField label={labels.opacity} />
    </ValueField.Multi>
  );
};

const HsvaInput = ({ labels }: ModelInputProps) => {
  const { colorsByModel, onColorChange } = useColorPickerContext('ColorPicker.HSVA');
  const hsva = colorsByModel.hsv;

  const onChange = (channel: 'h' | 's' | 'v') => (value: number) => {
    onColorChange({ mode: 'hsv', value: { ...hsva, [channel]: value } });
  };

  return (
    <ValueField.Multi>
      <ValueField.Root>
        <ValueField.Numeric
          aria-label={labels.hue}
          onChange={onChange('h')}
          value={hsva.h}
          min={0}
          max={360}
          precision={0}
        />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Numeric
          aria-label={labels.saturation}
          onChange={onChange('s')}
          value={hsva.s}
          min={0}
          max={100}
          precision={0}
        />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Numeric
          aria-label={labels.brightness}
          onChange={onChange('v')}
          value={hsva.v}
          min={0}
          max={100}
          precision={0}
        />
      </ValueField.Root>
      <OpacityField label={labels.opacity} />
    </ValueField.Multi>
  );
};

const HslaInput = ({ labels }: ModelInputProps) => {
  const { colorsByModel, onColorChange } = useColorPickerContext('ColorPicker.HSLA');
  const hsla = colorsByModel.hsl;

  const onChange = (channel: 'h' | 's' | 'l') => (value: number) => {
    onColorChange({ mode: 'hsl', value: { ...hsla, [channel]: value } });
  };

  return (
    <ValueField.Multi>
      <ValueField.Root>
        <ValueField.Numeric
          aria-label={labels.hue}
          onChange={onChange('h')}
          value={hsla.h}
          min={0}
          max={360}
          precision={0}
        />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Numeric
          aria-label={labels.saturation}
          onChange={onChange('s')}
          value={hsla.s}
          min={0}
          max={100}
          precision={0}
        />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Numeric
          aria-label={labels.lightness}
          onChange={onChange('l')}
          value={hsla.l}
          min={0}
          max={100}
          precision={0}
        />
      </ValueField.Root>
      <OpacityField label={labels.opacity} />
    </ValueField.Multi>
  );
};

const INPUT_BY_MODEL = {
  hex: HexInput,
  hsv: HsvaInput,
  hsl: HslaInput,
  rgb: RgbaInput,
} satisfies Record<ColorModel, (props: ModelInputProps) => ReactElement>;

type InputProps = {
  className?: string;
  style?: CSSProperties;
  labels?: Partial<InputLabels>;
};

const Input = (props: InputProps) => {
  const { models, activeModel, onActiveModelChange } = useColorPickerContext('ColorPicker.Input');
  const ActiveInput = INPUT_BY_MODEL[activeModel];
  const modelOptions = models.map((model) => ({ value: model, label: model.toUpperCase() }));
  const labels = { ...DEFAULT_INPUT_LABELS, ...props.labels };

  function changeActiveModel(value: ColorModel | null) {
    if (value !== null) {
      onActiveModelChange(value);
    }
  }

  return (
    <Flex gap="2.5" className={props.className} style={props.style}>
      {models.length > 1 && (
        <Select.Root items={modelOptions} value={activeModel} onValueChange={changeActiveModel}>
          <Select.Trigger aria-label={labels.model} style={{ width: 56 }}>
            <Select.Value />
            <Select.Icon>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <ColorModelSelectPopup>
            {modelOptions.map((option) => (
              <Select.Item key={option.value} value={option.value} label={option.label}>
                <Select.ItemIndicator>
                  <CheckmarkIcon size="4" />
                </Select.ItemIndicator>
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </ColorModelSelectPopup>
        </Select.Root>
      )}
      <ActiveInput labels={labels} />
    </Flex>
  );
};

function ColorModelSelectPopup(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <Select.Portal>
      <Select.Positioner>
        <Select.Popup>
          <Select.ScrollUpArrow>
            <ChevronUpIcon />
          </Select.ScrollUpArrow>
          <Select.List>{children}</Select.List>
          <Select.ScrollDownArrow>
            <ChevronDownIcon />
          </Select.ScrollDownArrow>
        </Select.Popup>
      </Select.Positioner>
    </Select.Portal>
  );
}

function OpacityField(props: { label: string }) {
  const { label } = props;
  const { colorsByModel, onColorChange } = useColorPickerContext('ColorPicker.Opacity');

  function changeAlpha(alpha: number) {
    onColorChange({ mode: 'alpha', value: alpha });
  }

  return (
    <ValueField.Root style={{ flex: '0 0 52px' }}>
      <ValueField.Numeric
        aria-label={label}
        onChange={changeAlpha}
        value={colorsByModel.rgb.a}
        {...OPACITY_DISPLAY.options}
        allowedUnits={['%']}
      />
      <ValueField.Label>%</ValueField.Label>
    </ValueField.Root>
  );
}

export type { InputProps, InputLabels };
export { Input };
