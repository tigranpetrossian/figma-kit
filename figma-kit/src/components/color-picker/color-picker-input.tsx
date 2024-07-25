import { pick } from 'remeda';
import type { CSSProperties } from 'react';
import * as Select from '@components/select';
import { Flex } from '@components/flex';
import { useColorPickerContext } from '@components/color-picker/color-picker';
import type { RGBA } from '@lib/color';
import * as ValueField from '@components/value-field';

type InputProps = {
  className?: string;
  style?: CSSProperties;
};

const Input = (props: InputProps) => {
  const { models, activeModel, onActiveModelChange } = useColorPickerContext('ColorPicker.Input');
  const Input = pick(
    {
      hex: HexInput,
      hsv: HsvaInput,
      hsl: HslaInput,
      rgb: RgbaInput,
    },
    models
  )[activeModel];

  return (
    <Flex gap="2.5" className={props.className} style={props.style}>
      {models.length > 1 && (
        <Select.Root value={activeModel} onValueChange={onActiveModelChange}>
          <Select.Trigger style={{ width: 56 }} />
          <Select.Content>
            {models.map((model) => (
              <Select.Item key={model} value={model}>
                {model.toUpperCase()}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      )}
      <Input />
    </Flex>
  );
};

const HexInput = () => {
  const { colorsByModel, onColorChange } = useColorPickerContext('ColorPicker.HEX');
  const rgba = colorsByModel.rgb;

  const onChange = (rgba: RGBA) => {
    onColorChange({ mode: 'rgb', value: rgba });
  };

  const handleAlphaChange = (alpha: number) => {
    onColorChange({ mode: 'rgb', value: { ...rgba, a: alpha } });
  };

  return (
    <ValueField.Multi>
      <ValueField.Root>
        <ValueField.Hex onChange={onChange} value={rgba} />
      </ValueField.Root>
      <ValueField.Root style={{ flex: '0 0 52px' }}>
        <ValueField.Numeric
          onChange={handleAlphaChange}
          value={rgba.a}
          min={0}
          max={1}
          targetRange={[0, 100]}
          precision={2}
          allowedUnits={['%']}
        />
        <ValueField.Label>%</ValueField.Label>
      </ValueField.Root>
    </ValueField.Multi>
  );
};

const RgbaInput = () => {
  const { colorsByModel, onColorChange } = useColorPickerContext('ColorPicker.RGBA');
  const rgba = colorsByModel.rgb;

  const onChange = (channel: 'r' | 'g' | 'b' | 'a') => (value: number) => {
    onColorChange({ mode: 'rgb', value: { ...rgba, [channel]: value } });
  };

  return (
    <ValueField.Multi>
      <ValueField.Root>
        <ValueField.Numeric
          onChange={onChange('r')}
          value={rgba.r}
          min={0}
          max={1}
          targetRange={[0, 255]}
          precision={0}
        />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Numeric
          onChange={onChange('g')}
          value={rgba.g}
          min={0}
          max={1}
          targetRange={[0, 255]}
          precision={0}
        />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Numeric
          onChange={onChange('b')}
          value={rgba.b}
          min={0}
          max={1}
          targetRange={[0, 255]}
          precision={0}
        />
      </ValueField.Root>
      <ValueField.Root style={{ flex: '0 0 52px' }}>
        <ValueField.Numeric
          onChange={onChange('a')}
          value={rgba.a}
          min={0}
          max={1}
          targetRange={[0, 100]}
          precision={2}
          allowedUnits={['%']}
        />
        <ValueField.Label>%</ValueField.Label>
      </ValueField.Root>
    </ValueField.Multi>
  );
};

const HsvaInput = () => {
  const { colorsByModel, onColorChange } = useColorPickerContext('ColorPicker.HSVA');
  const hsva = colorsByModel.hsv;

  const onChange = (channel: 'h' | 's' | 'v' | 'a') => (value: number) => {
    onColorChange({ mode: 'hsv', value: { ...hsva, [channel]: value } });
  };

  return (
    <ValueField.Multi>
      <ValueField.Root>
        <ValueField.Numeric onChange={onChange('h')} value={hsva.h} min={0} max={360} precision={0} />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Numeric onChange={onChange('s')} value={hsva.s} min={0} max={100} precision={0} />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Numeric onChange={onChange('v')} value={hsva.v} min={0} max={100} precision={0} />
      </ValueField.Root>
      <ValueField.Root style={{ flex: '0 0 52px' }}>
        <ValueField.Numeric
          onChange={onChange('a')}
          value={hsva.a}
          min={0}
          max={1}
          targetRange={[0, 100]}
          precision={2}
          allowedUnits={['%']}
        />
        <ValueField.Label>%</ValueField.Label>
      </ValueField.Root>
    </ValueField.Multi>
  );
};

const HslaInput = () => {
  const { colorsByModel, onColorChange } = useColorPickerContext('ColorPicker.HSLA');
  const hsla = colorsByModel.hsl;

  const onChange = (channel: 'h' | 's' | 'l' | 'a') => (value: number) => {
    onColorChange({ mode: 'hsl', value: { ...hsla, [channel]: value } });
  };

  return (
    <ValueField.Multi>
      <ValueField.Root>
        <ValueField.Numeric onChange={onChange('h')} value={hsla.h} min={0} max={360} precision={0} />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Numeric onChange={onChange('s')} value={hsla.s} min={0} max={100} precision={0} />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Numeric onChange={onChange('l')} value={hsla.l} min={0} max={100} precision={0} />
      </ValueField.Root>
      <ValueField.Root style={{ flex: '0 0 52px' }}>
        <ValueField.Numeric
          onChange={onChange('a')}
          value={hsla.a}
          min={0}
          max={1}
          targetRange={[0, 100]}
          precision={2}
          allowedUnits={['%']}
        />
        <ValueField.Label>%</ValueField.Label>
      </ValueField.Root>
    </ValueField.Multi>
  );
};

export { Input };
