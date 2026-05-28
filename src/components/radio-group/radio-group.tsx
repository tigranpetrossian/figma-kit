import React from 'react';
import { Radio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { cx } from 'class-variance-authority';
import { Label as LabelPrimitive, type LabelProps as LabelPrimitiveProps } from '@components/text';
import { addClassName } from '@lib/react/add-class-name';
import { createContext } from '@lib/react/create-context';

type Orientation = 'horizontal' | 'vertical';

const [RadioGroupContextProvider, useRadioGroupContext] = createContext<{
  orientation: Orientation;
  disabled: boolean | undefined;
}>('RadioGroup');

type RootElement = HTMLDivElement;
type RootProps = BaseRadioGroup.Props<string> & {
  orientation?: Orientation | undefined;
};

const Root = React.forwardRef<RootElement, RootProps>((props, ref) => {
  const { orientation = 'horizontal', disabled, className, ...rootProps } = props;

  return (
    <RadioGroupContextProvider orientation={orientation} disabled={disabled}>
      <BaseRadioGroup
        ref={ref}
        disabled={disabled}
        className={addClassName(className, 'fp-RadioGroupRoot')}
        data-orientation={orientation}
        {...rootProps}
      />
    </RadioGroupContextProvider>
  );
});

type ItemElement = HTMLSpanElement;
type ItemProps = Radio.Root.Props<string>;

const Item = React.forwardRef<ItemElement, ItemProps>((props, ref) => {
  const { className, ...itemProps } = props;

  return <Radio.Root ref={ref} className={addClassName(className, 'fp-RadioGroupItem')} {...itemProps} />;
});

type LabelElement = React.ElementRef<'label'>;
type LabelProps = LabelPrimitiveProps;

const Label = React.forwardRef<LabelElement, LabelProps>((props, ref) => {
  const { orientation, disabled } = useRadioGroupContext('Label');
  const { className, ...labelProps } = props;

  return (
    <LabelPrimitive
      ref={ref}
      className={cx(className, 'fp-RadioGroupLabel')}
      data-orientation={orientation}
      data-disabled={disabled ? '' : undefined}
      {...labelProps}
    />
  );
});

Root.displayName = 'RadioGroup.Root';
Item.displayName = 'RadioGroup.Item';
Label.displayName = 'RadioGroup.Label';

export type { RootProps, ItemProps, LabelProps };
export { Root, Item, Label };
