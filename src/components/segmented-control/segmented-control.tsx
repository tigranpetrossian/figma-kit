import React from 'react';
import * as RadixToggleGroup from '@radix-ui/react-toggle-group';
import { cx } from 'class-variance-authority';
import { Text as TextPrimitive, type TextProps as TextPrimitiveProps } from '@components/text';
import { useControllableState } from '@lib/react/use-controllable-state';

type RootElement = React.ElementRef<typeof RadixToggleGroup.Root>;
type RootProps = Omit<RadixToggleGroup.ToggleGroupSingleProps, 'type'> & {
  fullWidth?: boolean;
};

const Root = React.forwardRef<RootElement, RootProps>((props, ref) => {
  const { className, fullWidth, value: valueProp, defaultValue: defaultValueProp, onValueChange, ...rootProps } = props;

  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValueProp,
    onChange: onValueChange,
  });

  return (
    <RadixToggleGroup.Root
      ref={ref}
      className={cx(className, 'fp-SegmentedControlRoot', { 'fp-full-width': fullWidth })}
      {...rootProps}
      type="single"
      value={value}
      onValueChange={(value) => {
        if (value) {
          setValue(value);
        }
      }}
    />
  );
});

type ItemElement = React.ElementRef<typeof RadixToggleGroup.Item>;
type ItemProps = RadixToggleGroup.ToggleGroupItemProps;

const Item = React.forwardRef<ItemElement, ItemProps>((props, ref) => {
  const { className, ...itemProps } = props;

  return <RadixToggleGroup.Item ref={ref} className={cx(className, 'fp-SegmentedControlItem')} {...itemProps} />;
});

type TextElement = React.ElementRef<typeof TextPrimitive>;
type TextProps = TextPrimitiveProps;

const Text = React.forwardRef<TextElement, TextProps>((props, ref) => {
  const { className, ...textProps } = props;

  return <TextPrimitive ref={ref} className={cx(className, 'fp-SegmentedControlText')} {...textProps} />;
});

Root.displayName = 'SegmentedControl.Root';
Item.displayName = 'SegmentedControl.Item';
Text.displayName = 'SegmentedControl.Text';

export type { RootProps, ItemProps, TextProps };
export { Root, Item, Text };
