import React from 'react';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { cx } from 'class-variance-authority';
import { Label as LabelPrimitive, type LabelProps as LabelPrimitiveProps } from '@components/text';
import { createContext } from '@lib/react/create-context';

const [RadioGroupContextProvider, useRadioGroupContext] = createContext<{
  orientation: 'horizontal' | 'vertical';
  disabled: boolean | undefined;
}>('RadioGroup');

type RootElement = React.ElementRef<typeof RadixRadioGroup.Root>;
type RootProps = RadixRadioGroup.RadioGroupProps;

const Root = React.forwardRef<RootElement, RootProps>((props, ref) => {
  const { orientation = 'horizontal', disabled, className, ...rootProps } = props;

  return (
    <RadioGroupContextProvider orientation={orientation} disabled={disabled}>
      <RadixRadioGroup.Root
        ref={ref}
        orientation={orientation}
        disabled={disabled}
        className={cx(className, 'fp-RadioGroupRoot')}
        {...rootProps}
      />
    </RadioGroupContextProvider>
  );
});

type ItemElement = React.ElementRef<typeof RadixRadioGroup.Item>;
type ItemProps = RadixRadioGroup.RadioGroupItemProps;

const Item = React.forwardRef<ItemElement, ItemProps>((props, ref) => {
  const { className, ...itemProps } = props;

  return <RadixRadioGroup.Item ref={ref} className={cx(className, 'fp-RadioGroupItem')} {...itemProps} />;
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
